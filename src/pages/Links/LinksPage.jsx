import React from 'react';
import { Link } from 'react-router-dom';
import RouteSEO from '../../components/seo/RouteSEO.jsx';
import { ROUTES } from '../../config/routes.js';
import { CONTACT, WHATSAPP_URL } from '../../config/contact.js';
import './links.css';
const ArrowIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M5 12h14M13 6l6 6-6 6' />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <rect x='3' y='3' width='18' height='18' rx='5' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17.5' cy='6.5' r='1' className='fill' />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M21 11.6a8.5 8.5 0 0 1-12.7 7.5L3 20.5l1.4-5.1A8.5 8.5 0 1 1 21 11.6Z' />
    <path d='M8.3 8.1c.6 3.8 3.8 6.9 7.5 7.6l1.2-1.5-2.6-1.2-.9 1c-1.5-.6-2.9-1.9-3.5-3.5l1-1-1.2-2.6-1.5 1.2Z' />
  </svg>
);

const MailIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <rect x='3' y='5' width='18' height='14' rx='2' />
    <path d='m4 7 8 6 8-6' />
  </svg>
);

const HeroVideo = () => {
  const [reducedMotion, setReducedMotion] = React.useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener?.('change', syncPreference);
    return () => mediaQuery.removeEventListener?.('change', syncPreference);
  }, []);

  return (
    <div className='links-hero-media' aria-hidden='true'>
      {!reducedMotion && (
        <video
          className='links-hero-video'
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          poster='/assets/link-bio/hero-poster.jpg'
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src='/assets/link-bio/hero-background.mp4' type='video/mp4' />
        </video>
      )}
      <span className='links-hero-overlay' />
    </div>
  );
};

