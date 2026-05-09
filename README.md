# AttentionPay

**Atenção Relativa Ponderada (ARP) — micropagamentos por atenção humana verificada on-chain.**

> 🏆 **Colosseum Frontier Hackathon 2026** — Solana Foundation

Desenvolvido por **catitodev** | Licenciado sob Apache 2.0

---

## O Problema

Hoje, plataformas digitais cobram dos anunciantes por **atenção que não é delas**. O usuário gera, a plataforma vende, o anunciante paga — e o ciclo exclui quem criou o ativo. AttentionPay inverte isso: cada evento de atenção (scroll, clique, foco) dispara um micropagamento **direto do anunciante para o usuário**, com a plataforma retendo apenas um `take_rate` de custo de distribuição.

## A Solução

A **fórmula ARP** é auditável on-chain:

```
payout(evento) = P_base × W_tipo × M_contexto × (1 - take_rate)
```

- **P_base** = preço mínimo em lamports (configurável)
- **W_tipo** = peso do evento: scroll=1.0, click=2.0, focus=3.0
- **M_contexto** = multiplicador de contexto (profundidade, recency, horário)
- **deflator D(user, epoch)** = anti-Sybil on-chain (soft_cap/hard_cap)
- **take_rate** = 15% default, imutável por epoch

## Por que Solana?

| Métrica | Solana | Ethereum L1 | Outras |
|---------|--------|-------------|--------|
| Taxa por tx | ~$0.00025 | ~$1-50 | ~$0.01-5 |
| Finalidade | ~400ms | ~12min | ~2-10s |
| TPS real | ~4,000 | ~15 | ~500 |
| Micropagamentos viáveis? | ✅ Sim | ❌ Não | ⚠️ Marginal |

**Solana é a única rede onde o custo de infraestrutura ($0.00025) não excede o pagamento em si ($0.0001+).** Isso torna ARP economicamente viável.

## Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| Smart Contracts | Anchor 0.30.1 (Rust) |
| Token | SPL Token (USDC devnet) |
| Servidor Proxy | axum + tower (Rust) |
| SDK Cliente | TypeScript vanilla |
| App Demo | Next.js + Tailwind |
| Testes | Mocha + ts-mocha |

## Estrutura do Projeto

```
attentionpay/
├── programs/              # Contratos Anchor (Rust)
│   ├── payout_policy/     # Fórmula ARP on-chain
│   ├── attention_ledger/  # Saldo + TTL + rate-limit
│   └── reputation_proof/  # Anti-Sybil BLS12-381
├── proxy/                 # Servidor HTTP axum
│   ├── src/
│   │   ├── main.rs        # Rotas axum
│   │   ├── meter.rs       # Quantificador ARP
│   │   └── x402_client.rs # Integração micropagamentos
├── sdk/
│   └── attention.ts       # SDK client-side
├── app/                   # Demo app Next.js
├── tests/                 # Testes de integração Anchor
├── docs/
│   ├── PITCH.md           # Pitch para judges
│   ├── TECHNICAL.md       # Documentação técnica
│   └── BUSINESS.md        # Plano de negócios
├── Anchor.toml
├── package.json
└── README.md
```

## Rodando Localmente

### Pré-requisitos
- Rust 1.75+ + `cargo build-bpf`
- Solana CLI 1.18+ (`solana-install init 1.18.0`)
- Anchor 0.30.1 (`avm install 0.30.1`)
- Node.js 20+

### 1. Build dos programas
```bash
anchor build
```

### 2. Testes
```bash
anchor test
```

### 3. Deploy devnet
```bash
solana config set --url devnet
solana airdrop 2
anchor deploy --provider.cluster devnet
```

### 4. Proxy
```bash
cd proxy
cargo run --release
```

### 5. App Demo
```bash
cd app
npm install
npm run dev
```

## Segurança & Anti-Sybil

- ✅ **Zero IA** no pipeline de pagamento — heurísticas determinísticas
- ✅ **Rate-limit on-chain** por epoch (Temporary accounts)
- ✅ **Deflator D(user, epoch)** — linear decay após SOFT_CAP
- ✅ **take_rate imutável por epoch** — proteção estrutural
- ✅ **Provas BLS12-381** — reputação sem expor dados brutos
- ✅ **TTL automático** — state bloat zero

## Pitch Video (3 min)

🔗 [Ver no YouTube](https://youtube.com/...)

## Demo Técnico (2-3 min)

🔗 [Ver no YouTube](https://youtube.com/...)

## Links

- 🌐 **Demo App**: https://attentionpay.vercel.app
- 🐦 **Twitter/X**: https://x.com/attentionpay
- 📄 **Documentação**: https://docs.attentionpay.io
- 💻 **GitHub**: https://github.com/catitodev/attentionpay

---

*"O número que importa não é o ganho absoluto — é o custo de infraestrutura por evento: $0.00025 no Solana."*
