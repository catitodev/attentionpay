# AttentionPay — Pitch (3 min)

**Colosseum Frontier Hackathon 2026 | Solana Foundation**

---

## Slide 1: O Problema (30s)

> "Você passa 4 horas por dia online. Quanto ganhou por isso? Zero."

Hoje, plataformas vendem sua atenção a anunciantes. Você gera, elas lucram. O ciclo exclui quem criou o ativo.

- Google: $238B em ads (2024)
- Meta: $131B em ads (2024)
- Usuário: $0

## Slide 2: A Solução (30s)

**AttentionPay** inverte o modelo. Cada evento de atenção (scroll, clique, foco) dispara um micropagamento **direto do anunciante para você**.

Fórmula ARP (Atenção Relativa Ponderada):
```
payout = P_base × W_tipo × M_contexto × (1 - take_rate)
```

- Scroll = $0.0001 | Click = $0.0002 | Focus = $0.0003
- Contexto ativo vale 3× mais que presença passiva
- Anti-Sybil on-chain: bots não ganham mais

## Slide 3: Por que Solana? (20s)

| Rede | Taxa/tx | Viável para micropagamentos? |
|------|---------|------------------------------|
| Ethereum | $1-50 | ❌ Não |
| Polygon | $0.01 | ⚠️ Marginal |
| **Solana** | **$0.00025** | ✅ **Sim** |

**Solana é a única rede onde a taxa não excede o pagamento.**

## Slide 4: Demo (60s)

[Mostrar app Next.js com wallet Phantom conectada]

1. Usuário scrolla artigo → +700 lamports
2. Clica em link → +1.400 lamports
3. Lê por 30s → +2.100 lamports
4. Dashboard mostra saldo em tempo real

## Slide 5: Arquitetura (30s)

```
User → SDK JS → Proxy axum → Anchor CPI → Solana Devnet
                        ↓
              PayoutPolicy (ARP on-chain)
              AttentionLedger (saldo + TTL)
              ReputationProof (anti-Sybil)
```

- **Zero IA** — heurísticas determinísticas
- **Zero float** — aritmética inteira u64
- **TTL automático** — state bloat zero

## Slide 6: Mercado & Traction (30s)

**TAM**: $600B (digital advertising, 2025)
**SAM**: $150B (programmatic display + native)
**SOM**: $500M (early adopters: creators, publishers indie)

**Modelo de receita**: take_rate de 15% → competição reduz para 5%

**Adoção por plataformas**: métricas de atenção verificada on-chain = CPM 3× maior

## Slide 7: Equipe & Próximos Passos (20s)

**catitodev** — Rust, Solana, sistemas distribuídos

Próximos 90 dias:
1. Deploy mainnet
2. Parcerias com 3 publishers indie
3. Integração Phantom + Backpack
4. ReputationProof com BLS12-381

---

**"Atenção é o ativo mais valioso do século 21. É hora de você ser pago por ele."**
