import React from 'react';
import RouteSEO from '../../components/seo/RouteSEO.jsx';
import '../TechnicalPlaceholder/technical-placeholder.css';

const NotFoundPage = () => (
  <div>
    <RouteSEO
      title="Página não encontrada | Dr. Thyago Henrique"
      description="A página solicitada não foi encontrada no ecossistema Dr. Thyago Henrique."
      path="/404"
      robots="noindex, nofollow"
    />
    <main className="technical-placeholder" id="conteudo">
      <section className="technical-placeholder__panel" aria-labelledby="not-found-title">
        <p>404</p>
        <h1 id="not-found-title">Página não encontrada.</h1>
        <span>A página solicitada não existe ou ainda não foi disponibilizada.</span>
        <a href="/">Voltar para a página institucional</a>
      </section>
    </main>
  </div>
);

export default NotFoundPage;
