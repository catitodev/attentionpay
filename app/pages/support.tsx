import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Support() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>AttnPay | Central de Suporte</title>
      </Head>

      <div className="text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
        <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl flex justify-between items-center px-5 py-4 border-b border-white/10 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_10px_rgba(198,191,255,0.3)]">
              <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                <span className="text-white font-bold text-xs">AP</span>
              </div>
            </div>
            <span className="text-display-lg text-display-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-container to-secondary-container">AttnPay</span>
          </div>
          <div className="flex items-center gap-md">
            <button className="flex items-center gap-xs px-sm py-1 rounded-full bg-surface-container-high/50 border border-white/5 hover:bg-white/10 transition-colors text-label-caps text-label-caps text-on-surface-variant">
              <span className="text-primary">PT</span><span className="opacity-30">|</span><span>EN</span>
            </button>
            <button className="material-symbols-outlined text-primary hover:bg-white/10 transition-colors p-sm rounded-full">notifications</button>
          </div>
        </header>

        <main className="pt-28 px-5 max-w-5xl mx-auto pb-32">
          <section className="text-center mb-xl">
            <h1 className="text-display-lg text-display-lg mb-md text-on-surface">Central de Ajuda AttnPay</h1>
            <p className="text-on-surface-variant text-body-md mb-lg max-w-2xl mx-auto">Como podemos iluminar seu caminho hoje? Busque por tópicos, guias ou suporte direto.</p>
            <div className="relative max-w-xl mx-auto">
              <div className="glass-panel neon-border-focus rounded-xl flex items-center px-md py-sm transition-all duration-300 border border-white/10">
                <span className="material-symbols-outlined text-outline">search</span>
                <input className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline-variant text-body-md px-sm" placeholder="Pesquise por faturas, integração, acesso..." type="text"/>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-xl">
            <div className="glass-panel p-lg rounded-xl flex flex-col items-center text-center glow-hover cursor-pointer group transition-all">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
              <h3 className="text-title-sm text-title-sm mb-xs text-on-surface">Billing</h3>
              <p className="text-on-surface-variant text-body-sm">Faturas e pagamentos</p>
            </div>
            <div className="glass-panel p-lg rounded-xl flex flex-col items-center text-center glow-hover cursor-pointer group transition-all">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </div>
              <h3 className="text-title-sm text-title-sm mb-xs text-on-surface">Technical</h3>
              <p className="text-on-surface-variant text-body-sm">APIs e integrações</p>
            </div>
            <div className="glass-panel p-lg rounded-xl flex flex-col items-center text-center glow-hover cursor-pointer group transition-all">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>manage_accounts</span>
              </div>
              <h3 className="text-title-sm text-title-sm mb-xs text-on-surface">Account</h3>
              <p className="text-on-surface-variant text-body-sm">Segurança e perfil</p>
            </div>
            <div className="glass-panel p-lg rounded-xl flex flex-col items-center text-center glow-hover cursor-pointer group transition-all">
              <div className="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              </div>
              <h3 className="text-title-sm text-title-sm mb-xs text-on-surface">Feedback</h3>
              <p className="text-on-surface-variant text-body-sm">Sugestões de melhoria</p>
            </div>
          </section>

          <section className="glass-panel rounded-xl overflow-hidden mb-xl border border-white/10">
            <div className="p-lg border-b border-white/10 bg-white/5">
              <h2 className="text-headline-md text-headline-md text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">quiz</span> Perguntas Frequentes
              </h2>
            </div>
            <div className="divide-y divide-white/10">
              <details className="group">
                <summary className="flex justify-between items-center p-lg cursor-pointer hover:bg-white/5 transition-colors list-none">
                  <span className="text-title-sm text-on-surface">Como altero meu método de pagamento padrão?</span>
                  <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-lg pb-lg text-on-surface-variant text-body-md leading-relaxed">
                  Para alterar seu método de pagamento, acesse o painel 'Billing' no menu lateral, selecione 'Configurações de Pagamento' e adicione um novo cartão. Você pode definir o novo cartão como principal clicando na estrela ao lado do item.
                </div>
              </details>
              <details className="group">
                <summary className="flex justify-between items-center p-lg cursor-pointer hover:bg-white/5 transition-colors list-none">
                  <span className="text-title-sm text-on-surface">Onde encontro minha chave de API de produção?</span>
                  <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-lg pb-lg text-on-surface-variant text-body-md leading-relaxed">
                  As chaves de produção estão localizadas em 'Developers' &gt; 'API Keys'. Lembre-se que você precisa ter sua conta verificada para visualizar e gerar chaves de ambiente real.
                </div>
              </details>
              <details className="group" open>
                <summary className="flex justify-between items-center p-lg cursor-pointer hover:bg-white/5 transition-colors list-none">
                  <span className="text-title-sm text-on-surface">Qual é o tempo médio de resposta do suporte premium?</span>
                  <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-lg pb-lg text-on-surface-variant text-body-md leading-relaxed">
                  Clientes do plano Enterprise e Premium possuem SLA de resposta de até 4 horas úteis. Para demais usuários, nosso tempo médio atual é de 24 horas úteis via chat ou ticket.
                </div>
              </details>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center mb-xl">
            <div className="space-y-md">
              <h2 className="text-headline-md text-headline-md text-on-surface">Segurança Blindada por Design</h2>
              <p className="text-on-surface-variant">Nosso núcleo de segurança utiliza criptografia de ponta e monitoramento em tempo real. Cada transação é validada através de nossa rede neural dedicada para garantir zero fraudes.</p>
              <ul className="space-y-sm">
                <li className="flex items-center gap-sm text-secondary">
                  <span className="material-symbols-outlined">verified_user</span>
                  <span className="text-body-md text-on-surface">Autenticação Biométrica em 2 Camadas</span>
                </li>
                <li className="flex items-center gap-sm text-secondary">
                  <span className="material-symbols-outlined">shield</span>
                  <span className="text-body-md text-on-surface">Proteção Contra Injeção e Ataques DDoS</span>
                </li>
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all rounded-full"></div>
              <div className="relative rounded-2xl border border-white/10 shadow-2xl z-10 w-full h-48 bg-gradient-to-br from-primary-container/20 to-secondary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-6xl">shield</span>
              </div>
            </div>
          </section>
        </main>

        <button className="fixed bottom-24 right-6 md:right-10 z-50 bg-primary-container text-on-primary-container p-lg rounded-full shadow-[0_0_25px_rgba(108,92,231,0.5)] glow-hover flex items-center gap-sm transition-all hover:scale-105 active:scale-95 group">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
          <span className="text-title-sm hidden md:block">Falar com Suporte</span>
        </button>

        <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface-container-low/40 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text-label-caps text-label-caps mt-1">Geral</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">insights</span>
            <span className="text-label-caps text-label-caps mt-1">Análises</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-label-caps text-label-caps mt-1">Novo</span>
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant/60 p-3 hover:text-primary transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">layers</span>
            <span className="text-label-caps text-label-caps mt-1">Fluxos</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col items-center justify-center bg-primary/20 text-secondary shadow-[0_0_15px_rgba(0,217,255,0.4)] rounded-full p-3 transition-all duration-300 active:scale-90">
            <span className="material-symbols-outlined">person</span>
            <span className="text-label-caps text-label-caps mt-1">Perfil</span>
          </button>
        </nav>
      </div>

      <style jsx>{`
        .neon-border-focus:focus-within {
          border-color: #00D9FF;
          box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
        }
        .glow-hover:hover {
          box-shadow: 0 0 20px rgba(108, 92, 231, 0.4);
        }
      `}</style>
    </>
  )
}
