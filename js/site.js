class Portfolio {
  props = {};
  rootRef = { current: null };
  componentDidMount() {
    this.apply();
    this.onScroll = () => { if (!this.raf) this.raf = requestAnimationFrame(() => { this.raf = 0; this.scrollFx(); }); };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
    this.scrollFx();
  }
  componentDidUpdate() { this.apply(); this.scrollFx(); }
  componentWillUnmount() {
    this.io && this.io.disconnect(); this.io2 && this.io2.disconnect();
    window.removeEventListener('scroll', this.onScroll); window.removeEventListener('resize', this.onScroll);
  }
  scrollFx() {
    const root = this.rootRef.current; if (!root) return;
    const motion = true && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    const vh = window.innerHeight || 1, y = window.scrollY;
    const clamp = v => Math.max(0, Math.min(1, v));
    const doc = document.documentElement;
    const prog = root.querySelector('[data-progress]');
    if (prog) prog.style.transform = `scaleX(${clamp(y / Math.max(1, doc.scrollHeight - vh))})`;
    const hero = root.querySelector('[data-hero]');
    if (hero) {
      const p = motion ? clamp(y / Math.max(1, hero.offsetHeight)) : 0;
      const e = p * p;
      hero.style.transform = e ? `scale(${1 - e * 0.04}) translateY(${e * 24}px)` : '';
      hero.style.opacity = String(1 - e * 0.6);
    }
    const scrubs = root.querySelectorAll('[data-scrub]');
    if (scrubs.length) {
      const para = scrubs[0].parentElement.getBoundingClientRect();
      const p = clamp((vh * 0.9 - para.top) / (para.height + vh * 0.45));
      const n = scrubs.length;
      const mix = t => { const a = [72, 72, 74], b = [245, 245, 247]; return `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * t)).join(',')})`; };
      scrubs.forEach((s, i) => {
        s.style.transition = 'none';
        s.style.color = motion ? mix(clamp(p * n - i)) : '#F5F5F7';
      });
    }
    let active = '';
    ['about', 'work', 'education', 'contact'].forEach(id => {
      const el = root.querySelector('#' + id);
      if (el && el.getBoundingClientRect().top < vh * 0.4) active = id;
    });
    root.querySelectorAll('[data-nav]').forEach(a => {
      const on = a.dataset.nav === active;
      a.style.color = on ? '#1D1D1F' : '';
      a.style.fontWeight = on ? '600' : '';
    });
  }
  countUp(el) {
    const target = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    const t0 = performance.now(), dur = 1400;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  apply() {
    const root = this.rootRef.current; if (!root) return;
    root.style.setProperty('--accent', this.props.accent ?? '#4F6F7A');
    const motion = true && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    const els = root.querySelectorAll('[data-reveal]');
    const show = el => { el.style.opacity = '1'; el.style.transform = 'none'; el.dataset.shown = '1'; };
    const bars = root.querySelectorAll('[data-bar]'), counts = root.querySelectorAll('[data-count]');
    if (!motion || !('IntersectionObserver' in window)) {
      this.io && this.io.disconnect(); this.io = null;
      this.io2 && this.io2.disconnect(); this.io2 = null;
      els.forEach(show);
      bars.forEach(b => { b.style.transform = 'none'; });
      counts.forEach(c => { c.textContent = c.dataset.count; });
      return;
    }
    if (!this.io2) {
      this.io2 = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target; this.io2.unobserve(el);
          if (el.dataset.bar !== undefined) el.style.transform = 'scaleX(1)';
          else this.countUp(el);
        });
      }, { threshold: 0.5 });
      bars.forEach((b, i) => {
        b.style.transform = 'scaleX(0)';
        b.style.transition = `transform 1.4s cubic-bezier(.2,.7,.2,1) ${0.15 + i * 0.15}s`;
        this.io2.observe(b);
      });
      counts.forEach(c => { c.textContent = (0).toFixed((c.dataset.count.split('.')[1] || '').length); this.io2.observe(c); });
    }
    if (!this.io) {
      this.io = new IntersectionObserver(entries => {
        let k = 0;
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target, d = Math.min(k++, 5) * 0.08;
          el.style.transitionDelay = d + 's';
          show(el); this.io.unobserve(el);
          setTimeout(() => { el.style.transitionDelay = ''; }, (d + 1) * 1000);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const ease = 'opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1)';
    let inView = 0;
    els.forEach(el => {
      if (el.dataset.shown || el.dataset.watch) return;
      const r = el.getBoundingClientRect();
      if (!vh) { show(el); return; }
      el.dataset.watch = '1';
      el.dataset.baseTransition = el.style.transition || '';
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = (el.dataset.baseTransition ? el.dataset.baseTransition + ', ' : '') + ease;
      if (r.top < vh && r.bottom > 0) {
        const d = 0.12 + inView++ * 0.12;
        el.style.transitionDelay = d + 's';
        requestAnimationFrame(() => requestAnimationFrame(() => { show(el); setTimeout(() => { el.style.transitionDelay = ''; }, (d + 1) * 1000); }));
      } else if (r.bottom <= 0) {
        el.style.transition = el.dataset.baseTransition; show(el);
      } else this.io.observe(el);
    });
    clearTimeout(this.fallback);
    this.fallback = setTimeout(() => {
      root.querySelectorAll('[data-watch]').forEach(el => { if (!el.dataset.shown && el.getBoundingClientRect().top < (window.innerHeight || 0)) show(el); });
    }, 1500);
  }
}

document.querySelectorAll('[data-hover]').forEach(el => {
  const rules = el.dataset.hover.split(';').filter(Boolean).map(r => { const i = r.indexOf(':'); return [r.slice(0, i).trim(), r.slice(i + 1).trim()]; });
  const saved = {};
  const on = () => rules.forEach(([k, v]) => { saved[k] = el.style.getPropertyValue(k); el.style.setProperty(k, v); });
  const off = () => rules.forEach(([k]) => { el.style.setProperty(k, saved[k] || ''); });
  el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off);
  el.addEventListener('focus', on); el.addEventListener('blur', off);
});

const app = new Portfolio();
app.rootRef.current = document.getElementById('root');
app.componentDidMount();
