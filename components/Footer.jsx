import React from 'react';
import { WHATSAPP_URL } from './config.js';

const Footer = () => (
  <footer className="foot">
    <div className="foot-top">
      <div className="foot-brand">
        <h3>Thyago <em>Henrique</em></h3>
        <div className="foot-status">Médico · CRM-GO 30.392</div>
        <p>Atendimento médico em saúde mental, neurociências e performance humana para pessoas que vivem sob alta pressão e precisam preservar clareza, sono, funcionamento e privacidade.</p>
      </div>
      <div className="foot-col">
        <h4>Navegação</h4>
        <ul>
          <li><a href="#perfil">Para quem faz sentido</a></li>
          <li><a href="#medico">O médico</a></li>
          <li><a href="#atendimento">Atendimento</a></li>
          <li><a href="#provas">Provas e reconhecimento</a></li>
        </ul>
      </div>
      <div className="foot-col">
        <h4>Credenciais</h4>
        <ul>
          <li><a href="#medico">CRM-GO 30.392</a></li>
          <li><a href="#medico">Hospital Israelita Albert Einstein</a></li>
          <li><a href="#medico">Mestrado em Neurociências</a></li>
          <li><a href="#saturacao-neural">Saturação Neural</a></li>
        </ul>
      </div>
      <div className="foot-col">
        <h4>Contato</h4>
        <ul>
          <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Marcar consulta</a></li>
          <li><a href="mailto:dr.thyago.henrique@gmail.com">dr.thyago.henrique@gmail.com</a></li>
          <li><a href="https://instagram.com/drthyagohenrique" target="_blank" rel="noreferrer">@drthyagohenrique</a></li>
          <li><a href="#faq">Perguntas frequentes</a></li>
        </ul>
      </div>
    </div>
    <p className="foot-disclaimer">
      Este conteúdo possui caráter institucional e informativo, não substituindo consulta médica. Saturação Neural é apresentada apenas como conceito de estudo e linha de pensamento clínico, não constituindo diagnóstico, doença, tratamento ou promessa de resultado. Em situações de urgência, procure atendimento imediato.
    </p>
    <div className="foot-bottom">
      <span>© 2026 · Dr. Thyago Henrique · CRM-GO 30.392</span>
      <span>Saúde mental para pessoas sob alta pressão</span>
    </div>
  </footer>
);

export default Footer;