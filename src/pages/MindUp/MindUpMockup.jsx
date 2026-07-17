import React from 'react';
import { Icon } from './icons.jsx';

const ScreenHeader = ({ title, action = '⋯' }) => (
  <>
    <div className="mu-phone__status"><span>9:41</span><span>● ◔ ▰</span></div>
    <div className="mu-phone__header"><b>{title}</b><span>{action}</span></div>
  </>
);

const BottomNav = ({ active = 'home' }) => (
  <nav className="mu-phone__nav" aria-hidden={true}>
    <span className={active === 'home' ? 'is-active' : ''}><Icon name="sparkles" size={12} />Início</span>
    <span className={active === 'mission' ? 'is-active' : ''}><Icon name="target" size={12} />Missão</span>
    <span className={active === 'tree' ? 'is-active' : ''}><Icon name="leaf" size={12} />Jornada</span>
  </nav>
);

const HomeScreen = () => (
  <>
    <ScreenHeader title="mindup" action="☼" />
    <div className="mu-phone__intro"><small>SEGUNDA, 12 DE AGOSTO</small><b>Bom dia, você.</b><p>Vamos cuidar do que importa agora.</p></div>
    <article className="mu-phone__mission">
      <span className="mu-phone__eyebrow">MISSÃO DO DIA <em>+60 XP</em></span>
      <b>Buscar luz natural ao acordar</b>
      <p>Alguns minutos para começar o dia com mais presença.</p>
      <div><span><Icon name="sun" size={12} /> 10 min</span><i>Começar <Icon name="arrowUpRight" size={12} /></i></div>
    </article>
    <div className="mu-phone__section-title"><b>Como você está?</b><small>Registrar</small></div>
    <div className="mu-phone__quick-row"><span><Icon name="zap" size={14} />Energia<i>72</i></span><span><Icon name="target" size={14} />Foco<i>58</i></span></div>
    <div className="mu-phone__tree-mini"><span>SEQUÊNCIA</span><b><Icon name="flame" size={14} /> 7 dias</b><i aria-hidden={true}>✦</i></div>
    <BottomNav active="home" />
  </>
);

const MissionScreen = () => (
  <>
    <ScreenHeader title="Missão de hoje" action="⌁" />
    <div className="mu-phone__mission-hero"><span><Icon name="moon" size={20} /></span><small>SONO</small><b>Sem tela 1h antes de dormir</b><p>Crie uma transição mais calma para encerrar o dia.</p></div>
    <div className="mu-phone__detail-row"><span><Icon name="clock" size={13} />60 min</span><span><Icon name="zap" size={13} />+80 XP</span></div>
    <div className="mu-phone__prompt"><small>POR QUE ISSO IMPORTA</small><p>Uma pausa de estímulos pode abrir espaço para uma rotina mais tranquila.</p></div>
    <button className="mu-phone__primary" type="button">Começar missão <Icon name="arrowUpRight" size={13} /></button>
    <div className="mu-phone__check"><span /><b>Registrar o que aconteceu ao concluir</b></div>
    <BottomNav active="mission" />
  </>
);

const FocusScreen = () => (
  <>
    <ScreenHeader title="Modo Foco" action="×" />
    <div className="mu-phone__focus-copy"><small>SESSÃO ATUAL</small><b>Um espaço para o que importa.</b></div>
    <div className="mu-phone__focus-orb"><span>25:00</span><small>FOCO</small></div>
    <div className="mu-phone__focus-actions"><button type="button">Pausar</button><span>↻</span></div>
    <div className="mu-phone__focus-note"><Icon name="leaf" size={14} /><span>Permita-se uma pausa quando terminar.</span></div>
    <BottomNav active="mission" />
  </>
);

