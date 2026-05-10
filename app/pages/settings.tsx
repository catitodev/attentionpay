import Head from 'next/head'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Settings() {
  const router = useRouter()
  const { disconnect } = useWallet()

  return (
    <>
      <Head>
        <title>AttnPay | Configurações</title>
      </Head>

      <div className="bg-background text-on-surface font-body-md">
        <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
          <div className="flex justify-between items-center px-5 py-4">
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-secondary-container/50 shadow-[0_0_10px_rgba(0,217,255,0.3)]">
                <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AP</span>
                </div>
              </div>
              <h1 className="text-display-lg text-display-lg font-bold text-secondary-container tracking-tight">AttnPay</h1>
            </div>
            <button className="hover:bg-white/10 transition-colors p-sm rounded-full active:scale-95">
              <span className="material-symbols-outlined text-on-surface-variant/70">notifications</span>
            </button>
          </div>
        </header>

        <main className="pt-[88px] pb-32 px-5 max-w-2xl mx-auto space-y-lg">
          <section className="glass-panel p-lg rounded-xl flex items-center gap-lg">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-secondary-container object-cover bg-surface-container-highest flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">AN</span>
              </div>
              <div className="absolute bottom-0 right-0 bg-primary-container p-1 rounded-full border-2 border-surface">
                <span className="material-symbols-outlined text-[16px] text-white">edit</span>
              </div>
            </div>
            <div>
              <h2 className="text-headline-md text-headline-md text-on-surface">Alex Rivera</h2>
              <p className="text-body-sm text-body-sm text-on-surface-variant/70">alex.rivera@attnpay.tech</p>
              <div className="mt-sm">
                <span className="bg-secondary-container/20 text-secondary-container px-sm py-xs rounded-full text-label-caps text-label-caps">PRO MEMBER</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-md">
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="p-md border-b border-white/10 flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">account_circle</span>
                <h3 className="text-title-sm text-title-sm">Conta</h3>
              </div>
              <div className="p-md space-y-md">
                <button className="w-full flex items-center justify-between hover:bg-white/5 p-sm rounded-lg transition-colors group">
                  <div className="text-left">
                    <p className="text-body-md text-body-md text-on-surface">Alterar E-mail</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant/60">alex.rivera@attnpay.tech</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button className="w-full flex items-center justify-between hover:bg-white/5 p-sm rounded-lg transition-colors group">
                  <div className="text-left">
                    <p className="text-body-md text-body-md text-on-surface">Alterar Senha</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant/60">Atualizada há 3 meses</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">lock</span>
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="p-md border-b border-white/10 flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary-container">shield</span>
                <h3 className="text-title-sm text-title-sm">Segurança</h3>
              </div>
              <div className="p-md space-y-md">
                <div className="flex items-center justify-between p-sm">
                  <div>
                    <p className="text-body-md text-body-md">Autenticação 2FA</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant/60">Proteja sua conta com um segundo passo</p>
                  </div>
                  <div className="w-12 h-6 bg-primary-container rounded-full relative neon-glow-primary">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-between hover:bg-white/5 p-sm rounded-lg transition-colors">
                  <div className="text-left">
                    <p className="text-body-md text-body-md">Dispositivos Conectados</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant/60">3 sessões ativas no momento</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant">devices</span>
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="p-md border-b border-white/10 flex items-center gap-sm">
                <span className="material-symbols-outlined text-tertiary">palette</span>
                <h3 className="text-title-sm text-title-sm">Aparência & Idioma</h3>
              </div>
              <div className="p-md space-y-lg">
                <div>
                  <p className="text-label-caps text-label-caps text-on-surface-variant/70 mb-sm">MODO DO TEMA</p>
                  <div className="flex gap-md">
                    <button className="flex-1 glass-panel py-md flex flex-col items-center gap-xs rounded-lg border-primary-container neon-glow-primary">
                      <span className="material-symbols-outlined text-primary">dark_mode</span>
                      <span className="text-body-sm text-body-sm">Dark</span>
                    </button>
                    <button className="flex-1 glass-panel py-md flex flex-col items-center gap-xs rounded-lg opacity-40">
                      <span className="material-symbols-outlined">light_mode</span>
                      <span className="text-body-sm text-body-sm">Light</span>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-label-caps text-label-caps text-on-surface-variant/70 mb-sm">COR DE ACENTO</p>
                  <div className="flex gap-md">
                    <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-white neon-glow-primary cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-secondary-container cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-tertiary-container cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-error-container cursor-pointer"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-body-md text-body-md">Idioma do Sistema</p>
                  <div className="flex bg-surface-container rounded-lg p-1 border border-white/5">
                    <button className="px-md py-1 bg-primary-container rounded-md text-label-caps text-label-caps text-white">PT</button>
                    <button className="px-md py-1 text-label-caps text-label-caps text-on-surface-variant/60">EN</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="glass-panel p-md rounded-xl space-y-md">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">visibility</span>
                  <h3 className="text-title-sm text-title-sm">Privacidade</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-body-sm">Perfil Público</span>
                  <div className="w-10 h-5 bg-surface-container-highest rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-on-surface-variant rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-md rounded-xl space-y-md">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">notifications_active</span>
                  <h3 className="text-title-sm text-title-sm">Notificações</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-body-sm">Push Alerts</span>
                  <div className="w-10 h-5 bg-primary-container rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => { disconnect(); router.push('/'); }} className="w-full glass-panel p-md rounded-xl text-error text-title-sm text-center border-error/20 hover:bg-error/5 transition-colors">
              Encerrar Sessão
            </button>

            <div className="py-lg text-center">
              <p className="text-label-caps text-label-caps text-on-surface-variant/30 tracking-widest">AttnPay Ecosystem v2.4.0</p>
            </div>
          </div>
        </main>

        <nav className="fixed bottom-0 w-full z-50 bg-surface-container-low/40 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] px-4 py-3 pb-safe flex justify-around items-center">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">insights</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined text-[32px] text-secondary-container">add_circle</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">layers</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-primary/20 text-secondary shadow-[0_0_15px_rgba(0,217,255,0.4)] rounded-full p-3 active:scale-90">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </button>
        </nav>
      </div>
    </>
  )
}
