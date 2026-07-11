import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { openWhatsApp, WHATSAPP_URL } from './config.js';

export const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isLight, setIsLight] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);

    const sections = document.querySelectorAll('section, footer');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          // Detecta seções claras pela luminância do fundo (independente da paleta).
          const bg = window.getComputedStyle(entry.target).backgroundColor;
          const rgb = bg.match(/\d+/g);
          if (rgb) {
            const [r, g, b] = rgb.map(Number);
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            setIsLight(luminance > 160);
          }
        }
      });
    }, { threshold: [0.1, 0.5, 0.8] });

    sections.forEach(s => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${isLight ? 'is-light' : ''}`} aria-label="Principal">
      <a href="#top" className="nav-logo">
        <div className="nav-logo-name">Thyago <em>Henrique</em></div>
        <div className="nav-logo-status">Médico · CRM-GO 30.392</div>
      </a>
      <div className="nav-actions">
        <a href={WHATSAPP_URL} className="nav-cta" target="_blank" rel="noreferrer">Marcar consulta →</a>
        <div className="nav-brand-right">Saúde mental sob pressão</div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <section className="hero" id="top">
      <div className="hero-particles" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-shadow" aria-hidden="true" />

      <div className="hero-grid">
        <motion.div
          className="hero-content"
          style={{ y: yContent }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            Medicina, neurociências e compreensão do contexto humano
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Saúde mental para pessoas que vivem sob alta pressão.
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Para quem continua entregando, decidindo e sustentando responsabilidades — mesmo quando o sono, a atenção e a capacidade de recuperação começam a mudar.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="btn-primary" onClick={openWhatsApp}>
              Marcar consulta pelo WhatsApp
              <span style={{ fontSize: 14, letterSpacing: 0 }} aria-hidden="true">→</span>
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById('perfil').scrollIntoView({ behavior: 'smooth' })}>
              Entender para quem é
            </button>
          </motion.div>

          <motion.p
            className="cta-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.2 }}
          >
            Contato reservado com a equipe · informações de agendamento tratadas com discrição
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div>Formação<br /><strong>Einstein <em>+ Neurociências</em></strong></div>
        <div>Atuação<br /><strong>Alta <em>Exigência</em></strong></div>
        <div>Experiência<br /><strong>Docência <em>e Palestras</em></strong></div>
        <div>Registro<br /><strong>CRM-GO <em>30.392</em></strong></div>
      </motion.div>
    </section>
  );
};

export default Nav;