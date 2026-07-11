import React from 'react';
import { motion } from 'framer-motion';
import { openWhatsApp } from './config.js';

const ClosingCTA = () => (
  <section className="closing dark" id="agendar">
    <div className="wrap">
      <motion.div
        className="section-num"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.7, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        09 · Agendar consulta
      </motion.div>

      <motion.h2
        className="title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        Você não precisa esperar que a pressão se transforme em ruptura.
      </motion.h2>

      <motion.p
        className="lede"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Quando sono, atenção, humor ou capacidade de recuperação começam a mudar, uma avaliação médica pode ajudar a compreender o contexto com mais clareza.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="btn-primary" onClick={openWhatsApp}>
          Agendar consulta
          <span style={{ fontSize: 14, letterSpacing: 0 }} aria-hidden="true">→</span>
        </button>
        <p className="cta-note">Atendimento reservado · presencial e online · resposta da equipe em horário comercial</p>
      </motion.div>
    </div>
  </section>
);

export default ClosingCTA;
