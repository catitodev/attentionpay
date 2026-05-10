# AttentionPay

**AttnPay — The protocol that turns human attention into an on-chain asset.**

> 🏆 **Colosseum Frontier Hackathon 2026** — Solana Foundation

---

## The Problem Has a Name and a Number

In 2025, the US digital advertising industry generated **$294.6 billion** — 13.9% growth, according to the [IAB/PwC Internet Advertising Revenue Report](https://www.iab.com/guidelines/internet-advertising-revenue-report/). Social media led with $117.7B (+32.6%). Search took $114.2B. Digital video jumped 25.4% to $78B. Globally, the market was estimated at **$790 billion** in 2024, projected to exceed **$1.1 trillion** by 2029 ([Statista](https://www.statista.com/statistics/236943/global-advertising-revenue/)).

All that money comes from one single asset: **human attention**.

Brazilian users spend an average of **3h49 per day** on social media. Global average: **2h21**. TikTok captures **43 hours per month** from each US Android user. YouTube: **28h05 per month**. These are foreground device hours — real attention, at industrial scale.

**What does the user get for this? Zero.**

Not a single cent. None of the IAB, Statista, or DataReportal reports mention direct compensation for attention time. The model is unidirectional: advertiser pays platform. User is the input, not the beneficiary.

The IAB itself states: structural platform advantages come from "deeper first-party data, integrated commerce ecosystems, proprietary measurement infrastructure." At no point does the user appear as a financial beneficiary. The phrase that sums it up: **"where ad dollars are spent" — not "where ad dollars are shared."**

Money flows to whoever has the measurement infrastructure. Not to whoever generated the attention being sold.

---

## Why This Moment Is Historic

2025 growth happened **without external catalysts**. No Olympics. No World Cup. No US elections. Growth was structural, not cyclical.

McKinsey projects AI will increase targeting efficiency by **30 to 40%**. That means platforms will sell user attention even better in coming years — without the user participating in the value creation.

**This is the context where AttentionPay was born.** Not as an emotional reaction to perceived injustice, but as a technical response to a documented and growing economic asymmetry.

---

## What AttentionPay Does

The protocol inverts the flow. Instead of: `user → platform → advertiser → platform`, AttentionPay establishes:

```
advertiser → user, direct, via Solana
```

The platform retains only a `take_rate` as distribution cost — not as core profit.

### The ARP Formula

```
payout = P_base × W_tipo × M_contexto × D(user, epoch) × (1 − take_rate)
```

| Variable | Definition |
|----------|------------|
| **P_base** | Base price: 700 lamports ($0.0001) |
| **W_tipo** | scroll=1×, click=2×, 30s focus=3× |
| **M_contexto** | position + recency + peak hours |
| **D(user, epoch)** | anti-Sybil deflator: linear from 1.0 (100 events) to 0 (1,000 events) |
| **take_rate** | 15%, announced before epoch, immutable during |

The deflator makes volume fraud **economically unviable** without any machine learning model. The immutable `take_rate` per epoch is on-chain math — the contract rejects any update.

**For the average user with 4h of active attention per day, projected earnings are $2 to $8 per day.** Not income replacement. But for the 4 billion people who spend that time online receiving absolutely nothing, any positive value is infinitely better than zero.

---

## Why Solana

The choice is not arbitrary — it's the only one that closes mathematically.

| Metric | Solana | Ethereum L1 | others |
|--------|--------|-------------|--------|
| Tx fee | ~$0.00025 | ~$1-50 | ~$0.01-5 |
| Finality | ~400ms | ~12min | ~2-10s |
| Real TPS | ~4,000 | ~15 | ~500 |
| Micropayments viable? | ✅ Yes | ❌ No | ⚠️ Marginal |

On Ethereum, a $0.0001 micropayment costs a thousand times more than the payment itself. On Solana, the fee represents a quarter of the event value.

---

## Why Platforms Would Adopt

The question that breaks 99% of "empower the user" projects is: **why would platforms join?**

The answer is not altruism. It's structural.

Today, attention metrics are self-reported and non-auditable. A banner impression proves nothing. With AttentionPay's **ReputationProof**, an advertiser can cryptographically verify that a user actually watched that content for 30 seconds.

**On-chain verified attention is worth more than reported attention.**

The platform that adopts the protocol charges **3× higher CPM** from advertisers — even while sharing a slice with users. The platform doesn't lose. It differentiates.

The `take_rate` works as a market lever: platforms compete by lowering the rate to attract quality users. Here, the more engaged users, the lower the marginal cost of verified attention — and the lower the rate needed for the platform to sustain itself.

---

## The Three Principles

1. **Zero AI in the payment pipeline.** All logic is deterministic, mathematical, verifiable. The contract executes the formula. No model decides who gets paid.

2. **Real privacy by design.** No screenshots, no screencasts, no visual capture. What leaves the device is only the event hash — SHA-256 of type, timestamp, duration, app_id, and user public key — plus the locally calculated attention score and user signature. Raw data never leaves the device.

3. **Anti-Sybil via on-chain math.** The deflator and ReputationProof make volume attacks economically unviable without any black box.

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Smart Contracts | Anchor 0.30.1 (Rust) |
| Payments | X402 Protocol (Solana) |
| Token | SPL Token (USDC devnet) + $ATTN (roadmap) |
| Proxy Server | axum + tokio (Rust) |
| Client SDK | TypeScript |
| Demo App | Next.js |
| Wallets | Phantom, Solflare, Backpack |

### Anchor Programs

- **PayoutPolicy**: executes ARP formula with exclusive integer arithmetic — zero floating point
- **AttentionLedger**: registers balance with automatic TTL per epoch
- **ReputationProof**: generates anti-Sybil score via hash commitments

### Project Structure

```
attentionpay/
├── app/                   # Next.js frontend (Vercel)
├── solana/
│   ├── programs/          # Rust contracts
│   │   ├── payout_policy/
│   │   ├── attention_ledger/
│   │   └── reputation_proof/
│   └── proxy/             # HTTP server axum + X402
├── sdk/                   # TypeScript SDK
└── README.md
```

---

## Running Locally

### Prerequisites
- Rust 1.75+ + `cargo build-bpf`
- Solana CLI 1.18+ (`solana-install init 1.18.0`)
- Anchor 0.30.1 (`avm install 0.30.1`)
- Node.js 20+

### Build & Tests
```bash
anchor build && anchor test
```

### Devnet Deploy
```bash
solana config set --url devnet
solana airdrop 2
anchor deploy --provider.cluster devnet
```

### Proxy
```bash
cd proxy && cargo run --release
```

### Demo App
```bash
cd app && npm install && npm run dev
```

---

## Security

- ✅ **Zero AI** — deterministic heuristics, no ML
- ✅ **X402 payments** — on-chain verified before access release
- ✅ **Deflator D(user, epoch)** — linear decay, volume fraud unviable
- ✅ **take_rate immutable per epoch** — structural protection
- ✅ **Automatic TTL** — zero state bloat
- ✅ **Privacy by design** — only event hash leaves the device

---

## Roadmap

| Timeline | Deliverable |
|----------|-------------|
| 30 days | Attention Oracle Network with staking and slashing |
| 90 days | Mobile companion app (OS Usage Stats APIs, no content capture) |
| 6 months | Browser extension (Chrome, Firefox, Safari) |
| 12 months | Mainnet deploy + publisher partnerships |

| Year | Users | Events/day |
|------|-------|------------|
| 1st | 10,000 | 1M |
| 2nd | 500,000 | 100M |
| 3rd | 10M | 1B |

`take_rate` drops from 15% to 5% as scale reduces marginal cost.

---

## References

- [IAB/PwC Internet Advertising Revenue Report 2025](https://www.iab.com/guidelines/internet-advertising-revenue-report/)
- [Statista — Digital Advertising Revenue](https://www.statista.com/statistics/236943/global-advertising-revenue/)
- [DataReportal — Digital 2024](https://datareportal.com/)
- [McKinsey — AI in Advertising](https://www.mckinsey.com/industries/technology/our-insights)
- [Solana Docs](https://docs.solana.com/)
- [X402 Protocol](https://github.com/nicholashz/x402)

---

## Links

- 🌐 **Demo**: https://attentionpay.vercel.app
- 💻 **GitHub**: https://github.com/catitodev/attentionpay

---

*"The digital attention market is worth $790 billion globally. The user who generated that market receives zero. This is not a market failure awaiting regulation. It's a structural asymmetry that only a protocol can solve — because protocols don't ask for permission. They just work."*