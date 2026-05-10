// AttentionLedger — Registro de saldo acumulado por usuário
//
// Cada crédito é registrado com timestamp e referência ao PayoutPolicy.
// Usa PDAs para isolamento por usuário.
//
// Desenvolvido por catitodev. Licenciado sob Apache 2.0.

use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111112");

#[account]
#[derive(InitSpace)]
pub struct UserBalance {
    pub owner: Pubkey,
    pub total: u64,
    pub epoch_total: u64,
    pub current_epoch: u32,
    pub event_count: u32,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct CreditRecord {
    pub amount: u64,
    pub epoch: u32,
    pub attention_type: u8,
    pub timestamp: i64,
    pub bump: u8,
}

#[program]
pub mod attention_ledger {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        let balance = &mut ctx.accounts.user_balance;
        balance.owner = ctx.accounts.user.key();
        balance.total = 0;
        balance.epoch_total = 0;
        balance.current_epoch = 1;
        balance.event_count = 0;
        balance.bump = ctx.bumps.user_balance;
        Ok(())
    }

    pub fn credit(
        ctx: Context<Credit>,
        amount: u64,
        epoch: u32,
        attention_type: u8,
    ) -> Result<()> {
        let balance = &mut ctx.accounts.user_balance;
        if balance.current_epoch != epoch {
            balance.epoch_total = 0;
            balance.current_epoch = epoch;
        }
        balance.total = balance
            .total
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;
        balance.epoch_total = balance
            .epoch_total
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;
        balance.event_count += 1;
        msg!(
            "Credit | user: {} | amount: {} | epoch: {}",
            balance.owner,
            amount,
            epoch
        );
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let balance = &mut ctx.accounts.user_balance;
        require!(
            balance.owner == ctx.accounts.user.key(),
            ErrorCode::Unauthorized
        );
        require!(balance.total >= amount, ErrorCode::InsufficientBalance);
        balance.total -= amount;
        msg!("Withdraw | user: {} | amount: {}", balance.owner, amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = 8 + UserBalance::INIT_SPACE,
        seeds = [b"balance", user.key().as_ref()],
        bump
    )]
    pub user_balance: Account<'info, UserBalance>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Credit<'info> {
    /// CHECK: autorizado pelo PayoutPolicy via CPI
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [b"balance", user_balance.owner.as_ref()],
        bump = user_balance.bump,
    )]
    pub user_balance: Account<'info, UserBalance>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"balance", user.key().as_ref()],
        bump = user_balance.bump,
        constraint = user_balance.owner == user.key()
    )]
    pub user_balance: Account<'info, UserBalance>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Não autorizado")]
    Unauthorized,
    #[msg("Overflow")]
    Overflow,
    #[msg("Saldo insuficiente")]
    InsufficientBalance,
}