const TreeScreen = () => (
  <>
    <ScreenHeader title="Sua jornada" action="⌁" />
    <div className="mu-phone__tree-head"><small>ESTÁGIO 7 · Árvore</small><b>Seu caminho está criando raízes.</b></div>
    <div className="mu-phone__tree-art" aria-hidden={true}>
      <img src="/assets/mindup/stage-7.png" alt="" />
      <span>✦</span>
    </div>
    <div className="mu-phone__xp"><span><b>340 XP</b><small>para o próximo estágio</small></span><i><em /></i></div>
    <div className="mu-phone__tree-stats"><span><Icon name="flame" size={13} />Sequência<b>7 dias</b></span><span><Icon name="trendingUp" size={13} />Registros<b>18</b></span></div>
    <BottomNav active="tree" />
  </>
);

const AttributesScreen = () => (
  <>
    <ScreenHeader title="Atributos" action="⌁" />
    <div className="mu-phone__intro mu-phone__intro--short"><small>ACOMPANHE A JORNADA</small><b>O que tem se movido?</b></div>
    <div className="mu-phone__attribute"><span className="is-energy"><Icon name="zap" size={15} /></span><div><b>Energia</b><i><em style={{ width: '72%' }} /></i></div><strong>72</strong></div>
    <div className="mu-phone__attribute"><span className="is-focus"><Icon name="target" size={15} /></span><div><b>Foco</b><i><em style={{ width: '58%' }} /></i></div><strong>58</strong></div>
    <div className="mu-phone__attribute"><span className="is-mood"><Icon name="smile" size={15} /></span><div><b>Humor</b><i><em style={{ width: '84%' }} /></i></div><strong>84</strong></div>
    <div className="mu-phone__attribute-note"><Icon name="trendingUp" size={13} />Os atributos acompanham seus registros e missões.</div>
    <BottomNav active="tree" />
  </>
);

const CheckinScreen = () => (
  <>
    <ScreenHeader title="Registro rápido" action="×" />
    <div className="mu-phone__checkin-progress"><span className="is-done" /><span className="is-done" /><span /><span /></div>
    <div className="mu-phone__checkin-question"><small>ENERGIA</small><b>Como está sua energia agora?</b><p>Não existe resposta certa. Registre o que percebe.</p></div>
    <div className="mu-phone__scale"><span>Baixa</span><i><b>1</b><b>2</b><b className="is-selected">3</b><b>4</b><b>5</b></i><span>Alta</span></div>
    <button className="mu-phone__primary" type="button">Continuar <Icon name="arrowUpRight" size={13} /></button>
    <BottomNav active="home" />
  </>
);

const ContentScreen = () => (
  <>
    <ScreenHeader title="Biblioteca" action="⌕" />
    <div className="mu-phone__intro mu-phone__intro--short"><small>CONTEÚDOS PARA O AGORA</small><b>Escolha o que pode ajudar.</b></div>
    <article className="mu-phone__content-card is-purple"><small>FOCO PROFUNDO</small><b>Como proteger a sua atenção</b><span>8 min de leitura <Icon name="arrowUpRight" size={12} /></span></article>
    <article className="mu-phone__content-card is-teal"><small>RECUPERAÇÃO ATIVA</small><b>Uma pausa que cabe na rotina</b><span>Áudio guiado <Icon name="arrowUpRight" size={12} /></span></article>
    <div className="mu-phone__content-filter"><span>Para você</span><span>Salvos</span><span>Pilares</span></div>
    <BottomNav active="home" />
  </>
);

const screens = {
  home: HomeScreen,
  mission: MissionScreen,
  focus: FocusScreen,
  tree: TreeScreen,
  attributes: AttributesScreen,
  checkin: CheckinScreen,
  content: ContentScreen,
};

const kindFromImage = (image) => {
  const source = image?.src || '';
  if (source.includes('02-')) return 'mission';
  if (source.includes('03-')) return 'focus';
  if (source.includes('04-')) return 'tree';
  if (source.includes('05-')) return 'attributes';
  if (source.includes('06-')) return 'checkin';
  if (source.includes('07-')) return 'content';
  return 'home';
};

export const MindUpMockup = ({ image }) => {
  const kind = kindFromImage(image);
  const Screen = screens[kind] || HomeScreen;
  return <div className={'mu-phone mu-phone--' + kind} role="img" aria-label={image?.alt || 'Mockup da interface do MindUp'}><Screen /></div>;
};

export default MindUpMockup;
