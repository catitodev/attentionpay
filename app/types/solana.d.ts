import '@solana/wallet-adapter-react/lib/types';

declare module '@solana/wallet-adapter-react' {
  export function ConnectionProvider(props: any): JSX.Element;
  export function WalletProvider(props: any): JSX.Element;
  export function WalletModalProvider(props: any): JSX.Element;
}