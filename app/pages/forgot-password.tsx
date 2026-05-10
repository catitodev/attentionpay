import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ForgotPassword() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>AttnPay | Redefinir Senha</title>
      </Head>

      <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-5 py-4 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_10px_rgba(198,191,255,0.3)]">
              <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                <span className="text-white font-bold text-xs">AP</span>
              </div>
            </div>
            <span className="text-display-lg text-display-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-container to-primary-container">AttnPay</span>
          </div>
          <div className="flex items-center gap-md">
            <button className="flex items-center gap-xs px-sm py-1 rounded-full bg-surface-container-high/50 border border-white/5 hover:bg-white/10 transition-colors text-label-caps text-label-caps text-on-surface-variant">
              <span className="text-primary">PT</span>
              <span className="opacity-30">|</span>
              <span>EN</span>
            </button>
            <span className="material-symbols-outlined text-on-surface-variant/70 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer">help_outline</span>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-5 pt-24 pb-12 relative">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full"></div>

          <div className="w-full max-w-md space-y-lg relative z-10">
            <a className="inline-flex items-center gap-xs text-secondary text-label-caps text-label-caps hover:-translate-x-1 transition-transform active:scale-95" href="#" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              VOLTAR PARA LOGIN
            </a>

            <section className="glass-panel rounded-xl p-lg shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <header className="mb-xl">
                <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-md border border-primary/20 neon-glow-primary">
                  <span className="material-symbols-outlined text-primary text-[32px]">lock_reset</span>
                </div>
                <h2 className="text-headline-md text-headline-md text-on-surface mb-xs">Esqueceu a senha?</h2>
                <p className="text-body-sm text-body-sm text-on-surface-variant">Insira o e-mail associado à sua conta AttnPay e enviaremos as instruções de redefinição.</p>
              </header>

              <form className="space-y-lg">
                <div className="space-y-xs">
                  <label className="text-label-caps text-label-caps text-on-surface-variant px-xs" htmlFor="email">E-MAIL DO USUÁRIO</label>
                  <div className="relative group neon-border-focus transition-all duration-300 rounded-lg bg-surface-container-low border border-white/5">
                    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-secondary">mail</span>
                    <input className="w-full bg-transparent border-none py-md pl-xl pr-md rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 text-body-md" id="email" placeholder="nome@exemplo.com" required type="email"/>
                  </div>
                </div>

                <button className="w-full py-md bg-primary-container text-on-primary-container text-title-sm text-title-sm rounded-lg shadow-[0_0_20px_rgba(108,92,231,0.2)] hover:shadow-[0_0_30px_rgba(108,92,231,0.4)] active:scale-95 transition-all flex items-center justify-center gap-sm" type="button" onClick={() => router.push('/reset-password')}>
                  Enviar Instruções
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </form>

              <div className="flex items-center gap-md my-xl">
                <div className="flex-grow h-[1px] bg-white/10"></div>
                <span className="text-label-caps text-label-caps text-on-surface-variant/40">OU</span>
                <div className="flex-grow h-[1px] bg-white/10"></div>
              </div>

              <button className="w-full py-md glass-panel rounded-lg text-title-sm text-title-sm text-on-surface hover:bg-white/10 transition-colors active:scale-95">
                Suporte Técnico
              </button>
            </section>

            <footer className="text-center space-y-md">
              <p className="text-body-sm text-body-sm text-on-surface-variant/60">
                Problemas ao receber o código? <a className="text-secondary hover:underline" href="#">Tentar outro método</a>
              </p>
            </footer>
          </div>
        </main>

        <footer className="p-lg text-center">
          <p className="text-label-caps text-label-caps text-on-surface-variant/40 tracking-widest uppercase">
            Secure Gateway • AttnPay Protocol v4.0
          </p>
        </footer>
      </div>

      <style jsx>{`
        .neon-border-focus:focus-within {
          border-color: #00D9FF;
          box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
        }
      `}</style>
    </>
  )
}
