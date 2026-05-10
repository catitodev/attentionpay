import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'
import { Connection } from '@solana/web3.js'
import { useI18n } from '@/lib/i18n/I18nContext'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { publicKey, connected, disconnect } = useWallet()
  const { t, lang, setLang } = useI18n()
  const router = useRouter()
  const [balance, setBalance] = useState('0.0000')
  const [activeNav, setActiveNav] = useState('dashboard')

  useEffect(() => {
    if (!connected) {
      router.push('/')
    }
  }, [connected, router])

  useEffect(() => {
    if (publicKey) {
      const connection = new Connection('https://api.devnet.solana.com')
      connection.getBalance(publicKey).then((lamports) => {
        setBalance((lamports / 1e9).toFixed(4))
      })
    }
  }, [publicKey])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const toggleLang = () => {
    setLang(lang === 'en' ? 'pt-BR' : 'en')
  }

  if (!connected) return null

  return (
    <>
      <Head>
        <title>AttnPay Dashboard</title>
      </Head>

      <div className="min-h-screen text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-5 py-4 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_10px_rgba(198,191,255,0.3)] shadow-[0_0_15px_rgba(0,217,255,0.4)]">
              <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                <span className="text-white font-bold text-xs">AP</span>
              </div>
            </div>
            <span className="text-display-lg text-display-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-container to-secondary-container">AttnPay</span>
          </div>
          <div className="flex items-center gap-md">
            <div className="hidden md:flex items-center bg-surface-container-highest/50 rounded-full px-md py-xs border border-white/5">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-body-sm w-48" placeholder="Search..." type="text"/>
            </div>
            <button onClick={toggleLang} className="flex items-center gap-xs px-sm py-1 rounded-full bg-surface-container-high/50 border border-white/5 hover:bg-white/10 transition-colors text-label-caps text-label-caps text-on-surface-variant mr-xs">
              <span className="text-primary">{lang === 'en' ? 'PT' : 'EN'}</span>
              <span className="opacity-30">|</span>
              <span>{lang === 'en' ? 'PT-BR' : 'EN'}</span>
            </button>
            <button className="material-symbols-outlined text-primary hover:bg-white/10 transition-colors p-sm rounded-full">notifications</button>
          </div>
        </header>

        <main className="pt-24 pb-32 px-5 max-w-7xl mx-auto space-y-lg">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="md:col-span-2 glass-panel rounded-xl p-lg flex flex-col justify-between min-h-[180px] relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-headline-md text-headline-md text-on-surface">Olá, User 👋</h1>
                <p className="text-on-surface-variant text-body-md mt-xs">Seu sistema está operando em 98.4% de eficiência.</p>
              </div>
              <div className="flex gap-lg mt-lg relative z-10">
                <div>
                  <span className="text-label-caps text-label-caps text-secondary uppercase block mb-xs">Uptime</span>
                  <span className="text-title-sm text-title-sm text-on-surface">14d 08h 22m</span>
                </div>
                <div>
                  <span className="text-label-caps text-label-caps text-secondary uppercase block mb-xs">Consumo</span>
                  <span className="text-title-sm text-title-sm text-on-surface">1.2kW/h</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-lg border-l-4 border-secondary-container">
              <div className="flex justify-between items-start mb-md">
                <div>
                  <span className="text-label-caps text-label-caps text-on-surface-variant uppercase">Wallet Balance</span>
                  <h2 className="text-display-lg text-display-lg text-secondary-container mt-xs">₿ {balance}</h2>
                </div>
                <span className="material-symbols-outlined text-secondary-container text-[32px]">account_balance_wallet</span>
              </div>
              <div className="h-16 flex items-end gap-1">
                <div className="w-full bg-secondary-container/20 h-4 rounded-t-sm"></div>
                <div className="w-full bg-secondary-container/30 h-8 rounded-t-sm"></div>
                <div className="w-full bg-secondary-container/40 h-6 rounded-t-sm"></div>
                <div className="w-full bg-secondary-container/60 h-10 rounded-t-sm"></div>
                <div className="w-full bg-secondary-container/80 h-12 rounded-t-sm neon-glow-secondary"></div>
                <div className="w-full bg-secondary-container h-9 rounded-t-sm"></div>
                <div className="w-full bg-secondary-container/50 h-7 rounded-t-sm"></div>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
                +12.4% este mês
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-lg">
            <div className="md:col-span-2 lg:col-span-2 glass-panel rounded-xl p-lg">
              <div className="flex justify-between items-center mb-lg">
                <h3 className="text-title-sm text-title-sm">Desempenho da Rede</h3>
                <div className="flex gap-sm">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                </div>
              </div>
              <div className="h-48 w-full bg-surface-container-highest/20 rounded-lg relative overflow-hidden">
                <svg className="absolute bottom-0 left-0 w-full h-full opacity-60" viewBox="0 0 400 150">
                  <path d="M0,150 L0,80 C40,70 80,120 120,90 C160,60 200,80 240,40 C280,0 320,60 360,50 C400,40 400,150 400,150 Z" fill="url(#grad1)"></path>
                  <defs>
                    <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgba(108,92,231,0.5)', stopOpacity: 1 }}></stop>
                      <stop offset="100%" style={{ stopColor: 'rgba(108,92,231,0)', stopOpacity: 0 }}></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,80 C40,70 80,120 120,90 C160,60 200,80 240,40 C280,0 320,60 360,50 C400,40 400,40" fill="none" stroke="#c6bfff" strokeWidth="2"></path>
                </svg>
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-1 glass-panel rounded-xl p-lg">
              <h3 className="text-title-sm text-title-sm mb-lg">Atividades Recentes</h3>
              <div className="space-y-md">
                <div className="flex gap-md">
                  <div className="relative flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                    <div className="w-px h-full bg-white/10 mt-xs"></div>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold">Deploy #2841</p>
                    <p className="text-[12px] text-on-surface-variant">Há 10 minutos</p>
                  </div>
                </div>
                <div className="flex gap-md">
                  <div className="relative flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                    <div className="w-px h-full bg-white/10 mt-xs"></div>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold">Nova Conexão Peer</p>
                    <p className="text-[12px] text-on-surface-variant">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex gap-md">
                  <div className="relative flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-error"></div>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold">Alerta de Segurança</p>
                    <p className="text-[12px] text-on-surface-variant">Ontem, 23:45</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-1 glass-panel rounded-xl p-lg">
              <h3 className="text-title-sm text-title-sm mb-lg">Tarefas</h3>
              <div className="space-y-sm">
                <label className="flex items-center gap-md p-sm rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-primary">
                    <span className="material-symbols-outlined text-[14px] text-primary hidden group-hover:block">check</span>
                  </div>
                  <span className="text-body-sm">Otimizar Smart Contract</span>
                </label>
                <label className="flex items-center gap-md p-sm rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-primary">
                    <span className="material-symbols-outlined text-[14px] text-primary hidden group-hover:block">check</span>
                  </div>
                  <span className="text-body-sm">Atualizar Core v2.4</span>
                </label>
                <label className="flex items-center gap-md p-sm rounded-lg hover:bg-white/5 transition-colors cursor-pointer group opacity-50">
                  <div className="w-5 h-5 rounded border border-primary bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="text-body-sm line-through">Review de Nodes</span>
                </label>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-lg h-64">
            <div className="glass-panel rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-lg left-lg z-10">
                <span className="text-label-caps text-label-caps text-secondary-container">Security Status</span>
                <h4 className="text-headline-md text-headline-md text-on-surface">Protocols: Locked</h4>
              </div>
            </div>
            <div className="glass-panel rounded-xl p-lg flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-primary-container flex items-center justify-center mb-md neon-glow-primary">
                <span className="material-symbols-outlined text-[40px] text-primary">query_stats</span>
              </div>
              <h4 className="text-title-sm text-title-sm">Sincronização Completa</h4>
              <p className="text-body-sm text-on-surface-variant mt-xs max-w-xs">Todos os blocos foram validados e o registro está atualizado.</p>
            </div>
          </section>
        </main>

        <button className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-container w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.5)] active:scale-90 transition-transform hover:brightness-110">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </button>

        <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface-container-low/40 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-t-xl">
          <button onClick={() => setActiveNav('dashboard')} className={`flex flex-col items-center justify-center bg-primary/20 text-secondary shadow-[0_0_15px_rgba(0,217,255,0.4)] rounded-full p-3 active:scale-90 transition-all duration-300 ${activeNav === 'dashboard' ? '' : 'opacity-50'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
          </button>
          <button onClick={() => setActiveNav('insights')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary active:scale-90 transition-all duration-300">
            <span className="material-symbols-outlined">insights</span>
          </button>
          <div className="w-14"></div>
          <button onClick={() => router.push('/activities')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary active:scale-90 transition-all duration-300">
            <span className="material-symbols-outlined">layers</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary active:scale-90 transition-all duration-300">
            <span className="material-symbols-outlined">person</span>
          </button>
        </nav>
      </div>
    </>
  )
}
