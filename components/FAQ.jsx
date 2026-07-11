import React from 'react';

const FAQS = [
  { q: 'Para quem a consulta costuma fazer sentido?', a: 'Para pessoas que vivem sob pressão constante, sustentam grandes responsabilidades e percebem sinais como mente acelerada, sono não reparador, irritabilidade, fadiga cognitiva, queda de clareza ou dificuldade de recuperação.' },
  { q: 'A consulta é apenas para executivos e figuras públicas?', a: 'Não. Esse é um território importante da atuação do Dr. Thyago, mas a consulta também pode fazer sentido para médicos, advogados, profissionais liberais, líderes, artistas, atletas, comunicadores e pessoas em ambientes de alta exigência.' },
  { q: 'Como é a primeira consulta?', a: 'A primeira consulta organiza o quadro: queixas atuais, sono, rotina, pressão profissional, histórico médico, uso de medicações, hábitos, riscos, objetivos e contexto de vida. A conduta depende da avaliação individual.' },
  { q: 'O atendimento pode envolver medicação?', a: 'Quando indicado, sim. A decisão é médica e individualizada. A consulta também pode envolver orientações de sono, rotina, estilo de vida, acompanhamento, exames, encaminhamentos ou integração com outros profissionais.' },
  { q: 'Existe atendimento online?', a: 'Os documentos institucionais indicam consultas presenciais e online. A disponibilidade e a modalidade devem ser confirmadas diretamente pelo WhatsApp institucional no momento do agendamento.' },
  { q: 'Como é tratado o sigilo?', a: 'Confidencialidade e discrição são parte central do atendimento, especialmente para pessoas com exposição pública, responsabilidades estratégicas ou agendas sensíveis.' },
  { q: 'Saturação Neural é um diagnóstico?', a: 'Não. Saturação Neural é apresentada nesta página apenas como conceito de estudo e linha de pensamento clínico sobre sobrecarga mental crônica. Não é diagnóstico, doença, tratamento ou promessa de resultado.' },
  { q: 'A consulta substitui atendimento de urgência?', a: 'Não. Em risco imediato, ideação suicida, surto, intoxicação, violência, dor intensa ou emergência clínica, procure imediatamente um serviço de urgência.' },
  { q: 'Como faço para marcar?', a: 'Clique em qualquer botão de CTA da página. O WhatsApp será aberto com a mensagem: "Vim do site e quero marcar a minha consulta."' },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="section-num">08 · Perguntas frequentes</div>
        <div className="faq-grid">
          <div>
            <h2 className="title" style={{marginBottom:24}}>Dúvidas objetivas antes da consulta.</h2>
            <p className="lede">Informações práticas para quem busca cuidado médico com clareza, privacidade e uma leitura mais precisa da pressão que vive.</p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;