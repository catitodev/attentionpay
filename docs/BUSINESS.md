# Plano de Negócios — AttentionPay

## Visão

Tornar a atenção humana um ativo líquido e negociável on-chain, onde o usuário é compensado por cada segundo de engajamento real.

## Problema

O modelo atual de publicidade digital:
1. Usuário gera atenção
2. Plataforma coleta e vende
3. Anunciante paga pela "impressão"
4. Usuário recebe **$0**

**Falhas sistêmicas:**
- Métricas autodeclaradas (fraudáveis)
- Intermediários capturam 50-70% do valor
- Ad-blockers crescem 15%/ano
- Privacidade invadida para "targeting"

## Solução

**AttentionPay** — protocolo de micropagamentos por atenção verificada.

### Para Usuários
- Ganhe por scroll, click e foco real
- Controle total dos dados (zero exposure)
- Withdraw instantâneo para wallet Solana

### Para Plataformas/Publishers
- CPM 3× maior com atenção verificada on-chain
- take_rate competitivo (15% → 5% com escala)
- Anti-fraud built-in (não precisa de Moat)

### Para Anunciantes
- Métricas auditáveis (não autodeclaradas)
- Pagamento apenas por atenção real
- ReputationProof = qualidade garantida

## Modelo Econômico

### ARP (Atenção Relativa Ponderada)

| Evento | Peso | Payout base |
|--------|------|-------------|
| Scroll (100px) | 1.0× | $0.0001 |
| Click | 2.0× | $0.0002 |
| Focus (3s+) | 3.0× | $0.0003 |

**Contexto multiplicador:**
- Profundidade de scroll: 1.0-3.0×
- Horário de pico (18h-22h): 3.0×
- Recency: 1.0-3.0×

### take_rate como alavanca de mercado

```
Epoch 1-3:  15% (bootstrapping)
Epoch 4-12: 10% (crescimento)
Epoch 13+:   5% (maturidade)
```

Plataformas competem **abaixando** take_rate para atrair usuários de qualidade. Modelo inverso das app stores.

### Projeção de Receita

**Ano 1 (testnet + 3 publishers):**
- 10K usuários ativos
- 500K eventos/dia
- Receita: $50K (take_rate 15%)

**Ano 2 (mainnet + 50 publishers):**
- 500K usuários
- 50M eventos/dia
- Receita: $2.5M (take_rate 10%)

**Ano 3 (escala global):**
- 10M usuários
- 1B eventos/dia
- Receita: $50M (take_rate 5%)

## Go-to-Market

### Fase 1: Developers & Indie Publishers (0-6 meses)
- SDK open-source (npm install attentionpay)
- Integração 1-linha em blogs/static sites
- Parceria com 3 publishers indie (dev.to medium clones)

### Fase 2: Creator Economy (6-12 meses)
- Plugin WordPress
- Integração Substack/Newsletter
- Parceria com 50 creators

### Fase 3: Enterprise Publishers (12-24 meses)
- API para grandes publishers
- White-label dashboard
- Parceria com news sites regionais

## Competidores

| Projeto | Abordagem | Falha |
|---------|-----------|-------|
| Brave/BAT | Browser lock-in | Baixa adoção, token volátil |
| Coil | Streaming payments | Depende de ILP, complexo |
| Steemit | Conteúdo = tokens | Spam, qualidade baixa |
| **AttentionPay** | **Eventos reais, on-chain** | **Novo, precisa de tração** |

## Diferenciais

1. **Zero lock-in**: SDK funciona em qualquer site
2. **Verificável**: atenção provada on-chain, não autodeclarada
3. **Econômico**: Solana = única rede viável para micropagamentos
4. **Anti-Sybil**: matemática on-chain, não ML opaco
5. **Open-source**: Apache 2.0, composable

## Riscos & Mitigações

| Risco | Mitigação |
|-------|-----------|
| Baixa adoção de wallets | Integração Phantom/Backpack/Solflare |
| Volatilidade SOL | USDC SPL como asset padrão |
| Regulação | Compliance KYC apenas no withdraw |
| Spam avançado | ReputationProof + deflator + rate-limit |

## Métricas de Sucesso

- **DAU**: 10K (Y1), 500K (Y2), 10M (Y3)
- **Events/day**: 500K (Y1), 50M (Y2), 1B (Y3)
- **Avg payout/user/day**: $2-8
- **take_rate**: 15% → 5%
- **Publisher partners**: 3 (Y1), 50 (Y2), 500 (Y3)

---

*Documento vivo. Revisado em 2026-05-07.*
*Desenvolvido por catitodev.*
