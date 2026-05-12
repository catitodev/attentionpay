 //! solana_client.rs — Cliente Solana RPC via HTTP (sem solana-client crate)

use reqwest::Client;
use serde_json::{json, Value};
use anyhow::Result;

pub struct SolanaClient {
    client: Client,
    rpc_url: String,
}

impl SolanaClient {
    pub async fn new(rpc_url: &str) -> Result<Self> {
        Ok(Self {
            client: Client::new(),
            rpc_url: rpc_url.to_string(),
        })
    }

    pub async fn get_slot(&self) -> Result<u64> {
        let res = self.rpc_call("getSlot", json!([])).await?;
        Ok(res.as_u64().unwrap_or(0))
    }

    pub async fn get_balance(&self, address: &str) -> Result<u64> {
        let res = self.rpc_call("getBalance", json!([address])).await?;
        Ok(res["value"].as_u64().unwrap_or(0))
    }

    async fn rpc_call(&self, method: &str, params: Value) -> Result<Value> {
        let body = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params
        });

        let res = self.client
            .post(&self.rpc_url)
            .json(&body)
            .send()
            .await?
            .json::<Value>()
            .await?;

        Ok(res["result"].clone())
    }
}