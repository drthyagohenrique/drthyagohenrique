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

// Instância ativa do Lenis (para âncoras usarem o mesmo smooth scroll).
let activeLenis = null;

const smoothScrollTo = (id) => (event) => {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  if (activeLenis) activeLenis.scrollTo(target, { duration: 1.4 });
  else target.scrollIntoView({ behavior: 'smooth' });
};

// Smooth scroll (Lenis) + parallax (GSAP ScrollTrigger).
// Com prefers-reduced-motion nada disso roda: a página fica estática e legível.
const useNeuroCalmaMotion = (mainRef) => {
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
    activeLenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Entrada do hero: o único momento de animação não guiada por scroll.
      gsap.from('.nc-hero__content > *', {
        opacity: 0,
        y: 34,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.09,
      });
      gsap.from('.nc-hero__visual', {
        opacity: 0,
        y: 44,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.25,
      });

      // Parallax do hero: camadas em velocidades diferentes criam profundidade.
      const heroScrub = { trigger: '.nc-hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.nc-hero__atmosphere', { yPercent: 14, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.nc-hero__waves', { yPercent: -16, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.nc-hero__particles', { yPercent: 28, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.nc-hero__content', { y: 46, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.nc-hero__visual', { y: 96, ease: 'none', scrollTrigger: heroScrub });

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

      // Anéis da apresentação: abrem conforme a seção passa.
      gsap.fromTo(
        '.nc-rings',
        { scale: 0.86, opacity: 0.65 },
        {
          scale: 1.08,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: '#apresentacao', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );

      // Saturação Neural: as camadas se dispersam com o scroll (o ruído se organiza).
      gsap.utils.toArray('.nc-layers span').forEach((el, index) => {
        gsap.to(el, {
          xPercent: -(6 + index * 7),
          ease: 'none',
          scrollTrigger: { trigger: '#saturacao-neural', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // Mock do produto na oferta: flutuação sutil de profundidade.
      gsap.fromTo(
        '.nc-mock',
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
      activeLenis = null;
    };
  }, [mainRef]);
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

// Assinatura de onda curta (eco do wordmark do checkout).
const WaveSignature = () => (
  <svg className="nc-wave-signature" viewBox="0 0 120 24" aria-hidden="true" focusable="false">
    <path
      d="M2 12 C 12 12, 16 4, 26 6 S 44 22, 56 12 S 76 2, 90 10 S 112 14, 118 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="118" cy="12" r="2.4" fill="currentColor" />
  </svg>
);

// Capa digital do produto: substitui o mockup físico do checkout mantendo a
// mesma leitura visual (preto, wordmark, tagline), mas lendo como interface.
// `interactive`: inclinação de base + tilt 3D seguindo o ponteiro (só em
// dispositivos com hover fino e sem prefers-reduced-motion).
const DigitalCover = ({ interactive = false }) => {
  const rootRef = React.useRef(null);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    if (!interactive) return undefined;
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
  }, [interactive]);

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

// Card de vídeo ilustrativo: tangibiliza o formato (aulas guiadas em vídeo)
// usando o frame oficial como poster, deixando explícito que o produto é digital.
const VideoCard = () => (
  <div className="nc-video" aria-hidden="true">
    <div className="nc-video__frame">
      <img
        src="/assets/neurocalma-video-frame.jpg"
        alt=""
        width="1672"
        height="941"
        loading="lazy"
        decoding="async"
      />
      <span className="nc-video__scrim" />
      <span className="nc-video__play">
        <svg viewBox="0 0 12 14" focusable="false">
          <path d="M1 1.5 L11 7 L1 12.5 Z" fill="currentColor" />
        </svg>
      </span>
      <span className="nc-video__duration">08:30</span>
    </div>
    <div className="nc-video__meta">
      <span className="nc-video__eyebrow">Prática guiada</span>
      <p className="nc-video__title">Desacelerando o fim do dia</p>
    </div>
  </div>
);

// Mock do produto na oferta: dispositivo exibindo o ambiente de acesso
// (encontro em andamento + percurso em quatro eixos). Leitura 100% digital.
const MOCK_BARS = [8, 14, 10, 18, 12, 22, 16, 26, 14, 20, 10, 24, 18, 12, 22, 8, 16, 12, 18, 10];

const ProductMock = () => (
  <div className="nc-mock" aria-hidden="true">
    <div className="nc-mock__glow" />
    <div className="nc-mock__device">
      <div className="nc-mock__screen">
        <div className="nc-mock__topbar">
          <span className="nc-mock__brand">
            <strong>Neuro</strong>
            <em>Calma</em>
          </span>
          <span className="nc-mock__status">Experiência Guiada</span>
        </div>
        <div className="nc-mock__player">
          <span className="nc-mock__eyebrow">Em andamento</span>
          <p className="nc-mock__title">Encontro 01 · Entendendo a sobrecarga</p>
          <svg className="nc-mock__bars" viewBox="0 0 160 32" preserveAspectRatio="none" focusable="false">
            {MOCK_BARS.map((height, index) => (
              <rect
                key={index}
                x={index * 8 + 2}
                y={16 - height / 2}
                width="3.5"
                height={height}
                rx="1.75"
                fill={index < 8 ? '#936BFF' : 'rgba(245, 243, 250, .22)'}
              />
            ))}
          </svg>
          <div className="nc-mock__row">
            <span className="nc-mock__play">
              <svg viewBox="0 0 12 14" focusable="false">
                <path d="M1 1.5 L11 7 L1 12.5 Z" fill="currentColor" />
              </svg>
            </span>
            <span className="nc-mock__track">
              <span className="nc-mock__progress" />
            </span>
            <span className="nc-mock__time">04:12</span>
          </div>
        </div>
        <ul className="nc-mock__modules">
          <li className="is-active">
            <span className="nc-mock__num">01</span>
            Perceber
            <em>em andamento</em>
          </li>
          <li>
            <span className="nc-mock__num">02</span>
            Reduzir
          </li>
          <li>
            <span className="nc-mock__num">03</span>
            Regular
          </li>
          <li>
            <span className="nc-mock__num">04</span>
            Sustentar
          </li>
        </ul>
      </div>
    </div>
    <p className="nc-visual-caption">Representação ilustrativa do ambiente digital.</p>
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
        src="/assets/neurocalma-box.jpg"
        alt="Box do NeuroCalma com tablet exibindo uma aula guiada e caderno de anotações"
        width="1374"
        height="1145"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
      <p className="nc-visual-caption">Produto 100% digital</p>
    </div>
  );
};

// Regra de CTA: hero, percurso e encerramento levam ao painel de oferta (âncora real).
// O ponto transacional é único: dentro da oferta. Com venda ativa ele vira o link
// de checkout; sem URL de checkout a oferta segue apresentável, sem botão falso.
const CtaToOffer = ({ children }) => (
  <a className="nc-button" href="#oferta" onClick={smoothScrollTo('oferta')}>
    {children}
  </a>
);

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

// Painel de oferta: espelha o checkout (mesmo nome, mesmo preço, mesmo CTA)
// para que o clique não pareça uma troca de ambiente.
const OfferPanel = () => {
  const content = neuroCalmaContent;
  const product = content.product;
  const saleActive = product.salesStatus === 'active' && product.checkoutUrl;

  return (
    <div className="nc-offer-panel">
      <div className="nc-offer-panel__cover">
        <ProductMockPhoto />
      </div>
      <div className="nc-offer-panel__info">
        <div className="nc-badge-row">
          <span className="nc-badge">{product.format}</span>
          <span className="nc-badge">Garantia de 7 dias</span>
        </div>
        <p className="nc-offer-panel__name">{product.name}</p>
        <p className="nc-offer-panel__price">{product.price}</p>
        <p className="nc-offer-panel__installments">{product.priceNote}</p>
        <p className="nc-offer-panel__text">{content.offer.text}</p>
        <p className="nc-offer-panel__meta">
          Percurso em quatro eixos — Perceber · Reduzir · Regular · Sustentar
        </p>
        {/* PENDENTE: URL real do checkout em src/config/products.js.
            Sem ela, o botão renderiza como placeholder (clique não navega). */}
        <a
          className="nc-button nc-button--offer"
          href={saleActive ? product.checkoutUrl : '#'}
          onClick={saleActive ? undefined : (event) => event.preventDefault()}
          aria-disabled={saleActive ? undefined : true}
        >
          {content.offer.ctaActive}
        </a>
        <div className="nc-guarantee">
          <span className="nc-guarantee__badge">{content.offer.guarantee.badge}</span>
          <p>{content.offer.guarantee.text}</p>
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

  useNeuroCalmaMotion(mainRef);

  return (
    <>
      <RouteSEO
        title="NeuroCalma — Experiência Guiada | Dr. Thyago Henrique"
        description="Uma experiência digital educativa para compreender a sobrecarga mental, reduzir o excesso de estímulos e construir momentos de desaceleração."
        path={product.path}
        favicon="/favicon-neurocalma.svg"
        image="/assets/og-image.jpg"
        imageAlt="NeuroCalma — Experiência Guiada de desaceleração, por Dr. Thyago Henrique"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          brand: BRAND.siteName,
          description:
            'Experiência digital educativa para compreender a sobrecarga mental, reduzir o excesso de estímulos e construir momentos de desaceleração.',
        }}
      />
      <main className="neurocalma-page" id="conteudo" ref={mainRef}>
        <a className="nc-skip-link" href="#neurocalma-main">Pular para o conteúdo</a>

        {/* 01 · HERO — ponto de maior densidade: ondas, partículas, luz violeta */}
        <section className="nc-hero" id="neurocalma-main" aria-labelledby="neurocalma-title">
          <div className="nc-hero__atmosphere" aria-hidden="true" />
          <div className="nc-hero__particles" aria-hidden="true" />
          <WaveField variant="dense" className="nc-hero__waves" />
          <div className="nc-wrap nc-hero__grid">
            <div className="nc-hero__content">
              <Label>{content.hero.eyebrow}</Label>
              <h1 id="neurocalma-title">
                {content.hero.headline[0]}
                <br />
                <em>{content.hero.headline[1]}</em>
              </h1>
              <p className="nc-hero__sub">{content.hero.subheadline}</p>
              <div className="nc-hero__actions">
                <CtaToOffer>{content.hero.cta}</CtaToOffer>
                <p className="nc-hero__price">{content.hero.priceLine}</p>
              </div>
              <a className="nc-hero__secondary" href="#apresentacao" onClick={smoothScrollTo('apresentacao')}>
                {content.hero.secondaryCta}
                <span aria-hidden="true">↓</span>
              </a>
              <p className="nc-disclaimer">{content.hero.disclaimer}</p>
            </div>
            <div className="nc-hero__visual">
              <DigitalCover interactive />
            </div>
          </div>
        </section>

        {/* 02 · RECONHECIMENTO — ainda escuro, ondas já dispersas */}
        <section className="nc-section nc-section--noise-3" id="reconhecimento" aria-labelledby="reconhecimento-title">
          <WaveField variant="medium" className="nc-section__waves" />
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.recognition.label}</Label>
              <h2 id="reconhecimento-title">{content.recognition.title}</h2>
              {content.recognition.paragraphs.map((paragraph) => (
                <p className="nc-lede" key={paragraph}>{paragraph}</p>
              ))}
              <p className="nc-statement nc-statement--accent">
                {content.recognition.close[0]}
                <br />
                {content.recognition.close[1]}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 03 · A EXPERIÊNCIA — grafite, o produto ganha corpo */}
        <section className="nc-section nc-section--noise-2" id="apresentacao" aria-labelledby="apresentacao-title">
          <div className="nc-wrap nc-split">
            <Reveal className="nc-split__text">
              <Label>{content.productIntro.label}</Label>
              <h2 id="apresentacao-title">{content.productIntro.title}</h2>
              <p className="nc-lede">{content.productIntro.text}</p>
              <ul className="nc-boundaries">
                {content.productIntro.boundaries.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="nc-lede">{content.productIntro.differentiation}</p>
            </Reveal>
            <div className="nc-split__visual" aria-hidden="true">
              <div className="nc-rings" />
            </div>
          </div>
        </section>

        {/* 04 · O PERCURSO — timeline que começa violeta e termina quase branca */}
        <Section id="percurso" label={content.journey.label} title={content.journey.title} noise={2}>
          <ol className="nc-timeline">
            {content.journey.axes.map((axis, index) => (
              <li className="nc-timeline__step" key={axis.title}>
                <span className="nc-timeline__dot" aria-hidden="true" />
                <span className="nc-timeline__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{axis.title}</h3>
                <p>{axis.text}</p>
              </li>
            ))}
          </ol>
          <p className="nc-statement">{content.journey.close}</p>
          <div className="nc-section-cta">
            <CtaToOffer>{content.hero.cta}</CtaToOffer>
          </div>
        </Section>

        {/* 05 · O QUE VOCÊ RECEBE — o mockup ganha função: formato tangível, produto digital */}
        <section className="nc-section nc-section--noise-2" id="recebe" aria-labelledby="recebe-title">
          <div className="nc-wrap nc-split nc-split--reverse">
            <Reveal className="nc-split__text">
              <Label>{content.deliverables.label}</Label>
              <h2 id="recebe-title">{content.deliverables.title}</h2>
              <p className="nc-lede">{content.deliverables.text}</p>
              <div className="nc-deliverables">
                {content.deliverables.items.map((item) => (
                  <div className="nc-deliverable" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="nc-split__visual nc-split__visual--stack" aria-hidden="true">
              <VideoCard />
            </div>
          </div>
        </section>

        {/* 06 · SATURAÇÃO NEURAL™ — a seção mais intensa: camadas comprimidas que se dispersam */}
        <section className="nc-section nc-section--noise-4" id="saturacao-neural" aria-labelledby="saturacao-neural-title">
          <div className="nc-layers" aria-hidden="true">
            <span /><span /><span /><span /><span /><span />
          </div>
          <div className="nc-wrap">
            <Reveal>
              <Label signature>{content.saturation.label}</Label>
              <h2 id="saturacao-neural-title">{content.saturation.title}</h2>
              <p className="nc-definition">{content.saturation.definition}</p>
              <p className="nc-body">{content.saturation.connection}</p>
              <p className="nc-statement">{content.saturation.central}</p>
              <p className="nc-note">{content.saturation.limit}</p>
            </Reveal>
          </div>
        </section>

        {/* 07 · PARA QUEM É — visual mais limpo, quase sem efeitos */}
        <Section id="publico" label={content.audience.label} title={content.audience.title} noise={1}>
          <div className="nc-audience">
            <div>
              <h3>Faz sentido para</h3>
              <ul>{content.audience.for.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>O NeuroCalma não substitui</h3>
              <ul>{content.audience.notReplace.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <p className="nc-note">{content.audience.urgencyNotice}</p>
        </Section>

        {/* 08 · AUTORIDADE — foto com tratamento frio, luz violeta discreta */}
        <section className="nc-section nc-section--noise-1" id="autoridade" aria-labelledby="autoridade-title">
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.authority.label}</Label>
              <div className="nc-doctor">
                <div className="nc-doctor__frame">
                  <img
                    src="/assets/dr-thyago.png"
                    alt="Retrato do Dr. Thyago Henrique"
                    width="1024"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h2 id="autoridade-title">{content.authority.title}</h2>
                  <p className="nc-lede">{content.authority.intro}</p>
                  <p className="nc-lede">{content.authority.bio}</p>
                  <span className="nc-badge nc-badge--mono">{CONTACT.crm}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 09 · OFERTA — espelho do checkout: mesmo nome, preço e sensação */}
        <Section id="oferta" label={content.offer.label} title={content.offer.title} noise={1}>
          <OfferPanel />
        </Section>

        {/* 10 · FAQ — grafite limpo, linhas finas, sem efeitos */}
        <Section id="faq" label={content.faq.label} title={content.faq.title} noise={0}>
          <NeuroCalmaFAQ />
        </Section>

        {/* 11 · CTA FINAL — o silêncio: espaço máximo, uma onda apenas */}
        <section className="nc-final" aria-labelledby="nc-final-title">
          <WaveField variant="sparse" className="nc-final__wave" />
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.finalCta.label}</Label>
              <h2 id="nc-final-title">{content.finalCta.title}</h2>
              <p>{content.finalCta.text}</p>
              <div className="nc-final__actions">
                <CtaToOffer>{content.hero.cta}</CtaToOffer>
                <p className="nc-final__price">{content.hero.priceLine}</p>
              </div>
              <p className="nc-disclaimer">{content.finalCta.disclaimer}</p>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nc-footer">
          <div className="nc-wrap">
            <p className="nc-footer__brand">
              <WaveSignature />
              Dr. Thyago Henrique · {CONTACT.crm}
            </p>
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
