declare module '@solana/wallet-adapter-react' {
  import { FC, ReactNode } from 'react';

  interface ConnectionProviderProps {
    children: ReactNode;
    endpoint: string;
  }

  interface WalletProviderProps {
    children: ReactNode;
    wallets: any[];
    autoConnect?: boolean;
  }

  interface WalletModalProviderProps {
    children: ReactNode;
  }

  export const ConnectionProvider: FC<ConnectionProviderProps>;
  export const WalletProvider: FC<WalletProviderProps>;
  export const WalletModalProvider: FC<WalletModalProviderProps>;
  export const useWallet: () => any;
  export const useConnection: () => any;
}

declare module '@solana/wallet-adapter-react-ui' {
  import { FC } from 'react';

  interface WalletMultiButtonProps {
    className?: string;
  }

  export const WalletMultiButton: FC<WalletMultiButtonProps>;
}