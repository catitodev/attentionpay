import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Activities() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>AttnPay - Atividades e Docs</title>
      </Head>

      <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md selection:bg-primary-container selection:text-on-primary-container">
        <header className="fixed top-0 left-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(108,92,231,0.2)] flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_10px_rgba(198,191,255,0.3)]">
              <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                <span className="text-white font-bold text-xs">AP</span>
              </div>
            </div>
            <h1 className="text-display-lg text-display-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-container to-secondary-container">AttnPay</h1>
          </div>
          <div className="flex items-center gap-md">
            <button className="flex items-center gap-xs px-sm py-1 rounded-full bg-surface-container-high/50 border border-white/5 hover:bg-white/10 transition-colors text-[10px] text-label-caps text-on-surface-variant">
              <span className="text-primary">PT</span><span className="opacity-30">|</span><span>EN</span>
            </button>
            <button className="hover:bg-white/10 transition-colors p-2 rounded-full active:scale-95">
              <span className="material-symbols-outlined text-on-surface-variant/70">notifications</span>
            </button>
          </div>
        </header>

        <main className="flex-1 pt-24 pb-32 px-5 max-w-lg mx-auto w-full">
          <section className="mb-lg">
            <div className="flex items-end justify-between mb-md">
              <div>
                <h2 className="text-headline-md text-headline-md text-primary">Atividades</h2>
                <p className="text-body-sm text-body-sm text-on-surface-variant">Fluxo consolidado de AttnPay</p>
              </div>
              <div className="glass-panel px-md py-sm rounded-xl">
                <span className="text-label-caps text-label-caps text-secondary">PRO PROFILE</span>
              </div>
            </div>
          </section>

          <section className="mb-xl">
            <h3 className="text-title-sm text-title-sm text-on-surface mb-md flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary-container">folder_open</span>
              Documentos Recentes
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-panel p-md rounded-xl group cursor-pointer hover:border-secondary-container/50 transition-all">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-sm border border-white/5 bg-surface-container-high">
                  <span className="absolute inset-0 flex items-center justify-center text-secondary-container text-2xl">PDF</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <span className="material-symbols-outlined text-secondary-container scale-125">visibility</span>
                  </div>
                </div>
                <p className="text-label-caps text-label-caps text-on-surface truncate">FATURA_MAR_24.PDF</p>
                <p className="text-[10px] text-on-surface-variant/60 uppercase">2.4 MB • PDF</p>
              </div>
              <div className="glass-panel p-md rounded-xl group cursor-pointer hover:border-secondary-container/50 transition-all">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-sm border border-white/5 bg-surface-container-high">
                  <span className="absolute inset-0 flex items-center justify-center text-secondary-container text-2xl">XLS</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <span className="material-symbols-outlined text-secondary-container scale-125">download</span>
                  </div>
                </div>
                <p className="text-label-caps text-label-caps text-on-surface truncate">RELATÓRIO_ANUAL.XLSX</p>
                <p className="text-[10px] text-on-surface-variant/60 uppercase">1.1 MB • TABLE</p>
              </div>
            </div>
          </section>

          <section className="relative">
            <h3 className="text-title-sm text-title-sm text-on-surface mb-md flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Timeline de Eventos
            </h3>
            <div className="relative ml-4 pl-8 border-l-2 border-white/10 space-y-lg">
              <div className="relative">
                <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-surface-container-high border border-secondary-container/40 flex items-center justify-center neon-glow-secondary">
                  <span className="material-symbols-outlined text-secondary-container text-md">payments</span>
                </div>
                <div className="glass-panel p-md rounded-xl">
                  <div className="flex justify-between items-start mb-xs">
                    <span className="text-label-caps text-label-caps text-secondary-container">FINANCEIRO</span>
                    <span className="text-label-caps text-[10px] text-on-surface-variant/50">HOJE • 14:32</span>
                  </div>
                  <h4 className="text-title-sm text-on-surface">Recebimento Confirmado</h4>
                  <p className="text-body-sm text-body-sm text-on-surface-variant mt-xs">Fluxo consolidado de AttnPay</p>
                  <div className="mt-md flex gap-sm">
                    <button className="bg-white/5 hover:bg-white/10 px-md py-xs rounded-full text-label-caps text-[11px] transition-colors border border-white/10">DETALHES</button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-surface-container-high border border-primary-container/40 flex items-center justify-center neon-glow-primary">
                  <span className="material-symbols-outlined text-primary text-md">task_alt</span>
                </div>
                <div className="glass-panel p-md rounded-xl border-l-4 border-l-primary-container">
                  <div className="flex justify-between items-start mb-xs">
                    <span className="text-label-caps text-label-caps text-primary">TAREFA</span>
                    <span className="text-label-caps text-[10px] text-on-surface-variant/50">HOJE • 10:15</span>
                  </div>
                  <h4 className="text-title-sm text-on-surface">Validação de Identidade</h4>
                  <p className="text-body-sm text-body-sm text-on-surface-variant mt-xs">Fluxo consolidado de AttnPay</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-surface-container-high border border-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-md">settings_input_component</span>
                </div>
                <div className="glass-panel p-md rounded-xl opacity-80">
                  <div className="flex justify-between items-start mb-xs">
                    <span className="text-label-caps text-label-caps text-on-surface-variant">SISTEMA</span>
                    <span className="text-label-caps text-[10px] text-on-surface-variant/50">ONTEM • 23:59</span>
                  </div>
                  <h4 className="text-title-sm text-on-surface">Backup de Segurança</h4>
                  <p className="text-body-sm text-body-sm text-on-surface-variant mt-xs">A sincronização da rede AttnPay foi finalizada e criptografada.</p>
                </div>
              </div>

              <div className="flex justify-center py-md">
                <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary-container mx-2 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </section>
        </main>

        <button className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-container w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.5)] active:scale-90 transition-transform hover:brightness-110">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </button>

        <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface-container-low/40 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-t-xl">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">insights</span>
          </button>
          <div className="w-14"></div>
          <button className="flex flex-col items-center justify-center bg-primary/20 text-secondary shadow-[0_0_15px_rgba(0,217,255,0.4)] rounded-full p-3 active:scale-90">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">person</span>
          </button>
        </nav>
      </div>
    </>
  )
}
