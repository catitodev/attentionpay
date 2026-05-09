/**
 * AttentionPay SDK — Client-side TypeScript
 *
 * Injeta listeners de atenção e comunica com o proxy
 * para micropagamentos via Solana.
 *
 * Desenvolvido por catitodev. Licenciado sob Apache 2.0.
 */

export interface AttentionPayConfig {
  proxyUrl: string;
  userWallet: { publicKey: { toString(): string } };
  pageId?: string;
}

export interface EventContext {
  scrollDepth: number;
  timeOnPage: number;
  hour: number;
  elementTag: string;
}

export class AttentionPay {
  private proxyUrl: string;
  private userAddress: string;
  private pageId: string;
  private sessionEvents = 0;

  private scrollAccumulator = 0;
  private scrollLastTime = 0;
  private clickLastTime = 0;
  private focusStartTime = 0;
  private focusActive = false;
  private focusTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly DEBOUNCE_SCROLL = 150;
  private readonly DEBOUNCE_CLICK = 50;
  private readonly FOCUS_MIN = 3000;
  private readonly FOCUS_RESET = 2000;

  constructor(config: AttentionPayConfig) {
    this.proxyUrl = config.proxyUrl.replace(/\/$/, '');
    this.userAddress = config.userWallet.publicKey.toString();
    this.pageId = config.pageId || window.location.pathname;
  }

  start(): void {
    if (!this.userAddress) {
      console.warn('[AttentionPay] wallet não conectado. SDK inativo.');
      return;
    }
    this.attachListeners();
    console.log(`[AttentionPay] iniciado | user: ${this.userAddress}`);
  }

  private attachListeners(): void {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    document.addEventListener('click', (e) => this.handleClick(e));

    const focusable = ['INPUT', 'TEXTAREA', 'ARTICLE', 'MAIN', 'SECTION'];
    document.addEventListener('focusin', (e) => {
      if (!focusable.includes((e.target as HTMLElement).tagName)) return;
      this.focusActive = true;
      this.focusStartTime = performance.now();
      if (this.focusTimer) clearTimeout(this.focusTimer);
    });

    document.addEventListener('focusout', (e) => {
      if (!this.focusActive) return;
      this.focusActive = false;
      const duration = performance.now() - this.focusStartTime;
      if (duration >= this.FOCUS_MIN) {
        this.sendAttention('focus', {
          elementTag: (e.target as HTMLElement).tagName.toLowerCase(),
          timeOnPage: Math.floor(duration / 1000),
          scrollDepth: this.getScrollDepth(),
          hour: new Date().getHours(),
        });
      }
      this.focusTimer = setTimeout(() => { this.focusStartTime = 0; }, this.FOCUS_RESET);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.focusActive = false;
        if (this.focusTimer) clearTimeout(this.focusTimer);
      }
    });
  }

  private handleScroll(): void {
    const now = performance.now();
    if (now - this.scrollLastTime < this.DEBOUNCE_SCROLL) return;
    this.scrollLastTime = now;

    const currentY = window.scrollY;
    const lastY = (window as any)._lastScrollY || 0;
    this.scrollAccumulator += Math.abs(currentY - lastY);
    (window as any)._lastScrollY = currentY;

    if (this.scrollAccumulator >= 100) {
      this.sendAttention('scroll', {
        scrollDepth: this.getScrollDepth(),
        timeOnPage: Math.floor((now - performance.timeOrigin) / 1000),
        hour: new Date().getHours(),
        elementTag: '',
      });
      this.scrollAccumulator = 0;
    }
  }

  private handleClick(e: MouseEvent): void {
    const now = performance.now();
    if (now - this.clickLastTime < this.DEBOUNCE_CLICK) return;
    this.clickLastTime = now;

    this.sendAttention('click', {
      elementTag: (e.target as HTMLElement).tagName.toLowerCase(),
      timeOnPage: Math.floor((now - performance.timeOrigin) / 1000),
      scrollDepth: this.getScrollDepth(),
      hour: new Date().getHours(),
    });
  }

  private getScrollDepth(): number {
    const docHeight = document.body.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 1000;
    return Math.min(1000, Math.floor((window.scrollY / docHeight) * 1000));
  }

  private async sendAttention(eventType: string, context: EventContext): Promise<void> {
    const payload = {
      user_address: this.userAddress,
      event_type: eventType,
      context,
      page_url: window.location.href,
    };

    try {
      const res = await fetch(`${this.proxyUrl}/attention`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AttentionPay-Version': '1.0',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        this.sessionEvents++;
        console.log(`[AttentionPay] +${data.payout_lamports} lamports | total: ${this.sessionEvents}`);
      } else {
        console.warn('[AttentionPay] erro proxy:', res.status);
      }
    } catch (err) {
      console.error('[AttentionPay] network:', err);
    }
  }
}
