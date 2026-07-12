import React from 'react';
import { Link } from 'react-router-dom';
import RouteSEO from '../../components/seo/RouteSEO.jsx';
import { BRAND } from '../../config/brand.js';
import { CONTACT } from '../../config/contact.js';
import { ROUTES } from '../../config/routes.js';
import { neuroCalmaContent } from './content.js';
import './neurocalma.css';

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

const Section = ({ id, label, title, children, tone = 'cloud', labelSignature = false }) => (
  <section className={`nc-section nc-section--${tone}`} id={id} aria-labelledby={`${id}-title`}>
    <div className="nc-wrap">
      <Reveal>
        {label ? <Label signature={labelSignature}>{label}</Label> : null}
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
      </Reveal>
    </div>
  </section>
);

// Regra de CTA: hero, percurso e encerramento levam ao painel de oferta (âncora real).
// O ponto transacional é único: dentro da oferta. Com venda ativa ele vira o link
// de checkout; em pré-lançamento a oferta declara "Disponível em breve".
const scrollToOffer = (event) => {
  event.preventDefault();
  document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
};

const CtaToOffer = ({ children }) => (
  <a className="nc-button" href="#oferta" onClick={scrollToOffer}>
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

const OfferPanel = () => {
  const content = neuroCalmaContent;
  const product = content.product;
  const saleActive = product.salesStatus === 'active' && product.checkoutUrl;

  return (
    <div className="nc-offer-panel">
      <div className="nc-offer-panel__info">
        <div className="nc-badge-row">
          <span className="nc-badge">{product.format}</span>
          <span className="nc-badge">{product.priceNote}</span>
        </div>
        <p className="nc-offer-panel__name">{product.name}</p>
        <p className="nc-offer-panel__price">{product.price}</p>
        <p className="nc-offer-panel__text">{content.offer.text}</p>
        <p className="nc-offer-panel__meta">
          Percurso em quatro eixos — Perceber · Reduzir · Regular · Sustentar
        </p>
      </div>
      <div className="nc-offer-panel__action">
        {saleActive ? (
          <a className="nc-button nc-button--primary" href={product.checkoutUrl}>
            {content.offer.ctaActive}
          </a>
        ) : null}
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

  return (
    <>
      <RouteSEO
        title="NeuroCalma | Dr. Thyago Henrique"
        description="Uma experiência digital educativa para compreender a sobrecarga mental, reduzir o excesso de estímulos e construir momentos de desaceleração."
        path={product.path}
        image="/assets/og-image.jpg"
        imageAlt="NeuroCalma — experiência guiada de desaceleração, por Dr. Thyago Henrique"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          brand: BRAND.siteName,
          description:
            'Experiência digital educativa para compreender a sobrecarga mental, reduzir o excesso de estímulos e construir momentos de desaceleração.',
        }}
      />
      <main className="neurocalma-page" id="conteudo">
        <a className="nc-skip-link" href="#neurocalma-main">Pular para o conteúdo</a>

        {/* 01 · HERO — denso, azul-noturno, assimétrico */}
        <section className="nc-hero" id="neurocalma-main" aria-labelledby="neurocalma-title">
          <div className="nc-hero__field" aria-hidden="true" />
          <div className="nc-hero__glowline" aria-hidden="true" />
          <div className="nc-wrap">
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
                <a
                  className="nc-hero__secondary"
                  href="#percurso"
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById('percurso')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {content.hero.secondaryCta}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="nc-disclaimer">{content.hero.disclaimer}</p>
            </div>
            <p className="nc-hero__bridge">{content.hero.bridge}</p>
          </div>
        </section>

        {/* 02 · RECONHECIMENTO — editorial, claro */}
        <Section id="reconhecimento" label={content.recognition.label} title={content.recognition.title} tone="cloud">
          {content.recognition.paragraphs.map((paragraph) => (
            <p className="nc-lede" key={paragraph}>{paragraph}</p>
          ))}
          <p className="nc-statement nc-statement--accent">
            {content.recognition.close[0]}
            <br />
            {content.recognition.close[1]}
          </p>
        </Section>

        {/* 03 · A EXPERIÊNCIA — 60/40 com elemento abstrato */}
        <section className="nc-section nc-section--mist" id="apresentacao" aria-labelledby="apresentacao-title">
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

        {/* 04 · O PERCURSO — timeline conectada + CTA intermediário */}
        <Section id="percurso" label={content.journey.label} title={content.journey.title} tone="white">
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

        {/* 05 · COMO FUNCIONA — conceitual (sem entregáveis confirmados) */}
        <Section id="funcionamento" label={content.method.label} title={content.method.title} tone="sky">
          <p className="nc-lede">{content.method.text}</p>
          <div className="nc-flow" role="list">
            {content.method.pillars.map((pillar, index) => (
              <React.Fragment key={pillar}>
                {index > 0 ? <span className="nc-flow__link" aria-hidden="true" /> : null}
                <span className="nc-flow__node" role="listitem">{pillar}</span>
              </React.Fragment>
            ))}
          </div>
        </Section>

        {/* 06 · SATURAÇÃO NEURAL™ — painel azul-noturno com camadas */}
        <section className="nc-section nc-section--navy" id="saturacao-neural" aria-labelledby="saturacao-neural-title">
          <div className="nc-layers" aria-hidden="true">
            <span /><span /><span /><span />
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

        {/* 07 · PARA QUEM É — tipográfico, duas colunas */}
        <Section id="publico" label={content.audience.label} title={content.audience.title} tone="cloud">
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

        {/* 08 · AUTORIDADE — bloco compacto com foto aprovada */}
        <section className="nc-section nc-section--white" id="autoridade" aria-labelledby="autoridade-title">
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.authority.label}</Label>
              <div className="nc-doctor">
                <img
                  src="/assets/dr-thyago.png"
                  alt="Retrato do Dr. Thyago Henrique"
                  width="1024"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                />
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

        {/* 09 · OFERTA — painel único, moderno, sem urgência */}
        <Section id="oferta" label={content.offer.label} title={content.offer.title} tone="cloud">
          <OfferPanel />
        </Section>

        {/* 10 · FAQ */}
        <Section id="faq" label={content.faq.label} title={content.faq.title} tone="white">
          <NeuroCalmaFAQ />
        </Section>

        {/* 11 · CTA FINAL — espaço máximo */}
        <section className="nc-final" aria-labelledby="nc-final-title">
          <div className="nc-wrap">
            <Reveal>
              <Label>{content.finalCta.label}</Label>
              <h2 id="nc-final-title">{content.finalCta.title}</h2>
              <p>{content.finalCta.text}</p>
              <CtaToOffer>{content.hero.cta}</CtaToOffer>
              <p className="nc-disclaimer">{content.finalCta.disclaimer}</p>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nc-footer">
          <div className="nc-wrap">
            <p className="nc-footer__brand">
              <span className="nc-footer__signature" aria-hidden="true" />
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
