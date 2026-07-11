import React from 'react';
import { openWhatsApp } from './config.js';

const CareModel = () => (
  <section className="products" id="atuacao">
    <div className="wrap">
      <div className="section-num">04 · Como penso a saúde mental</div>
      <div className="prod-head">
        <h2 className="title">A mente não adoece fora da vida que a pessoa sustenta.</h2>
        <p className="lede">Na prática clínica, sintomas importam. Mas agenda, exposição, sono, decisões críticas, rotina, cobrança e recuperação também entram na avaliação. Esse é o ponto de partida do trabalho do Dr. Thyago.</p>
      </div>
      <div className="prod-grid">
        <div className="prod-card flagship">
          <span className="prod-tag">Consulta médica</span>
          <div>
            <div className="prod-eyebrow">Avaliação individualizada</div>
            <h3 className="prod-name">Clareza<br/><em>clínica</em></h3>
            <p className="prod-desc">
              A primeira tarefa é organizar o quadro: o que começou, o que piorou, como o sono responde, onde a energia cai e de que forma a pressão afeta decisões, relações e funcionamento diário.
            </p>
          </div>
          <div>
            <div className="prod-meta">
              <span>Base · consulta médica</span>
              <span>Foco · clareza mental, sono e funcionamento</span>
              <strong>Conduta definida caso a caso</strong>
            </div>
            <button className="prod-cta" onClick={openWhatsApp}>Marcar consulta →</button>
          </div>
        </div>

        <div className="prod-card">
          <div>
            <div className="prod-eyebrow">Emergência · Decisão crítica</div>
            <h3 className="prod-name">Decisão<br/><em>sob pressão</em></h3>
            <p className="prod-desc">
              A formação complementar em emergência e transporte aeromédico trouxe familiaridade com contextos em que lucidez, tempo e decisão importam. Essa lente ajuda a avaliar pessoas que operam sob cobrança constante.
            </p>
          </div>
          <div>
            <div className="prod-meta">
              <span>Experiência · alta pressão</span>
              <strong>Menos abstração. Mais precisão.</strong>
            </div>
          </div>
        </div>

        <div className="prod-card">
          <div>
            <div className="prod-eyebrow">Neurociências · Estilo de vida</div>
            <h3 className="prod-name">Recuperação<br/><em>e funcionamento</em></h3>
            <p className="prod-desc">
              Sono, ritmo, recuperação, foco, regulação emocional e hábitos deixam de ser temas periféricos. Para quem sustenta grandes responsabilidades, eles podem definir a diferença entre desempenho e desgaste.
            </p>
          </div>
          <div>
            <div className="prod-meta">
              <span>Base · evidências e acompanhamento</span>
              <strong>Saúde antes da ruptura</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CareModel;