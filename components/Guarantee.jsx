import React from 'react';
import { openWhatsApp } from './config.js';

const STEPS = [
  ['Primeiro contato', 'A equipe recebe a solicitação e orienta sobre o agendamento.'],
  ['Contexto e histórico', 'A consulta começa pela compreensão da rotina, das demandas e do momento vivido.'],
  ['Avaliação médica', 'Sono, humor, atenção, comportamento, estilo de vida e sintomas são considerados em conjunto.'],
  ['Compreensão do quadro', 'O médico organiza os principais fatores identificados e explica sua leitura.'],
  ['Definição de conduta', 'São discutidos os próximos passos compatíveis com as necessidades individuais.'],
  ['Acompanhamento', 'Quando indicado, o processo continua com revisões e ajustes ao longo do tempo.'],
];

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
          <ol className="guar-steps">
            {STEPS.map(([name, desc], i) => (
              <li key={i}>
                <span className="guar-step-num" aria-hidden="true">0{i + 1}</span>
                <div>
                  <strong>{name}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <p>
            Para pessoas sob alta exposição, o atendimento também considera <strong>confidencialidade, discrição e adaptação à rotina</strong> como partes essenciais da experiência clínica.
          </p>
          <button className="btn-primary" onClick={openWhatsApp}>Marcar consulta pelo WhatsApp →</button>
          <p className="cta-note">Contato reservado com a equipe · informações de agendamento tratadas com discrição</p>
        </div>
      </div>
    </div>
  </section>
);

export default CareFlow;