//! X402 Payment Client — HTTP 402 (Payment Required) Implementation
//!
//! Implementa o protocolo X402 para micropagamentos automáticos via Solana.
//! Cada request HTTP pode exigir pagamento antes de servir o conteúdo.
//!
//! Ref: https://www.x402.org/
//! Ref: https://solana.com/pt/x402/what-is-x402

use serde::{Deserialize, Serialize};

/// Header X402: indica que o endpoint requer pagamento
pub const X402_HEADER_NAME: &str = "X-402-Required";

/// Header com details do pagamento
pub const X402_HEADER_DETAILS: &str = "X-402-Details";

/// Valor mínimo para considerar válido (em lamports)
pub const MIN_PAYMENT_LAMPORTS: u64 = 1_000; // 0.000001 SOL

/// Token padrão: SOL (mint = None) ou USDC
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PaymentToken {
    SOL,
    USDC, // EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
}

impl Default for PaymentToken {
    fn default() -> Self {
        Self::SOL
    }
}

/// Requisição de pagamento X402
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct X402PaymentRequest {
    /// Endereço do recipient (PDA do protocolo)
    pub recipient: String,
    /// Amount em lamports (SOL) ou最小 units (USDC)
    pub amount: u64,
    /// Token de pagamento
    pub token: PaymentToken,
    /// Descrição do serviço
    pub description: String,
    /// Identificador único da payment request
    pub idempotency_key: String,
}

/// Resposta com detalhes para o cliente pagar
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct X402PaymentDetails {
    /// Endereço para pagamento
    pub recipient: String,
    /// Amount requerido
    pub amount: u64,
    /// Token
    pub token: String,
    /// Memo/instrução
    pub description: String,
    /// URL para completar pagamento
    pub payment_url: String,
}

/// Receipt do pagamento (após confirmação on-chain)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct X402Receipt {
    /// Transaction signature
    pub tx_signature: String,
    /// Amount pago
    pub amount: u64,
    /// Token usado
    pub token: String,
    /// Slot da confirmação
    pub slot: u64,
    /// Timestamp
    pub timestamp: i64,
    /// Status
    pub status: PaymentStatus,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum PaymentStatus {
    Pending,
    Confirmed,
    Failed,
}

impl std::fmt::Display for PaymentStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PaymentStatus::Pending => write!(f, "pending"),
            PaymentStatus::Confirmed => write!(f, "confirmed"),
            PaymentStatus::Failed => write!(f, "failed"),
        }
    }
}

/// Builder para criar payment requests
pub struct X402PaymentBuilder {
    recipient: Option<String>,
    amount: u64,
    token: PaymentToken,
    description: String,
    idempotency_key: String,
}

impl X402PaymentBuilder {
    pub fn new(service_name: &str) -> Self {
        Self {
            recipient: None,
            amount: 0,
            token: PaymentToken::default(),
            description: format!("AttentionPay: {}", service_name),
            idempotency_key: uuid::Uuid::new_v4().to_string(),
        }
    }

    pub fn recipient(mut self, addr: &str) -> Self {
        self.recipient = Some(addr.to_string());
        self
    }

    pub fn amount(mut self, lamports: u64) -> Self {
        self.amount = lamports;
        self
    }

    pub fn token(mut self, token: PaymentToken) -> Self {
        self.token = token;
        self
    }

    pub fn build(self) -> X402PaymentRequest {
        X402PaymentRequest {
            recipient: self.recipient.unwrap_or_else(|| "unknown".to_string()),
            amount: self.amount,
            token: self.token,
            description: self.description,
            idempotency_key: self.idempotency_key,
        }
    }
}

/// Gera URL de pagamento para o cliente
pub fn generate_payment_url(
    recipient: &str,
    amount: u64,
    token: &str,
) -> String {
    format!(
        "solana:{}?amount={}&token={}",
        recipient, amount, token
    )
}

/// Valida se o payment request é válido
pub fn validate_payment_request(req: &X402PaymentRequest) -> Result<(), &'static str> {
    if req.amount < MIN_PAYMENT_LAMPORTS {
        return Err("Amount below minimum threshold");
    }
    
    // Validar Pubkey do recipient
    if req.recipient.len() < 32 || req.recipient.len() > 44 {
        return Err("Invalid recipient address");
    }
    
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_payment_builder() {
        let req = X402PaymentBuilder::new("api_access")
            .recipient("PayPolicyDEV1111111111111111111111111111111111")
            .amount(10_000)
            .build();
        
        assert_eq!(req.amount, 10_000);
        assert!(req.recipient.len() > 30);
    }

    #[test]
    fn test_payment_url() {
        let url = generate_payment_url("Test111111111111111111111111111111111111", 1000, "SOL");
        assert!(url.contains("amount=1000"));
    }
}