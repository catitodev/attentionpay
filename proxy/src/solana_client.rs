//! solana_client.rs — Cliente Solana RPC para AttentionPay
//!
//! Abstrai chamadas RPC para interagir com programas Anchor.
//!
//! Desenvolvido por catitodev. Licenciado sob Apache 2.0.

use solana_client::rpc_client::RpcClient;
use solana_sdk::{commitment_config::CommitmentConfig, pubkey::Pubkey};
use std::str::FromStr;

pub struct SolanaClient {
    rpc: RpcClient,
}

impl SolanaClient {
    pub async fn new(rpc_url: &str) -> anyhow::Result<Self> {
        let rpc = RpcClient::new_with_commitment(
            rpc_url.to_string(),
            CommitmentConfig::confirmed(),
        );
        Ok(Self { rpc })
    }

    pub async fn get_slot(&self) -> anyhow::Result<u64> {
        Ok(self.rpc.get_slot()?)
    }

    pub async fn get_balance(&self, address: &str) -> anyhow::Result<u64> {
        let pubkey = Pubkey::from_str(address)?;
        Ok(self.rpc.get_balance(&pubkey)?)
    }

    pub async fn get_program_accounts(&self, program_id: &str) -> anyhow::Result<Vec<(Pubkey, solana_client::rpc_client::UiAccount)>> {
        let program_pubkey = Pubkey::from_str(program_id)?;
        Ok(self.rpc.get_program_accounts(&program_pubkey)?)
    }
}
