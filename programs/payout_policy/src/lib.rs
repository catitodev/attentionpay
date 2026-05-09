use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

//! PayoutPolicy — Fórmula ARP (Atenção Relativa Ponderada) on-chain
//!
//! Zero ponto flutuante. Toda aritmética em u64 com denominador explícito.
//! P_base em lamports. 1 SOL = 1_000_000_000 lamports.
//!
//! Desenvolvido por catitodev. Licenciado sob Apache 2.0.

declare_id!("PayPolicy111111111111111111111111111111111111");

/// Denominador para pesos (1000 = 1.0)
const WEIGHT_DENOM: u64 = 1_000;
/// Denominador para contexto
const CTX_DENOM: u64 = 1_000;
/// Basis points denominator (10000 = 100%)
const BPS_DENOM: u64 = 10_000;

/// Tipos de evento de atenção
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq, Eq)]
pub enum AttentionType {
    Scroll,
    Click,
    Focus,
}

/// Configuração global do contrato (PDA)
#[account]
pub struct PayoutConfig {
    pub admin: Pubkey,
    pub platform: Pubkey,
    /// P_base em lamports
    pub p_base: u64,
    /// Soft cap: deflator começa aqui
    pub soft_cap: u32,
    /// Hard cap: pagamento cai a zero
    pub hard_cap: u32,
    /// Pesos (multiplicados por 1000)
    pub w_scroll: u32,
    pub w_click: u32,
    pub w_focus: u32,
    /// Multiplicador máximo de contexto
    pub max_ctx_multiplier: u32,
    /// Bump do PDA
    pub bump: u8,
}

/// Contador de eventos por usuário no epoch atual (PDA)
#[account]
pub struct EpochCount {
    pub user: Pubkey,
    pub epoch: u32,
    pub count: u32,
    pub bump: u8,
}

/// Configuração de admin — imutável por epoch (PDA separado)
#[account]
pub struct AdminConfig {
    pub take_rate_bps: u32,
    pub current_epoch: u32,
    pub bump: u8,
}

#[program]
pub mod payout_policy {
    use super::*;

    /// Inicializa o contrato com configuração ARP
    pub fn initialize(
        ctx: Context<Initialize>,
        p_base: u64,
        soft_cap: u32,
        hard_cap: u32,
        take_rate_bps: u32,
    ) -> Result<()> {
        require!(take_rate_bps <= 10_000, ErrorCode::InvalidConfig);
        require!(soft_cap < hard_cap, ErrorCode::InvalidConfig);

        let config = &mut ctx.accounts.config;
        config.admin = ctx.accounts.admin.key();
        config.platform = ctx.accounts.platform.key();
        config.p_base = p_base;
        config.soft_cap = soft_cap;
        config.hard_cap = hard_cap;
        config.w_scroll = 1_000;  // 1.0
        config.w_click = 2_000;   // 2.0
        config.w_focus = 3_000; // 3.0
        config.max_ctx_multiplier = 3_000; // 3.0
        config.bump = ctx.bumps.config;

        let admin_cfg = &mut ctx.accounts.admin_config;
        admin_cfg.take_rate_bps = take_rate_bps;
        admin_cfg.current_epoch = 1;
        admin_cfg.bump = ctx.bumps.admin_config;

        msg!("PayoutPolicy initialized | p_base: {} | take_rate: {}%", p_base, take_rate_bps / 100);
        Ok(())
    }

