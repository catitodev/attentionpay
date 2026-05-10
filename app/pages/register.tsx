import Head from 'next/head'
import { useRouter } from 'next/router'
import { useI18n } from '@/lib/i18n/I18nContext'

export default function Register() {
  const router = useRouter()
  const { lang } = useI18n()

  return (
    <>
      <Head>
        <title>Cadastro - AttnPay</title>
      </Head>

      <body className="bg-background text-on-surface font-body-md min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
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
              <span className="text-primary">PT-BR</span>
              <span className="opacity-30">|</span>
              <span>EN</span>
            </button>
            <span className="material-symbols-outlined text-primary hover:bg-white/10 transition-colors p-2 rounded-full cursor-pointer">notifications</span>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-5 pt-32 pb-xl relative">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-secondary-container/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="w-full max-w-md z-10">
            <div className="glass-panel p-lg rounded-xl shadow-2xl relative border-l-4 border-primary-container">
              <div className="flex flex-col items-center mb-xl text-center">
                <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center mb-md border border-white/10 neon-glow-primary overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AP</span>
                  </div>
                </div>
                <h1 className="text-display-lg text-display-lg font-bold text-on-surface mb-xs">AttnPay</h1>
                <p className="text-body-sm text-body-sm text-on-surface-variant">Crie sua conta para começar a operar</p>
              </div>

              <form className="space-y-lg">
                <div className="space-y-xs">
                  <label className="text-label-caps text-label-caps text-secondary px-1 uppercase">Nome Completo</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
                    <input className="w-full pl-xl pr-md py-md bg-surface-container-low border border-white/10 rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all" placeholder="Ex: João Silva" type="text"/>
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-caps text-label-caps text-secondary px-1 uppercase">Email</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">alternate_email</span>
                    <input className="w-full pl-xl pr-md py-md bg-surface-container-low border border-white/10 rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all" placeholder="nome@exemplo.com" type="email"/>
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-caps text-label-caps text-secondary px-1 uppercase">Senha</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                    <input className="w-full pl-xl pr-md py-md bg-surface-container-low border border-white/10 rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all" placeholder="••••••••" type="password"/>
                  </div>
                  <div className="pt-sm px-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-label-caps text-[10px] text-on-surface-variant uppercase">Força da Senha</span>
                      <span className="text-label-caps text-[10px] text-secondary-container uppercase">Segura</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full flex gap-xs">
                      <div className="h-full w-1/4 bg-secondary-container rounded-full neon-glow-secondary"></div>
                      <div className="h-full w-1/4 bg-secondary-container rounded-full neon-glow-secondary"></div>
                      <div className="h-full w-1/4 bg-secondary-container rounded-full neon-glow-secondary"></div>
                      <div className="h-full w-1/4 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-caps text-label-caps text-secondary px-1 uppercase">Confirmar Senha</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">verified_user</span>
                    <input className="w-full pl-xl pr-md py-md bg-surface-container-low border border-white/10 rounded-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all" placeholder="••••••••" type="password"/>
                  </div>
                </div>

                <div className="flex items-start gap-md pt-sm">
                  <div className="relative flex items-center h-5">
                    <input className="w-5 h-5 rounded bg-surface-container-low border border-white/20 text-primary-container focus:ring-primary-container focus:ring-offset-background transition-all" id="terms" type="checkbox"/>
                  </div>
                  <label className="text-body-sm text-body-sm text-on-surface-variant leading-tight" htmlFor="terms">
                    Eu aceito os <a className="text-secondary-container hover:underline" href="#">Termos de Uso</a> e a <a className="text-secondary-container hover:underline" href="#">Política de Privacidade</a>.
                  </label>
                </div>

                <button className="w-full py-lg bg-primary-container text-on-primary-container text-title-sm text-title-sm rounded-xl font-bold neon-glow-primary transition-all active:scale-95 flex items-center justify-center gap-sm" type="button" onClick={() => router.push('/verify')}>
                  Criar Conta
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                <div className="text-center pt-md">
                  <p className="text-body-sm text-body-sm text-on-surface-variant">
                    Já possui uma conta? <a className="text-primary font-semibold hover:underline" href="#" onClick={(e) => { e.preventDefault(); router.push('/'); }}>Faça login</a>
                  </p>
                </div>
              </form>

              <div className="flex items-center gap-md my-xl">
                <div className="h-px flex-grow bg-white/10"></div>
                <span className="text-label-caps text-label-caps text-on-surface-variant/40">OU ENTRE COM</span>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <button className="flex items-center justify-center gap-sm py-md glass-panel rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#4285F4]">G</span>
                  </div>
                  <span className="text-label-caps text-label-caps">Google</span>
                </button>
                <button className="flex items-center justify-center gap-sm py-md glass-panel rounded-lg hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">ios</span>
                  <span className="text-label-caps text-label-caps">Apple</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-xl px-5 text-center">
          <p className="text-label-caps text-label-caps text-on-surface-variant/30 uppercase tracking-[0.2em]">
            © 2024 AttnPay Ecosystem. Todos os direitos reservados.
          </p>
        </footer>
      </body>
    </>
  )
}
