//! meter.rs — Quantificador ARP para Solana (lamports)
//!
//! Desenvolvido por catitodev. Licenciado sob Apache 2.0.

/// Tipos de evento de atenção
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum AttentionEvent {
    Scroll { depth: u32, pixels: u32 },
    Click { element: String },
    Focus { duration_sec: u32 },
}

/// Medidor de atenção com heurísticas determinísticas
pub struct AttentionMeter {
    p_base: u64,
    w_scroll: u64,
    w_click: u64,
    w_focus: u64,
    weight_denom: u64,
    ctx_denom: u64,
    max_ctx: u64,
}

impl AttentionMeter {
    pub fn new() -> Self {
        Self {
            p_base: 700,        // ~$0.0001 com SOL a $140
            w_scroll: 1_000,    // 1.0
            w_click: 2_000,     // 2.0
            w_focus: 3_000,     // 3.0
            weight_denom: 1_000,
            ctx_denom: 1_000,
            max_ctx: 3_000,
        }
    }

    pub fn qualify(&self, event: &AttentionEvent) -> bool {
        match event {
            AttentionEvent::Scroll { pixels, .. } => *pixels >= 100,
            AttentionEvent::Click { .. } => true,
            AttentionEvent::Focus { duration_sec } => *duration_sec >= 3,
        }
    }

    pub fn calculate(
        &self,
        event: &AttentionEvent,
        ctx_position: u32,
        ctx_recency: u32,
        ctx_hour: u32,
    ) -> u64 {
        let w = match event {
            AttentionEvent::Scroll { .. } => self.w_scroll,
            AttentionEvent::Click { .. } => self.w_click,
            AttentionEvent::Focus { .. } => self.w_focus,
        };

        let m_position = (ctx_position as u64).min(self.max_ctx);
        let m_recency = (ctx_recency as u64).min(self.max_ctx);
        let m_hour = if ctx_hour >= 18 && ctx_hour <= 22 {
            self.max_ctx
        } else {
            self.ctx_denom
        };
        let m_ctx = (m_position + m_recency + m_hour) / 3;

        let step1 = (self.p_base * w) / self.weight_denom;
        let step2 = (step1 * m_ctx) / self.ctx_denom;

        step2
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_scroll_payout() {
        let meter = AttentionMeter::new();
        let event = AttentionEvent::Scroll { depth: 500, pixels: 150 };
        let payout = meter.calculate(&event, 500, 300, 14);
        assert_eq!(payout, 420);
    }

    #[test]
    fn test_click_peak() {
        let meter = AttentionMeter::new();
        let event = AttentionEvent::Click { element: "button".to_string() };
        let payout = meter.calculate(&event, 800, 600, 20);
        assert!(payout > 1_700);
    }

    #[test]
    fn test_focus() {
        let meter = AttentionMeter::new();
        let event = AttentionEvent::Focus { duration_sec: 5 };
        let payout = meter.calculate(&event, 1000, 900, 19);
        assert!(payout > 3_000);
    }
}
