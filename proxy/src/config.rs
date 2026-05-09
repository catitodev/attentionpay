//! config.rs — Configuração do proxy AttentionPay (Solana)
//!
//! Desenvolvido por catitodev. Licenciado sob Apache 2.0.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProxyConfig {
    pub bind_addr: String,
    pub network: String,
    pub rpc_url: String,
    pub wss_url: String,
    pub payout_program_id: String,
    pub ledger_program_id: String,
    pub reputation_program_id: String,
    pub treasury_keypair: String,
}

impl ProxyConfig {
    pub fn from_env() -> anyhow::Result<Self> {
        use std::env;
        Ok(Self {
            bind_addr: env::var("ATTENTIONPAY_BIND")
                .unwrap_or_else(|_| "0.0.0.0:3000".to_string()),
            network: env::var("ATTENTIONPAY_NETWORK")
                .unwrap_or_else(|_| "devnet".to_string()),
            rpc_url: env::var("ATTENTIONPAY_RPC")
                .unwrap_or_else(|_| "https://api.devnet.solana.com".to_string()),
            wss_url: env::var("ATTENTIONPAY_WSS")
                .unwrap_or_else(|_| "wss://api.devnet.solana.com".to_string()),
            payout_program_id: env::var("ATTENTIONPAY_PAYOUT_PROGRAM")
                .unwrap_or_else(|_| "PayPolicy111111111111111111111111111111111111".to_string()),
            ledger_program_id: env::var("ATTENTIONPAY_LEDGER_PROGRAM")
                .unwrap_or_else(|_| "AttnLedg111111111111111111111111111111111111".to_string()),
            reputation_program_id: env::var("ATTENTIONPAY_REPUTATION_PROGRAM")
                .unwrap_or_else(|_| "RepProof111111111111111111111111111111111111".to_string()),
            treasury_keypair: env::var("ATTENTIONPAY_TREASURY_KEYPAIR")
                .unwrap_or_else(|_| "~/.config/solana/id.json".to_string()),
        })
    }
}
