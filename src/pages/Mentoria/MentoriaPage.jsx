import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import RouteSEO from '../../components/seo/RouteSEO.jsx';
import './mentoria.css';

const faqData = [
      { q: 'O aulão ensina a parte clínica?', a: 'Não. Nem o aulão, nem a mentoria ensinam medicações, fisiopatologia ou condução clínica de transtornos. O foco é posicionamento, operação e autoridade — o que você faz com a competência clínica que já tem.' },
      { q: 'Preciso ter RQE?', a: 'Não é obrigatório. O aulão e a Mind Legacy são para médicos que já atuam ou querem consolidar sua atuação em saúde mental, especialistas ou não.' },
      { q: 'Estou no começo da carreira. Serve para mim?', a: 'Serve principalmente para quem já atende e sente que a técnica não está se traduzindo em posicionamento, demanda ou valor. Se você ainda não iniciou a prática clínica, o conteúdo faz mais sentido mais adiante.' },
      { q: 'E depois do aulão?', a: 'Você sai com um diagnóstico claro do que está travando sua carreira. Ao final, apresentamos a Mind Legacy — a mentoria completa — sem nenhuma obrigação de entrar.' },
      { q: 'A mentoria garante aumento de faturamento?', a: 'Não prometemos um número específico. O Mind Legacy Score mede sua evolução em 10 dimensões, mas o resultado depende da implementação de cada pilar na sua realidade.' },
      { q: 'Como funciona o acompanhamento durante as 16 semanas?', a: 'Pelo grupo exclusivo de WhatsApp com o mentor e o Team T.H., com a dinâmica de Estratégia → Implementação repetida a cada pilar.' },
      { q: 'Quando é a próxima turma?', a: 'Datas, investimento e disponibilidade da próxima turma são informados diretamente pelo time — fale com a gente para saber a data mais próxima.' }
    ];

