# Documentação Técnica — AttentionPay

## Stack

| Componente | Tecnologia | Versão |
|-----------|-----------|--------|
| Smart Contracts | Anchor | 0.30.1 |
| Runtime | Solana | 1.18.0 |
| Token | SPL Token | 4.0 |
| Proxy | axum + tokio | 0.7 / 1.0 |
| SDK | TypeScript vanilla | ES2020 |
| App | Next.js + Tailwind | 14.2 |
| Testes | Mocha + ts-mocha | 10.0 |

## Contratos Anchor

### PayoutPolicy

**PDA Seeds:**
- `config`: `["config", admin_pubkey]`
- `admin_config`: `["admin_config", admin_pubkey]`
- `epoch_count`: `["epoch_count", user_pubkey, epoch_u32_le]`
- `treasury`: `["treasury", admin_pubkey]`

**Instruções:**
- `initialize(p_base, soft_cap, hard_cap, take_rate_bps)`
- `calculate_and_pay(attention_type, ctx_position, ctx_recency, ctx_hour)`
- `advance_epoch(new_take_rate_bps)`

**Fórmula ARP (on-chain):**
```rust
step1 = (p_base * w) / 1000;
step2 = (step1 * m_ctx) / 1000;
step3 = (step2 * deflator) / 1000;
payout = (step3 * (10000 - take_rate_bps)) / 10000;
```

### AttentionLedger

**PDAs:**
- `user_balance`: `["balance", user_pubkey]`

**Instruções:**
- `initialize_user()`
- `credit(amount, epoch, attention_type)` — apenas PayoutPolicy CPI
- `withdraw(amount)` — apenas owner

### ReputationProof

**PDAs:**
- `reputation`: `["reputation", user_pubkey]`
- `verifier_config`: `["verifier_config", admin_pubkey]`

**Instruções:**
- `initialize(trusted_threshold)`
- `register_commitment(epoch, event_count, total_lamports)`
- `verify_and_score(epoch)`
- `is_trusted()` — view function

## Segurança

### Anti-Sybil
- **Rate-limit**: hard_cap de 1.000 eventos/epoch
- **Deflator**: linear decay após soft_cap (100 eventos)
- **ReputationProof**: score acumulativo por epoch verificado

### Proteção do Usuário
- **take_rate imutável por epoch**: anunciado antes, contrato recusa mudanças
- **TTL automático**: epoch_count em PDAs temporários (rent exempt)
- **Zero dados brutos**: commitments hash, não eventos

## Deploy

```bash
# 1. Build
anchor build

# 2. Test
anchor test

# 3. Deploy devnet
solana config set --url devnet
solana airdrop 2
anchor deploy --provider.cluster devnet

# 4. Initialize
anchor run initialize
```

## Variáveis de Ambiente

```bash
# Proxy
ATTENTIONPAY_BIND=0.0.0.0:3000
ATTENTIONPAY_NETWORK=devnet
ATTENTIONPAY_RPC=https://api.devnet.solana.com

# Program IDs
ATTENTIONPAY_PAYOUT_PROGRAM=...
ATTENTIONPAY_LEDGER_PROGRAM=...
ATTENTIONPAY_REPUTATION_PROGRAM=...
```
