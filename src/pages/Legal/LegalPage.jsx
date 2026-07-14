import React from 'react';
import { Link } from 'react-router-dom';
import RouteSEO from '../../components/seo/RouteSEO.jsx';
import { BRAND } from '../../config/brand.js';
import { CONTACT } from '../../config/contact.js';
import { ROUTES } from '../../config/routes.js';
import './legal.css';

const pages = {
  privacy: {
    eyebrow: 'Privacidade e dados pessoais', title: 'Política de Privacidade', path: ROUTES.privacy,
    description: 'Como o ecossistema Dr. Thyago Henrique trata dados pessoais e respeita seus direitos.',
    sections: [
      ['Dados tratados', 'Podemos tratar dados enviados voluntariamente pelos canais de contato, como nome, telefone, e-mail, mensagem e demais informações que você decidir compartilhar. Informações sobre saúde merecem proteção reforçada: não envie dados clínicos sensíveis por canais públicos ou não seguros.'],
      ['Finalidades e compartilhamento', 'Usamos dados para responder contatos, orientar sobre serviços e produtos, viabilizar solicitações, cumprir obrigações legais e proteger a segurança do site. Não vendemos dados pessoais. WhatsApp, e-mail, Instagram e Kiwify são serviços de terceiros; ao utilizá-los, seus dados também seguem as políticas dessas plataformas.'],
      ['Seus direitos', 'Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção, eliminação, portabilidade, informação sobre compartilhamentos e revogação de consentimento quando aplicável. Para exercer seus direitos, entre em contato conosco.'],
    ],
  },
  terms: {
    eyebrow: 'Uso responsável', title: 'Termos de Uso', path: ROUTES.terms,
    description: 'Condições de uso do site e dos conteúdos digitais do ecossistema Dr. Thyago Henrique.',
    sections: [
      ['Escopo e natureza do conteúdo', 'Este site apresenta informações institucionais e conteúdos educacionais digitais. Ele não substitui consulta, avaliação, diagnóstico, psicoterapia, prescrição ou tratamento médico ou psicológico, nem cria relação médico-paciente por si só.'],
      ['Situações de urgência', 'O NeuroCalma e os demais conteúdos do site não são canais de urgência. Em situação de risco imediato, crise intensa ou agravamento importante, procure o serviço de emergência da sua região.'],
      ['Compra, acesso e uso adequado', 'Condições comerciais, pagamento, acesso e eventual reembolso são apresentados pela Kiwify antes da conclusão do pedido. O acesso ao conteúdo é pessoal e intransferível. Não é permitido copiar, distribuir, gravar, revender ou explorar o conteúdo sem autorização prévia e escrita.'],
      ['Propriedade intelectual', 'Textos, vídeos, marcas e elementos visuais são protegidos por direitos de propriedade intelectual. Links externos são de responsabilidade dos respectivos titulares. Estes termos podem ser atualizados quando necessário.'],
    ],
  },
};

const LegalPage = ({ page }) => {
  const content = pages[page];
  return <div className="legal-page">
    <RouteSEO title={`${content.title} | ${BRAND.siteName}`} description={content.description} path={content.path} />
    <a className="legal-skip-link" href="#conteudo-legal">Pular para o conteúdo</a>
    <header className="legal-header"><div className="legal-wrap legal-header__inner"><Link className="legal-brand" to="/"><span>Dr. Thyago</span> Henrique</Link><Link className="legal-header__back" to={ROUTES.neurocalma}>Voltar ao NeuroCalma ↗</Link></div></header>
    <main id="conteudo-legal"><section className="legal-hero"><div className="legal-hero__glow" aria-hidden="true" /><div className="legal-wrap legal-hero__content"><p className="legal-eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p className="legal-lead">{content.description}</p><p className="legal-updated">Última atualização: 14 de julho de 2026</p></div></section><section className="legal-document"><div className="legal-wrap legal-document__grid"><nav className="legal-index" aria-label="Nesta página"><p>Nesta página</p><ol>{content.sections.map(([title], index) => <li key={title}><a href={`#legal-${index}`}>{title}</a></li>)}</ol></nav><div className="legal-copy"><p className="legal-intro">Esta página faz parte do ecossistema {BRAND.siteName}. Leia-a com atenção antes de utilizar o site ou seus canais de contato.</p>{content.sections.map(([title, body], index) => <section id={`legal-${index}`} className="legal-section" key={title}><h2>{index + 1}. {title}</h2><p>{body}</p></section>)}</div></div></section></main>
    <footer className="legal-footer"><div className="legal-wrap legal-footer__inner"><p>Dr. Thyago Henrique · {CONTACT.crm}</p><nav aria-label="Links legais"><Link to={ROUTES.privacy}>Privacidade</Link><Link to={ROUTES.terms}>Termos de Uso</Link><a href={`mailto:${CONTACT.email}`}>Contato</a></nav></div></footer>
  </div>;
};

export default LegalPage;
