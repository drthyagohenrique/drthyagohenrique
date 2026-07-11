import React from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  {
    num: '01',
    name: ['Alerta', 'persistente'],
    score: 'Sinal',
    fill: 35,
    symptoms: [
      'Dificuldade real de desligar a mente',
      'Sensação de prontidão mesmo em repouso',
      'Tensão acumulada ao fim do dia',
      'Recuperação menor do que a carga exige',
    ],
  },
  {
    num: '02',
    name: ['Sono', 'não reparador'],
    score: 'Ritmo',
    fill: 58,
    symptoms: [
      'Sono leve, interrompido ou insuficiente',
      'Acordar cansado apesar de ter dormido',
      'Uso de energia mental desde as primeiras horas',
      'Dificuldade de recuperar depois de ciclos intensos',
    ],
  },
  {
    num: '03',
    name: ['Fadiga', 'cognitiva'],
    score: 'Clareza',
    fill: 76,
    symptoms: [
      'Queda de concentração em tarefas decisivas',
      'Irritabilidade fora do padrão habitual',
      'Memória e tomada de decisão menos consistentes',
      'Sensação de funcionar no limite por tempo demais',
    ],
  },
  {
    num: '04',
    name: ['Risco de', 'ruptura'],
    score: 'Cuidado',
    fill: 92,
    symptoms: [
      'Perda progressiva de desempenho sustentável',
      'Corpo cobrando pausas que a agenda não permite',
      'Impacto em relações, decisões e rotina',
      'Necessidade de avaliação médica individualizada',
    ],
  },
];

const NeuralSaturation = () => {
  const [active, setActive] = React.useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="mechanism" id="saturacao-neural">
      <div className="wrap">
        <motion.div 
          className="section-num"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          07 · Linha de pesquisa e observação clínica
        </motion.div>
        
        <div className="mech-head">
          <motion.h2 
            className="title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Saturação Neural ajuda a compreender a sobrecarga antes que ela se transforme em ruptura.
          </motion.h2>
          <motion.p 
            className="lede"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Ao longo da prática médica, da docência e da investigação em neurociências, Dr. Thyago passou a organizar padrões recorrentes observados em pessoas submetidas a pressão contínua: alerta persistente, sono não reparador, fadiga cognitiva e perda gradual da capacidade de recuperação.
          </motion.p>
        </div>

        <motion.div 
          className="mech-tm"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mech-tm-grid">
            <h3 className="mech-tm-name">Saturação<br/><em>Neural</em></h3>
            <p className="mech-tm-def">Neste site, Saturação Neural é apresentada exclusivamente como <strong>conceito de estudo e linha de pesquisa</strong> sobre estados de sobrecarga mental crônica. Não é diagnóstico, doença, tratamento, protocolo ou promessa de resultado. Sua utilização não substitui avaliação médica individualizada.</p>
          </div>
        </motion.div>

        <motion.div 
          className="stages"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STAGES.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`stage ${active === i ? 'active' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <div>
                <div className="stage-num">Observação {s.num}</div>
                <h4 className="stage-name">{s.name[0]}<br/><em>{s.name[1]}</em></h4>
                <ul className="stage-symptoms">
                  {s.symptoms.map((sm, j) => <li key={j}>{sm}</li>)}
                </ul>
              </div>
              <div>
                <div className="stage-bar">
                  <motion.div 
                    className="stage-bar-fill" 
                    animate={{ width: active === i ? `${s.fill}%` : '0%' }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                  ></motion.div>
                </div>
                <div className="stage-score">
                  <span>Foco</span>
                  <span>{s.score}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NeuralSaturation;