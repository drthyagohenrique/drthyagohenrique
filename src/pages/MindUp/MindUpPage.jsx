import React from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RouteSEO from '../../components/seo/RouteSEO.jsx';
import { BRAND } from '../../config/brand.js';
import { CONTACT } from '../../config/contact.js';
import { ROUTES } from '../../config/routes.js';
import { mindUpContent } from './content.js';
import { Icon } from './icons.jsx';
import { MindUpDownloadCta, MindUpDownloadProvider } from './MindUpDownload.jsx';
import { MindUpMockup } from './MindUpMockup.jsx';
import './mindup.css';

gsap.registerPlugin(ScrollTrigger);

const content = mindUpContent;

// Smooth scroll (Lenis) + entrada do hero + reveals de seção (GSAP).
// Com prefers-reduced-motion nada roda: a página fica estática e legível.
const useMindUpMotion = (rootRef) => {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from('.mu-hero__content > *', {
        opacity: 0,
        y: 34,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.25,
      });
      gsap.from('.mu-hero__mock', {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.5,
      });
      gsap.to('.mu-hero .mu-device', {
        y: -12,
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });
      gsap.to('.mu-hero__video', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.mu-hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.utils.toArray('.mu-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [rootRef]);
};

/* ── Peças compartilhadas ────────────────────────────────────────────── */

const Arrow = () => <span aria-hidden={true}>&rarr;</span>;

const Tag = ({ children }) => (
  <p className="mu-tag">
    <span className="mu-tag__dot" aria-hidden={true} />
    {children}
  </p>
);

const Device = ({ image }) => (
  <div className="mu-device">
    <MindUpMockup image={image} />
  </div>
);

const UiNote = () => null;

/* ── Componentes do app (MindUp Design System v1.0) ──────────────────── */

const Toast = ({ toast, index }) => (
  <div className={`mu-toast is-${toast.tone} mu-bob`} style={{ animationDelay: `${index * 0.9}s` }}>
    <span className="mu-toast__icon" aria-hidden={true}>
      <Icon name={toast.icon} size={17} />
    </span>
    <span>
      <b>{toast.title}</b>
      <em>{toast.desc}</em>
    </span>
  </div>
);

const MissionCard = ({ card }) => (
  <article className={`mu-mission is-${card.pillarClass}`}>
    <div className="mu-mission__head">
      <span className="mu-mission__icon" aria-hidden={true}>
        <Icon name={card.icon} size={17} />
      </span>
      <span>
        <b>{card.title}</b>
        <em>{card.pillar}</em>
      </span>
    </div>
    <div className="mu-mission__foot">
      <span className="mu-mission__chip">
        <Icon name="clock" size={11} /> {card.time}
      </span>
      <span className="mu-mission__chip is-xp">
        <Icon name="zap" size={11} /> {card.xp}
      </span>
      <span className={`mu-mission__check ${card.done ? 'is-done' : ''}`} aria-hidden={true}>
        <Icon name="check" size={13} strokeWidth={2.4} />
      </span>
    </div>
  </article>
);

const CheckinCard = ({ card }) => (
  <div className="mu-checkin">
    <div className="mu-checkin__head">
      <span>
        <b>
          <Icon name="barChart" size={14} className="mu-checkin__titleicon" /> {card.title}
        </b>
        <em>{card.sub}</em>
      </span>
      <span className="mu-app-badge is-streak">Disponível</span>
    </div>
    {card.rows.map((row) => (
      <div className="mu-checkin__row" key={row.label}>
        <span>{row.label}</span>
        <div className="mu-meter">
          <div className={`mu-meter__fill grad-${row.grad}`} style={{ width: `${row.value}%` }} />
        </div>
        <b>{row.value}</b>
      </div>
    ))}
  </div>
);

const AttrCard = ({ card }) => (
  <article className="mu-attr">
    <div className="mu-attr__head">
      <span className={`mu-attr__icon grad-${card.grad}-soft`} aria-hidden={true}>
        <Icon name={card.icon} size={15} />
      </span>
      <span className="mu-attr__score">
        <b>{card.value}</b>
        <em className={card.up ? 'is-up' : 'is-down'}>
          <Icon name={card.up ? 'arrowUpRight' : 'arrowDownRight'} size={10} strokeWidth={2.2} /> {card.delta}
        </em>
      </span>
    </div>
    <span className="mu-attr__name">{card.name}</span>
    <div className="mu-meter">
      <div className={`mu-meter__fill grad-${card.grad}`} style={{ width: `${card.value}%` }} />
    </div>
  </article>
);

const XpBar = ({ xpBar }) => (
  <div className="mu-xp">
    <div className="mu-xp__meta">
      <b>{xpBar.label}</b>
      <em>{xpBar.value}</em>
    </div>
    <div className="mu-xp__bar">
      <div className="mu-xp__fill" style={{ width: `${xpBar.percent}%` }} />
      <div className="mu-xp__shine" aria-hidden={true} />
    </div>
  </div>
);

/* ── Header / Hero ───────────────────────────────────────────────────── */

const Logo = () => (
  <Link to="/" className="mu-logo" aria-label="Voltar para a página inicial">
    <img src="/assets/mindup/ChatGPT Image 17 de jul. de 2026, 20_22_46.png" alt="MindUp" />
  </Link>
);

const Header = () => (
  <header className="mu-header">
    <div className="mu-header__bar">
      <Logo />
      <nav aria-label="Seções da página">
        <a href="#como">Como funciona</a>
        <a href="#missao">O app</a>
        <a href="#premium">Assinatura</a>
        <a href="#faq">Perguntas</a>
      </nav>
      <MindUpDownloadCta source="navigation" className="mu-button mu-button--small">
        Baixar
      </MindUpDownloadCta>
    </div>
  </header>
);

const Hero = () => {
  const videoRef = React.useRef(null);

  // Câmera lenta (0.5x): playbackRate não existe como atributo HTML.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = 0.5;
    video.playbackRate = 0.5;
  }, []);

  return (
    <section className="mu-hero">
      <video
        ref={videoRef}
        className="mu-hero__video"
        src="/assets/mindup/fundo-hero-mindup.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden={true}
      />
      <div className="mu-hero__scrim" aria-hidden={true} />
      <div className="mu-container mu-hero__grid">
        <div className="mu-hero__content">
          <p className="mu-badge">{content.hero.eyebrow}</p>
          <h1>
            {content.hero.headline[0]} <em>{content.hero.headline[1]}</em>
          </h1>
          {content.hero.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="mu-hero__actions">
            <MindUpDownloadCta source="hero">{content.hero.cta}</MindUpDownloadCta>
            <a className="mu-link" href="#como">
              {content.hero.ctaSecondary}
            </a>
          </div>
          <small>{content.hero.microcopy}</small>
        </div>
        <div className="mu-hero__mock">
          <Device image={content.hero.image} eager />
          <UiNote />
          <div className="mu-hero__toasts" aria-label="Demonstração de progresso">
            {content.hero.toasts.map((toast, index) => (
              <Toast key={toast.title} toast={toast} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Seções claras ───────────────────────────────────────────────────── */

const Direction = () => (
  <section className="mu-section mu-orbs" id="como">
    <div className="mu-container mu-reveal">
      <Tag>{content.direction.tag}</Tag>
      <h2>{content.direction.title}</h2>
      <p className="mu-lead">{content.direction.text}</p>
    </div>
  </section>
);

const Steps = () => (
  <section className="mu-section mu-section--tint mu-orbs">
    <div className="mu-container mu-reveal">
      <Tag>{content.steps.tag}</Tag>
      <h2>
        {content.steps.title[0]}
        <br />
        <em>{content.steps.title[1]}</em>
      </h2>
      <ol className="mu-flow">
        {content.steps.flow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="mu-step-grid">
        {content.steps.items.map((item) => (
          <article key={item.title}>
            <span className="mu-step-icon" aria-hidden={true}>
              <Icon name={item.icon} size={22} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="mu-inline-cta">
        <h3>{content.steps.ctaTitle}</h3>
        <MindUpDownloadCta source="mechanism">{content.steps.cta}</MindUpDownloadCta>
      </div>
    </div>
  </section>
);

/* ── Seções do app (dark, tokens do DS) ──────────────────────────────── */

const MissionTicker = () => (
  <div className="mu-marquee" aria-hidden={true}>
    <div className="mu-marquee__track">
      {[0, 1].map((copy) => (
        <div className="mu-marquee__set" key={copy} aria-hidden={copy === 1}>
          {content.missionTicker.map((item) => (
            <span key={item.label}>
              <Icon name={item.icon} size={14} /> {item.label}
              <b>
                <Icon name="zap" size={10} /> {item.xp}
              </b>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const Mission = () => (
  <section className="mu-app-section" id={content.mission.id}>
    <MissionTicker />
    <div className="mu-container mu-feature mu-reveal">
      <div className="mu-feature__copy">
        <Tag>{content.mission.tag}</Tag>
        <h2>{content.mission.title}</h2>
        <p>{content.mission.text}</p>
        <UiNote />
        <UiNote illustrative />
      </div>
      <div className="mu-stage">
        <Device image={content.mission.image} />
        <div className="mu-stage__floats">
          {content.mission.cards.map((card) => (
            <MissionCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Checkin = () => (
  <section className="mu-section mu-orbs" id={content.checkin.id}>
    <div className="mu-container mu-feature mu-feature--reverse mu-reveal">
      <div className="mu-feature__copy">
        <Tag>{content.checkin.tag}</Tag>
        <h2>{content.checkin.title}</h2>
        <p>{content.checkin.text}</p>
        <UiNote />
        <UiNote illustrative />
      </div>
      <div className="mu-stage">
        <Device image={content.checkin.image} />
        <div className="mu-stage__floats">
          <CheckinCard card={content.checkin.card} />
        </div>
      </div>
    </div>
  </section>
);

const Growth = () => (
  <section className="mu-app-section" id={content.growth.id}>
    <div className="mu-container mu-feature mu-reveal">
      <div className="mu-feature__copy">
        <Tag>{content.growth.tag}</Tag>
        <h2>{content.growth.title}</h2>
        <p>{content.growth.text}</p>
        <XpBar xpBar={content.growth.xpBar} />
        <UiNote />
      </div>
      <div className="mu-stage">
        <Device image={content.growth.image} />
      </div>
    </div>
    <div className="mu-glow-sep" aria-hidden={true} />
    <div className="mu-container mu-reveal">
      <Tag>{content.treeStages.tag}</Tag>
      <h2>{content.treeStages.title}</h2>
      <div className="mu-milestones">
        {content.treeStages.milestones.map((milestone) => (
          <article key={milestone.name} className={`mu-milestone is-${milestone.state}`}>
            <b>{milestone.name}</b>
            <em>{milestone.xp}</em>
            <span className={`mu-app-badge is-${milestone.state}`}>
              {milestone.state === 'gold' ? <Icon name="sparkles" size={11} /> : null}
              {milestone.stateLabel}
            </span>
          </article>
        ))}
      </div>
      <UiNote illustrative />
      <b className="mu-close">{content.treeStages.close}</b>
    </div>
  </section>
);

const Pillars = () => (
  <section className="mu-section mu-section--tint mu-orbs">
    <div className="mu-container mu-reveal">
      <Tag>{content.pillars.tag}</Tag>
      <h2>{content.pillars.title}</h2>
      {[content.pillars.mind, content.pillars.body].map((group, groupIndex) => (
        <div key={group.label}>
          <h3 className={`mu-pillar-group ${groupIndex === 1 ? 'is-body' : ''}`}>
            <Icon name={group.icon} size={16} /> {group.label}
          </h3>
          <div className="mu-pillar-grid">
            {group.items.map((item) => (
              <article key={item.name} className={`mu-pillar ${groupIndex === 1 ? 'is-body' : ''}`}>
                <span className="mu-pillar__icon" aria-hidden={true}>
                  <Icon name={item.icon} size={20} />
                </span>
                <b>{item.name}</b>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
      <b className="mu-close">{content.pillars.close}</b>
    </div>
  </section>
);

const Attributes = () => (
  <section className="mu-app-section" id={content.attributes.id}>
    <div className="mu-container mu-feature mu-feature--reverse mu-reveal">
      <div className="mu-feature__copy">
        <Tag>{content.attributes.tag}</Tag>
        <h2>{content.attributes.title}</h2>
        <p>{content.attributes.text}</p>
        <UiNote />
        <UiNote illustrative />
      </div>
      <div className="mu-stage">
        <Device image={content.attributes.image} />
        <div className="mu-stage__floats">
          {content.attributes.cards.map((card) => (
            <AttrCard key={card.name} card={card} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Focus = () => (
  <section className="mu-section mu-orbs" id={content.focus.id}>
    <div className="mu-container mu-feature mu-reveal">
      <div className="mu-feature__copy">
        <Tag>{content.focus.tag}</Tag>
        <h2>{content.focus.title}</h2>
        <p>{content.focus.text}</p>
        <UiNote />
      </div>
      <div className="mu-stage">
        <Device image={content.focus.image} />
      </div>
    </div>
  </section>
);

const Tools = () => (
  <section className="mu-section mu-section--tint mu-orbs" id={content.tools.id}>
    <div className="mu-container mu-feature mu-feature--reverse mu-reveal">
      <div className="mu-feature__copy">
        <Tag>{content.tools.tag}</Tag>
        <h2>{content.tools.title}</h2>
        <p>{content.tools.text}</p>
        <div className="mu-tools-groups">
          {content.tools.groups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <div className="mu-chips">
                {group.items.map((item) => (
                  <span key={item.label}>
                    <Icon name={item.icon} size={14} /> {item.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <UiNote />
      </div>
      <div className="mu-stage">
        <Device image={content.tools.image} />
      </div>
    </div>
  </section>
);

/* ── Premium / FAQ / Fechamento / Footer ─────────────────────────────── */

const Cycle = () => (
  <section className="mu-app-section" id={content.cycle.id}>
    <MissionTicker />
    <div className="mu-container mu-reveal">
      <div className="mu-cycle__intro">
        <Tag>{content.cycle.tag}</Tag>
        <h2>{content.cycle.title}</h2>
        <p>{content.cycle.text}</p>
      </div>
      <div className="mu-cycle__screens">
        {content.cycle.screens.map((screen) => (
          <figure key={screen.title}>
            <Device image={screen.image} />
            <figcaption><b>{screen.title}</b><span>{screen.text}</span></figcaption>
          </figure>
        ))}
      </div>
      <UiNote />
    </div>
  </section>
);

const Evolution = () => (
  <section className="mu-section mu-orbs" id={content.evolution.id}>
    <div className="mu-container mu-feature mu-reveal">
      <div className="mu-feature__copy">
        <Tag>{content.evolution.tag}</Tag>
        <h2>{content.evolution.title}</h2>
        <p>{content.evolution.text}</p>
        <ol className="mu-tree-stages">
          {content.evolution.stages.map((stage, index) => (
            <li key={stage}><span>{String(index + 1).padStart(2, '0')}</span>{stage}</li>
          ))}
        </ol>
        <b className="mu-close">{content.evolution.close}</b>
      </div>
      <div className="mu-stage"><Device image={content.evolution.image} /><UiNote /></div>
    </div>
  </section>
);

const PillarsAndAttributes = () => (
  <section className="mu-section mu-section--tint mu-orbs" id={content.pillars.id}>
    <div className="mu-container mu-reveal">
      <div className="mu-feature">
        <div className="mu-feature__copy"><Tag>{content.pillars.tag}</Tag><h2>{content.pillars.title}</h2><p>{content.pillars.text}</p></div>
        <div className="mu-stage mu-stage--compact"><Device image={content.pillars.image} /><UiNote /></div>
      </div>
      <div className="mu-pillar-groups">
        {[content.pillars.mind, content.pillars.body].map((group, groupIndex) => (
          <div key={group.label}>
            <h3 className={groupIndex === 1 ? 'mu-pillar-group is-body' : 'mu-pillar-group'}><Icon name={group.icon} size={16} /> {group.label}</h3>
            <div className="mu-pillar-grid">
              {group.items.map((item) => (
                <article key={item.name} className={groupIndex === 1 ? 'mu-pillar is-body' : 'mu-pillar'}>
                  <span className="mu-pillar__icon" aria-hidden={true}><Icon name={item.icon} size={20} /></span><b>{item.name}</b><p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SupportTools = () => (
  <section className="mu-section mu-orbs" id={content.tools.id}>
    <div className="mu-container mu-reveal">
      <Tag>{content.tools.tag}</Tag><h2>{content.tools.title}</h2><p className="mu-lead">{content.tools.text}</p>
      <div className="mu-tools-layout">
        <div className="mu-tools-groups">
          {content.tools.groups.map((group) => (
            <div key={group.title}><h3>{group.title}</h3><div className="mu-chips">
              {group.items.map((item) => <span key={item.label}><Icon name={item.icon} size={14} /> {item.label}</span>)}
            </div></div>
          ))}
        </div>
        <div className="mu-tools-screens">
          <figure><Device image={content.tools.focusImage} /><figcaption>Modo Foco</figcaption></figure>
          <figure><Device image={content.tools.libraryImage} /><figcaption>Biblioteca</figcaption></figure>
        </div>
      </div>
      <UiNote />
    </div>
  </section>
);

const Premium = () => (
  <section className="mu-app-section mu-premium" id="premium">
    <div className="mu-container mu-reveal">
      <div className="mu-premium__card">
        <span className="mu-app-badge is-gold">
          <Icon name="sparkles" size={12} /> {content.premium.badge}
        </span>
        <h2>{content.premium.title}</h2>
        <div className="mu-premium__columns">
          {content.premium.columns.map((column) => (
            <div key={column.title}>
              <b>{column.title}</b>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden={true}>
                      <Icon name="check" size={10} strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mu-premium__price">
          {content.premium.priceLine} <b>{content.premium.price}</b>
        </p>
        <MindUpDownloadCta source="premium" className="mu-button mu-button--light">
          {content.premium.cta}
        </MindUpDownloadCta>
        <small className="mu-premium__note">{content.premium.microcopy}</small>
      </div>
    </div>
  </section>
);

const Faq = () => (
  <section className="mu-section mu-orbs" id="faq">
    <div className="mu-container mu-reveal">
      <Tag>{content.faq.tag}</Tag>
      <h2>{content.faq.title}</h2>
      <div className="mu-faq">
        {content.faq.items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section className="mu-app-section mu-final">
    <div className="mu-container mu-reveal">
      <Tag>{content.finalCta.tag}</Tag>
      <h2>
        {content.finalCta.title[0]}
        <br />
        <em>{content.finalCta.title[1]}</em>
      </h2>
      <p>{content.finalCta.text}</p>
      <h3>
        {content.finalCta.closing[0]} <em>{content.finalCta.closing[1]}</em>
      </h3>
      <MindUpDownloadCta source="final_cta" className="mu-button mu-button--light">
        {content.finalCta.cta}
      </MindUpDownloadCta>
    </div>
  </section>
);

const Footer = () => (
  <footer className="mu-footer">
    <div className="mu-container mu-footer__grid">
      <div className="mu-footer__brand">
        <Logo />
        <p>{content.footer.about}</p>
      </div>
      {content.footer.columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <b>{column.title}</b>
          {column.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      ))}
      <nav aria-label="Institucional">
        <b>Institucional</b>
        <Link to="/">Início</Link>
        <Link to={ROUTES.privacy}>Política de Privacidade</Link>
        <Link to={ROUTES.terms}>Termos de Uso</Link>
        <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </nav>
    </div>
    <div className="mu-container mu-footer__note">
      <p>{content.footer.note}</p>
    </div>
  </footer>
);

/* ── Página ──────────────────────────────────────────────────────────── */

const MindUpPage = () => {
  const rootRef = React.useRef(null);
  useMindUpMotion(rootRef);

  return (
    <MindUpDownloadProvider>
    <div className="mindup-page" ref={rootRef}>
      <RouteSEO
        title="MindUp — Evolução Pessoal Adaptativa | Dr. Thyago Henrique"
        description="O MindUp organiza os sinais que você registra e transforma isso em um próximo passo possível. Disponível para iOS e Android."
        path={content.product.path}
        image="/assets/mindup/logo-google.png"
        imageWidth={512}
        imageHeight={512}
        imageAlt="MindUp — aplicativo de evolução pessoal adaptativa, por Dr. Thyago Henrique"
        favicon="/assets/mindup/logo-google.png"
        faviconType="image/png"
        twitterCard="summary"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: content.product.name,
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'iOS, Android',
          brand: BRAND.siteName,
          description:
            'Aplicativo de evolução pessoal adaptativa: registros, missões possíveis e acompanhamento visual da jornada. Conteúdo educativo.',
          offers: {
            '@type': 'Offer',
            price: '29.90',
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <Direction />
        <Steps />
        <Cycle />
        <Evolution />
        <PillarsAndAttributes />
        <SupportTools />
        <Premium />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
    </MindUpDownloadProvider>
  );
};

export default MindUpPage;
