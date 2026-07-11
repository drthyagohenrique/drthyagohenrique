import React from 'react';
import { openWhatsApp } from './config.js';

const StickyCTA = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const foot = document.querySelector('footer.foot');
      const inFoot = foot && y + h > foot.offsetTop;
      setShow(y > h * 0.8 && !inFoot);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-cta ${show ? 'show' : ''}`}>
      <span className="sticky-cta-text">
        <span>Saúde mental · <em>alta pressão</em></span>
        <strong>Marcar consulta pelo WhatsApp</strong>
      </span>
      <button className="sticky-cta-btn" onClick={openWhatsApp}>
        Marcar →
      </button>
    </div>
  );
};

export default StickyCTA;