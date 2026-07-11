import React from 'react';

const PROOF = [
  {
    name: 'Mídia',
    meta: 'Reconhecimento público',
    stage: 'O Globo · SBT · TV Globo',
    quote: 'Participações e citações em veículos de grande alcance reforçam a presença pública do Dr. Thyago em temas de saúde mental, burnout, qualidade de vida e trabalho.',
    stats: [
      { v: 'O Globo', l: 'Burnout' },
      { v: 'SBT', l: 'Saúde' },
      { v: 'TV Globo', l: 'Entrevista' },
    ],
  },
  {
    name: 'Alta exposição',
    meta: 'Entretenimento · audiovisual',
    stage: 'Elencos e equipes',
    quote: 'Experiência com profissionais ligados a produções de Globo, Record, Netflix e Globoplay, em contextos de pressão, agenda intensa e exposição pública.',
    stats: [
      { v: 'Globo', l: 'Produções' },
      { v: 'Record', l: 'Audiovisual' },
      { v: 'Netflix', l: 'Elencos' },
    ],
  },
  {
    name: 'Docência',
    meta: 'Formação médica',
    stage: 'Professor Universitário',
    quote: 'A sala de aula mantém o raciocínio clínico em revisão constante: organizar evidências, discutir casos e comunicar com clareza para formar novos médicos.',
    stats: [
      { v: 'Medicina', l: 'Docência' },
      { v: 'Ensino', l: 'Clareza' },
      { v: 'Ética', l: 'Prática' },
    ],
  },
  {
    name: 'Palestras',
    meta: 'Ambientes corporativos',
    stage: 'Estresse · foco · performance',
    quote: 'Palestras e treinamentos em controle da ansiedade, gestão do estresse, comunicação sob pressão, foco e regulação emocional em ambientes de alta exigência.',
    stats: [
      { v: 'Foco', l: 'Concentração' },
      { v: 'Estresse', l: 'Gestão' },
      { v: 'Pressão', l: 'Comunicação' },
    ],
  },
];

const Proof = () => (
  <section className="cases" id="provas">
    <div className="wrap">
      <div className="section-num">06 · Provas e reconhecimento</div>
      <h2 className="title">Autoridade se constrói com trajetória visível.</h2>
      <p className="lede">Formação, docência, mídia, palestras e atuação com públicos de alta exigência sustentam uma presença médica que vai além do consultório, sem transformar cuidado em espetáculo.</p>

      <div className="cases-grid">
        {PROOF.map((c, i) => (
          <div className="case" key={i}>
            <div className="case-meta">
              <div>
                <div className="case-name">{c.name}</div>
                <span style={{opacity:.6}}>{c.meta}</span>
              </div>
              <span style={{color:'var(--eucalyptus-soft)'}}>{c.stage}</span>
            </div>
            <p className="case-quote">{c.quote}</p>
            <div className="case-stats">
              {c.stats.map((s, j) => (
                <div className="case-stat" key={j}>
                  <span className="case-stat-val">{s.v}</span>
                  <span className="case-stat-lbl">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="case-disclaimer">Informações institucionais extraídas dos documentos profissionais do Dr. Thyago Henrique · Sem promessa de resultado.</p>
    </div>
  </section>
);

export default Proof;