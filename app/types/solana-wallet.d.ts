declare module '@solana/wallet-adapter-react-ui' {
  export const WalletModalProvider: React.FC<{ children: React.ReactNode }>
  export const WalletMultiButton: React.FC<any>
  export const WalletDisconnectButton: React.FC<any>
  export const WalletConnectButton: React.FC<any>
  export const useWalletModal: () => any
  export const WalletModal: React.FC<any>
  export const WalletIcon: React.FC<any>
}

declare module '@solana/wallet-adapter-solflare' {
  import type { WalletAdapter } from '@solana/wallet-adapter-base'
  export class SolflareWalletAdapter implements WalletAdapter {
    constructor(config?: { network?: string })
  }
}

declare module '@solana/wallet-adapter-phantom' {
  import type { WalletAdapter } from '@solana/wallet-adapter-base'
  export class PhantomWalletAdapter implements WalletAdapter {}
}