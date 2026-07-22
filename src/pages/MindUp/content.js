import { PRODUCTS } from '../../config/products.js';

export const mindUpContent = {
  product: PRODUCTS.mindup,
  realScreenLabel: 'Demonstração da interface do MindUp',
  hero: {
    eyebrow: 'MindUp · Evolução pessoal adaptativa',
    headline: ['Sua rotina cobra de você o tempo todo.', 'O MindUp cuida de quem precisa dar conta dela.'],
    paragraphs: [
      'Toda rotina cobra o seu melhor, seja no trabalho, em casa ou em ambos. O MindUp cuida do que sustenta você para dar conta dela: sono, foco e ansiedade, evoluindo sempre os pilares Corpo e Mente.',
    ],
    cta: 'Baixar o MindUp',
    ctaSecondary: 'Ver como funciona',
    microcopy: 'Disponível para iOS e Android · R$ 29,90/mês',
    image: { src: '/assets/mindup/01-home.png', alt: 'Demonstração da tela inicial do aplicativo MindUp', width: 1080, height: 1920 },
    toasts: [
      { icon: 'checkCircle', title: 'Missão concluída!', desc: '+120 XP · Energia +8', tone: 'success' },
      { icon: 'zap', title: 'Novo nível alcançado', desc: 'Seu avatar evoluiu', tone: 'xp' },
      { icon: 'flame', title: 'Sequência de 7 dias!', desc: 'Você está indo bem.', tone: 'streak' },
    ],
  },
  direction: {
    tag: 'Pensado para você, não para todo mundo',
    title: 'Duas pessoas com o mesmo problema podem receber missões diferentes.',
    text: 'Dormir mal, perder o foco ou viver no automático não se resolve com a mesma receita para todas as pessoas. Por isso, o MindUp parte do seu perfil inicial e continua aprendendo com os seus registros. O sistema cruza esses sinais, identifica o que merece atenção agora e seleciona uma missão possível para o seu momento.',
  },
  steps: {
    tag: 'Um exemplo simples',
    title: ['Do seu momento', 'para um próximo passo.'],
    // Numerado de 00 a 05: o passo zero acontece antes do ciclo diário começar.
    flow: [
      { title: 'O MindUp conhece o seu ponto de partida', text: 'Você responde ao perfil inicial e conta o que tem incomodado, como sono, foco, energia, estresse e rotina.' },
      { title: 'Você registra como está agora', text: 'Um check-in rápido mostra como você dormiu, sua energia, seu foco e outros sinais do dia.' },
      { title: 'O sistema cruza os sinais', text: 'O MindUp relaciona o seu registro atual ao perfil, ao histórico e às ações anteriores.' },
      { title: 'Uma prioridade é identificada', text: 'Em vez de tratar tudo ao mesmo tempo, o sistema identifica o ponto que merece atenção primeiro.' },
      { title: 'Uma missão é selecionada', text: 'Você recebe uma ação possível e coerente com o seu momento.' },
      { title: 'A ação entra no seu progresso', text: 'Ao concluir a missão, o resultado entra no histórico e ajuda o MindUp a orientar os próximos passos.' },
    ],
    items: [
      { icon: 'userCheck', title: 'Perfil', text: 'No cadastro, você conta o que tem te incomodado: sono, foco, ansiedade, rotina. Isso vira a base que o MindUp usa para te entender.' },
      { icon: 'eye', title: 'Registre', text: 'Você conta que dormiu mal, acordou com pouca energia e está com dificuldade para se concentrar.' },
      { icon: 'compass', title: 'Organize', text: 'Em vez de uma lista com dez hábitos genéricos, o MindUp cruza esse registro com o seu perfil e chega a uma prioridade que faz sentido para o que você já disse que te incomoda.' },
      { icon: 'leaf', title: 'Continue', text: 'Uma missão pensada para o seu caso, como buscar luz natural ao acordar, é sugerida. Ao concluí-la, a ação entra no seu histórico e deixa o caminho mais visível.' },
    ],
    ctaTitle: 'Leve para o seu dia o passo que foi pensado para você.',
    cta: 'Baixar o MindUp',
  },
  missionTicker: [
    { icon: 'moon', label: 'Sem tela 1h antes de dormir', xp: '+80 XP' },
    { icon: 'activity', label: 'Caminhada leve de 20 minutos', xp: '+120 XP' },
    { icon: 'wind', label: 'Respiração consciente 5 minutos', xp: '+60 XP' },
    { icon: 'target', label: 'Um bloco de foco sem interrupções', xp: '+100 XP' },
    { icon: 'sun', label: 'Luz natural ao acordar', xp: '+60 XP' },
  ],
  cycle: {
    id: 'missao',
    tag: 'A experiência no aplicativo',
    title: 'Uma ação pequena. Um caminho que começa a aparecer.',
    text: 'Registros rápidos ajudam a anotar como você está. Uma missão organiza o próximo passo. Ao concluir, a ação entra no histórico e passa a fazer parte da sua jornada.',
    screens: [
      { image: { src: '/assets/mindup/06-checkin.png', alt: 'Demonstração da tela de registro do MindUp', width: 1080, height: 1920 }, title: 'Registre o momento', text: 'Energia, recuperação, foco e estado percebido.' },
      { image: { src: '/assets/mindup/02-mission-detail.png', alt: 'Demonstração da tela de missão do MindUp', width: 1080, height: 1920 }, title: 'Receba uma missão', text: 'Um próximo passo ligado ao seu contexto.' },
    ],
  },
  // Capturas reais do aplicativo. `real: true` faz o quadro do device renderizar o PNG
  // em vez do mockup HTML — as telas listadas aqui já estão prontas para publicação.
  // Telas ainda NÃO usadas por defeito na captura: ver public/assets/mindup/PRINTS.md.
  gallery: {
    id: 'telas',
    tag: 'Prints reais do aplicativo',
    title: 'O MindUp por dentro.',
    text: 'Nada de ilustração: estas são capturas do aplicativo em uso.',
    screens: [
      { image: { src: '/assets/mindup/06-checkin.png', alt: 'Tela de registro diário do MindUp, com escalas de energia e capacidade de recuperação', width: 1080, height: 1920, real: true }, title: 'Registro do dia', text: 'Uma leitura breve de como você está agora.' },
      { image: { src: '/assets/mindup/03-focus.png', alt: 'Tela do Modo Foco do MindUp, com temporizador de 25 minutos e sons ambiente', width: 1080, height: 1920, real: true }, title: 'Modo Foco', text: 'Sessões que registram só o tempo em que você realmente focou.' },
      { image: { src: '/assets/mindup/05-attributes.png', alt: 'Tela de atributos do MindUp, com energia, foco, humor, disciplina, clareza e resistência', width: 1080, height: 1920, real: true }, title: 'Atributos', text: 'Uma leitura direta do que você vem registrando.' },
      { image: { src: '/assets/mindup/04-avatar-growth.png', alt: 'Tela de crescimento do MindUp, mostrando o estágio da árvore de evolução', width: 1080, height: 1920, real: true }, title: 'Crescimento', text: 'Sete estágios que acompanham a sua consistência.' },
    ],
  },
  // Fotos reais de pessoas — cenas de rotina ligadas às missões do app.
  // Enquanto `src` for null o item não é renderizado (em desenvolvimento aparece um
  // placeholder com o briefing). Ao receber os arquivos: salve em
  // /public/assets/mindup/fotos/ e preencha `src`, `alt`, `width` e `height`.
  // Briefing completo de produção: public/assets/mindup/fotos/README.md
  photos: {
    id: 'rotina',
    tag: 'Missões que cabem no seu dia',
    title: 'Não é uma vida nova. É o próximo passo dentro da que você já tem.',
    text: 'As missões do MindUp são pequenas o suficiente para caber num dia cheio e concretas o suficiente para você sentir a diferença.',
    items: [
      { id: 'luz-natural', mission: 'Luz natural ao acordar', brief: 'Pessoa de pé junto à janela logo ao acordar, luz da manhã no rosto, sem celular na mão.', src: null, alt: null, width: null, height: null },
      { id: 'caminhada', mission: 'Caminhada leve de 20 minutos', brief: 'Pessoa caminhando em calçada arborizada ou parque, roupa comum de dia a dia, ritmo tranquilo.', src: null, alt: null, width: null, height: null },
      { id: 'respiracao', mission: 'Respiração consciente de 5 minutos', brief: 'Pessoa sentada, olhos fechados, ombros soltos, ambiente doméstico ou escritório silencioso.', src: null, alt: null, width: null, height: null },
      { id: 'bloco-foco', mission: 'Um bloco de foco sem interrupções', brief: 'Pessoa concentrada em mesa organizada, celular virado para baixo ou fora de alcance.', src: null, alt: null, width: null, height: null },
      { id: 'sem-tela', mission: 'Sem tela 1h antes de dormir', brief: 'Ambiente noturno de luz baixa, pessoa com livro ou apenas desacelerando, telas desligadas.', src: null, alt: null, width: null, height: null },
    ],
  },
  evolution: {
    id: 'arvore',
    tag: 'Evolução visível',
    title: 'Seu caminho ganha forma.',
    text: 'Consistência pode parecer invisível quando você olha apenas para um dia. No MindUp, cada registro, missão e escolha passa a fazer parte de uma história que você consegue acompanhar.',
    image: { src: '/assets/mindup/04-avatar-growth.png', alt: 'Demonstração da tela de árvore e crescimento do MindUp', width: 1080, height: 1920 },
    stages: ['Semente', 'Broto', 'Muda', 'Jovem', 'Florescente', 'Madura', 'Lendária'],
    close: 'A árvore evolui conforme sua jornada ganha consistência. XP, sequência, atributos, histórico e linha do tempo ajudam a acompanhar esse percurso.',
  },
  pillars: {
    id: 'pilares',
    tag: 'Pilares e atributos',
    title: 'Os pilares mostram onde olhar. Os atributos mostram o que muda.',
    text: 'Os pilares organizam áreas da vida observadas pelo MindUp. Os atributos ajudam a visualizar sinais e capacidades ao longo da jornada. Missões e registros conectam contexto, ação e acompanhamento.',
    mind: {
      label: 'Mente',
      icon: 'sparkles',
      items: [
        { icon: 'moon', name: 'Sono', desc: 'Qualidade e rotina do sono.' },
        { icon: 'bellOff', name: 'Controle de estímulos', desc: 'Telas, redes e excesso de conteúdo.' },
        { icon: 'waves', name: 'Regulação emocional', desc: 'Perceber e nomear o que você sente.' },
        { icon: 'target', name: 'Foco profundo', desc: 'Sustentar atenção no que importa.' },
      ],
    },
    body: {
      label: 'Corpo',
      icon: 'heart',
      items: [
        { icon: 'activity', name: 'Movimento diário', desc: 'Movimento adaptado à rotina.' },
        { icon: 'apple', name: 'Nutrição inteligente', desc: 'Alimentação que sustenta energia.' },
        { icon: 'sun', name: 'Ritmo biológico', desc: 'Luz natural, rotina e ciclo.' },
        { icon: 'wind', name: 'Recuperação ativa', desc: 'Respiração, descanso e desaceleração.' },
      ],
    },
    image: { src: '/assets/mindup/05-attributes.png', alt: 'Demonstração da tela de atributos do MindUp', width: 1080, height: 1920 },
  },
  tools: {
    id: 'ferramentas',
    tag: 'Ferramentas de sustentação',
    title: 'Ferramentas para sustentar a jornada.',
    text: 'O núcleo é registrar o momento, organizar uma prioridade, agir e acompanhar o caminho. Estas ferramentas entram como apoio quando fazem sentido.',
    groups: [
      { title: 'Para manter a atenção', items: [{ icon: 'target', label: 'Modo Foco' }, { icon: 'bell', label: 'Lembretes' }] },
      { title: 'Para compreender melhor', items: [{ icon: 'bookOpen', label: 'Biblioteca' }, { icon: 'edit', label: 'Diário e reflexões' }] },
      { title: 'Para acompanhar e compartilhar', items: [{ icon: 'trendingUp', label: 'Histórico' }, { icon: 'users', label: 'Comunidade' }] },
    ],
    focusImage: { src: '/assets/mindup/03-focus.png', alt: 'Demonstração da tela do Modo Foco do MindUp', width: 1080, height: 1920 },
    libraryImage: { src: '/assets/mindup/07-content.png', alt: 'Demonstração da biblioteca de conteúdos do MindUp', width: 1080, height: 1920 },
  },
  premium: {
    tag: 'Assinatura MindUp',
    badge: 'Assinatura',
    title: 'Tudo o que o MindUp oferece.',
    columns: [
      { title: 'Para se compreender', items: ['Questionário de perfil', 'Registros rápidos', 'Energia e recuperação', 'Atributos visíveis'] },
      { title: 'Para agir', items: ['Missões', 'Modo Foco', 'Conteúdos guiados', 'Lembretes'] },
      { title: 'Para acompanhar', items: ['Árvore de evolução', 'XP e sequência', 'Histórico', 'Linha do tempo'] },
    ],
    priceLine: 'MindUp',
    price: 'R$ 29,90 por mês',
    cta: 'Baixar o MindUp',
    microcopy: 'Disponível para iOS e Android.',
  },
  faq: {
    tag: 'Perguntas frequentes',
    title: 'Perguntas que merecem clareza.',
    items: [
      { question: 'O que é o MindUp?', answer: 'O MindUp é um aplicativo de evolução pessoal adaptativa. A partir dos registros realizados pelo usuário, ele organiza prioridades, sugere missões possíveis e ajuda a acompanhar a jornada por meio de atributos, histórico, XP e uma árvore de evolução.' },
      { question: 'Como as missões são escolhidas?', answer: 'As missões partem do perfil que você responde uma vez no cadastro e dos registros que você faz no dia a dia. O MindUp cruza os dois para chegar a uma prioridade e sugerir um próximo passo pensado para o seu caso, em vez de apresentar uma lista infinita de ações.' },
      { question: 'Preciso responder algum questionário?', answer: 'Sim, uma vez. No cadastro você conta o que tem te incomodado, como é a sua rotina e o seu momento. Esse perfil é a base que o MindUp usa para interpretar os seus registros, e é por isso que duas pessoas com o mesmo incômodo podem receber missões diferentes.' },
      { question: 'Preciso usar todos os dias?', answer: 'Não. O MindUp foi pensado para acompanhar a sua rotina sem transformar o autocuidado em cobrança. Você pode registrar e retomar a jornada quando fizer sentido.' },
      { question: 'O que são os pilares e os atributos?', answer: 'Os oito pilares organizam áreas da vida observadas pelo MindUp. Os atributos são indicadores visuais que ajudam você a acompanhar como sinais e capacidades variam ao longo da jornada.' },
      { question: 'Em quais dispositivos o MindUp está disponível?', answer: 'O MindUp está disponível para iOS e Android.' },
      { question: 'O MindUp substitui profissionais de saúde?', answer: 'Não. O MindUp é uma ferramenta de autocuidado, registro e organização da rotina. Ele não realiza diagnóstico, não prescreve tratamento e não substitui acompanhamento médico, psicológico, nutricional ou de outros profissionais de saúde.' },
      { question: 'Como cancelar a assinatura?', answer: 'A assinatura é gerenciada pela loja utilizada para a contratação, seguindo as regras da App Store ou do Google Play. Você pode cancelar a renovação diretamente pela sua conta na respectiva plataforma.' },
      { question: 'Como meus dados e publicações são tratados?', answer: 'Os dados registrados ajudam a operar o aplicativo e acompanhar a jornada. Ao compartilhar uma publicação, você escolhe se ela aparece para todos, para amigos ou apenas no seu histórico. Consulte a Política de Privacidade para os detalhes.' },
    ],
  },
  finalCta: {
    tag: 'MindUp no seu ritmo',
    title: ['Menos ruído.', 'Mais direção.'],
    text: 'Volte para si antes de começar o dia, no meio de uma rotina intensa ou quando tudo parecer demais. Você não precisa reorganizar a vida inteira agora.',
    closing: ['Comece com', 'um próximo passo possível.'],
    cta: 'Começar no MindUp',
  },
  footer: {
    about: 'Clareza para cuidar do que sustenta a sua vida.',
    columns: [{ title: 'Página', links: [{ label: 'Como funciona', href: '#como' }, { label: 'O app', href: '#missao' }, { label: 'Telas reais', href: '#telas' }, { label: 'Assinatura', href: '#premium' }, { label: 'Perguntas', href: '#faq' }] }],
    note: 'MindUp é um produto do ecossistema Dr. Thyago Henrique. O MindUp é uma ferramenta de autocuidado, registro e organização da rotina. O aplicativo não realiza diagnóstico, não prescreve tratamento e não substitui acompanhamento médico, psicológico, nutricional ou de outros profissionais de saúde.',
  },
};
