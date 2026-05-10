# AttentionPay — Plano de Negócios

**AttnPay — O protocolo que transforma atenção humana em ativo on-chain.**

---

## Visão

Tornar a atenção humana um ativo líquido e negociável on-chain, onde o usuário é compensado por cada segundo de engajamento real.

---

## O Problema Tem Nome e Número

Em 2025, a indústria de publicidade digital nos EUA faturou **US$ 294,6 bilhões** — crescimento de 13,9%, segundo o [IAB/PwC](https://www.iab.com/guidelines/internet-advertising-revenue-report/). Social media liderou com US$ 117,7B (+32,6%). Globalmente, o mercado foi estimado em **US$ 790 bilhões** em 2024, com projeção de **US$ 1,1 trilhão** até 2029 ([Statista](https://www.statista.com/statistics/236943/global-advertising-revenue/)).

O brasileiro passa **3h49 por dia** em redes sociais. O TikTok captura **43 horas por mês** de cada usuário.

**O que o usuário recebe por isso? Zero.**

O modelo atual é unidirecional: anunciante paga plataforma. O usuário é o insumo, não o beneficiário.

---

## Solução

**AttentionPay** inverte o fluxo: `anunciante → usuário, direto, via Solana`.

### Para Usuários
- Ganhe por scroll, click e foco real
- Controle total dos dados (zero exposure)
- Withdraw instantâneo para wallet Solana

### Para Plataformas/Publishers
- CPM 3× maior com atenção verificada on-chain
- take_rate competitivo (15% → 5% com escala)
- Anti-fraud built-in

### Para Anunciantes
- Métricas auditáveis (não autodeclaradas)
- Pagamento apenas por atenção real verificada
- ReputationProof = qualidade garantida

---

## A Fórmula ARP

```
payout = P_base × W_tipo × M_contexto × D(user, epoch) × (1 − take_rate)
```

| Variável | Valor |
|----------|-------|
| P_base | 700 lamports (US$ 0,0001) |
| W_tipo | scroll=1×, click=2×, focus=3× |
| M_contexto | posição + recência + horário |
| D(user, epoch) | deflator anti-Sybil |
| take_rate | 15%, imutável por epoch |

---

## Take_rate como Alavanca de Mercado

```
Epoch 1-3:   15% (bootstrapping)
Epoch 4-12:  10% (crescimento)
Epoch 13+:    5% (maturidade)
```

Plataformas competem **abaixando** take_rate para atrair usuários de qualidade. Modelo inverso das app stores — quanto mais engajados, menor o custo marginal.

---

## Por Que Plataformas Adotariam

Hoje, métricas de atenção são **autodeclaradas e não auditáveis**.

Com o **ReputationProof**, um anunciante pode verificar criptograficamente: o usuário realmente assistiu 30 segundos?

**Atenção verificada on-chain vale mais que declarada.**

A plataforma que adotar o protocolo cobra **CPM 3× maior** dos anunciantes — mesmo cedendo fatia ao usuário.

---

## Projeção de Receita

| Ano | Usuários | Eventos/dia | Receita |
|-----|----------|-------------|---------|
| 1º | 10.000 | 1M | $150K |
| 2º | 500.000 | 100M | $5M |
| 3º | 10M | 1B | $100M |

*take_rate: 15% → 10% → 5% conforme escala*

---

## Go-to-Market

### Fase 1: Developers & Indie Publishers (0-6 meses)
- SDK open-source (npm install attentionpay)
- Integração 1-linha em blogs/static sites
- Parceria com 3 publishers indie

### Fase 2: Creator Economy (6-12 meses)
- Plugin WordPress
- Integração Substack/Newsletter
- Parceria com 50 creators

### Fase 3: Enterprise Publishers (12-24 meses)
- API para grandes publishers
- White-label dashboard
- Parceria com news sites regionais

---

## Competidores

| Projeto | Abordagem | Falha |
|---------|-----------|-------|
| Brave/BAT | Browser lock-in | Baixa adoção, token volátil |
| Coil | Streaming payments | Depende de ILP, complexo |
| Steemit | Conteúdo = tokens | Spam, qualidade baixa |
| **AttnPay** | **Eventos reais, on-chain, Solana** | **Novo, precisa de tração** |

---

## Diferenciais

1. **Zero lock-in**: SDK funciona em qualquer site
2. **Verificável**: atenção provada on-chain, não autodeclarada
3. **Econômico**: Solana = única rede viável para micropagamentos <$0.001
4. **Anti-Sybil por matemática**: deflator + ReputationProof, sem ML opaco
5. **Open-source**: Apache 2.0, composable

---

## Riscos & Mitigações

| Risco | Mitigação |
|-------|-----------|
| Baixa adoção de wallets | Phantom, Solflare, Backpack |
| Volatilidade SOL | USDC SPL como asset padrão |
| Regulação | Compliance KYC apenas no withdraw |
| Spam avançado | ReputationProof + deflator + rate-limit |

---

## Métricas de Sucesso

- **DAU**: 10K (Y1), 500K (Y2), 10M (Y3)
- **Events/day**: 1M (Y1), 100M (Y2), 1B (Y3)
- **Avg payout/user/day**: $2-8
- **take_rate**: 15% → 5%
- **Publisher partners**: 3 (Y1), 50 (Y2), 500 (Y3)

---

## Referências

- [IAB/PwC Internet Advertising Revenue Report 2025](https://www.iab.com/guidelines/internet-advertising-revenue-report/)
- [Statista — Digital Advertising Revenue](https://www.statista.com/statistics/236943/global-advertising-revenue/)
- [DataReportal — Digital 2024](https://datareportal.com/)
- [McKinsey — AI in Advertising](https://www.mckinsey.com/industries/technology/our-insights)
- [Solana Docs](https://docs.solana.com/)
- [X402 Protocol](https://github.com/nicholashz/x402)

---

*Documento vivo. Revisado em 2026-05-09.*
*Desenvolvido por catitodev | Apache 2.0*