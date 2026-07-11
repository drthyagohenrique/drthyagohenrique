import React from 'react';
import { openWhatsApp } from './config.js';

const CareFlow = () => (
  <section className="guarantee" id="atendimento">
    <div className="wrap">
      <div className="section-num">05 · Como funciona o atendimento</div>
      <div className="guar-frame">
        <div className="guar-seal">
          <div className="guar-seal-num">06</div>
          <div className="guar-seal-lbl">Etapas</div>
        </div>
        <div className="guar-content">
          <h3>Uma experiência organizada para quem precisa de clareza, privacidade e direção.</h3>
          <p>
            O primeiro contato acontece pelo WhatsApp institucional. A partir dali, a equipe orienta o agendamento e confirma as informações necessárias para a consulta.
          </p>
          <p>
            Na primeira consulta, o foco é uma <strong>avaliação médica individualizada</strong>: queixas atuais, sono, rotina, pressão profissional, histórico, uso de medicações, riscos, hábitos e objetivos de cuidado.
          </p>
          <p>
            Depois da avaliação, a conduta é definida de forma personalizada. Quando indicado, pode envolver acompanhamento longitudinal, ajustes de rotina, estratégias de sono, encaminhamentos, exames, medicação ou integração com outros profissionais.
          </p>
          <p>
            Para pessoas sob alta exposição, o atendimento também considera <strong>confidencialidade, discrição e adaptação à rotina</strong> como partes essenciais da experiência clínica.
          </p>
          <button className="btn-primary" onClick={openWhatsApp}>Marcar consulta pelo WhatsApp →</button>
        </div>
      </div>
    </div>
  </section>
);

export default CareFlow;