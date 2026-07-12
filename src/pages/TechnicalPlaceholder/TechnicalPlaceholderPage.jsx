import React from 'react';
import './technical-placeholder.css';

const TechnicalPlaceholderPage = ({ label }) => (
  <main className="technical-placeholder" id="conteudo">
    <section className="technical-placeholder__panel" aria-labelledby="placeholder-title">
      <p>Ecossistema Dr. Thyago Henrique</p>
      <h1 id="placeholder-title">{label}</h1>
      <span>Página em preparação. O conteúdo será publicado em breve.</span>
      <a href="/">Voltar para a página institucional</a>
    </section>
  </main>
);

export default TechnicalPlaceholderPage;
