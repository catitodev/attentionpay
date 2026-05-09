# Changelog — AttentionPay

## [1.0.0] — 2026-05-07

### Adicionado
- 3 programas Anchor: PayoutPolicy, AttentionLedger, ReputationProof
- Fórmula ARP on-chain com deflator anti-Sybil
- Proxy axum com integração Solana RPC
- SDK TypeScript client-side
- App demo Next.js com wallet adapter
- Documentação completa (Pitch, Técnico, Negócios)
- Testes de integração Mocha/TypeScript

### Mudanças
- Migrado de Stellar/Soroban para Solana/Anchor
- P_base em lamports (700 = ~$0.0001)
- SPL Token para transferências
- PDAs para state management

### Segurança
- Rate-limit on-chain por epoch
- take_rate imutável por epoch
- Zero IA no pipeline
- Commitments hash para privacidade