const contactUrl = (message) =>
  `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;

const primaryLinks = [
  {
    label: 'Mentoria Mind Legacy',
    href: ROUTES.mentoria,
    image: '/assets/link-bio/mentoria.svg',
    imageAlt: 'Mind Legacy — mentoria com Dr. Thyago Henrique',
  },
  {
    label: 'NeuroCalma',
    href: ROUTES.neurocalma,
    image: '/assets/link-bio/neurocalma.webp',
    imageAlt: 'NeuroCalma — videoaulas e práticas guiadas',
  },
  {
    label: 'Saturação Neural',
    href: ROUTES.saturacaoNeural,
    image: '/assets/link-bio/saturacao-neural.webp',
    imageAlt: 'Saturação Neural — um novo olhar sobre cansaço e sobrecarga mental',
  },
  {
    label: 'Códigos da Mente',
    href: contactUrl('Olá, vim pelo link da bio do Dr. Thyago Henrique e gostaria de receber informações sobre Códigos da Mente.'),
    image: '/assets/link-bio/codigos-da-mente.webp',
    imageAlt: 'Códigos da Mente — ferramentas práticas para usar melhor a mente',
    external: true,
  },
  {
    label: 'Agende sua consulta',
    href: contactUrl('Olá, vim pelo link da bio do Dr. Thyago Henrique e gostaria de informações para agendar uma consulta. Meu nome é '),
    image: '/assets/link-bio/consulta.webp',
    imageAlt: 'Agende sua consulta com o Dr. Thyago Henrique',
    external: true,
  },
  {
    label: 'MindUp',
    image: '/assets/link-bio/mindup.webp',
    imageAlt: 'MindUp — seu bem-estar todos os dias, no seu ritmo',
    disabled: true,
  },
  {
    label: 'Livro Domine o Jogo — em breve na Amazon',
    image: '/assets/link-bio/livro-domine-o-jogo.webp',
    imageAlt: 'Domine o Jogo — lançamento do primeiro livro do Dr. Thyago Henrique',
    disabled: true,
  },
  {
    label: 'Palestras',
    href: contactUrl('Olá, vim pelo link da bio do Dr. Thyago Henrique e gostaria de receber informações sobre palestras.'),
    image: '/assets/link-bio/palestras.webp',
    imageAlt: 'Palestras com o Dr. Thyago Henrique',
    external: true,
  },
];

const socialLinks = [
  { label: 'Instagram', href: CONTACT.instagramUrl, icon: InstagramIcon },
  { label: 'WhatsApp', href: WHATSAPP_URL, icon: WhatsAppIcon },
  { label: 'E-mail', href: `mailto:${CONTACT.email}`, icon: MailIcon },
];

const BioCard = ({ item, index }) => {
  const content = (
    <>
      <img src={item.image} alt={item.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
      <span className='links-visually-hidden'>{item.label}</span>
      {item.disabled ? (
        <span className='links-card__coming-soon' aria-hidden='true'>EM BREVE</span>
      ) : (
        <span className='links-card__access' aria-hidden='true'><ArrowIcon /></span>
      )}
    </>
  );
  const sharedProps = {
    className: `links-card links-card--art${item.disabled ? ' links-card--disabled' : ''}`,
    style: { '--card-order': index },
    'aria-label': item.label,
  };

  if (item.disabled) {
    return <article {...sharedProps} aria-disabled='true'>{content}</article>;
  }

  if (item.external) {
    return <a {...sharedProps} href={item.href} target='_blank' rel='noreferrer'>{content}</a>;
  }

  return <Link {...sharedProps} to={item.href}>{content}</Link>;
};

const linksJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'Links oficiais — Dr. Thyago Henrique',
  url: 'https://drthyagohenrique.com/links',
  mainEntity: {
    '@type': 'Physician',
    name: CONTACT.doctorName,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'CRM-GO',
      value: '30.392',
    },
    image: 'https://drthyagohenrique.com/assets/dr-thyago.png',
    sameAs: [CONTACT.instagramUrl],
  },
};

const LinksPage = () => (
  <div className='links-page'>

    <RouteSEO
      title='Links oficiais | Dr. Thyago Henrique'
      description='Acesse consultas, NeuroCalma, MindUp, Códigos da Mente, o próximo livro, Saturação Neural e palestras do Dr. Thyago Henrique.'
      path={ROUTES.links}
      image='/assets/og-image.jpg'
      imageAlt='Links oficiais do Dr. Thyago Henrique'
      jsonLd={linksJsonLd}
    />

    <HeroVideo />
    <a className='links-skip' href='#links-principais'>Ir para os links principais</a>
    <div className='links-ambient links-ambient--one' aria-hidden='true' />
    <div className='links-ambient links-ambient--two' aria-hidden='true' />
    <div className='links-grid' aria-hidden='true' />

    <header className='links-header'>

      <Link className='links-wordmark' to={ROUTES.institutional} aria-label='Ir para o site do Dr. Thyago Henrique'>
        <span className='links-wordmark__monogram' aria-hidden='true'>TH</span>
        <span className='links-wordmark__text'>
          Dr. Thyago Henrique
          <small>{CONTACT.crm}</small>
        </span>
      </Link>
      <span className='links-header__label'>Links oficiais</span>
    </header>

    <main className='links-main'>
      <section className='links-intro' aria-labelledby='links-title'>
        <div className='links-portrait-wrap'>

          <img
            className='links-portrait'
            src='/assets/dr-thyago.png'
            alt='Dr. Thyago Henrique'
            width='1024'
            height='1024'
          />
          <span className='links-portrait__status' aria-hidden='true' />
        </div>

        <p className='links-kicker'>Mente · comportamento · vida real</p>
        <h1 id='links-title'>Escolha por onde <em>começar.</em></h1>
        <p className='links-intro__copy'>
          Conteúdo, experiências e ferramentas para compreender melhor o que acontece por dentro — e agir com mais clareza por fora.
        </p>

        <nav className='links-socials' aria-label='Canais de contato'>
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target='_blank' rel='noreferrer' aria-label={label} title={label}>
              <Icon />
            </a>
          ))}
        </nav>
      </section>

      <section id='links-principais' className='links-list' aria-label='Links principais'>
        {primaryLinks.map((item, index) => (
          <BioCard item={item} index={index} key={item.label} />
        ))}
      </section>
    </main>

    <footer className='links-footer'>
      <p>© {new Date().getFullYear()} Dr. Thyago Henrique</p>

      <p>{CONTACT.crm}</p>
      <nav aria-label='Links legais'>
        <Link to={ROUTES.privacy}>Privacidade</Link>
        <Link to={ROUTES.terms}>Termos</Link>
      </nav>
    </footer>
  </div>
);

export default LinksPage;