    /// Calcula e executa payout para um evento de atenção
    pub fn calculate_and_pay(
        ctx: Context<CalculateAndPay>,
        attention_type: AttentionType,
        ctx_position: u32,    // 0-1000
        ctx_recency: u32,     // 0-1000
        ctx_hour: u32,        // 0-23
    ) -> Result<()> {
        let config = &ctx.accounts.config;
        let admin_cfg = &ctx.accounts.admin_config;
        let epoch_count = &mut ctx.accounts.epoch_count;

        // --- 1. Seleciona peso ---
        let w = match attention_type {
            AttentionType::Scroll => config.w_scroll as u64,
            AttentionType::Click => config.w_click as u64,
            AttentionType::Focus => config.w_focus as u64,
        };

        // --- 2. Multiplicador de contexto ---
        let m_position = (ctx_position as u64).min(config.max_ctx_multiplier as u64);
        let m_recency = (ctx_recency as u64).min(config.max_ctx_multiplier as u64);
        let m_hour = if ctx_hour >= 18 && ctx_hour <= 22 {
            config.max_ctx_multiplier as u64
        } else {
            CTX_DENOM
        };
        let m_ctx = (m_position + m_recency + m_hour) / 3;

        // --- 3. Deflator anti-Sybil ---
        epoch_count.count += 1;
        let count = epoch_count.count;

        require!(count <= config.hard_cap, ErrorCode::HardCapExceeded);

        let deflator = if count <= config.soft_cap {
            1_000u64 // 1.0
        } else {
            let range = (config.hard_cap - config.soft_cap) as u64;
            let excess = (count - config.soft_cap) as u64;
            let remaining = range.saturating_sub(excess);
            (remaining * 1_000) / range.max(1)
        };

        // --- 4. Cálculo ARP ---
        // payout = P_base * W * M_ctx * deflator * (10000 - take_rate) / (1000 * 1000 * 1000 * 10000)
        let step1 = (config.p_base * w) / WEIGHT_DENOM;
        let step2 = (step1 * m_ctx) / CTX_DENOM;
        let step3 = (step2 * deflator) / 1_000;
        let net_rate = BPS_DENOM - (admin_cfg.take_rate_bps as u64);
        let payout = (step3 * net_rate) / BPS_DENOM;

        require!(payout > 0, ErrorCode::ZeroPayout);

        // --- 5. Transferência SPL Token ---
        let platform_share = (payout * (admin_cfg.take_rate_bps as u64)) / BPS_DENOM;
        let user_share = payout - platform_share;

        // Transfer para usuário
        let cpi_accounts_user = Transfer {
            from: ctx.accounts.treasury_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.treasury.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx_user = CpiContext::new(cpi_program.clone(), cpi_accounts_user);
        token::transfer(cpi_ctx_user, user_share)?;

        // Transfer para plataforma
        let cpi_accounts_platform = Transfer {
            from: ctx.accounts.treasury_token_account.to_account_info(),
            to: ctx.accounts.platform_token_account.to_account_info(),
            authority: ctx.accounts.treasury.to_account_info(),
        };
        let cpi_ctx_platform = CpiContext::new(cpi_program, cpi_accounts_platform);
        token::transfer(cpi_ctx_platform, platform_share)?;

        msg!(
            "ARP payout | type: {:?} | user: {} | platform: {} | epoch: {} | count: {}",
            attention_type, user_share, platform_share, admin_cfg.current_epoch, count
        );

        Ok(())
    }

    /// Avança para próximo epoch (apenas admin)
    pub fn advance_epoch(
        ctx: Context<AdvanceEpoch>,
        new_take_rate_bps: u32,
    ) -> Result<()> {
        require!(new_take_rate_bps <= 10_000, ErrorCode::InvalidConfig);
        let admin_cfg = &mut ctx.accounts.admin_config;
        admin_cfg.current_epoch += 1;
        admin_cfg.take_rate_bps = new_take_rate_bps;
        msg!("Advanced to epoch {} | take_rate: {}%", admin_cfg.current_epoch, new_take_rate_bps / 100);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    /// CHECK: platform address
    pub platform: AccountInfo<'info>,
    #[account(
        init,
        payer = admin,
        space = 8 + PayoutConfig::INIT_SPACE,
        seeds = [b"config", admin.key().as_ref()],
        bump
    )]
    pub config: Account<'info, PayoutConfig>,
    #[account(
        init,
        payer = admin,
        space = 8 + AdminConfig::INIT_SPACE,
        seeds = [b"admin_config", admin.key().as_ref()],
        bump
    )]
    pub admin_config: Account<'info, AdminConfig>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CalculateAndPay<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"config", config.admin.as_ref()],
        bump = config.bump,
    )]
    pub config: Account<'info, PayoutConfig>,
    #[account(
        mut,
        seeds = [b"admin_config", config.admin.as_ref()],
        bump = admin_config.bump,
    )]
    pub admin_config: Account<'info, AdminConfig>,
    #[account(
        init_if_needed,
        payer = user,
        space = 8 + EpochCount::INIT_SPACE,
        seeds = [b"epoch_count", user.key().as_ref(), &admin_config.current_epoch.to_le_bytes()],
        bump
    )]
    pub epoch_count: Account<'info, EpochCount>,
    /// CHECK: treasury PDA
    #[account(mut, seeds = [b"treasury", config.admin.as_ref()], bump)]
    pub treasury: AccountInfo<'info>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = treasury)]
    pub treasury_token_account: Account<'info, TokenAccount>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = user)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = config.platform)]
    pub platform_token_account: Account<'info, TokenAccount>,
    pub mint: Account<'info, anchor_spl::token::Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AdvanceEpoch<'info> {
    #[account(mut, address = config.admin)]
    pub admin: Signer<'info>,
    #[account(
        mut,
        seeds = [b"config", config.admin.as_ref()],
        bump = config.bump,
    )]
    pub config: Account<'info, PayoutConfig>,
    #[account(
        mut,
        seeds = [b"admin_config", config.admin.as_ref()],
        bump = admin_config.bump,
    )]
    pub admin_config: Account<'info, AdminConfig>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Configuração inválida")]
    InvalidConfig,
    #[msg("Hard cap excedido — rate limit ativado")]
    HardCapExceeded,
    #[msg("Payout zero — evento não qualificado")]
    ZeroPayout,
    #[msg("Não autorizado")]
    Unauthorized,
}
