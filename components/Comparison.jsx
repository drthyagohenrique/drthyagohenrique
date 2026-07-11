import React from 'react';

const Audience = () => {
  const rows = [
    ['Executivos e empresários', 'Agenda intensa, decisões de alto impacto e dificuldade para desligar depois do expediente.', 'Avaliar sono, estresse, clareza mental, rotina e sinais de desgaste antes que a queda de desempenho vire crise.'],
    ['Médicos, advogados e profissionais liberais', 'Responsabilidade constante, fadiga cognitiva, irritabilidade e sensação de permanecer em alerta.', 'Organizar uma leitura clínica do desgaste e definir uma conduta compatível com a realidade profissional.'],
    ['Artistas, atletas e comunicadores', 'Exposição pública, cobrança por performance, oscilação emocional e dificuldade de recuperação entre ciclos.', 'Construir cuidado médico com privacidade, precisão e atenção ao impacto da exposição na saúde mental.'],
    ['Líderes e figuras públicas', 'Pressão por estabilidade, decisões sob escrutínio e pouco espaço para demonstrar vulnerabilidade.', 'Oferecer avaliação reservada, personalizada e orientada à preservação de clareza, sono e funcionamento.'],
    ['Pessoas que continuam funcionando', 'Por fora tudo segue. Por dentro há cansaço, mente acelerada, sono leve e menos paciência do que antes.', 'Identificar o que está se acumulando antes que o corpo obrigue uma pausa que a agenda não planejou.'],
  ];

  return (
    <section className="compare" id="perfil">
      <div className="wrap">
        <div className="section-num">02 · Para quem faz sentido</div>
        <h2 className="title">Nem toda pressão aparece como colapso.</h2>
        <p className="lede">Você pode chegar à consulta ainda produtivo — mas pagando um custo alto: sono não reparador, mente acelerada, irritabilidade, queda de clareza e dificuldade real de recuperação.</p>
        <div className="compare-table" role="region" aria-label="Perfis atendidos e o que a consulta busca compreender" tabIndex={0}>
          <div className="compare-row head">
            <div className="compare-cell feature">Perfil</div>
            <div className="compare-cell">O que costuma aparecer</div>
            <div className="compare-cell us">O que a consulta busca compreender</div>
          </div>
          {rows.map((r, i) => (
            <div className="compare-row" key={i}>
              <div className="compare-cell feature">{r[0]}</div>
              <div className="compare-cell">{r[1]}</div>
              <div className="compare-cell us"><strong>{r[2]}</strong></div>
            </div>
          ))}
        </div>
        <div className="compare-hint" aria-hidden="true">Deslize para comparar →</div>
      </div>
    </section>
  );
};

export default Audience;