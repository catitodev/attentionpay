# Contribuindo — AttentionPay

Desenvolvido por **catitodev**. Licenciado sob Apache 2.0.

## Princípios

1. **Zero IA no pipeline de pagamento**
2. **Anti-Sybil por design on-chain**
3. **Transparência total — fórmulas auditáveis**
4. **Proteção do usuário — take_rate imutável por epoch**

## Como Contribuir

1. Fork → branch → PR
2. `cargo fmt` + `cargo clippy` são obrigatórios
3. Testes para todo programa Anchor
4. Documentação em inglês ou português

## Comandos Úteis

```bash
anchor build       # Build programas
anchor test        # Testes
anchor deploy      # Deploy devnet
anchor run lint    # Lint
```

## Padrões de Código

- Aritmética inteira apenas (sem float nos contratos Rust)
- Todas as fórmulas devem ser determinísticas e verificáveis
- Testes devem cobrir casos de borda (hard_cap, soft_cap, deflator)
- Documentação deve ser atualizada com qualquer mudança de API

## Segurança

- Nunca exponha dados brutos do usuário fora do dispositivo
- Todos os commitments devem ser hashes SHA-256
- Atualizações de take_rate são rejeitadas pelo contrato
- Nenhum modelo de ML no pipeline de pagamento