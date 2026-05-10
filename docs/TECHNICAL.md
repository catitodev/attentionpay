# AttentionPay — Documentação Técnica

**Stack atual para o Frontier Hackathon 2026.**

---

## Stack

| Componente | Tecnologia | Versão |
|-----------|-----------|--------|
| Smart Contracts | Anchor | 0.30.1 |
| Runtime | Solana | 1.18.0 |
| Token | SPL Token | 4.0 |
| Proxy | axum + tokio | 0.7 / 1.0 |
| SDK | TypeScript | ES2020 |
| App | Next.js | 14.2 |
| Testes | Mocha + ts-mocha | 10.0 |

---

## Contratos Anchor

### PayoutPolicy

Executa a fórmula ARP com aritmética **inteira exclusiva** — zero ponto flutuante. Float em WASM é custoso e não-determinístico entre arquiteturas.

**PDA Seeds:**
- `config`: `["config", admin_pubkey]`
- `admin_config`: `["admin_config", admin_pubkey]`
- `epoch_count`: `["epoch_count", user_pubkey, epoch_u32_le]`
- `treasury`: `["treasury", admin_pubkey]`

**Instruções:**
- `initialize(p_base, soft_cap, hard_cap, take_rate_bps)`
- `calculate_and_pay(attention_type, ctx_position, ctx_recency, ctx_hour)`
- `advance_epoch(new_take_rate_bps)`

**Fórmula ARP on-chain:**
```rust
step1 = (p_base * w) / 1000;
step2 = (step1 * m_ctx) / 1000;
step3 = (step2 * deflator) / 1000;
payout = (step3 * (10000 - take_rate_bps)) / 10000;
```

| Variável | Definição |
|----------|-----------|
| p_base | 700 lamports (US$ 0,0001) |
| w | scroll=1, click=2, focus=3 |
| m_ctx | 1000 (base, expandido por contexto) |
| deflator | 1000 → 0 após soft_cap (100) até hard_cap (1000) |
| take_rate_bps | 1500 (15%), imutável por epoch |

### AttentionLedger

Registra saldo do usuário com **TTL automático** por epoch.

**PDAs:**
- `user_balance`: `["balance", user_pubkey]`

**Instruções:**
- `initialize_user()`
- `credit(amount, epoch, attention_type)` — apenas PayoutPolicy CPI
- `withdraw(amount)` — apenas owner

### ReputationProof

Gera score anti-Sybil via commitments hash. Verifica criptograficamente que o usuário realmente gerou atenção.

**PDAs:**
- `reputation`: `["reputation", user_pubkey]`
- `verifier_config`: `["verifier_config", admin_pubkey]`

**Instruções:**
- `initialize(trusted_threshold)`
- `register_commitment(epoch, event_count, total_lamports)`
- `verify_and_score(epoch)`
- `is_trusted()` — view function

---

## Arquitetura

```
User → SDK TypeScript → Proxy axum (X402) → Solana Devnet
                         │
                    Anchor CPI
                    ├── PayoutPolicy (ARP on-chain)
                    ├── AttentionLedger (saldo + TTL)
                    └── ReputationProof (anti-Sybil)
```

---

## Segurança

### Anti-Sybil
- **Rate-limit**: hard_cap de 1.000 eventos/epoch
- **Deflator**: linear decay após soft_cap (100 eventos)
- **ReputationProof**: score acumulativo por epoch verificado on-chain

### Proteção do Usuário
- **take_rate imutável por epoch**: anunciado antes, contrato recusa mudanças
- **TTL automático**: epoch_count em PDAs temporários (rent exempt)
- **Zero dados brutos**: commitments hash, não eventos originais

### Privacidade
- SHA-256 de tipo, timestamp, duração, app_id e chave pública
- Score de atenção calculado localmente
- Assinatura do usuário
- **Dados brutos nunca saem do dispositivo**

---

## X402 Micropayments

O protocolo **X402 (HTTP 402 Payment Required)** permite micropagamentos automáticos em requests HTTP.

### Flow

```
Client                    Proxy                    Blockchain
  │                         │                         │
  ├──── GET /api/premium ──>│                         │
  │<─── 402 Payment Required │ (com payment_url)      │
  │                         │                         │
  │ (Client paga via       │                         │
  │  wallet Solana)        │                         │
  │                         │                         │
  ├─ POST verify (tx_sig)->│                         │
  │<─── 200 OK (data) ─────│                         │
```

### Payment URL Format
```
solana:<recipient>?amount=<lamports>&token=<SOL|USDC>
```

---

## Por Que Inteiros, Não Float

O contrato executa em Solana BPF (Berkeley Packet Filter), que emula WASM. Float em WASM:
1. Custo de gas mais alto
2. Não-determinístico entre arquiteturas (x86 vs ARM vs MIPS)
3. Resultados podem variar entre máquinas diferentes

Para um sistema financeiro, determinismo é mandatório. Todos os cálculos usam `u64` com casas decimais fixas (1000 = 1.0).

---

## Deploy

### Devnet
```bash
# Build
anchor build

# Test
anchor test

# Deploy
solana config set --url devnet
solana airdrop 2
anchor deploy --provider.cluster devnet

# Initialize
anchor run initialize
```

### Variáveis de Ambiente
```bash
ATTENTIONPAY_BIND=0.0.0.0:3000
ATTENTIONPAY_NETWORK=devnet
ATTENTIONPAY_RPC=https://api.devnet.solana.com
ATTENTIONPAY_PAYOUT_PROGRAM=...
ATTENTIONPAY_LEDGER_PROGRAM=...
ATTENTIONPAY_REPUTATION_PROGRAM=...
```

---

## Referências

- [Solana Docs](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [X402 Protocol](https://github.com/nicholashz/x402)
- [IAB/PwC Internet Advertising Revenue Report](https://www.iab.com/guidelines/internet-advertising-revenue-report/)

---

*2.164 linhas de código e documentação | Apache 2.0*