import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

export default function Verify() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(59)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <>
      <Head>
        <title>AttnPay - Verificação</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-background">
        <header className="w-full flex justify-between items-center px-5 py-4 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_10px_rgba(108,92,231,0.3)]">
              <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                <span className="text-white font-bold">AP</span>
              </div>
            </div>
            <h1 className="text-display-lg text-display-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-container to-secondary-container tracking-tight">
              AttnPay
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-xs text-on-surface-variant/70 hover:text-primary transition-colors text-label-caps text-label-caps">
              <span className="material-symbols-outlined text-[18px]">language</span>
              EN / PT
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-5">
          <div className="w-full max-w-md glass-panel rounded-xl p-lg space-y-xl neon-glow-secondary relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="text-center space-y-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-container/10 border border-secondary/20 mb-md">
                <span className="material-symbols-outlined text-secondary text-[32px]">mark_email_unread</span>
              </div>
              <h2 className="text-headline-md text-headline-md text-on-surface">Verifique seu E-mail</h2>
              <p className="text-body-sm text-body-sm text-on-surface-variant/80">
                Enviamos um código de 6 dígitos para o seu endereço de e-mail cadastrado. Por favor, insira-o abaixo para continuar.
              </p>
            </div>

            <div className="flex flex-col space-y-lg">
              <div className="flex justify-between gap-sm">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    className="w-12 h-14 text-center text-headline-md font-bold rounded-lg bg-surface-container border border-white/10 text-secondary focus:ring-2 focus:ring-secondary-container focus:border-transparent outline-none transition-all duration-300 shadow-inner"
                    maxLength={1}
                    placeholder="0"
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between text-label-caps text-label-caps px-xs">
                <span className="text-on-surface-variant/60 uppercase">Expira em</span>
                <div className="flex items-center gap-xs text-secondary font-bold">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>00:{timeLeft.toString().padStart(2, '0')}</span>
                </div>
              </div>
              
              <button className="w-full py-md px-lg bg-primary-container text-on-primary-container rounded-lg text-title-sm text-title-sm font-bold neon-glow-primary hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm" onClick={() => router.push('/dashboard')}>
                <span className="material-symbols-outlined">verified</span>
                Verificar
              </button>
            </div>

            <div className="pt-md border-t border-white/10 text-center">
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                Não recebeu o código? 
                <button className="text-secondary font-bold hover:underline ml-xs transition-all">Reenviar agora</button>
              </p>
            </div>
          </div>

          <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md w-full max-w-2xl">
            <div className="glass-panel p-md rounded-xl flex items-center gap-sm border-white/5">
              <span className="material-symbols-outlined text-primary-container">shield</span>
              <span className="text-label-caps text-label-caps text-on-surface-variant/70 uppercase">Criptografia de ponta</span>
            </div>
            <div className="glass-panel p-md rounded-xl flex items-center gap-sm border-white/5">
              <span className="material-symbols-outlined text-secondary-container">lock</span>
              <span className="text-label-caps text-label-caps text-on-surface-variant/70 uppercase">Pagamentos Seguros</span>
            </div>
            <div className="glass-panel p-md rounded-xl flex items-center gap-sm border-white/5">
              <span className="material-symbols-outlined text-tertiary">fingerprint</span>
              <span className="text-label-caps text-label-caps text-on-surface-variant/70 uppercase">Identidade protegida</span>
            </div>
          </div>
        </main>

        <footer className="w-full p-lg text-center mt-auto">
          <p className="text-label-caps text-label-caps text-on-surface-variant/40 tracking-widest uppercase">
            © 2024 NEON-CORE System Architecture. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </>
  )
}
