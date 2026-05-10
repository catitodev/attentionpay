# AttentionPay

**AttnPay — O protocolo que transforma atenção humana em ativo on-chain.**

> 🏆 **Colosseum Frontier Hackathon 2026** — Solana Foundation

---

## O Problema Tem Nome e Número

Em 2025, a indústria de publicidade digital nos EUA faturou **US$ 294,6 bilhões** — crescimento de 13,9%, segundo o [IAB/PwC Internet Advertising Revenue Report](https://www.iab.com/guidelines/internet-advertising-revenue-report/). Social media liderou com US$ 117,7B (+32,6%). Search ficou com US$ 114,2B. Digital video saltou 25,4% para US$ 78B. Globalmente, o mercado foi estimado em **US$ 790 bilhões** em 2024, com projeção de ultrapassar **US$ 1,1 trilhão** até 2029 ([Statista](https://www.statista.com/statistics/236943/global-advertising-revenue/)).

Esse dinheiro todo vem de um único ativo: **atenção humana**.

O brasileiro passa em média **3h49 por dia** em redes sociais. O usuário global médio: **2h21**. O TikTok captura **43 horas por mês** de cada usuário Android nos EUA. O YouTube: **28h05 por mês**. São números medidos em foreground de dispositivo — atenção real, em escala industrial.

**O que o usuário recebe por isso? Zero.**

Nenhum centavo. Nenhum dos relatórios do IAB, Statista ou DataReportal menciona compensação direta ao usuário por tempo de atenção. O modelo é unidirecional: anunciante paga plataforma. O usuário é o insumo, não o beneficiário.

O próprio IAB deixa explícito: as vantagens estruturais vêm de "dados first-party mais profundos, ecossistemas de comércio integrados, infraestrutura proprietária de mensuração". Em nenhum momento aparece o usuário como beneficiário do fluxo financeiro. A frase que resume: **"where ad dollars are spent" — não "where ad dollars are shared"**.

O dinheiro flui para quem tem a infraestrutura de mensuração. Não para quem gerou a atenção.

---

## Por Que Esse Momento É Histórico

O crescimento de 2025 aconteceu **sem catalisadores externos**. Não houve Olimpíadas. Não houve Copa do Mundo. Não houve eleições nos EUA. O crescimento foi estrutural, não cíclico.

A McKinsey projeta que inteligência artificial aumentará a eficiência de targeting em **30 a 40%**. Isso significa que as plataformas venderão a atenção do usuário ainda melhor — sem que o usuário participe da valorização.

**Esse é o contexto em que o AttentionPay nasce.** Não como reação emocional a uma injustiça percebida, mas como resposta técnica a uma assimetria econômica documentada e crescente.

---

## O Que o AttentionPay Faz

O protocolo inverte o fluxo. Em vez do ciclo: `usuário → plataforma → anunciante → plataforma`, o AttentionPay estabelece:

```
anunciante → usuário, direto, via Solana
```

A plataforma retém apenas um `take_rate` de custo de distribuição — não como lucro central.

### A Fórmula ARP

```
payout = P_base × W_tipo × M_contexto × D(user, epoch) × (1 − take_rate)
```

| Variável | Definição |
|----------|-----------|
| **P_base** | Preço base: 700 lamports (US$ 0,0001) |
| **W_tipo** | scroll=1×, click=2×, 30s focus=3× |
| **M_contexto** | posição + recência + horário de pico |
| **D(user, epoch)** | deflator anti-Sybil: linear de 1.0 (100 eventos) até 0 (1.000 eventos) |
| **take_rate** | 15%, anunciado antes do epoch, imutável durante |

O deflator torna fraude por volume **economicamente inviável** sem nenhum modelo de machine learning. O `take_rate` imutável por epoch é matemática on-chain — o contrato recusa qualquer atualização.

**Para o usuário médio com 4h de atenção ativa por dia, o ganho projetado é de US$ 2 a US$ 8 por dia.** Não substitui renda. Mas para os 4 bilhões de pessoas que passam esse tempo online sem receber absolutamente nada, qualquer valor positivo é infinitamente melhor que zero.

---

## Por Que Solana

A escolha não é arbitrária — é a única que fecha matematicamente.

| Métrica | Solana | Ethereum L1 | others |
|---------|--------|-------------|--------|
| Taxa por tx | ~$0.00025 | ~$1-50 | ~$0.01-5 |
| Finalidade | ~400ms | ~12min | ~2-10s |
| TPS real | ~4.000 | ~15 | ~500 |
| Micropagamentos viáveis? | ✅ Sim | ❌ Não | ⚠️ Marginal |

No Ethereum, um micropagamento de US$ 0,0001 custa mil vezes mais do que o pagamento em si. Na Solana, a taxa representa um quarto do valor do evento.

---

## Por Que as Plataformas Adotariam

A pergunta que derruba 99% dos projetos de "empoderar o usuário" é: **por que as plataformas entrariam?**

A resposta não é altruísmo. É estrutural.

Hoje, métricas de atenção são **autodeclaradas e não auditáveis**. Uma impressão de banner não prova nada. Com o **ReputationProof** do AttentionPay, um anunciante pode verificar criptograficamente: o usuário realmente assistiu àquele conteúdo por 30 segundos?

**Atenção verificada on-chain vale mais do que atenção declarada.**

A plataforma que adotar o protocolo passa a cobrar **CPM maior dos anunciantes** — até 3×, mesmo cedendo uma fatia ao usuário. A plataforma não perde. Ela se diferencia.

O `take_rate` funciona como alavanca de mercado: plataformas competem abaixando a taxa para atrair usuários de qualidade. Aqui, quanto mais usuários engajados, menor o custo marginal de atenção verificada.

---

## Os Três Princípios

1. **Zero IA no pipeline de pagamento.** Toda a lógica é determinística, matemática, verificável. O contrato executa a fórmula. Nenhum modelo decide quem recebe.

2. **Privacidade real por design.** Nenhum screenshot, nenhum screencast. O que sai do dispositivo é apenas o hash do evento — SHA-256 de tipo, timestamp, duração, app_id e chave pública — mais o score e a assinatura. Dados brutos nunca saem do dispositivo.

3. **Anti-Sybil por matemática on-chain.** O deflator e o ReputationProof tornam ataque por volume economicamente inviável sem nenhuma caixa-preta.

> **Nota sobre X402:** O protocolo X402 (HTTP 402 Payment Required) é um padrão de micropagamentos HTTP — **não é IA**. É a infraestrutura que permite que cada request exija pagamento antes de servir conteúdo. A fórmula ARP que governa os pagamentos usa **matemática determinística** — zero modelos de machine learning.

---

## Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| Smart Contracts | Anchor 0.30.1 (Rust) |
| Payments | X402 Protocol (Solana) |
| Token | SPL Token (USDC devnet) + $ATTN (roadmap) |
| Servidor Proxy | axum + tokio (Rust) |
| SDK Cliente | TypeScript |
| App Demo | Next.js |
| Wallets | Phantom, Solflare, Backpack |

### Programas Anchor

- **PayoutPolicy**: executa a fórmula ARP com aritmética inteira exclusiva — zero ponto flutuante
- **AttentionLedger**: registra saldo com TTL automático por epoch
- **ReputationProof**: gera score anti-Sybil via commitments hash

### Estrutura do Projeto

```
attentionpay/
├── app/                   # Next.js frontend (Vercel)
├── solana/
│   ├── programs/          # Contratos Rust
│   │   ├── payout_policy/
│   │   ├── attention_ledger/
│   │   └── reputation_proof/
│   └── proxy/             # Servidor HTTP axum + X402
├── sdk/                   # SDK TypeScript
└── README.md
```

---

## Rodando Localmente

### Pré-requisitos
- Rust 1.75+ + `cargo build-bpf`
- Solana CLI 1.18+ (`solana-install init 1.18.0`)
- Anchor 0.30.1 (`avm install 0.30.1`)
- Node.js 20+

### Build e Testes
```bash
anchor build && anchor test
```

### Deploy devnet
```bash
solana config set --url devnet
solana airdrop 2
anchor deploy --provider.cluster devnet
```

### Proxy
```bash
cd proxy && cargo run --release
```

### App Demo
```bash
cd app && npm install && npm run dev
```

---

## Segurança

- ✅ **Zero IA** — heurísticas determinísticas, nenhuma ML
- ✅ **X402 payments** — verificados on-chain antes de liberar acesso
- ✅ **Deflator D(user, epoch)** — decay linear, fraude por volume inviável
- ✅ **take_rate imutável por epoch** — proteção estrutural
- ✅ **TTL automático** — zero state bloat
- ✅ **Privacidade por design** — apenas hash do evento sai do dispositivo

---

## Roadmap

| Prazo | Entrega |
|-------|---------|
| 30 dias | Attention Oracle Network com staking e slashing |
| 90 dias | App mobile companion (APIs de Usage Stats, sem captura de conteúdo) |
| 6 meses | Extensão navegador (Chrome, Firefox, Safari) |
| 12 meses | Deploy mainnet + parcerias com publishers |

| Ano | Usuários | Eventos/dia |
|-----|----------|-------------|
| 1º | 10.000 | 1M |
| 2º | 500.000 | 100M |
| 3º | 10M | 1B |

`take_rate` cai de 15% para 5% conforme a escala reduz o custo marginal.

---

## Referências

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

*"O mercado de atenção digital vale US$ 790 bilhões globalmente. O usuário que gerou esse mercado recebe zero. Isso não é uma falha de mercado aguardando regulação. É uma assimetria estrutural que só um protocolo resolve — porque protocolos não pedem permissão. Eles apenas funcionam."*