export default function MentoriaPage() {
  const rootRef = useRef(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [parallax, setParallax] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setParallax(media.matches ? 0 : Math.round(window.scrollY * 0.14)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    media.addEventListener('change', onScroll);
    onScroll();
    const footer = rootRef.current?.querySelector('#site-footer');
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      setStickyVisible(!entries[0].isIntersecting);
    }, { rootMargin: '0px 0px -10% 0px' }) : null;
    if (footer) observer?.observe(footer);
    return () => {
      window.removeEventListener('scroll', onScroll);
      media.removeEventListener('change', onScroll);
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);
  const faqs = faqData.map((item, index) => ({ ...item,
    isOpen: faqOpen === index,
    icon: faqOpen === index ? '−' : '+',
    toggle: () => setFaqOpen(current => current === index ? null : index),
  }));
  const stickyOpacity = stickyVisible ? 1 : 0;
  const stickyPointer = stickyVisible ? 'auto' : 'none';
  return <>
    <RouteSEO title="Mind Legacy — Mentoria | Dr. Thyago Henrique" description="Mentoria Mind Legacy: uma jornada de 16 semanas para construir posicionamento, operação e autoridade na saúde mental com Dr. Thyago Henrique." path="/mentoria" />
    <Helmet><link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap" rel="stylesheet" /></Helmet>

<main ref={rootRef} className="mentoria-page" style={{"background": "#0A0A0A", "color": "#F2F4FF", "width": "100%", "overflowX": "hidden"}}>


  <div style={{"position": "sticky", "top": "0", "zIndex": "10", "background": "rgba(10,10,10,0.88)", "backdropFilter": "blur(10px)", "borderBottom": "1px solid rgba(242,244,255,0.08)"}}>
    <div className="container" style={{"display": "flex", "alignItems": "center", "justifyContent": "space-between", "paddingBlock": "18px"}}>
      <img src="/assets/mentoria/8a197b6b7e5d84d52ef0cb8c182e4b8f.png" alt="Mind Legacy" style={{"height": "42px", "width": "auto", "display": "block"}} />
      <div className="nav-links">
        <a className="label hide-mobile" style={{"fontWeight": "400", "textTransform": "none", "letterSpacing": "0", "fontSize": "14px", "color": "rgba(242,244,255,0.75)"}} href="#metodo">Método</a>
        <a className="label hide-mobile" style={{"fontWeight": "400", "textTransform": "none", "letterSpacing": "0", "fontSize": "14px", "color": "rgba(242,244,255,0.75)"}} href="#mentor">Mentor</a>
        <a className="label hide-mobile" style={{"fontWeight": "400", "textTransform": "none", "letterSpacing": "0", "fontSize": "14px", "color": "rgba(242,244,255,0.75)"}} href="#score">Score</a>
        <a className="btn btn-primary" href="#cta-final">Quero minha vaga →</a>
      </div>
    </div>
  </div>


  <section style={{"position": "relative", "minHeight": "min(94vh,880px)", "display": "flex", "alignItems": "center", "overflow": "hidden", "paddingBlock": "140px 80px"}}>
    <div style={{"position": "absolute", "top": "-18%", "left": "0", "right": "0", "height": "136%", "backgroundImage": "url('/assets/mentoria/4142104c48115a5772a445d850bd73cc.png')", "backgroundSize": "cover", "backgroundPosition": "50% 12%", "filter": "brightness(0.6) saturate(0.85) contrast(1.08)", "transform": `translateY(${parallax}px)`, "willChange": "transform"}}></div>
    <div style={{"position": "absolute", "inset": "0", "background": "linear-gradient(100deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 30%, rgba(10,10,10,0.5) 62%, rgba(10,10,10,0.68) 100%)"}}></div>
    <div style={{"position": "absolute", "inset": "0", "background": "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(10,10,10,0.6) 100%)"}}></div>
    <div style={{"position": "absolute", "inset": "0", "background": "#C9A227", "opacity": "0.11"}}></div>
    <div className="container" style={{"position": "relative", "zIndex": "1"}}>
      <div style={{"maxWidth": "620px"}}>
        <div className="label" style={{"color": "#E3C564"}}>Mente · Comportamento · Autoridade</div>
        <h1 className="h1" style={{"marginTop": "22px"}}>Você não precisa<br />atender mais.<br />Precisa <span style={{"fontStyle": "italic", "color": "#E3C564"}}>valer mais</span>.</h1>
        <p className="lead" style={{"marginTop": "26px", "maxWidth": "540px", "color": "rgba(242,244,255,0.78)"}}>Mentoria de 4 meses para médicos de saúde mental. Um método de 7 pilares para transformar sua competência clínica em posicionamento, operação estruturada e autoridade reconhecida — com acompanhamento direto do Team T.H.</p>
        <div style={{"display": "flex", "flexWrap": "wrap", "gap": "16px", "marginTop": "36px"}}>
          <a className="btn btn-primary" href="#cta-final">Quero construir minha autoridade</a>
          <a className="btn btn-ghost-dark" href="#metodo">Conhecer o método</a>
        </div>
        <div style={{"display": "inline-flex", "alignItems": "center", "gap": "10px", "marginTop": "40px", "background": "rgba(10,10,10,0.55)", "border": "1px solid rgba(242,244,255,0.18)", "borderRadius": "999px", "padding": "9px 20px"}}>
          <span className="serif" style={{"fontSize": "14px", "fontStyle": "italic"}}>Dr. Thyago Henrique</span>
        </div>
      </div>
    </div>
  </section>


  <div style={{"background": "#0A0A0A", "borderTop": "1px solid rgba(242,244,255,0.1)"}}>
    <div className="container cred-grid" style={{"paddingBlock": "40px"}}>
      <div>
        <div className="label" style={{"color": "rgba(242,244,255,0.4)"}}>Mentor</div>
        <div className="serif" style={{"fontSize": "19px", "marginTop": "8px"}}>Dr. Thyago <span style={{"fontStyle": "italic", "color": "#E3C564"}}>Henrique</span></div>
      </div>
      <div>
        <div className="label" style={{"color": "rgba(242,244,255,0.4)"}}>Formato</div>
        <div className="serif" style={{"fontSize": "19px", "marginTop": "8px"}}>4 meses <span style={{"fontStyle": "italic", "color": "#E3C564"}}>· 16 semanas</span></div>
      </div>
      <div>
        <div className="label" style={{"color": "rgba(242,244,255,0.4)"}}>Método</div>
        <div className="serif" style={{"fontSize": "19px", "marginTop": "8px"}}>7 pilares <span style={{"fontStyle": "italic", "color": "#E3C564"}}>· 3 fases</span></div>
      </div>
      <div>
        <div className="label" style={{"color": "rgba(242,244,255,0.4)"}}>Turma</div>
        <div className="serif" style={{"fontSize": "19px", "marginTop": "8px"}}>Vagas <span style={{"fontStyle": "italic", "color": "#E3C564"}}>limitadas</span></div>
      </div>
    </div>
  </div>


  <div className="marquee" style={{"background": "#0A0A0A", "borderTop": "1px solid rgba(242,244,255,0.1)", "borderBottom": "1px solid rgba(242,244,255,0.1)", "paddingBlock": "16px"}}>
    <div className="marquee-track">
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>MÉTODO PRÓPRIO</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>7 PILARES</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>TEAM T.H</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>AUTORIDADE CLÍNICA</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>POSICIONAMENTO</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>MIND LEGACY SCORE</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>MÉTODO PRÓPRIO</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>7 PILARES</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>TEAM T.H</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>AUTORIDADE CLÍNICA</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>POSICIONAMENTO</span><span style={{"color": "#C9A227"}}>●</span>
      <span className="label" style={{"color": "rgba(242,244,255,0.5)", "paddingInline": "18px"}}>MIND LEGACY SCORE</span><span style={{"color": "#C9A227"}}>●</span>
    </div>
  </div>


  <section style={{"background": "#ECE9FF", "color": "#0A0A0A"}}>
    <div className="container">
      <div className="section-head"><span className="label" style={{"color": "#9C7A1A"}}>01 · O RETRATO DE AGORA</span><span className="section-rule"></span></div>
      <h2 className="h2">Você já domina a técnica.<br />O problema nunca foi esse.</h2>
      <p className="lead" style={{"marginTop": "20px", "maxWidth": "700px", "color": "rgba(10,10,10,0.68)"}}>Médico que já atua — ou quer consolidar sua atuação — em saúde mental. Possui conhecimento técnico sólido. Mas ainda não transformou essa competência em posicionamento, autoridade e uma operação de consultório estruturada.</p>
      <div style={{"overflowX": "auto"}}>
        <table className="cmp-table"><tbody>
        <tr><th className="label" style={{"color": "#9C7A1A"}}>Hoje</th><th className="label" style={{"color": "#9C7A1A"}}>Com a Mind Legacy</th></tr>
        <tr><td style={{"fontSize": "15px"}}>Depende muito de indicação</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Geração própria de demanda e autoridade</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Cobra menos do que gostaria</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Precificação alinhada ao seu valor real</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Não sabe se posicionar</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Posicionamento claro e diferenciado</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Produz conteúdo sem estratégia — ou nem produz</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Conteúdo de autoridade com propósito</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Não tem previsibilidade na entrada de pacientes</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Funil de aquisição estruturado</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Não acompanha seus leads</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Gestão ativa de leads e carteira</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Não tem jornada de acompanhamento estruturada</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Jornada do paciente desenhada ponta a ponta</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Centraliza tudo em si mesmo</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Operação que funciona além da sua agenda</td></tr>
        <tr><td style={{"fontSize": "15px"}}>É pouco conhecido fora do próprio círculo</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Autoridade reconhecida publicamente</td></tr>
        <tr><td style={{"fontSize": "15px"}}>Vê profissionais tecnicamente inferiores com mais visibilidade</td><td style={{"fontSize": "15px", "fontWeight": "600", "color": "#9C7A1A"}}>Visibilidade compatível com sua competência real</td></tr>
        </tbody></table>
      </div>
    </div>
  </section>


  <section style={{"background": "radial-gradient(ellipse at 30% 30%, rgba(201,162,39,0.14), transparent 60%), #0A0A0A", "textAlign": "center"}}>
    <div className="container">
      <div className="label" style={{"color": "#E3C564"}}>A promessa Mind Legacy</div>
      <div className="chain-wrap" style={{"margin": "32px 0"}}>
        <span className="chain-item">Autoridade</span><span className="chain-arrow">→</span>
        <span className="chain-item">Valorização</span><span className="chain-arrow">→</span>
        <span className="chain-item">Maior demanda</span><span className="chain-arrow">→</span>
        <span className="chain-item">Poder de escolha</span><span className="chain-arrow">→</span>
        <span className="chain-item" style={{"fontStyle": "italic", "color": "#E3C564"}}>Liberdade</span>
      </div>
      <p className="lead" style={{"maxWidth": "680px", "margin": "0 auto", "color": "rgba(242,244,255,0.75)"}}>Construa uma carreira de autoridade na saúde mental, aumente seu valor e sua renda, e conquiste liberdade para trabalhar quando e de onde quiser.</p>
      <p style={{"maxWidth": "680px", "margin": "16px auto 0", "fontSize": "15px", "lineHeight": "1.7", "color": "rgba(242,244,255,0.5)"}}>Ao final, você sairá com posicionamento claro, uma operação profissional estruturada, mecanismos reais de aquisição de pacientes e uma estratégia concreta de construção de autoridade.</p>
      <a className="btn btn-primary" href="#cta-final" style={{"marginTop": "34px"}}>Quero conhecer a próxima turma</a>
    </div>
  </section>


  <section style={{"background": "#F2F4FF", "color": "#0A0A0A"}}>
    <div className="container" style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(min(420px,100%),1fr))", "gap": "48px"}}>
      <div>
        <div className="section-head"><span className="label" style={{"color": "#9C7A1A"}}>O QUE FAZEMOS</span><span className="section-rule"></span></div>
        <h2 className="h2">Transformamos profissionais em referências.</h2>
        <p style={{"marginTop": "20px", "fontSize": "15.5px", "lineHeight": "1.7", "color": "rgba(10,10,10,0.65)"}}>Ensinamos o profissional que já atende saúde mental a construir uma carreira mais valorizada, estruturada e reconhecida — com posicionamento, operação, aquisição, autoridade e proteção.</p>
      </div>
      <div style={{"borderLeft": "1px solid rgba(10,10,10,0.12)", "paddingLeft": "40px"}}>
        <div className="label" style={{"color": "rgba(10,10,10,0.4)"}}>O QUE NÃO FAZEMOS</div>
        <ul className="list-dash" style={{"marginTop": "20px", "color": "rgba(10,10,10,0.72)"}}>
          <li>Não ensinamos a parte técnica (medicações, fisiopatologia de transtornos etc.)</li>
          <li>Não substituímos sua formação base — residência médica ou pós-graduação</li>
          <li>Não ensinamos a tratar melhor um transtorno</li>
        </ul>
      </div>
    </div>
  </section>


  <section id="mentor" style={{"background": "#0A0A0A"}}>
    <div className="container" style={{"display": "grid", "gridTemplateColumns": "0.8fr 1.2fr", "gap": "56px"}}>
      <div>
        <div style={{"position": "relative", "display": "flex", "justifyContent": "center"}}>
          <div style={{"position": "absolute", "inset": "4% 10%", "background": "radial-gradient(circle at 50% 40%, rgba(201,162,39,0.3), transparent 70%)", "filter": "blur(12px)"}}></div>
          <div style={{"position": "relative", "background": "#111", "border": "1px solid rgba(242,244,255,0.1)", "borderRadius": "4px", "padding": "28px", "width": "100%"}}>
            <img src="/assets/mentoria/880de207e8bf194781732b4405c85796.png" alt="Dr. Thyago Henrique" style={{"width": "100%", "height": "auto", "display": "block"}} />
            <div style={{"marginTop": "18px"}}>
              <div className="serif" style={{"fontSize": "18px"}}>Dr. Thyago Henrique</div>
              <div className="label" style={{"color": "rgba(242,244,255,0.4)", "marginTop": "4px"}}>MENTOR · TEAM T.H</div>
            </div>
          </div>
        </div>
        <div style={{"position": "relative", "padding": "26px 0 22px 22px", "marginTop": "36px"}}>
          <div style={{"position": "absolute", "top": "0", "left": "0", "width": "34px", "height": "34px", "borderTop": "2px solid #C9A227", "borderLeft": "2px solid #C9A227"}}></div>
          <div style={{"position": "absolute", "bottom": "0", "left": "0", "width": "34px", "height": "34px", "borderBottom": "2px solid #C9A227", "borderLeft": "2px solid #C9A227"}}></div>
          <div style={{"display": "flex", "flexDirection": "column", "gap": "22px"}}>
            <div>
              <img src="/assets/mentoria/5a223e7288af612521bc9c2cf41292cb.jpg" alt="Entrevista na TV Globo" style={{"width": "100%", "height": "auto", "display": "block", "border": "1px solid rgba(242,244,255,0.12)"}} />
              <div className="label" style={{"color": "rgba(242,244,255,0.4)", "marginTop": "10px", "display": "flex", "alignItems": "center", "gap": "8px"}}>
                <span style={{"color": "#C9A227"}}>▣</span> ENTREVISTA · TV GLOBO
              </div>
            </div>
            <div>
              <img src="/assets/mentoria/b004087de12d620a12de8aaa3929091c.jpg" alt="Entrevista no SBT" style={{"width": "100%", "height": "auto", "display": "block", "border": "1px solid rgba(242,244,255,0.12)"}} />
              <div className="label" style={{"color": "rgba(242,244,255,0.4)", "marginTop": "10px", "display": "flex", "alignItems": "center", "gap": "8px"}}>
                <span style={{"color": "#C9A227"}}>▣</span> ENTREVISTA · SBT
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="label" style={{"color": "#E3C564"}}>SEU MENTOR</div>
        <h2 className="h2" style={{"marginTop": "16px"}}>Dr. Thyago <span style={{"fontStyle": "italic", "color": "#E3C564"}}>Henrique</span></h2>
        <p className="lead" style={{"marginTop": "20px", "color": "rgba(242,244,255,0.68)"}}>À frente da Mind Legacy, Dr. Thyago Henrique conduz uma jornada prática para transformar competência clínica em posicionamento, operação e autoridade. Durante a mentoria, o acompanhamento é feito diretamente com o mentor e o Team T.H.</p>
        <p style={{"marginTop": "20px", "fontSize": "15.5px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.68)"}}>Psiquiatra com atendimento dedicado a artistas, políticos, empresários e outras pessoas públicas: gente que vive sob alta responsabilidade, exposição e julgamento. Foi convidado por uma agência de gerenciamento artístico para cuidar da saúde mental de elencos e profissionais sob pressão, e virou referência no debate sobre sobrecarga mental em ambientes de alta performance.</p>
        <p style={{"marginTop": "16px", "fontSize": "15.5px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.68)"}}>Mas o que importa para você é outra coisa: <strong style={{"color": "#F2F4FF"}}>ele construiu essa posição do zero, sendo médico como você.</strong> Escreveu livros, foi chamado para podcasts, TVs e palcos, saiu na capa de um dos maiores jornais do país e reuniu uma audiência de mais de meio milhão de visualizações por mês.</p>
        <p style={{"marginTop": "16px", "fontSize": "15.5px", "lineHeight": "1.75", "color": "#F2F4FF", "fontWeight": "500"}}>Não é teoria de marketing. É o que ele aplicou na própria carreira, organizado em um método que você pode seguir.</p>

        <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(min(220px,100%),1fr))", "border": "1px solid rgba(242,244,255,0.12)", "marginTop": "32px"}}>
          <div style={{"padding": "22px 26px", "borderRight": "1px solid rgba(242,244,255,0.12)", "borderBottom": "1px solid rgba(242,244,255,0.12)"}}>
            <div className="serif" style={{"fontSize": "32px", "fontWeight": "500", "color": "#E3C564"}}>535 mil</div>
            <div className="label" style={{"color": "rgba(242,244,255,0.4)", "marginTop": "6px", "fontSize": "10.5px"}}>VISUALIZAÇÕES EM 30 DIAS</div>
          </div>
          <div style={{"padding": "22px 26px", "borderBottom": "1px solid rgba(242,244,255,0.12)"}}>
            <div className="serif" style={{"fontSize": "32px", "fontWeight": "500", "color": "#E3C564"}}>222 mil</div>
            <div className="label" style={{"color": "rgba(242,244,255,0.4)", "marginTop": "6px", "fontSize": "10.5px"}}>PESSOAS ÚNICAS ALCANÇADAS</div>
          </div>
          <div style={{"padding": "22px 26px", "borderRight": "1px solid rgba(242,244,255,0.12)"}}>
            <div className="serif" style={{"fontSize": "32px", "fontWeight": "500", "color": "#E3C564"}}>46,8 mil</div>
            <div className="label" style={{"color": "rgba(242,244,255,0.4)", "marginTop": "6px", "fontSize": "10.5px"}}>INTERAÇÕES NO PERÍODO</div>
          </div>
          <div style={{"padding": "22px 26px"}}>
            <div className="serif" style={{"fontSize": "32px", "fontWeight": "500", "color": "#E3C564"}}>66%</div>
            <div className="label" style={{"color": "rgba(242,244,255,0.4)", "marginTop": "6px", "fontSize": "10.5px"}}>DO PÚBLICO TEM 25 A 44 ANOS</div>
          </div>
        </div>
        <p style={{"marginTop": "14px", "fontSize": "12px", "color": "rgba(242,244,255,0.35)"}}>Instagram @drthyagohenrique · painel profissional · 3 ago a 1 set de 2026</p>

        <div style={{"marginTop": "28px", "display": "flex", "flexDirection": "column"}}>
          <div style={{"display": "flex", "justifyContent": "space-between", "gap": "20px", "padding": "14px 0", "borderTop": "1px solid rgba(242,244,255,0.12)"}}>
            <span className="label" style={{"color": "rgba(242,244,255,0.4)"}}>REGISTRO</span>
            <span className="serif" style={{"fontSize": "15px", "textAlign": "right"}}>CRM-GO 30.392</span>
          </div>
          <div style={{"display": "flex", "justifyContent": "space-between", "gap": "20px", "padding": "14px 0", "borderTop": "1px solid rgba(242,244,255,0.12)"}}>
            <span className="label" style={{"color": "rgba(242,244,255,0.4)"}}>PALCO</span>
            <span className="serif" style={{"fontSize": "15px", "textAlign": "right"}}>Palestras corporativas; convite para Bruxelas em 2027</span>
          </div>
          <div style={{"display": "flex", "justifyContent": "space-between", "gap": "20px", "padding": "14px 0", "borderTop": "1px solid rgba(242,244,255,0.12)", "borderBottom": "1px solid rgba(242,244,255,0.12)"}}>
            <span className="label" style={{"color": "rgba(242,244,255,0.4)"}}>OBRA</span>
            <span className="serif" style={{"fontSize": "15px", "textAlign": "right"}}>Livro <span style={{"fontStyle": "italic"}}>Domine o Jogo</span> e aplicativo MindUp</span>
          </div>
        </div>
        <a className="btn btn-ghost-dark" href="#cta-final" style={{"marginTop": "32px"}}>Falar com o time</a>
      </div>
    </div>
  </section>


  <section id="metodo" style={{"background": "#ECE9FF", "color": "#0A0A0A", "textAlign": "center"}}>
    <div className="container">
      <div className="label" style={{"color": "#9C7A1A"}}>02 · O MÉTODO</div>
      <h2 className="h2" style={{"marginTop": "16px"}}>O Método Mind Legacy</h2>
      <p className="lead" style={{"marginTop": "12px", "color": "rgba(10,10,10,0.6)"}}>3 Fases · 7 Pilares · 16 semanas de transformação estruturada</p>
      <div className="cards-3" style={{"marginTop": "48px", "textAlign": "left", "border": "1px solid rgba(10,10,10,0.1)"}}>
        <div className="fcard" style={{"background": "#0A0A0A", "color": "#F2F4FF", "borderRight": "1px solid rgba(10,10,10,0.1)"}}>
          <div className="label" style={{"color": "#E3C564"}}>FASE I — FUNDAÇÃO</div>
          <p style={{"marginTop": "16px", "fontSize": "15px", "lineHeight": "1.8", "color": "rgba(242,244,255,0.75)"}}>1. Diagnóstico<br />2. Posicionamento</p>
        </div>
        <div className="fcard" style={{"background": "#F2F4FF", "borderRight": "1px solid rgba(10,10,10,0.1)"}}>
          <div className="label" style={{"color": "#9C7A1A"}}>FASE II — CRESCIMENTO</div>
          <p style={{"marginTop": "16px", "fontSize": "15px", "lineHeight": "1.8", "color": "rgba(10,10,10,0.72)"}}>3. Operação<br />4. Aquisição<br />5. Autoridade</p>
        </div>
        <div className="fcard" style={{"background": "#0A0A0A", "color": "#F2F4FF"}}>
          <div className="label" style={{"color": "#E3C564"}}>FASE III — LEGADO</div>
          <p style={{"marginTop": "16px", "fontSize": "15px", "lineHeight": "1.8", "color": "rgba(242,244,255,0.75)"}}>6. Proteção &amp; Escala<br />7. Implementação</p>
        </div>
      </div>
      <a className="btn btn-ghost-light" href="#pilares" style={{"marginTop": "44px"}}>Quero entender o método</a>
    </div>
  </section>


  <section id="pilares" style={{"background": "#0A0A0A"}}>
    <div className="container">
      <div className="pillar">
        <div><div className="pillar-num">01</div><div className="pillar-meta">Semanas 1–2 · Fase I</div></div>
        <div>
          <h3 className="pillar-title">Diagnóstico</h3>
          <p className="pillar-q">Onde você está nesse momento?</p>
          <p style={{"fontSize": "15px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.62)"}}>Uma fotografia objetiva da sua carreira e do seu negócio: Mind Legacy Score, benchmarking, cliente oculto, mapa de gargalos e análise SWOT — o ponto de partida real, não o que você acha que é.</p>
        </div>
      </div>
      <div className="pillar">
        <div><div className="pillar-num">02</div><div className="pillar-meta">Semanas 3–4 · Fase I</div></div>
        <div>
          <h3 className="pillar-title">Posicionamento</h3>
          <p className="pillar-q">Por que escolher você e não outro profissional?</p>
          <p style={{"fontSize": "15px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.62)"}}>Nicho, paciente ideal, diferenciais, proposta de valor e arquétipo — construídos em uma metodologia própria e levados da consulta ao Instagram, da comunicação verbal à experiência do paciente.</p>
        </div>
      </div>
      <div className="pillar">
        <div><div className="pillar-num">03</div><div className="pillar-meta">Semanas 5–6 · Fase II</div></div>
        <div>
          <h3 className="pillar-title">Operação</h3>
          <p className="pillar-q">Transformando seu consultório em negócio</p>
          <p style={{"fontSize": "15px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.62)"}}>Gestão financeira, precificação e Curva Preço-Demanda, organização de leads e da carteira de pacientes. A lógica central: Lead → Conversão → Atendimento → Acompanhamento → Retenção → Indicação.</p>
        </div>
      </div>
      <div className="pillar">
        <div><div className="pillar-num">04</div><div className="pillar-meta">Semanas 7–8 · Fase II</div></div>
        <div>
          <h3 className="pillar-title">Marketing &amp; Aquisição</h3>
          <p className="pillar-q">Como ser encontrado?</p>
          <p style={{"fontSize": "15px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.62)"}}>Instagram, Google, conteúdo de autoridade e de aquisição, funil completo — Alcance → Interesse → Contato → Lead → Agendamento → Paciente — e, só ao final, tráfego pago com estratégia.</p>
        </div>
      </div>
      <div className="pillar">
        <div><div className="pillar-num">05</div><div className="pillar-meta">Semanas 9–10 · Fase II</div></div>
        <div>
          <h3 className="pillar-title">Autoridade</h3>
          <p className="pillar-q">De profissional para referência</p>
          <p style={{"fontSize": "15px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.62)"}}>A Escada de Autoridade Mind Legacy: Clínica → Digital → Social → Institucional. Networking estratégico, mapa de relacionamentos, palestras, mídia, produção intelectual e construção do seu próprio palco.</p>
        </div>
      </div>
      <div className="pillar">
        <div><div className="pillar-num">06</div><div className="pillar-meta">Semanas 11–12 · Fase III</div></div>
        <div>
          <h3 className="pillar-title">Proteção &amp; Escala</h3>
          <p className="pillar-q">Construindo algo que dure</p>
          <p style={{"fontSize": "15px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.62)"}}>Proteção jurídica, publicidade médica, LGPD e proteção de marca. Depois, eliminar → automatizar → delegar, construção de equipe e as cinco formas de escalar: valor, capacidade, receita, impacto e liberdade.</p>
        </div>
      </div>
      <div className="pillar">
        <div><div className="pillar-num">07</div><div className="pillar-meta">Semanas 13–16 · Fase III</div></div>
        <div>
          <h3 className="pillar-title">Implementação</h3>
          <p className="pillar-q">Da estratégia para a execução</p>
          <p style={{"fontSize": "15px", "lineHeight": "1.75", "color": "rgba(242,244,255,0.62)"}}>Sem novas aulas: 30 dias de execução assistida pelo Team T.H. Você prioriza os 5 Movimentos Legacy, executa, e ao final reaplicamos o Mind Legacy Score e construímos seu Plano Legacy de 12 meses.</p>
        </div>
      </div>
    </div>
  </section>


  <section id="score" style={{"background": "#F2F4FF", "color": "#0A0A0A"}}>
    <div className="container">
      <div className="section-head"><span className="label" style={{"color": "#9C7A1A"}}>03 · FERRAMENTA EXCLUSIVA</span><span className="section-rule"></span></div>
      <h2 className="h2">Mind Legacy Score</h2>
      <p className="lead" style={{"marginTop": "18px", "maxWidth": "700px", "color": "rgba(10,10,10,0.62)"}}>Um raio-x de 100 pontos em 10 dimensões — de faturamento e ticket médio a autoridade e liberdade. Aplicado no Dia 0 e reaplicado ao final, para medir sua evolução real.</p>
      <div className="score-grid" style={{"margin": "36px 0"}}>
        <div className="score-item"><span className="score-dot"></span>Novos pacientes/mês</div>
        <div className="score-item"><span className="score-dot"></span>Faturamento mensal</div>
        <div className="score-item"><span className="score-dot"></span>Ticket médio</div>
        <div className="score-item"><span className="score-dot"></span>Taxa de conversão</div>
        <div className="score-item"><span className="score-dot"></span>Taxa de retenção</div>
        <div className="score-item"><span className="score-dot"></span>Liberdade e autonomia</div>
        <div className="score-item"><span className="score-dot"></span>Presença digital</div>
        <div className="score-item"><span className="score-dot"></span>Estrutura e operação</div>
        <div className="score-item"><span className="score-dot"></span>Networking e indicação</div>
        <div className="score-item"><span className="score-dot"></span>Autoridade e reconhecimento</div>
      </div>
      <p style={{"maxWidth": "700px", "fontSize": "13.5px", "lineHeight": "1.7", "color": "rgba(10,10,10,0.5)"}}>O diagnóstico inicial orienta as prioridades da jornada. A reaplicação ao final permite comparar os avanços nas dimensões avaliadas, sem prometer uma pontuação ou resultado específico.</p>
      <a className="btn btn-ghost-light" href="#cta-final" style={{"marginTop": "28px"}}>Tirar dúvidas com o time</a>
    </div>
  </section>


  <section style={{"background": "#0A0A0A"}}>
    <div className="container">
      <div className="label" style={{"color": "#E3C564"}}>O AULÃO</div>
      <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(min(420px,100%),1fr))", "gap": "40px", "alignItems": "end", "marginTop": "16px"}}>
        <h2 className="h2">Uma noite. Um mapa.<br /><span style={{"fontStyle": "italic", "color": "#E3C564"}}>O seu próximo passo.</span></h2>
        <p style={{"fontSize": "15.5px", "lineHeight": "1.7", "color": "rgba(242,244,255,0.62)"}}>Sem enrolação e sem teoria solta. Você sai do aulão sabendo o que está travando sua carreira e por onde começar a destravar.</p>
      </div>

      <div className="cards-3" style={{"marginTop": "48px", "border": "1px solid rgba(242,244,255,0.12)"}}>
        <div className="fcard" style={{"borderRight": "1px solid rgba(242,244,255,0.12)", "borderBottom": "1px solid rgba(242,244,255,0.12)"}}>
          <div style={{"width": "52px", "height": "52px", "border": "1px solid rgba(201,162,39,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "color": "#C9A227", "fontSize": "20px"}}>◎</div>
          <div className="label" style={{"color": "#9C7A1A", "marginTop": "20px"}}>VOCÊ VAI DESCOBRIR</div>
          <h3 className="pillar-title" style={{"fontSize": "22px", "marginTop": "8px"}}>Onde sua carreira está travada</h3>
          <p style={{"fontSize": "14px", "lineHeight": "1.65", "color": "rgba(242,244,255,0.55)", "marginTop": "10px"}}>São 7 gargalos possíveis: visibilidade, aquisição, conversão, valorização, retenção, indicação e operação. Quase todo médico tem um que segura todos os outros. Você vai descobrir o seu.</p>
        </div>
        <div className="fcard" style={{"borderRight": "1px solid rgba(242,244,255,0.12)", "borderBottom": "1px solid rgba(242,244,255,0.12)"}}>
          <div style={{"width": "52px", "height": "52px", "border": "1px solid rgba(201,162,39,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "color": "#C9A227", "fontSize": "20px"}}>◉</div>
          <div className="label" style={{"color": "#9C7A1A", "marginTop": "20px"}}>VOCÊ VAI ENTENDER</div>
          <h3 className="pillar-title" style={{"fontSize": "22px", "marginTop": "8px"}}>Por que escolheriam você e não o colega</h3>
          <p style={{"fontSize": "14px", "lineHeight": "1.65", "color": "rgba(242,244,255,0.55)", "marginTop": "10px"}}>A diferença entre competência real e competência percebida. Você pode ser o melhor da sala e ainda assim invisível. Vai ver como mudar isso.</p>
        </div>
        <div className="fcard" style={{"borderBottom": "1px solid rgba(242,244,255,0.12)"}}>
          <div style={{"width": "52px", "height": "52px", "border": "1px solid rgba(201,162,39,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "color": "#C9A227", "fontSize": "20px"}}>♛</div>
          <div className="label" style={{"color": "#9C7A1A", "marginTop": "20px"}}>VOCÊ VAI SAIR COM</div>
          <h3 className="pillar-title" style={{"fontSize": "22px", "marginTop": "8px"}}>Clareza do seu próximo degrau</h3>
          <p style={{"fontSize": "14px", "lineHeight": "1.65", "color": "rgba(242,244,255,0.55)", "marginTop": "10px"}}>Clínica, digital, social ou institucional: em que degrau da Escada de Autoridade você está e qual é o passo concreto para subir.</p>
        </div>
      </div>

      <div style={{"border": "1px solid rgba(201,162,39,0.4)", "marginTop": "1px", "padding": "36px 40px", "display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "center", "gap": "28px"}}>
        <div>
          <div className="label" style={{"color": "#9C7A1A"}}>PARA DESCOBRIR O QUE TRAVA O SEU VALOR</div>
          <div className="serif" style={{"fontSize": "44px", "fontWeight": "500", "color": "#F2F4FF", "marginTop": "10px"}}>R$ 50</div>
          <a className="btn btn-primary" href="#" style={{"marginTop": "20px"}}>Garantir minha vaga →</a>
        </div>
        <div style={{"display": "flex", "flexDirection": "column", "gap": "10px", "fontSize": "13.5px", "color": "rgba(242,244,255,0.55)"}}>
          <div>Data: <span style={{"fontStyle": "italic", "color": "rgba(242,244,255,0.4)"}}>[a definir]</span></div>
          <div>Formato: <span style={{"fontStyle": "italic", "color": "rgba(242,244,255,0.4)"}}>[ao vivo, online, com replay?]</span></div>
        </div>
      </div>
      <p style={{"fontSize": "12.5px", "color": "rgba(242,244,255,0.35)", "marginTop": "18px", "maxWidth": "760px"}}>As vagas são limitadas para manter a interação com o mentor. No final, você conhece a mentoria completa, sem obrigação de entrar.</p>
    </div>
  </section>


  <section style={{"background": "#0A0A0A"}}>
    <div className="container">
      <div className="label" style={{"color": "#E3C564"}}>ALÉM DOS 7 PILARES</div>
      <h2 className="h2" style={{"marginTop": "16px"}}>O que mais vem dentro da mentoria</h2>
      <div className="extras-grid" style={{"marginTop": "40px", "border": "1px solid rgba(242,244,255,0.1)"}}>
        <div className="extra-item" style={{"borderRight": "1px solid rgba(242,244,255,0.1)", "borderBottom": "1px solid rgba(242,244,255,0.1)"}}><h4 className="extra-title">Grupo exclusivo</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Acesso a um grupo de WhatsApp para tirar dúvidas direto com o mentor e com o Team T.H.</p></div>
        <div className="extra-item" style={{"borderRight": "1px solid rgba(242,244,255,0.1)", "borderBottom": "1px solid rgba(242,244,255,0.1)"}}><h4 className="extra-title">Análise individual</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Avaliação do seu perfil no início e ao final, com relatório detalhado da evolução e análise do seu Instagram.</p></div>
        <div className="extra-item" style={{"borderRight": "1px solid rgba(242,244,255,0.1)", "borderBottom": "1px solid rgba(242,244,255,0.1)"}}><h4 className="extra-title">IA no consultório</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Treinamento prático sobre inteligência artificial aplicada ao dia a dia do médico.</p></div>
        <div className="extra-item" style={{"borderBottom": "1px solid rgba(242,244,255,0.1)"}}><h4 className="extra-title">App / CRM</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Ferramenta para gestão de leads e pacientes, envio automático de mensagens e organização da receita.</p></div>
        <div className="extra-item" style={{"borderRight": "1px solid rgba(242,244,255,0.1)"}}><h4 className="extra-title">Treinamento de secretária</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Uma aula dedicada a preparar quem faz o primeiro atendimento — onde a maioria dos consultórios perde pacientes.</p></div>
        <div className="extra-item" style={{"borderRight": "1px solid rgba(242,244,255,0.1)"}}><h4 className="extra-title">Especialistas convidados</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Aulas sobre proteção, atualizações jurídicas e empreendedorismo com profissionais convidados do Team T.H.</p></div>
        <div className="extra-item" style={{"borderRight": "1px solid rgba(242,244,255,0.1)"}}><h4 className="extra-title">Rankeamento</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Um rankeamento entre os mentorados ao longo da jornada, com premiação para quem mais evolui e implementa.</p></div>
        <div className="extra-item"><h4 className="extra-title">Módulos extras</h4><p className="extra-desc" style={{"color": "rgba(242,244,255,0.55)"}}>Conteúdos complementares sobre empreendedorismo, medicações e transtornos, assistência jurídica, IA e marketing.</p></div>
      </div>
      <a className="btn btn-primary" href="#cta-final" style={{"marginTop": "44px"}}>Quero saber o que está incluído</a>
    </div>
  </section>


  <section style={{"background": "#ECE9FF", "color": "#0A0A0A"}}>
    <div className="container" style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(min(420px,100%),1fr))", "gap": "48px"}}>
      <div>
        <div className="label" style={{"color": "#9C7A1A"}}>COMO FUNCIONA</div>
        <ul className="list-dash" style={{"marginTop": "22px", "color": "rgba(10,10,10,0.72)"}}>
          <li>4 meses de jornada: 3 meses de conteúdo e implementação assistida + 1 mês de acompanhamento com o Team T.H.</li>
          <li>Dinâmica de Estratégia → Implementação, repetida a cada pilar.</li>
          <li>Grupo exclusivo de WhatsApp com o mentor e o Team T.H.</li>
          <li>Avaliação de perfil no início e ao final, com análise comparativa da evolução.</li>
          <li>Datas, investimento e disponibilidade da próxima turma são informados diretamente pelo time.</li>
        </ul>
      </div>
      <div>
        <div className="label" style={{"color": "#9C7A1A"}}>PARA QUEM É</div>
        <ul className="list-dash" style={{"marginTop": "22px", "color": "rgba(10,10,10,0.72)"}}>
          <li>Médicos que já atuam em saúde mental — especialistas ou não.</li>
          <li>Médicos que querem consolidar sua atuação na área.</li>
          <li>Profissionais com competência técnica, mas sem posicionamento, operação ou autoridade estruturados.</li>
          <li>Em fases futuras, a Mind Legacy também abrirá vagas para psicólogos e terapeutas.</li>
        </ul>
      </div>
    </div>
  </section>


  <section style={{"background": "#0A0A0A"}}>
    <div className="container" style={{"maxWidth": "820px"}}>
      <div className="label" style={{"color": "#E3C564"}}>DÚVIDAS FREQUENTES</div>
      <div style={{"marginTop": "28px"}}>
        {faqs.map((item, index) => (
          <div key={item.q} style={{"borderTop": "1px solid rgba(242,244,255,0.15)"}}>
            <button type="button" className="faq-toggle" aria-expanded={item.isOpen} aria-controls={`mentoria-faq-${index}`} onClick={item.toggle} style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "20px", "padding": "22px 0", "cursor": "pointer"}}>
              <span style={{"fontWeight": "600", "fontSize": "15.5px", "color": "#F2F4FF"}}>{item.q}</span>
              <span style={{"color": "#C9A227", "fontSize": "20px", "flexShrink": "0", "lineHeight": "1"}}>{item.icon}</span>
            </button>
            {item.isOpen && (
              <p id={`mentoria-faq-${index}`} style={{"padding": "0 0 24px 0", "margin": "0", "fontSize": "14.5px", "lineHeight": "1.7", "color": "rgba(242,244,255,0.6)", "maxWidth": "680px"}}>{item.a}</p>
            )}
          </div>
        ))}
        <div style={{"borderTop": "1px solid rgba(242,244,255,0.15)"}}></div>
      </div>
    </div>
  </section>


  <section id="cta-final" style={{"background": "radial-gradient(ellipse at 50% 20%, rgba(201,162,39,0.18), transparent 60%), #0A0A0A", "textAlign": "center"}}>
    <div className="container" style={{"maxWidth": "760px"}}>
      <p className="serif" style={{"fontStyle": "italic", "fontSize": "clamp(24px,3vw,32px)", "color": "#F2F4FF", "lineHeight": "1.3"}}>"Você não precisa necessariamente atender mais.<br />Precisa <span style={{"color": "#E3C564"}}>valer mais</span>."</p>
      <p style={{"marginTop": "22px", "fontSize": "15px", "lineHeight": "1.7", "color": "rgba(242,244,255,0.6)"}}>As vagas da próxima turma da Mind Legacy são limitadas para manter o acompanhamento próximo do Team T.H. Fale com nosso time para receber datas, investimento e disponibilidade.</p>
      <a className="btn btn-primary" href="#" style={{"marginTop": "34px", "padding": "18px 42px", "fontSize": "14px"}}>Quero falar com o time da Mind Legacy</a>
      <p style={{"fontSize": "11.5px", "color": "rgba(242,244,255,0.3)", "marginTop": "14px", "fontStyle": "italic"}}></p>
    </div>
  </section>


  <div id="site-footer" style={{"background": "#0A0A0A", "borderTop": "1px solid rgba(242,244,255,0.1)", "paddingBlock": "56px"}}>
    <div className="container" style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "20px", "textAlign": "center"}}>
      <img src="/assets/mentoria/8a197b6b7e5d84d52ef0cb8c182e4b8f.png" alt="Mind Legacy" style={{"height": "64px", "width": "auto", "display": "block"}} />
      <div style={{"display": "flex", "flexDirection": "column", "gap": "8px", "fontSize": "13px", "color": "rgba(242,244,255,0.5)"}}>
        <span>MIND LEGACY · CONSTRUINDO AUTORIDADE NA SAÚDE MENTAL</span>
        <span>Dr. Thyago Henrique · CRM-GO 30.392 · @drthyagohenrique</span>
      </div>
      <div style={{"fontSize": "11.5px", "color": "rgba(242,244,255,0.3)", "maxWidth": "560px", "marginTop": "6px", "lineHeight": "1.6"}}>Conteúdo de natureza educacional e profissional. Não substitui a formação médica nem promete resultados específicos.</div>
    </div>
  </div>


  <div className="sticky-cta" style={{"opacity": `${stickyOpacity}`, "pointerEvents": `${stickyPointer}`, "transition": "opacity 0.35s ease"}}>
    <span>MIND LEGACY · MENTORIA MÉDICA</span>
    <a className="btn btn-primary" href="#cta-final" style={{"padding": "11px 22px", "fontSize": "12px"}}>Quero minha vaga →</a>
  </div>

</main>
  </>;
}
