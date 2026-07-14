import React from 'react';
import { openWhatsApp } from './config.js';

const StickyCTA = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      // Some quando o CTA de encerramento (ou o rodapé) entra na tela.
      const end = document.querySelector('.closing') || document.querySelector('footer.foot');
      const atEnd = end && y + h > end.offsetTop;
      setShow(y > h * 0.8 && !atEnd);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-cta ${show ? 'show' : ''}`} inert={!show || undefined}>
      <span className="sticky-cta-text">
        <span>Mente e comportamento · <em>alta pressão</em></span>
        <strong>Marcar consulta pelo WhatsApp</strong>
      </span>
      <button className="sticky-cta-btn" onClick={openWhatsApp}>
        Marcar →
      </button>
    </div>
  );
};

export default StickyCTA;
