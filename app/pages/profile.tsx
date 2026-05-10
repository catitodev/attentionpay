import Head from 'next/head'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Profile() {
  const router = useRouter()
  const { publicKey, disconnect, connected } = useWallet()

  return (
    <>
      <Head>
        <title>AttnPay | Perfil Completo</title>
      </Head>

      <div className="text-on-surface font-body-md bg-background min-h-screen pb-32">
        <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
          <div className="flex justify-between items-center px-5 py-4">
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AP</span>
                </div>
              </div>
              <span className="text-display-lg text-display-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-container to-secondary-container">AttnPay</span>
            </div>
            <div className="flex items-center gap-sm">
              <button className="flex items-center gap-1 px-sm py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-primary text-[18px]">language</span>
                <span className="text-label-caps text-[10px] text-on-surface">PT-BR / EN</span>
              </button>
              <button className="p-sm rounded-full hover:bg-white/10 transition-colors active:scale-95">
                <span className="material-symbols-outlined text-primary">notifications</span>
              </button>
            </div>
          </div>
        </header>

        <main className="pt-[88px]">
          <section className="relative w-full h-48 md:h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/30 to-secondary-container/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          </section>

          <section className="px-5 -mt-20 relative z-10">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary-container via-secondary-container to-primary shadow-[0_0_30px_rgba(108,92,231,0.4)]">
                  <div className="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-surface">
                    <span className="text-4xl font-bold text-primary">AN</span>
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-secondary-container rounded-full border-4 border-surface flex items-center justify-center neon-glow-secondary">
                  <span className="material-symbols-outlined text-on-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="mt-md text-center">
                <h2 className="text-headline-md text-headline-md text-on-surface">Alex Nova</h2>
                <p className="text-body-sm text-on-surface-variant/80">Senior Systems Architect @ Core Protocol</p>
              </div>
            </div>
          </section>

          <nav className="mt-xl px-5 sticky top-[88px] z-40 bg-background/80 backdrop-blur-md py-sm">
            <div className="flex gap-md overflow-x-auto pb-xs">
              <button className="flex-shrink-0 px-lg py-sm rounded-full glass-panel text-secondary border-secondary/30 neon-glow-secondary text-label-caps text-label-caps">
                VISÃO GERAL
              </button>
              <button className="flex-shrink-0 px-lg py-sm rounded-full text-on-surface-variant/60 text-label-caps text-label-caps hover:text-on-surface transition-colors">
                FINANCEIRO
              </button>
              <button className="flex-shrink-0 px-lg py-sm rounded-full text-on-surface-variant/60 text-label-caps text-label-caps hover:text-on-surface transition-colors">
                ATIVIDADES
              </button>
              <button className="flex-shrink-0 px-lg py-sm rounded-full text-on-surface-variant/60 text-label-caps text-label-caps hover:text-on-surface transition-colors">
                CONFIGURAÇÕES
              </button>
            </div>
          </nav>

          <section className="mt-lg px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="glass-panel rounded-xl p-lg col-span-1 md:col-span-2 shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-white/5">
              <div className="flex items-center gap-sm mb-md">
                <span className="material-symbols-outlined text-primary-container">badge</span>
                <h3 className="text-title-sm text-title-sm">Dados Pessoais</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                <div className="space-y-xs">
                  <p className="text-label-caps text-label-caps text-on-surface-variant/50">NOME COMPLETO</p>
                  <p className="text-on-surface text-body-md">Alexandre Novaes de Oliveira</p>
                </div>
                <div className="space-y-xs">
                  <p className="text-label-caps text-label-caps text-on-surface-variant/50">LOCALIZAÇÃO</p>
                  <p className="text-on-surface text-body-md">Neo-Tokyo, Setor 07</p>
                </div>
                <div className="space-y-xs">
                  <p className="text-label-caps text-label-caps text-on-surface-variant/50">MEMBRO DESDE</p>
                  <p className="text-on-surface text-body-md">Março, 2024</p>
                </div>
                <div className="space-y-xs">
                  <p className="text-label-caps text-label-caps text-on-surface-variant/50">ID DE ACESSO</p>
                  <p className="text-secondary text-body-md font-mono">#NX-9982-CORE</p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-lg border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-secondary-container">alternate_email</span>
                  <h3 className="text-title-sm text-title-sm">Contato</h3>
                </div>
                <div className="space-y-md">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">mail</span>
                    </div>
                    <div>
                      <p className="text-body-sm text-on-surface">alex.nova@core.net</p>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary uppercase font-bold">Principal</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">call</span>
                    </div>
                    <div>
                      <p className="text-body-sm text-on-surface">+55 11 99923-0442</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mt-lg w-full py-md rounded-lg bg-primary-container text-on-primary-container text-label-caps text-label-caps neon-glow-primary hover:brightness-110 transition-all">
                EDITAR CONTATOS
              </button>
            </div>

            <div className="glass-panel rounded-xl p-lg col-span-1 md:col-span-3 border-white/5">
              <div className="flex items-center gap-sm mb-lg">
                <span className="material-symbols-outlined text-tertiary">link</span>
                <h3 className="text-title-sm text-title-sm">Redes Conectadas</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex items-center justify-between p-md rounded-xl bg-surface-container-high/40 border border-white/5">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-body-md">share</span>
                    </div>
                    <span className="text-body-sm font-medium">LinkedIn</span>
                  </div>
                  <span className="text-[10px] font-bold text-secondary flex items-center gap-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                    Ativo
                  </span>
                </div>
                <div className="flex items-center justify-between p-md rounded-xl bg-surface-container-high/40 border border-white/5">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/20">
                      <span className="material-symbols-outlined text-white text-body-md">terminal</span>
                    </div>
                    <span className="text-body-sm font-medium">GitHub</span>
                  </div>
                  <span className="text-[10px] font-bold text-secondary flex items-center gap-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Ativo
                  </span>
                </div>
                <div className="flex items-center justify-between p-md rounded-xl bg-surface-container-high/40 border border-white/5 opacity-50">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-body-md">public</span>
                    </div>
                    <span className="text-body-sm font-medium">X / Twitter</span>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Desconectado
                  </span>
                </div>
                <div className="flex items-center justify-between p-md rounded-xl border border-dashed border-white/20 hover:bg-white/5 cursor-pointer transition-colors">
                  <span className="text-body-sm text-on-surface-variant flex items-center gap-sm">
                    <span className="material-symbols-outlined text-body-md">add</span>
                    Adicionar Rede
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-lg col-span-1 md:col-span-3 border-white/5">
              <div className="flex justify-between items-center mb-md">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">history</span>
                  <h3 className="text-title-sm text-title-sm">Atividade Recente</h3>
                </div>
                <a className="text-label-caps text-label-caps text-secondary" href="#" onClick={(e) => { e.preventDefault(); router.push('/activities'); }}>VER TUDO</a>
              </div>
              <div className="space-y-sm">
                <div className="flex items-center justify-between p-md rounded-lg bg-white/5 border-l-2 border-primary">
                  <div className="flex gap-md items-center">
                    <span className="material-symbols-outlined text-primary-container">security</span>
                    <div>
                      <p className="text-body-sm font-medium">Autenticação Biométrica Atualizada</p>
                      <p className="text-[10px] text-on-surface-variant/60">Há 2 horas • Dispositivo: MOBILE-NX</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
                </div>
                <div className="flex items-center justify-between p-md rounded-lg bg-white/5 border-l-2 border-secondary">
                  <div className="flex gap-md items-center">
                    <span className="material-symbols-outlined text-secondary-container">account_balance_wallet</span>
                    <div>
                      <p className="text-body-sm font-medium">Transferência Recebida: 0.45 ETH</p>
                      <p className="text-[10px] text-on-surface-variant/60">Há 5 horas • De: Wal_88x...</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        <nav className="fixed bottom-0 w-full z-50 bg-surface-container-low/40 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-t-xl">
          <div className="flex justify-around items-center px-4 py-3 pb-safe">
            <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
              <span className="material-symbols-outlined">insights</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-primary-container text-white shadow-[0_0_15px_rgba(108,92,231,0.5)] rounded-full p-4 -mt-10 border-4 border-surface active:scale-90 transition-all">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
            </button>
            <button onClick={() => router.push('/activities')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
              <span className="material-symbols-outlined">layers</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-primary/20 text-secondary shadow-[0_0_15px_rgba(0,217,255,0.4)] rounded-full p-3 active:scale-90">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
