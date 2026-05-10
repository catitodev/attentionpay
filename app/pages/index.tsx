import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useI18n } from '@/lib/i18n/I18nContext'

export default function Home() {
  const { publicKey, connected, disconnect, signTransaction } = useWallet()
  const { t, lang, setLang } = useI18n()
  const router = useRouter()
  const [balance, setBalance] = useState('0.0000')
  const [loading, setLoading] = useState(true)
  const [loadPercent, setLoadPercent] = useState(0)
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  useEffect(() => {
    if (publicKey) {
      const connection = new Connection('https://api.devnet.solana.com')
      connection.getBalance(publicKey).then((lamports) => {
        setBalance((lamports / 1e9).toFixed(4))
      })
    }
  }, [publicKey])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setLoading(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const toggleLang = () => {
    setLang(lang === 'en' ? 'pt-BR' : 'en')
  }

  const handleDisconnect = () => {
    disconnect()
    router.push('/')
  }

  const handleTestTransaction = async () => {
    if (!publicKey || !signTransaction) {
      alert(lang === 'en' ? 'Please connect your wallet first' : 'Por favor, conecte sua wallet primeiro')
      return
    }

    try {
      const connection = new Connection('https://api.devnet.solana.com')
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: LAMPORTS_PER_SOL * 0.001,
        })
      )
      transaction.feePayer = publicKey
      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash

      const signed = await signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signed.serialize())
      
      alert(lang === 'en' ? `Transaction confirmed! Signature: ${signature.slice(0, 20)}...` : `Transação confirmada! Assinatura: ${signature.slice(0, 20)}...`)
    } catch (error) {
      console.error('Transaction error:', error)
      alert(lang === 'en' ? 'Transaction cancelled or failed' : 'Transação cancelada ou falhou')
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>AttnPay - Loading</title>
        </Head>
        <main className="relative flex-grow flex flex-col items-center justify-center p-5">
          <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
            <div className="mb-xl relative group">
              <div className="absolute inset-0 bg-secondary-container/20 blur-3xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-700"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center border-white/20 shadow-[0_0_50px_rgba(0,217,255,0.2)]" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="w-4/5 h-4/5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c5ce7, #00d9ff)' }}>
                  <span className="text-white font-bold text-2xl">AP</span>
                </div>
              </div>
            </div>

            <div className="space-y-sm">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #aeecff, #00d9ff)' }}>
                AttnPay
              </h1>
              <p className="text-lg text-gray-400">
                Sua atenção, seu poder.
              </p>
            </div>

            <div className="mt-xl w-full max-w-[240px] px-sm">
              <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(loadPercent, 100)}%`, background: '#00d9ff', boxShadow: '0 0 15px rgba(0, 217, 255, 0.3)' }}></div>
              </div>
              <div className="mt-md flex justify-between items-center text-xs text-gray-500">
                <span>Sincronizando...</span>
                <span>{Math.min(Math.round(loadPercent), 100)}%</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="p-5 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-sm px-md py-xs rounded-full" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span className="material-symbols-outlined text-sm" style={{ color: '#00d9ff' }}>language</span>
            <span className="text-xs text-gray-400">PT-BR</span>
          </div>
          <div className="text-xs text-gray-600">
            v2.4.0-STABLE
          </div>
        </footer>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>AttnPay - Login</title>
      </Head>

      <div className="min-h-screen pb-32" style={{ backgroundColor: '#13121b' }}>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ background: 'rgba(198, 191, 255, 0.1)' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ background: 'rgba(0, 217, 255, 0.1)' }}></div>

        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-5 py-4" style={{ background: 'rgba(19, 18, 27, 0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 0 20px rgba(108, 92, 231, 0.2)' }}>
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden" style={{ border: '1px solid rgba(198, 191, 255, 0.3)', boxShadow: '0 0 10px rgba(198, 191, 255, 0.3)' }}>
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c5ce7, #00d9ff)' }}>
                <span className="text-white font-bold">AP</span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #00d9ff, #aeecff)' }}>AttnPay</span>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>

        <main className="flex-grow flex items-center justify-center px-5 pt-32 pb-16">
          <div className="w-full max-w-md">
            <div className="rounded-xl p-lg relative overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}>
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(0, 217, 255, 0.2)' }}></div>
              <div className="relative z-10">
                <div className="mb-lg">
                  <h1 className="text-2xl text-white mb-xs">Bem-vindo de volta</h1>
                  <p className="text-sm text-gray-400">Acesse o núcleo do sistema com sua credencial.</p>
                </div>

                <form className="space-y-md">
                  <div className="space-y-xs">
                    <label className="text-xs text-gray-400 block">E-MAIL</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary-container transition-colors">alternate_email</span>
                      <input className="w-full rounded-lg py-3 pl-11 pr-md text-white placeholder:text-gray-500 focus:outline-none transition-all" style={{ background: '#0e0d15', border: '1px solid rgba(255, 255, 255, 0.1)' }} placeholder="nome@exemplo.com" type="email"/>
                    </div>
                  </div>

                  <div className="space-y-xs">
                    <div className="flex justify-between items-end">
                      <label className="text-xs text-gray-400 block">SENHA</label>
                      <a className="text-xs text-purple-400 hover:text-cyan-300 transition-colors" href="#" onClick={(e) => { e.preventDefault(); router.push('/forgot-password'); }}>ESQUECEU A SENHA?</a>
                    </div>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary-container transition-colors">lock</span>
                      <input className="w-full rounded-lg py-3 pl-11 pr-md text-white placeholder:text-gray-500 focus:outline-none transition-all" style={{ background: '#0e0d15', border: '1px solid rgba(255, 255, 255, 0.1)' }} placeholder="••••••••" type="password"/>
                      <button className="absolute right-md top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors" type="button">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-xs">
                    <div className="flex items-center gap-sm">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox"/>
                        <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white/40 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" style={{ background: '#35343d' }}></div>
                      </label>
                      <span className="text-sm text-gray-400">Lembrar-me</span>
                    </div>
                  </div>

                  <button type="button" onClick={() => setWalletModalOpen(true)} className="w-full rounded-lg py-3 text-white transition-all active:scale-95 flex items-center justify-center gap-sm" style={{ background: '#6c5ce7', boxShadow: '0 0 20px rgba(108, 92, 231, 0.3)' }}>
                    <span className="material-symbols-outlined">login</span>
                    Acessar minha conta
                  </button>
                </form>

                <div className="flex items-center gap-md my-lg">
                  <div className="h-[1px] flex-grow" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
                  <span className="text-xs text-gray-500 shrink-0">OU CONTINUE COM</span>
                  <div className="h-[1px] flex-grow" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
                </div>

                <div className="grid grid-cols-3 gap-sm">
                  <button className="flex items-center justify-center py-2 px-md rounded-lg hover:bg-white/10 transition-colors" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                      <span className="text-[10px] font-bold text-blue-500">G</span>
                    </div>
                  </button>
                  <button className="flex items-center justify-center py-2 px-md rounded-lg hover:bg-white/10 transition-colors" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span className="material-symbols-outlined text-gray-400">ios</span>
                  </button>
                  <button className="flex items-center justify-center py-2 px-md rounded-lg hover:bg-white/10 transition-colors" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </button>
                </div>

                <div className="mt-lg text-center">
                  <p className="text-sm text-gray-400">
                    Não tem conta? <a className="text-cyan-300 font-semibold hover:underline" href="#" onClick={(e) => { e.preventDefault(); router.push('/register'); }}>Cadastre-se</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-lg flex justify-center">
              <div className="flex items-center gap-xs px-md py-1 rounded-full" style={{ background: 'rgba(42, 41, 50, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span className="material-symbols-outlined text-sm" style={{ color: '#00d9ff' }}>verified_user</span>
                <span className="text-xs text-gray-500">SECURE AUTHENTICATION V2.0</span>
              </div>
              <div className="flex items-center gap-sm ml-md px-md py-1 rounded-full" style={{ background: 'rgba(42, 41, 50, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span className="material-symbols-outlined text-sm text-gray-500">language</span>
                <select className="bg-transparent border-none text-xs text-gray-500 p-0 cursor-pointer">
                  <option style={{ background: '#2a2932', color: 'white' }} value="pt-br">PT-BR</option>
                  <option style={{ background: '#2a2932', color: 'white' }} value="en">EN</option>
                </select>
              </div>
            </div>
          </div>
        </main>

        <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe md:hidden" style={{ background: 'rgba(28, 27, 35, 0.4)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button className="flex flex-col items-center justify-center p-3 text-gray-500">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 text-gray-500">
            <span className="material-symbols-outlined">insights</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 text-gray-500">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 text-gray-500">
            <span className="material-symbols-outlined">layers</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 rounded-full" style={{ background: 'rgba(198, 191, 255, 0.2)', boxShadow: '0 0 15px rgba(0, 217, 255, 0.4)' }}>
            <span className="material-symbols-outlined" style={{ color: '#aeecff' }}>person</span>
          </button>
        </nav>
      </div>

      {walletModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
          <div className="rounded-xl p-lg w-full max-w-md" style={{ background: '#201f27', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h2 className="text-xl text-white mb-4">Conectar Wallet</h2>
            <p className="text-sm text-gray-400 mb-6">Selecione sua wallet para autenticação segura via Solana blockchain.</p>
            
            <div className="mb-4">
              <WalletMultiButton className="w-full !rounded-lg !py-3 !text-white !bg-purple-600 !border-none" />
            </div>

            {connected && publicKey && (
              <div className="mb-4 p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <p className="text-xs text-gray-400 mb-1">Carteira conectada</p>
                <p className="font-mono text-cyan-300">{publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}</p>
                <p className="text-sm text-gray-400 mt-1">Saldo: {balance} SOL</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setWalletModalOpen(false)} className="flex-1 py-2 rounded-lg text-white hover:bg-white/10 transition-colors" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Cancelar
              </button>
              {connected && (
                <button onClick={handleDisconnect} className="flex-1 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors" style={{ background: 'rgba(255, 71, 74, 0.1)', border: '1px solid rgba(255, 71, 74, 0.3)' }}>
                  Desconectar
                </button>
              )}
            </div>

            {connected && (
              <button onClick={handleTestTransaction} className="w-full mt-4 py-3 rounded-lg text-white flex items-center justify-center gap-2" style={{ background: '#00d9ff', color: '#001f26' }}>
                <span className="material-symbols-outlined">send</span>
                Testar Transação (requer confirmação)
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
