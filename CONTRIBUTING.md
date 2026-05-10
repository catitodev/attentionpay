# Contributing — AttentionPay

Developed by **catitodev**. Licensed under Apache 2.0.

## Principles

1. **Zero AI in the payment pipeline**
2. **Anti-Sybil by on-chain design**
3. **Full transparency — auditable formulas**
4. **User protection — take_rate immutable per epoch**

## How to Contribute

1. Fork → branch → PR
2. `cargo fmt` + `cargo clippy` are mandatory
3. Tests for every Anchor program
4. Documentation in English or Portuguese

## Useful Commands

```bash
anchor build       # Build programs
anchor test        # Tests
anchor deploy      # Deploy devnet
anchor run lint    # Lint
```

## Code Standards

- Integer arithmetic only (no float in Rust contracts)
- All formulas must be deterministic and verifiable
- Tests must cover edge cases (hard_cap, soft_cap, deflator)
- Documentation must be updated with any API changes

## Security

- Never expose raw user data off-device
- All commitments must be SHA-256 hashes
- take_rate updates are rejected by the contract
- No ML models in the payment pipeline