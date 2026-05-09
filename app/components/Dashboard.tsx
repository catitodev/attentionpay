import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then(setBalance);
    }
  }, [publicKey, connection]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AttentionPay
        </h1>
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
      </header>

      {!connected ? (
        <div className="text-center py-20">
          <h2 className="text-2xl mb-4">Conecte sua wallet para começar</h2>
          <p className="text-gray-400">Ganhe por cada segundo de atenção real</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Saldo" value={`${(balance / 1e9).toFixed(4)} SOL`} />
          <StatCard title="Eventos Hoje" value="0" />
          <StatCard title="Ganho Total" value="0 lamports" />
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-mono mt-2">{value}</p>
    </div>
  );
}
