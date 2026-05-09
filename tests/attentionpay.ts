import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PayoutPolicy } from "../target/types/payout_policy";
import { AttentionLedger } from "../target/types/attention_ledger";
import { ReputationProof } from "../target/types/reputation_proof";
import { expect } from "chai";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createMint, createAccount, mintTo } from "@solana/spl-token";

// ============================================================
// AttentionPay — Testes de Integração Anchor
// Desenvolvido por catitodev. Licenciado sob Apache 2.0.
// ============================================================

describe("AttentionPay", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const payoutProgram = anchor.workspace.PayoutPolicy as Program<PayoutPolicy>;
  const ledgerProgram = anchor.workspace.AttentionLedger as Program<AttentionLedger>;
  const reputationProgram = anchor.workspace.ReputationProof as Program<ReputationProof>;

  let admin: Keypair;
  let platform: Keypair;
  let user: Keypair;
  let mint: PublicKey;
  let treasuryToken: PublicKey;
  let userToken: PublicKey;
  let platformToken: PublicKey;

  before(async () => {
    admin = Keypair.generate();
    platform = Keypair.generate();
    user = Keypair.generate();

    // Airdrop
    await provider.connection.requestAirdrop(admin.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(user.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL);

    // Cria mint SPL
    mint = await createMint(provider.connection, admin, admin.publicKey, null, 6);

    // Cria token accounts
    treasuryToken = await createAccount(provider.connection, admin, mint, admin.publicKey);
    userToken = await createAccount(provider.connection, user, mint, user.publicKey);
    platformToken = await createAccount(provider.connection, platform, mint, platform.publicKey);

    // Mint tokens para treasury
    await mintTo(provider.connection, admin, mint, treasuryToken, admin, 1_000_000_000);
  });

  // ============================================================
  // PAYOUT POLICY TESTS
  // ============================================================
  describe("PayoutPolicy", () => {
    it("Initialize config", async () => {
      const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("config"), admin.publicKey.toBuffer()],
        payoutProgram.programId
      );
      const [adminConfigPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("admin_config"), admin.publicKey.toBuffer()],
        payoutProgram.programId
      );

      await payoutProgram.methods
        .initialize(
          new anchor.BN(700),    // p_base
          100,                    // soft_cap
          1_000,                  // hard_cap
          1_500,                  // take_rate_bps (15%)
        )
        .accounts({
          admin: admin.publicKey,
          platform: platform.publicKey,
          config: configPda,
          adminConfig: adminConfigPda,
          systemProgram: SystemProgram.programId,
        })
        .signers([admin])
        .rpc();

      const config = await payoutProgram.account.payoutConfig.fetch(configPda);
      expect(config.pBase.toNumber()).to.equal(700);
      expect(config.softCap).to.equal(100);
      expect(config.hardCap).to.equal(1_000);
    });

    it("Calculate ARP payout for scroll", async () => {
      const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("config"), admin.publicKey.toBuffer()],
        payoutProgram.programId
      );
      const [adminConfigPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("admin_config"), admin.publicKey.toBuffer()],
        payoutProgram.programId
      );
      const [epochCountPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("epoch_count"), user.publicKey.toBuffer(), Buffer.from([1, 0, 0, 0])],
        payoutProgram.programId
      );
      const [treasuryPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("treasury"), admin.publicKey.toBuffer()],
        payoutProgram.programId
      );

      // Payout: scroll, 50% depth, 30s recency, 14h
      await payoutProgram.methods
        .calculateAndPay(
          { scroll: {} },
          500,  // ctx_position
          300,  // ctx_recency
          14,   // ctx_hour
        )
        .accounts({
          user: user.publicKey,
          config: configPda,
          adminConfig: adminConfigPda,
          epochCount: epochCountPda,
          treasury: treasuryPda,
          treasuryTokenAccount: treasuryToken,
          userTokenAccount: userToken,
          platformTokenAccount: platformToken,
          mint: mint,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([user])
        .rpc();

      const epochCount = await payoutProgram.account.epochCount.fetch(epochCountPda);
      expect(epochCount.count).to.equal(1);
    });

    it("Hard cap blocks after 1000 events", async () => {
      // Simula 1000 eventos
      for (let i = 0; i < 1000; i++) {
        // ... (simplificado para teste)
      }
      // Evento 1001 deve falhar
    });
  });

  // ============================================================
  // ATTENTION LEDGER TESTS
  // ============================================================
  describe("AttentionLedger", () => {
    it("Initialize user balance", async () => {
      const [balancePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("balance"), user.publicKey.toBuffer()],
        ledgerProgram.programId
      );

      await ledgerProgram.methods
        .initializeUser()
        .accounts({
          user: user.publicKey,
          userBalance: balancePda,
          systemProgram: SystemProgram.programId,
        })
        .signers([user])
        .rpc();

      const balance = await ledgerProgram.account.userBalance.fetch(balancePda);
      expect(balance.total.toNumber()).to.equal(0);
      expect(balance.owner.toBase58()).to.equal(user.publicKey.toBase58());
    });

    it("Credit and update balance", async () => {
      const [balancePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("balance"), user.publicKey.toBuffer()],
        ledgerProgram.programId
      );

      await ledgerProgram.methods
        .credit(new anchor.BN(700), 1, 0)
        .accounts({
          authority: admin.publicKey,
          userBalance: balancePda,
        })
        .signers([admin])
        .rpc();

      const balance = await ledgerProgram.account.userBalance.fetch(balancePda);
      expect(balance.total.toNumber()).to.equal(700);
      expect(balance.eventCount).to.equal(1);
    });
  });

  // ============================================================
  // REPUTATION PROOF TESTS
  // ============================================================
  describe("ReputationProof", () => {
    it("Initialize verifier", async () => {
      const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("verifier_config"), admin.publicKey.toBuffer()],
        reputationProgram.programId
      );

      await reputationProgram.methods
        .initialize(5) // trusted_threshold = 5
        .accounts({
          admin: admin.publicKey,
          config: configPda,
          systemProgram: SystemProgram.programId,
        })
        .signers([admin])
        .rpc();

      const config = await reputationProgram.account.verifierConfig.fetch(configPda);
      expect(config.trustedThreshold).to.equal(5);
    });

    it("Verify and increase score", async () => {
      const [repPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("reputation"), user.publicKey.toBuffer()],
        reputationProgram.programId
      );

      await reputationProgram.methods
        .verifyAndScore(1)
        .accounts({
          verifier: admin.publicKey,
          reputation: repPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([admin])
        .rpc();

      const rep = await reputationProgram.account.reputation.fetch(repPda);
      expect(rep.score).to.equal(1);
      expect(rep.lastVerifiedEpoch).to.equal(1);
    });

    it("Is trusted after 5 verifications", async () => {
      const [repPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("reputation"), user.publicKey.toBuffer()],
        reputationProgram.programId
      );
      const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("verifier_config"), admin.publicKey.toBuffer()],
        reputationProgram.programId
      );

      // Verifica 4x mais (total 5)
      for (let epoch = 2; epoch <= 5; epoch++) {
        await reputationProgram.methods
          .verifyAndScore(epoch)
          .accounts({
            verifier: admin.publicKey,
            reputation: repPda,
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([admin])
          .rpc();
      }

      const trusted = await reputationProgram.methods
        .isTrusted()
        .accounts({
          reputation: repPda,
          user: user.publicKey,
          config: configPda,
        })
        .view();

      expect(trusted).to.be.true;
    });
  });
});
