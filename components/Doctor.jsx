import React from 'react';
import { motion } from 'framer-motion';

const Doctor = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="doctor" id="medico">
      <div className="wrap">
        <motion.div
          className="section-num"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          03 · O Médico
        </motion.div>

        <div className="doc-grid">
          <motion.div
            className="doc-photo"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/assets/dr-thyago.png"
              alt="Retrato do Dr. Thyago Henrique"
              width="1024"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            <div className="doc-photo-cap">
              <div>
                <strong>Dr. Thyago Henrique</strong>
                <span>Médico · <em>CRM-GO 30.392</em></span>
              </div>
              <div>Saúde<br /><span style={{ color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 11 }}>Mental</span></div>
            </div>
          </motion.div>

          <div className="doc-info">
            <motion.div
              className="eyebrow"
              style={{ marginBottom: 24 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Formação, clínica e decisão
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Um médico que transforma temas sobre mente, comportamento e pressão cotidiana em orientação clara para a vida real.
            </motion.h3>

            <motion.p
              className="doc-bio"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Dr. Thyago Henrique é médico formado pela UNIFENAS, professor e comunicador, com mestrado em Neurociências em andamento.
            </motion.p>

            <motion.p
              className="doc-bio"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Sua trajetória passa por consultório, docência médica, palestras, treinamentos corporativos e formação complementar em medicina de emergência e transporte aeromédico. Essa combinação traz uma leitura objetiva para pessoas que vivem em ambientes de cobrança, exposição e decisões críticas.
            </motion.p>

            <motion.dl
              className="cred-list"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: 'Registro', val: <strong>CRM-GO 30.392</strong>, meta: ' · Médico' },
                { label: 'Formação médica', val: <span>Medicina · <strong>UNIFENAS</strong></span> },
                { label: 'Neurociências', val: <span>Mestrado em andamento · <strong>neurobiologia e performance cognitiva</strong></span> },
                { label: 'Atuação', val: <span>Professor Universitário · Palestrante · Treinamentos em alta exigência</span> }
              ].map((c, i) => (
                <motion.div key={i} className="cred-row" variants={itemVariants}>
                  <dt>{c.label}</dt>
                  <dd>{c.val}{c.meta}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Doctor;
