import React from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RouteSEO from '../../components/seo/RouteSEO.jsx';
import { BRAND } from '../../config/brand.js';
import { CONTACT } from '../../config/contact.js';
import { ROUTES } from '../../config/routes.js';
import { neuroCalmaContent } from './content.js';
import './neurocalma.css';

gsap.registerPlugin(ScrollTrigger);

// A splash roda uma vez por sessão, nunca com prefers-reduced-motion.
const SPLASH_SESSION_KEY = 'nc-splash-seen';

const shouldShowSplash = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  // Tráfego pago não espera: com utm/click id na URL, direto para a promessa.
  if (/[?&](utm_|gclid|fbclid)/i.test(window.location.search)) return false;
  try {
    if (window.sessionStorage.getItem(SPLASH_SESSION_KEY) === '1') return false;
  } catch {
    // sem sessionStorage (modo privado restrito): splash roda normalmente
  }
  return true;
};

// Smooth scroll (Lenis) + parallax (GSAP ScrollTrigger).
// Com prefers-reduced-motion nada disso roda: a página fica estática e legível.
// `splashActive` sincroniza a entrada do hero com a abertura da splash.
const useNeuroCalmaMotion = (mainRef, splashActive) => {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const heroDelay = splashActive ? 1.5 : 0.15;

    const ctx = gsap.context(() => {
      // Entrada do hero, sincronizada com a abertura da splash (2.2s–3s):
      // eyebrow → headline → sub → CTA/microcopy → apoio.
      gsap.from('.nc-hero__content > *', {
        opacity: 0,
        y: 34,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        delay: heroDelay,
      });
      // Parallax do hero: camadas em velocidades diferentes criam profundidade.
      const heroScrub = { trigger: '.nc-hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.nc-hero__atmosphere', { yPercent: 14, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.nc-hero__waves', { yPercent: -16, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.nc-hero__particles', { yPercent: 28, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.nc-hero__content', { y: 46, ease: 'none', scrollTrigger: heroScrub });

      // Ondas internas: deslizam contra o scroll enquanto a seção cruza a viewport.
      gsap.utils.toArray('.nc-section__waves, .nc-final__wave').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 18 },
          {
            yPercent: -14,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      // Mock do ambiente na apresentação: leve flutuação de profundidade.
      gsap.fromTo(
        '#apresentacao .nc-mock',
        { y: 36 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: { trigger: '#apresentacao', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );

      // Capa digital em "o que você recebe": mesma flutuação.
      gsap.fromTo(
        '#recebe .nc-cover',
        { y: 36 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: { trigger: '#recebe', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );

      // Camadas da Saturação Neural™: dispersam com o scroll.
      gsap.utils.toArray('.nc-layers span').forEach((el, index) => {
        gsap.to(el, {
          xPercent: -(6 + index * 7),
          ease: 'none',
          scrollTrigger: { trigger: '#publico', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // Mock do produto na oferta: flutuação sutil de profundidade.
      gsap.fromTo(
        '#oferta .nc-mock',
        { y: 44 },
        {
          y: -26,
          ease: 'none',
          scrollTrigger: { trigger: '#oferta', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, mainRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [mainRef, splashActive]);
};

// Revela a seção com fade lento na primeira entrada em viewport.
// prefers-reduced-motion é tratado no CSS (conteúdo sempre visível).
const Reveal = ({ children, className = '' }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`nc-reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Label = ({ children, signature = false }) => (
  <p className="nc-label">
    {signature ? <span className="nc-label__signature" aria-hidden="true" /> : null}
    {children}
  </p>
);

// Narrativa "do ruído ao silêncio": as seções carregam um nível de densidade
// (noise-4 = pico de intensidade → noise-0 = superfícies limpas do fim da página).
const Section = ({ id, label, title, children, noise = 1, labelSignature = false, className = '' }) => (
  <section
    className={`nc-section nc-section--noise-${noise} ${className}`}
    id={id}
    aria-labelledby={`${id}-title`}
  >
    <div className="nc-wrap">
      <Reveal>
        {label ? <Label signature={labelSignature}>{label}</Label> : null}
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
      </Reveal>
    </div>
  </section>
);

/* ---------- Elementos visuais (todos decorativos, aria-hidden) ---------- */

// Campo de ondas: variantes controlam a densidade — 'dense' abre a página
// com ruído visual; 'sparse' aparece quando o ruído já se dispersou.
const WAVE_PATHS = {
  dense: [
    'M0 250 C 180 140, 360 350, 560 240 S 940 120, 1140 250 S 1360 340, 1440 230',
    'M0 300 C 200 200, 420 390, 640 290 S 1020 180, 1240 300 S 1400 360, 1440 290',
    'M0 200 C 160 110, 380 280, 600 190 S 980 90, 1200 210 S 1380 280, 1440 180',
    'M0 350 C 240 260, 460 430, 700 340 S 1080 240, 1300 350 S 1420 400, 1440 340',
    'M0 150 C 200 80, 400 220, 620 140 S 1000 60, 1220 160 S 1390 220, 1440 130',
  ],
  medium: [
    'M0 240 C 240 150, 480 330, 720 240 S 1200 140, 1440 240',
    'M0 300 C 260 220, 520 380, 760 300 S 1220 210, 1440 300',
    'M0 180 C 220 110, 460 250, 700 180 S 1180 100, 1440 180',
  ],
  sparse: ['M0 240 C 260 180, 520 300, 780 240 S 1240 190, 1440 240'],
};

const HERO_PARTICLES = [
  { x: '12%', y: '24%', size: 3, duration: '8.5s', delay: '-2.4s' },
  { x: '28%', y: '68%', size: 2, duration: '10.5s', delay: '-6.8s' },
  { x: '44%', y: '18%', size: 4, duration: '9.2s', delay: '-1.3s' },
  { x: '58%', y: '82%', size: 2, duration: '12s', delay: '-8.1s' },
  { x: '70%', y: '34%', size: 3, duration: '9.8s', delay: '-4.5s' },
  { x: '82%', y: '74%', size: 2, duration: '11.3s', delay: '-2.8s' },
  { x: '90%', y: '22%', size: 4, duration: '8.9s', delay: '-6.1s' },
  { x: '36%', y: '46%', size: 2, duration: '12.5s', delay: '-3.9s' },
  { x: '64%', y: '58%', size: 2, duration: '10.1s', delay: '-7.2s' },
];

const WaveField = ({ variant = 'dense', className = '' }) => (
  <svg
    className={`nc-waves nc-waves--${variant} ${className}`}
    viewBox="0 0 1440 480"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id={`nc-wave-grad-${variant}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7B4DFF" stopOpacity="0" />
        <stop offset="0.35" stopColor="#936BFF" stopOpacity="0.9" />
        <stop offset="0.65" stopColor="#5D6CFF" stopOpacity="0.7" />
        <stop offset="1" stopColor="#5D6CFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    {WAVE_PATHS[variant].map((d, index) => (
      <path key={d} d={d} fill="none" stroke={`url(#nc-wave-grad-${variant})`} strokeWidth={index === 0 ? 1.6 : 1} />
    ))}
  </svg>
);

// Tilt 3D seguindo o ponteiro: inclinação de base + resposta ao mouse (só em
// dispositivos com hover fino e sem prefers-reduced-motion).
const useTilt = (rootRef, cardRef, enabled) => {
  React.useEffect(() => {
    if (!enabled) return undefined;
    const root = rootRef.current;
    const card = cardRef.current;
    if (!root || !card) return undefined;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced) return undefined;

    gsap.set(card, { transformPerspective: 1100, rotationY: -7, rotationX: 2 });
    const toRotateY = gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3.out' });
    const toRotateX = gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3.out' });

    const onMove = (event) => {
      const rect = root.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      toRotateY(-7 + px * 16);
      toRotateX(2 - py * 12);
    };
    const onLeave = () => {
      toRotateY(-7);
      toRotateX(2);
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [rootRef, cardRef, enabled]);
};

// Capa digital do produto: leitura de interface, alinhada ao checkout.
const DigitalCover = ({ interactive = false }) => {
  const rootRef = React.useRef(null);
  const cardRef = React.useRef(null);
  useTilt(rootRef, cardRef, interactive);

  return (
    <div ref={rootRef} className={`nc-cover ${interactive ? 'nc-cover--interactive' : ''}`} aria-hidden="true">
      <div className="nc-cover__glow" />
      <div ref={cardRef} className="nc-cover__card">
        <span className="nc-cover__eyebrow">Experiência Guiada</span>
        <p className="nc-cover__wordmark">
          <strong>Neuro</strong>
          <em>Calma</em>
        </p>
        <span className="nc-cover__divider" />
        <p className="nc-cover__tagline">
          sua mente,
          <br />
          seu ritmo,
          <br />
          <span>sua calma.</span>
        </p>
        <span className="nc-cover__chip">Acesso digital</span>
      </div>
    </div>
  );
};

// Splash cinematográfica de entrada (~3s): assinatura tipográfica com reveal
// mascarado, onda que se desenha, pulso do logo, bloom central e abertura em
// dois painéis revelando a Hero. Não simula carregamento — a página renderiza
// por trás desde o primeiro frame. Roda uma vez por sessão, nunca com
// prefers-reduced-motion, e tem timeout de segurança de 3.4s.
const NeuroCalmaSplash = ({ enabled }) => {
  const [done, setDone] = React.useState(!enabled);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (done) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    try {
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
    } catch {
      // sem sessionStorage: splash apenas repete na próxima visita
    }

    // Trava o scroll enquanto a splash está na tela.
    document.body.style.overflow = 'hidden';

    const q = (selector) => root.querySelector(selector);
    const finish = () => setDone(true);
    // Timeout de segurança: nada prende a página além de ~2.6s.
    const safety = window.setTimeout(finish, 2600);

    const tl = gsap.timeline({ onComplete: finish });
    // 0–0.9s · assinatura de entrada: eyebrow abre o tracking, wordmark sobe
    // mascarado, a onda se desenha e o microtexto assenta.
    tl.fromTo(
      q('.nc-splash__eyebrow'),
      { opacity: 0, letterSpacing: '0.6em' },
      { opacity: 1, letterSpacing: '0.34em', duration: 0.7, ease: 'power2.out' },
      0.05
    );
    tl.from(
      root.querySelectorAll('.nc-splash__reveal-inner'),
      { yPercent: 112, duration: 0.75, ease: 'power4.out', stagger: 0.1 },
      0.05
    );
    tl.fromTo(
      q('.nc-splash__sig path'),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' },
      0.35
    );
    tl.fromTo(q('.nc-splash__sig circle'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.85);
    tl.fromTo(q('.nc-splash__micro'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4);
    tl.fromTo(q('.nc-splash__particles'), { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.15);
    tl.to(q('.nc-splash__particles'), { y: -22, duration: 1.8, ease: 'none' }, 0.15);
    // 0.7–1.3s · pulso discreto
    tl.to(q('.nc-splash__logo'), { scale: 1.015, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.7);
    // 1.0–1.4s · bloom central e linha de abertura
    tl.fromTo(
      q('.nc-splash__bloom'),
      { opacity: 0, scale: 0.4 },
      { opacity: 0.9, scale: 1.5, duration: 0.3, ease: 'power2.out' },
      1.0
    );
    tl.to(q('.nc-splash__bloom'), { opacity: 0, scale: 2.1, duration: 0.35, ease: 'power2.in' }, 1.3);
    tl.to(q('.nc-splash__line'), { scaleX: 1, opacity: 1, duration: 0.28, ease: 'power3.out' }, 1.05);
    // saída do logo: sobe de leve, desfoca e some
    tl.to(q('.nc-splash__logo'), { opacity: 0, y: -16, scale: 1.04, filter: 'blur(8px)', duration: 0.35, ease: 'power2.in' }, 1.12);
    tl.to(q('.nc-splash__micro'), { opacity: 0, duration: 0.25 }, 1.2);
    // 1.3–2.05s · abertura cinematográfica dos painéis
    tl.to(q('.nc-splash__panel--top'), { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, 1.3);
    tl.to(q('.nc-splash__panel--bottom'), { yPercent: 100, duration: 0.75, ease: 'power4.inOut' }, 1.3);
    tl.to(q('.nc-splash__line'), { opacity: 0, duration: 0.35, ease: 'power1.out' }, 1.55);
    tl.to(q('.nc-splash__particles'), { opacity: 0, duration: 0.35 }, 1.45);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="nc-splash" ref={rootRef} aria-hidden="true">
      <div className="nc-splash__panel nc-splash__panel--top" />
      <div className="nc-splash__panel nc-splash__panel--bottom" />
      <div className="nc-splash__particles" />
      <span className="nc-splash__bloom" />
      <div className="nc-splash__logo">
        <span className="nc-splash__eyebrow">Experiência Guiada</span>
        <p className="nc-splash__wordmark">
          <span className="nc-splash__reveal">
            <span className="nc-splash__reveal-inner"><strong>Neuro</strong></span>
          </span>
          <span className="nc-splash__reveal">
            <span className="nc-splash__reveal-inner"><em>Calma</em></span>
          </span>
        </p>
        <svg className="nc-splash__sig" viewBox="0 0 120 24" focusable="false">
          <path
            d="M2 12 C 12 12, 16 4, 26 6 S 44 22, 56 12 S 76 2, 90 10 S 112 14, 118 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength="1"
          />
          <circle cx="118" cy="12" r="2.4" fill="currentColor" />
        </svg>
      </div>
      <span className="nc-splash__line" />
      <p className="nc-splash__micro">Dr. Thyago Henrique · CRM-GO 30.392</p>
    </div>
  );
};

// Card de vídeo ilustrativo: tangibiliza o formato (videoaulas) usando o
// frame oficial como poster — rosto + play = "tem conteúdo para assistir".
// `interactive` (hero): inclinação de base + tilt 3D + glow violeta.
const CheckoutMockup = () => {
  const rootRef = React.useRef(null);
  const cardRef = React.useRef(null);
  useTilt(rootRef, cardRef, true);

  return (
    <div ref={rootRef} className="nc-checkout-mock" aria-hidden="true">
      <div className="nc-checkout-mock__glow" />
      <div ref={cardRef} className="nc-checkout-mock__frame">
        <img
          src="/assets/neurocalma-checkout.png"
          alt=""
          width="451"
          height="470"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};

// Mock em código do ambiente de acesso (plataforma com aula e etapas).
const MOCK_BARS = [8, 14, 10, 18, 12, 22, 16, 26, 14, 20, 10, 24, 18, 12, 22, 8, 16, 12, 18, 10];

const ProductMock = () => (
  <div className="nc-mock" aria-hidden="true">
    <div className="nc-mock__glow" />
    <div className="nc-mock__device">
      <div className="nc-mock__video-frame">
        <img
          src="/assets/neurocalma-box.jpg"
          alt=""
          width="1374"
          height="1145"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
    <p className="nc-mock__disclaimer">*Imagem meramente ilustrativa, produto 100% digital.</p>
  </div>
);

// Mock fotográfico do produto (escolha do usuário): o box do NeuroCalma.
// Se a imagem falhar, o ProductMock em código entra como fallback automático.
const ProductMockPhoto = () => {
  const [failed, setFailed] = React.useState(false);

  if (failed) return <ProductMock />;

  return (
    <div className="nc-mock nc-mock--photo">
      <div className="nc-mock__glow" aria-hidden="true" />
      <img
        className="nc-mock__photo"
        src="/assets/neurocalma-video-frame.jpg"
        alt="Frame de uma videoaula do NeuroCalma"
        width="1672"
        height="941"
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
      />
      <p className="nc-visual-caption">Produto 100% digital</p>
    </div>
  );
};

// Todo CTA comercial usa a mesma fonte de verdade para o checkout.
const CheckoutCta = ({ children, className = 'nc-button', tabIndex }) => {
  const product = neuroCalmaContent.product;
  const saleActive = product.salesStatus === 'active' && product.checkoutUrl;

  return (
    <a
      className={className}
      href={saleActive ? product.checkoutUrl : '#'}
      onClick={saleActive ? undefined : (event) => event.preventDefault()}
      aria-disabled={saleActive ? undefined : true}
      tabIndex={tabIndex}
    >
      {children}
    </a>
  );
};

const SectionCta = () => (
  <div className="nc-section-cta">
    <CheckoutCta>{neuroCalmaContent.hero.cta}</CheckoutCta>
  </div>
);

// Atalho persistente no mobile: barra inferior que aparece depois do hero e
// some quando a oferta ou o fechamento estão na tela (para não cobrir o botão real).
const StickyCta = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector('.nc-hero');
    const offer = document.getElementById('oferta');
    const final = document.querySelector('.nc-final');
    if (!hero || !offer || typeof IntersectionObserver === 'undefined') return undefined;

    let pastHero = false;
    let nearOffer = false;
    let nearFinal = false;
    const update = () => setVisible(pastHero && !nearOffer && !nearFinal);

    const heroObserver = new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting;
      update();
    });
    const offerObserver = new IntersectionObserver(([entry]) => {
      nearOffer = entry.isIntersecting;
      update();
    });
    const finalObserver = new IntersectionObserver(([entry]) => {
      nearFinal = entry.isIntersecting;
      update();
    });

    heroObserver.observe(hero);
    offerObserver.observe(offer);
    if (final) finalObserver.observe(final);
    return () => {
      heroObserver.disconnect();
      offerObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  return (
    <div className={`nc-sticky ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <p className="nc-sticky__note">
        Garantia de 7 dias
      </p>
      <CheckoutCta className="nc-button nc-sticky__button" tabIndex={visible ? 0 : -1}>
        Começar Agora
      </CheckoutCta>
    </div>
  );
};

const NeuroCalmaFAQ = () => {
  const [open, setOpen] = React.useState(0);
  const { items } = neuroCalmaContent.faq;

  return (
    <div className="nc-faq-list">
      {items.map((item, index) => {
        const active = open === index;
        const answerId = `nc-faq-${index}`;

        return (
          <div className="nc-faq-item" key={item.question}>
            <button
              type="button"
              aria-expanded={active}
              aria-controls={answerId}
              onClick={() => setOpen(active ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className="nc-faq-toggle" aria-hidden="true">{active ? '−' : '+'}</span>
            </button>
            <div className={`nc-faq-answer ${active ? 'is-open' : ''}`} id={answerId} aria-hidden={!active}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Painel de oferta: apresenta produto, CTA e garantia no mesmo lugar.
const OfferPanel = () => {
  const content = neuroCalmaContent;
  const product = content.product;
  const saleActive = product.salesStatus === 'active' && product.checkoutUrl;

  return (
    <div className="nc-offer-panel">
      {/* Coluna do produto: mock, CTA e segurança no mesmo bloco de decisão. */}
      <div className="nc-offer-panel__cover">
        <ProductMockPhoto />
        <div className="nc-offer-panel__pricing">
          <div className="nc-badge-row">
            <span className="nc-badge">{product.format}</span>
            <span className="nc-badge">Garantia de 7 dias</span>
          </div>
          <p className="nc-offer-panel__name">{product.name}</p>
          <CheckoutCta className="nc-button nc-button--offer">
            {content.offer.ctaActive}
          </CheckoutCta>
          <p className="nc-offer-panel__security">{content.offer.security}</p>
          <ul className="nc-trust" aria-label="Segurança da compra">
          <li>
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5.5 7 V5 a2.5 2.5 0 0 1 5 0 V7" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Compra segura
          </li>
          <li>
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M9 1.5 L3.5 9 H7.5 L7 14.5 L12.5 7 H8.5 Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            Acesso imediato
          </li>
          <li>
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M8 1.5 L13.5 3.5 V8 C13.5 11.5 11 13.8 8 14.8 C5 13.8 2.5 11.5 2.5 8 V3.5 Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M5.5 8 L7.3 9.8 L10.5 6.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            7 dias de garantia
          </li>
          </ul>
        </div>
      </div>
      {/* Coluna da proposta: texto, pilha de valor e garantia. */}
      <div className="nc-offer-panel__info">
        <p className="nc-offer-panel__text">{content.offer.text}</p>
        <p className="nc-offer-panel__stack-title">Você recebe:</p>
        <ul className="nc-stack">
          {content.offer.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="nc-guarantee">
          <span className="nc-guarantee__badge">{content.offer.guarantee.badge}</span>
          <h3>{content.offer.guarantee.title}</h3>
          <p>{content.offer.guarantee.text}</p>
          <p className="nc-guarantee__close">{content.offer.guarantee.close}</p>
        </div>
        <p className="nc-disclaimer">{content.offer.disclaimer}</p>
      </div>
    </div>
  );
};

const NeuroCalmaPage = () => {
  const content = neuroCalmaContent;
  const product = content.product;
  const mainRef = React.useRef(null);
  const showSplash = React.useMemo(shouldShowSplash, []);

  useNeuroCalmaMotion(mainRef, showSplash);

  return (
    <>
      <RouteSEO
        title="NeuroCalma — Experiência Guiada | Dr. Thyago Henrique"
        description="Videoaulas com técnicas simples para ajudar você a desligar, descansar e desconectar a cabeça depois de um dia pesado. Acesso imediato."
        path={product.path}
        favicon="/favicon-neurocalma.svg"
        image="/assets/og-image.jpg"
        imageAlt="NeuroCalma — videoaulas e técnicas práticas para desacelerar, por Dr. Thyago Henrique"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          brand: BRAND.siteName,
          description:
            'Produto digital com videoaulas e técnicas práticas para ajudar a desacelerar, desligar e descansar a cabeça. Conteúdo educativo.',
        }}
      />
      <main className="neurocalma-page" id="conteudo" ref={mainRef}>
        <NeuroCalmaSplash enabled={showSplash} />
        <StickyCta />
        <a className="nc-skip-link" href="#neurocalma-main">Pular para o conteúdo</a>

        {/* 1 · HERO — um único CTA; o indicador de scroll é apenas visual */}
        <section className="nc-hero" id="neurocalma-main" aria-labelledby="neurocalma-title">
          <div className="nc-hero__atmosphere" aria-hidden="true" />
          <div className="nc-hero__particles" aria-hidden="true">
            {HERO_PARTICLES.map((particle, index) => (
              <span
                className="nc-hero__particle"
                key={index}
                style={{
                  '--particle-x': particle.x,
                  '--particle-y': particle.y,
                  '--particle-size': `${particle.size}px`,
                  '--particle-duration': particle.duration,
                  '--particle-delay': particle.delay,
                }}
              />
            ))}
          </div>
          <WaveField variant="dense" className="nc-hero__waves" />
          <div className="nc-wrap nc-hero__grid">
            <div className="nc-hero__content">
              <Label>{content.hero.eyebrow}</Label>
              <h1 id="neurocalma-title">
                {content.hero.headline[0]}
                <br />
                <em>{content.hero.headline[1]}</em>
              </h1>
              <p className="nc-hero__sub">
                {content.hero.subheadline.map((line, index) => (
                  <React.Fragment key={line}>
                    {line}
                    {index < content.hero.subheadline.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
              <div className="nc-hero__actions">
                <CheckoutCta>{content.hero.cta}</CheckoutCta>
                <p className="nc-hero__microcopy">{content.hero.microcopy}</p>
              </div>
            </div>
            <div className="nc-hero__visual">
              <CheckoutMockup />
              <p className="nc-hero__disclaimer">*Este conteúdo não substitui avaliação, acompanhamento ou tratamento médico ou psicológico. Imagem meramente ilustrativa, produto 100% digital.</p>
            </div>
          </div>
          <span className="nc-hero__scroll-hint" aria-hidden="true">↓</span>
        </section>

        {/* Indicador de scroll (mobile): cavalga a divisa entre o hero e a
            dobra seguinte, com bob suave apontando a rolagem. */}
        <div className="nc-scroll-cue" aria-hidden="true">
          <span className="nc-scroll-cue__circle">↓</span>
        </div>

        {/* 2 · APRESENTAÇÃO DA EXPERIÊNCIA */}
        <section className="nc-section nc-section--noise-3" id="reconhecimento" aria-labelledby="reconhecimento-title">
          <WaveField variant="medium" className="nc-section__waves" />
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.intro.label}</Label>
              <h2 id="reconhecimento-title">{content.intro.title}</h2>
              <p className="nc-lede">{content.intro.text}</p>
              <p className="nc-statement nc-statement--accent">{content.intro.close}</p>
            </Reveal>
          </div>
        </section>

        {/* 3 · EXPLICAÇÃO + SOLUÇÃO + CTA */}
        <section className="nc-section nc-section--noise-2" id="apresentacao" aria-labelledby="apresentacao-title">
          <div className="nc-wrap nc-split">
            <Reveal className="nc-split__text">
              <Label>{content.explanation.label}</Label>
              <h2 id="apresentacao-title">{content.explanation.title}</h2>
              {content.explanation.paragraphs.map((paragraph) => (
                <p className="nc-lede" key={paragraph}>{paragraph}</p>
              ))}
              <p className="nc-statement nc-statement--accent">{content.explanation.bridge}</p>
              <h3 className="nc-product-title">{content.explanation.productTitle}</h3>
              <p className="nc-lede">{content.explanation.productText}</p>
              <ul className="nc-boundaries">
                {content.explanation.boundaries.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="nc-statement">{content.explanation.close}</p>
            </Reveal>
            <div className="nc-split__visual nc-split__visual--stack" aria-hidden="true">
              <ProductMock />
            </div>
          </div>
        </section>

        {/* 4 · COMO FUNCIONA — três etapas na timeline */}
        <Section id="como-funciona" label={content.how.label} title={content.how.title} noise={2}>
          <ol className="nc-timeline nc-timeline--three">
            {content.how.steps.map((step, index) => (
              <li className="nc-timeline__step" key={step.title}>
                <span className="nc-timeline__dot" aria-hidden="true" />
                <span className="nc-timeline__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="nc-statement">{content.how.close}</p>
        </Section>

        {/* 5 · TRANSFORMAÇÃO + CTA */}
        <Section id="transformacao" label={content.transformation.label} title={content.transformation.title} noise={1}>
          <div className="nc-audience nc-audience--transform">
            <div>
              <h3>{content.transformation.before.title}</h3>
              <ul>{content.transformation.before.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>{content.transformation.after.title}</h3>
              <ul>{content.transformation.after.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <p className="nc-statement nc-statement--accent">
            {content.transformation.close[0]}
            <br />
            {content.transformation.close[1]}
          </p>
        </Section>

        {/* 6 · O QUE VOCÊ RECEBE — quatro itens + mockup de videoaula + CTA */}
        <section className="nc-section nc-section--noise-2" id="recebe" aria-labelledby="recebe-title">
          <div className="nc-wrap nc-split nc-split--reverse">
            <Reveal className="nc-split__text">
              <Label>{content.deliverables.label}</Label>
              <h2 id="recebe-title">{content.deliverables.title}</h2>
              <div className="nc-deliverables">
                {content.deliverables.items.map((item) => (
                  <div className="nc-deliverable" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
              <SectionCta />
            </Reveal>
            <div className="nc-split__visual nc-split__visual--stack" aria-hidden="true">
              <DigitalCover />
            </div>
          </div>
        </section>

        {/* 06 · RECONHECIMENTO + USO NA ROTINA */}
        <section className="nc-section nc-section--noise-1" id="rotina-real" aria-labelledby="rotina-real-title">
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.routine.label}</Label>
              <h2 id="rotina-real-title">{content.routine.title}</h2>
              <div className="nc-routine__intro">
                {content.routine.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </Reveal>

            <div className="nc-routine__grid">
              <Reveal className="nc-routine__recognition">
                <h3>{content.routine.audienceTitle}</h3>
                <ul className="nc-routine__list">
                  {content.routine.audience.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Reveal>

              <Reveal className="nc-routine__usage">
                <h3>{content.routine.transition}</h3>
                <p>{content.routine.transitionText}</p>
                <ol className="nc-routine__steps">
                  {content.routine.steps.map((step, index) => (
                    <li key={step.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal>
              <div className="nc-routine__close">
                <p>{content.routine.close}</p>
                <small>{content.routine.closeNote}</small>
              </div>
            </Reveal>

            <Reveal>
              <div className="nc-routine__authority">
                <div className="nc-doctor__frame nc-routine__authority-photo">
                  <img
                    src="/assets/dr-thyago.png"
                    alt="Dr. Thyago Henrique"
                    width="1024"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <Label>{content.routine.authority.label}</Label>
                <h3>{content.routine.authority.title}</h3>
                <p>{content.routine.authority.text}</p>
                <p>{content.routine.authority.productText}</p>
                <div className="nc-routine__safety">
                  <strong>{content.routine.authority.safetyTitle}</strong>
                  <p>{content.routine.authority.safetyText}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 9 · OFERTA + GARANTIA */}
        <Section id="oferta" label={content.offer.label} title={content.offer.title} noise={1}>
          <OfferPanel />
        </Section>

        {/* 10 · FAQ + CTA FINAL */}
        <Section id="faq" label={content.faq.label} title={content.faq.title} noise={0}>
          <NeuroCalmaFAQ />
        </Section>

        <section className="nc-final" aria-labelledby="nc-final-title">
          <WaveField variant="sparse" className="nc-final__wave" />
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.finalCta.label}</Label>
              <h2 id="nc-final-title">{content.finalCta.title}</h2>
              {content.finalCta.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="nc-final__actions">
                <CheckoutCta>{content.finalCta.cta}</CheckoutCta>
              </div>
              <p className="nc-final__close">
                {content.finalCta.close[0]}
                <br />
                {content.finalCta.close[1]}
              </p>
              <p className="nc-disclaimer">{content.finalCta.disclaimer}</p>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nc-footer">
          <div className="nc-wrap">
            <div className="nc-footer__top">
              <div>
                <p className="nc-footer__name">Dr. Thyago Henrique</p>
                <p className="nc-footer__crm">{CONTACT.crm}</p>
              </div>
              <p className="nc-footer__logo" aria-label="NeuroCalma">
                <strong>Neuro</strong>
                <em>Calma</em>
              </p>
            </div>
            <p>{content.footer.ecosystem}</p>
            <nav aria-label="Links do ecossistema">
              <Link to="/">Ecossistema</Link>
              <Link to={ROUTES.privacy}>Política de Privacidade</Link>
              <Link to={ROUTES.terms}>Termos de Uso</Link>
              <a href={`mailto:${CONTACT.email}`}>Contato</a>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
};

export default NeuroCalmaPage;
