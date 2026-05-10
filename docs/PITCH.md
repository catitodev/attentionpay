# AttentionPay — Pitch (3 min)

**Colosseum Frontier Hackathon 2026 | Solana Foundation**

---

## Slide 1: O Problema Tem Nome e Número (30s)

> "Em 2025, a indústria de publicidade digital nos EUA faturou US$ 294,6 bilhões. Crescimento de 13,9%. Sem catalisadores externos — foi estrutural."

- Social media: US$ 117,7B (+32,6%)
- Search: US$ 114,2B
- Digital video: US$ 78B (+25,4%)
- Global: US$ 790B (projeção US$ 1,1T em 2029)

**Tudo isso vem de um único ativo: atenção humana.**

O brasileiro passa **3h49 por dia** em redes sociais. O TikTok captura **43 horas por mês** de cada usuário.

**O que o usuário recebe por isso? Zero.**

Nenhum centavo. Nenhum relatório do IAB menciona compensação direta.

---

## Slide 2: A Solução (30s)

**AttnPay** inverte o modelo. Cada evento de atenção (scroll, clique, foco) dispara micropagamento direto do anunciante para o usuário.

**Fórmula ARP (Atenção Relativa Ponderada):**
```
payout = P_base × W_tipo × M_contexto × D(user, epoch) × (1 − take_rate)
```

- P_base: 700 lamports (US$ 0,0001)
- Scroll = 1× | Click = 2× | 30s focus = 3×
- Deflator anti-Sybil: linear de 1.0 até 0 após 100-1.000 eventos
- take_rate: 15%, imutável por epoch

**Resultado projetado: US$ 2-8/dia para usuário com 4h de atenção ativa.**

---

## Slide 3: Por Que Solana? (20s)

| Rede | Taxa/tx | Viável? |
|------|---------|---------|
| Ethereum | $1-50 | ❌ Micropagamento custa mais que o próprio valor |
| Polygon | $0.01 | ⚠️ Marginal |
| **Solana** | **$0.00025** | ✅ **Taxa = 1/4 do pagamento** |

Finalidade: 400ms. TPS: 4.000. É a única rede onde a matemática fecha.

---

## Slide 4: Demo (60s)

[Mostrar app com wallet Phantom/Solflare conectada]

1. Scroll artigo → +700 lamports
2. Clica em link → +1.400 lamports
3. Lê por 30s → +2.100 lamports
4. Dashboard mostra saldo, eventos e ganho em tempo real

---

## Slide 5: Arquitetura (30s)

```
User → SDK TypeScript → Proxy axum (X402) → Solana Devnet
                         │
                    Anchor CPI
                    ├── PayoutPolicy (ARP on-chain, u64 only)
                    ├── AttentionLedger (saldo + TTL automático)
                    └── ReputationProof (score anti-Sybil via hash)
```

- **Zero IA** — heurísticas determinísticas, nenhum modelo
- **Zero float** — aritmética inteira u64, determinismo entre arquiteturas WASM
- **Privacidade real** — só hash do evento sai do dispositivo
- **Anti-Sybil por matemática** — não por análise comportamental

---

## Slide 6: Por Que Plataformas Adotariam (30s)

Hoje, métricas de atenção são **autodeclaradas e não auditáveis**.

Com o **ReputationProof**, um anunciante pode verificar criptograficamente: o usuário realmente assistiu 30 segundos?

**Atenção verificada on-chain vale mais que declarada.**

Plataforma que adotar o protocolo cobra **CPM 3× maior** dos anunciantes — mesmo cedendo fatia ao usuário.

O `take_rate` funciona como alavanca: plataformas competem abaixando a taxa para atrair usuários de qualidade. Quanto mais engajados, menor o custo marginal.

---

## Slide 7: Mercado & Traction (30s)

**TAM**: US$ 790B (digital advertising global, 2024)
**SAM**: US$ 150B (programmatic display + native)
**SOM**: US$ 500M (early adopters: creators, publishers indie)

**Take_rate**: 15% → competição reduz para 5% em escala.

---

## Slide 8: Próximos Passos (20s)

| Prazo | Entrega |
|-------|---------|
| 30 dias | Attention Oracle Network (staking + slashing) |
| 90 dias | App mobile companion (Usage Stats API, sem captura de conteúdo) |
| 6 meses | Extensão navegador (Chrome, Firefox, Safari) |
| 12 meses | Deploy mainnet + parcerias com publishers |

---

## Referências

- [IAB/PwC Internet Advertising Revenue Report 2025](https://www.iab.com/guidelines/internet-advertising-revenue-report/)
- [Statista — Digital Advertising Revenue](https://www.statista.com/statistics/236943/global-advertising-revenue/)
- [DataReportal — Digital 2024](https://datareportal.com/)
- [McKinsey — AI in Advertising](https://www.mckinsey.com/industries/technology/our-insights)
- [Solana Docs](https://docs.solana.com/)
- [X402 Protocol](https://github.com/nicholashz/x402)

---

*"O mercado de atenção digital vale US$ 790 bilhões globais. O usuário que gerou esse mercado recebe zero. Isso não é uma falha de mercado aguardando regulação. É uma assimetria estrutural que só um protocolo resolve."*