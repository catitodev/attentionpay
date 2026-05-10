import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ResetPassword() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>AttnPay | Nova Senha</title>
      </Head>

      <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-5 relative">
        <div className="fixed top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-container/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="fixed bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none"></div>

        <main className="w-full max-w-[440px] z-10">
          <header className="flex items-center justify-center gap-md mb-xl">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary-container/30 shadow-lg neon-glow-secondary">
              <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                <span className="text-white font-bold text-lg">AP</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-display-lg text-display-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-container to-primary">
                AttnPay
              </h1>
              <p className="text-body-sm text-body-sm text-on-surface-variant/80 -mt-1">Secure Authentication</p>
            </div>
          </header>

          <div className="glass-panel p-lg rounded-xl shadow-2xl relative overflow-hidden">
            <div className="flex justify-end gap-sm mb-lg">
              <button className="text-label-caps text-label-caps text-primary border-b-2 border-primary pb-xs px-xs">PT</button>
              <button className="text-label-caps text-label-caps text-on-surface-variant/50 hover:text-on-surface transition-colors pb-xs px-xs">EN</button>
            </div>

            <div className="mb-lg">
              <h2 className="text-headline-md text-headline-md text-on-surface">Redefinir Senha</h2>
              <p className="text-body-sm text-body-sm text-on-surface-variant/70 mt-xs">Crie uma senha forte para proteger sua conta no ecossistema AttnPay.</p>
            </div>

            <form className="space-y-lg">
              <div className="space-y-sm">
                <label className="text-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest" htmlFor="new-password">Nova Senha</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-md py-md text-on-surface focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all placeholder:text-on-surface-variant/30" id="new-password" placeholder="••••••••" type="password"/>
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/50 cursor-pointer hover:text-secondary-container transition-colors">visibility</span>
                </div>
              </div>

              <div className="space-y-xs">
                <div className="flex justify-between items-center mb-xs">
                  <span className="text-label-caps text-[10px] text-on-surface-variant/60 uppercase">Força da Senha</span>
                  <span className="text-label-caps text-[10px] text-secondary-container uppercase">Forte</span>
                </div>
                <div className="flex gap-xs h-1.5 w-full">
                  <div className="flex-1 bg-secondary-container rounded-full neon-glow-secondary"></div>
                  <div className="flex-1 bg-secondary-container rounded-full neon-glow-secondary"></div>
                  <div className="flex-1 bg-secondary-container rounded-full neon-glow-secondary"></div>
                  <div className="flex-1 bg-white/10 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-sm">
                <label className="text-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest" htmlFor="confirm-password">Confirmar Senha</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-md py-md text-on-surface focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all placeholder:text-on-surface-variant/30" id="confirm-password" placeholder="••••••••" type="password"/>
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/50 cursor-pointer">check_circle</span>
                </div>
              </div>

              <button className="w-full bg-primary-container text-on-primary-container text-title-sm text-title-sm py-md rounded-lg flex items-center justify-center gap-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-lg neon-glow-primary" type="button" onClick={() => router.push('/dashboard')}>
                <span>Salvar e Acessar</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>

          <footer className="mt-xl text-center space-y-md">
            <a className="text-label-caps text-label-caps text-on-surface-variant/60 hover:text-primary transition-colors flex items-center justify-center gap-xs" href="#">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Precisa de ajuda com o acesso?
            </a>
          </footer>
        </main>
      </div>
    </>
  )
}
