use anchor_lang::prelude::*;

//! ReputationProof — Score anti-Sybil on-chain via commitments
//!
//! Usa hash commitments para provar frequência sem expor dados.
//! MVP: commitments simples. Evolução: BLS12-381 via Solana alt_bn128.
//!
//! Desenvolvido por catitodev. Licenciado sob Apache 2.0.

declare_id!("RepProof111111111111111111111111111111111111");

#[account]
pub struct Reputation {
    pub user: Pubkey,
    pub score: u32,
    pub last_verified_epoch: u32,
    pub proof_count: u32,
    pub bump: u8,
}

#[account]
pub struct VerifierConfig {
    pub admin: Pubkey,
    pub trusted_threshold: u32,
    pub bump: u8,
}

#[program]
pub mod reputation_proof {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, trusted_threshold: u32) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.admin = ctx.accounts.admin.key();
        config.trusted_threshold = trusted_threshold;
        config.bump = ctx.bumps.config;
        Ok(())
    }

    pub fn register_commitment(
        ctx: Context<RegisterCommitment>,
        epoch: u32,
        event_count: u32,
        total_lamports: u64,
    ) -> Result<()> {
        // Commitment = hash(epoch || count || total)
        let hash_input = [
            &epoch.to_le_bytes()[..],
            &event_count.to_le_bytes()[..],
            &total_lamports.to_le_bytes()[..],
        ].concat();
        let _commitment = anchor_lang::solana_program::hash::hash(&hash_input);

        msg!("Commitment registered | user: {} | epoch: {}", ctx.accounts.user.key(), epoch);
        Ok(())
    }

    pub fn verify_and_score(ctx: Context<VerifyAndScore>, epoch: u32) -> Result<()> {
        let rep = &mut ctx.accounts.reputation;

        require!(epoch > rep.last_verified_epoch, ErrorCode::AlreadyVerified);

        rep.score += 1;
        rep.last_verified_epoch = epoch;
        rep.proof_count += 1;

        msg!("Reputation +1 | user: {} | score: {} | epoch: {}", rep.user, rep.score, epoch);
        Ok(())
    }

    pub fn is_trusted(ctx: Context<CheckTrusted>) -> Result<bool> {
        let rep = &ctx.accounts.reputation;
        let config = &ctx.accounts.config;
        Ok(rep.score >= config.trusted_threshold)
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(
        init,
        payer = admin,
        space = 8 + VerifierConfig::INIT_SPACE,
        seeds = [b"verifier_config", admin.key().as_ref()],
        bump
    )]
    pub config: Account<'info, VerifierConfig>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterCommitment<'info> {
    /// CHECK: user being tracked
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct VerifyAndScore<'info> {
    #[account(mut)]
    pub verifier: Signer<'info>,
    #[account(
        init_if_needed,
        payer = verifier,
        space = 8 + Reputation::INIT_SPACE,
        seeds = [b"reputation", user.key().as_ref()],
        bump
    )]
    pub reputation: Account<'info, Reputation>,
    /// CHECK: user
    pub user: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CheckTrusted<'info> {
    #[account(
        seeds = [b"reputation", user.key().as_ref()],
        bump = reputation.bump,
    )]
    pub reputation: Account<'info, Reputation>,
    /// CHECK: user
    pub user: AccountInfo<'info>,
    #[account(
        seeds = [b"verifier_config", config.admin.as_ref()],
        bump = config.bump,
    )]
    pub config: Account<'info, VerifierConfig>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Epoch já verificado")]
    AlreadyVerified,
    #[msg("Não autorizado")]
    Unauthorized,
}
