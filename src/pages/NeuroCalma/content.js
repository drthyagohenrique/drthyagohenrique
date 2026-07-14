import { PRODUCTS } from '../../config/products.js';
import { DOCTOR } from '../../data/doctor.js';

// Copy do NeuroCalma — Experiência Guiada · versão final low ticket (10 seções).
// Princípio: videoaulas com técnicas simples para desligar, descansar e
// desconectar a cabeça depois de um dia pesado. Linguagem de vida real,
// sem jargão. Funil: reconhecimento → incômodo → explicação → solução →
// facilidade → transformação → tangibilidade → segurança → compra.
// Compliance: sem "protocolo", Saturação Neural™ curta e
// sempre como conceito em pesquisa; sem números, módulos ou resultados inventados.
export const neuroCalmaContent = {
  product: PRODUCTS.neurocalma,
  hero: {
    eyebrow: 'NeuroCalma · Videoaulas práticas',
    headline: ['Seu dia termina.', 'Sua mente, não.'],
    subheadline: [
      'O corpo está cansado.',
      'Mas a cabeça ainda está processando o dia.',
      'E quanto mais você tenta se distrair para desligar, mais estímulo coloca dentro dela.',
    ],
    cta: 'Começar o NeuroCalma',
    microcopy: 'Acesso imediato · R$97 · Garantia de 7 dias',
    support: 'Assista. Entenda. Aplique.',
    disclaimer:
      '*Este conteúdo não substitui avaliação, acompanhamento ou tratamento médico ou psicológico.',
  },
  // 01 · Apresentação da experiência
  intro: {
    label: 'Uma experiência para o fim do dia',
    title: 'Quando o corpo para, mas a cabeça continua',
    text: 'Videoaulas e práticas guiadas para ajudar você a sair do ritmo do dia e começar a desacelerar — sem precisar procurar técnicas, escolher entre dezenas de vídeos ou montar uma rotina sozinho.',
    close: 'Assista. Entenda. Aplique.',
  },
  pain: {
    label: 'Uma experiência para o fim do dia',
    title: ['Quando o corpo para,', 'mas a cabeça continua'],
    paragraphs: [
      'Videoaulas e práticas guiadas para ajudar você a sair do ritmo do dia e começar a desacelerar — sem precisar procurar técnicas, escolher entre dezenas de vídeos ou montar uma rotina sozinho.',
    ],
    close: ['Assista. Entenda. Aplique.'],
  },
  // 02 · Explicação + solução (fusão de "Por que isso acontece" + "O que é o NeuroCalma")
  explanation: {
    label: '02 · Por que isso acontece',
    title: 'Sua cabeça não desliga só porque você deitou.',
    paragraphs: [
      'Durante o dia, ela recebeu mensagens, cobranças, decisões, telas, problemas e urgências. Depois, você espera que tudo pare de uma vez.',
      'Mas, para muita gente, o corpo vai para a cama antes de a cabeça entender que o dia acabou.',
    ],
    bridge: 'Foi para ajudar nesse momento que o NeuroCalma foi criado.',
    productTitle: 'Videoaulas com técnicas para ajudar você a desligar e descansar a cabeça.',
    productText:
      'O NeuroCalma é um produto digital com videoaulas diretas e práticas simples para você entender o que mantém sua mente ligada e aprender o que fazer para desacelerar.',
    boundaries: [
      'Não é para estudar durante horas.',
      'Não é para decorar termos difíceis.',
      'Não é mais um curso para deixar parado.',
    ],
    close: 'Menos teoria. Mais clareza sobre o que fazer quando a cabeça não para.',
  },
  // 03 · Como funciona (reduzido para três etapas)
  how: {
    label: '03 · Como funciona',
    title: 'É simples: assistir, entender e aplicar.',
    steps: [
      { title: 'Assista', text: 'Você entra na plataforma e assiste a uma videoaula curta e objetiva.' },
      { title: 'Entenda', text: 'Você entende por que sua cabeça continua ligada e o que está dificultando o descanso.' },
      { title: 'Aplique', text: 'Você executa a técnica ensinada e pode voltar ao conteúdo sempre que precisar.' },
    ],
    close: 'Assista. Entenda. Aplique.',
  },
  // 04 · Transformação (absorve "Para que serve")
  transformation: {
    label: '04 · O que pode mudar',
    title: 'Em vez de apenas esperar o sono chegar, você aprende o que fazer.',
    before: {
      title: 'Antes',
      items: [
        'deita cansado e continua pensando',
        'leva trabalho, decisões e pendências para a cama',
        'pega o celular porque não consegue parar',
        'tenta dormir sem conseguir desligar',
        'acorda sentindo que não descansou',
        'não sabe o que fazer quando a cabeça acelera',
      ],
    },
    after: {
      title: 'Depois de aprender e aplicar',
      items: [
        'reconhece quando precisa parar',
        'entende o que mantém sua cabeça ligada',
        'aprende técnicas simples para desacelerar',
        'cria uma forma de encerrar o dia',
        'consegue se desconectar com mais intenção',
        'passa a ter algo concreto para fazer quando não consegue descansar',
      ],
    },
    close: ['A promessa não é viver sem problemas.', 'É aprender a parar quando o dia já terminou.'],
  },
  // 05 · O que você recebe (condensado em quatro itens)
  deliverables: {
    label: '05 · O que você recebe',
    title: 'Tudo organizado para você assistir e aplicar.',
    // PENDENTE: substituir por informações específicas quando confirmadas
    // (quantidade de videoaulas, duração média, número de técnicas, prazo de
    // acesso, materiais complementares, plataforma). Não inventar números.
    items: [
      { title: 'Videoaulas objetivas', text: 'Explicações claras e diretas, sem termos complicados.' },
      { title: 'Técnicas práticas', text: 'Exercícios para ajudar você a desacelerar e descansar a cabeça.' },
      { title: 'Percurso organizado', text: 'Uma sequência para você saber por onde começar.' },
      { title: 'Acesso imediato', text: 'Assista pelo celular ou computador e volte às aulas quando precisar.' },
    ],
  },
  // 06 · Quebra de objeções (fusão de "não é curso" + "cabe na rotina")
  routine: {
    label: '06 · Feito para a sua rotina',
    title: 'Para quem termina o dia cansado, mas continua com a cabeça ligada.',
    intro: [
      'O NeuroCalma foi criado para quem não precisa de mais uma obrigação no fim do dia.',
      'Foi pensado para o momento em que o corpo já parou, mas a mente continua repassando conversas, trabalho, decisões e pendências.',
    ],
    audienceTitle: 'Ele é para você que:',
    audience: [
      'deita cansado, mas não consegue desacelerar;',
      'continua pensando no trabalho depois do expediente;',
      'leva conversas e pendências para a cama;',
      'pega o celular porque não consegue ficar em silêncio;',
      'sente que dorme, mas não descansa de verdade;',
      'quer saber o que fazer quando a mente não para.',
    ],
    transition: 'Você não precisa criar uma rotina perfeita antes de começar.',
    transitionText: 'Não precisa reservar uma tarde inteira, assistir tudo de uma vez ou aprender uma sequência complicada.',
    steps: [
      { title: 'Você assiste a uma aula.', text: 'Entende o que está acontecendo naquele momento.' },
      { title: 'Acompanha a orientação.', text: 'Sem precisar procurar entre dezenas de vídeos ou técnicas.' },
      { title: 'Aplica no seu dia.', text: 'No seu ritmo, quando perceber que precisa desacelerar.' },
    ],
    close: 'Foi pensado para quem já está cansado demais para transformar o descanso em mais uma tarefa.',
    closeNote: 'Você não precisa ter um diagnóstico para perceber que sua cabeça também precisa de uma pausa.',
    authority: {
      label: 'Desenvolvido pelo Dr. Thyago Henrique',
      title: 'Uma experiência criada por um médico que estuda o impacto da alta pressão na vida cotidiana.',
      text: 'Dr. Thyago Henrique é médico, professor e comunicador. Seu trabalho é dedicado a tornar temas relacionados à mente, ao comportamento e à pressão do dia a dia mais compreensíveis e aplicáveis à vida real.',
      productText: 'O NeuroCalma nasceu dessa proposta: transformar conhecimento em orientações simples para pessoas que terminam o dia cansadas, mas continuam mentalmente ligadas.',
      safetyTitle: 'O NeuroCalma é uma experiência educacional.',
      safetyText: 'Ele não é consulta médica, psicoterapia ou tratamento. Não realiza diagnóstico e não substitui avaliação ou acompanhamento individual com profissionais de saúde.',
    },
  },
  objections: {
    label: '06 · Feito para a rotina real',
    title: 'Não é mais um curso para deixar parado.',
    paragraphs: [
      'O NeuroCalma foi criado para ser usado, não acumulado.',
      'Você não precisa reservar uma tarde inteira, terminar tudo de uma vez, criar uma rotina perfeita ou estar calmo antes de começar.',
    ],
    lines2: ['Você assiste a uma aula.', 'Entende a técnica.', 'Aplica no seu dia.'],
    close: 'Foi pensado para quem já está cansado demais para lidar com algo complicado.',
  },
  // 07 · Para quem é + origem médica + Saturação Neural™ (fusão)
  audience: {
    label: '07 · Para quem é',
    title: 'O NeuroCalma é para você que:',
    items: [
      'deita cansado, mas não consegue desligar',
      'continua pensando no trabalho depois do expediente',
      'leva conversas, decisões e pendências para a cama',
      'pega o celular porque não consegue ficar em silêncio',
      'sente que dorme, mas não descansa',
      'vive com a cabeça cheia',
      'sente dificuldade para se desconectar',
      'quer aprender o que fazer quando a mente não para',
    ],
    close: 'Você não precisa ter um diagnóstico para perceber que precisa descansar melhor a cabeça.',
    authority: {
      title: 'Desenvolvido pelo Dr. Thyago Henrique.',
      bio: DOCTOR.shortAuthority,
      text: 'O NeuroCalma foi criado para transformar esse conhecimento em videoaulas e técnicas simples, que possam ser aplicadas na rotina real.',
    },
    saturation: {
      title: 'Quando a cabeça passa tempo demais sem desligar.',
      text: 'Saturação Neural™ é um conceito em pesquisa utilizado pelo Dr. Thyago Henrique para compreender estados em que a mente passa tempo demais sob pressão, estímulos e decisões.',
      disclaimer: '*Saturação Neural™ não é diagnóstico, doença, tratamento ou protocolo.',
    },
  },
  // 08 · Oferta + garantia (fusão)
  offer: {
    label: '07 · Comece agora',
    title: 'Comece hoje a aprender a desligar.',
    text: 'Ao entrar no NeuroCalma, você recebe acesso às videoaulas e às técnicas práticas para entender o que está acontecendo, desacelerar e descansar melhor a cabeça.',
    stack: [
      'Videoaulas objetivas',
      'Técnicas simples de aplicação',
      'Percurso organizado',
      'Acesso digital imediato',
      'Liberdade para assistir no seu ritmo',
      'Garantia de 7 dias',
    ],
    ctaActive: 'Quero começar o NeuroCalma',
    security: 'Pagamento seguro pela Kiwify · parcelamento disponível no checkout.',
    guarantee: {
      badge: 'Garantia de 7 dias',
      title: '7 dias para conhecer o NeuroCalma',
      text: 'Acesse, assista e veja se a proposta faz sentido para você. Caso não faça, solicite o reembolso dentro de 7 dias.',
      close: 'Você não precisa decidir no escuro.',
    },
    disclaimer:
      '*Este conteúdo não substitui consulta, avaliação, diagnóstico ou tratamento médico ou psicológico.',
  },
  // 09 · FAQ + 10 · CTA final
  faq: {
    label: '08 · Dúvidas frequentes',
    title: 'Tire suas dúvidas antes de começar.',
    items: [
      {
        question: 'O NeuroCalma é um curso?',
        answer:
          'É um produto digital com videoaulas e técnicas práticas para ajudar você a desacelerar, desligar e descansar a cabeça.',
      },
      {
        question: 'Como eu uso o NeuroCalma?',
        answer:
          'Você entra na plataforma, assiste às videoaulas, entende a técnica ensinada e aplica. Tudo no seu ritmo: não precisa assistir de uma vez e pode voltar às aulas quando precisar.',
      },
      {
        question: 'Posso assistir pelo celular?',
        answer: 'Sim. O acesso é digital: você pode assistir pelo celular ou pelo computador.',
      },
      {
        question: 'Preciso ter diagnóstico?',
        answer: 'Não. O NeuroCalma é um conteúdo educativo e não exige diagnóstico.',
      },
      {
        question: 'É tratamento para ansiedade?',
        answer:
          'Não. O NeuroCalma não é consulta, psicoterapia ou tratamento — e pode ser usado como conteúdo complementar, sem substituir o acompanhamento que você já realiza.',
      },
      {
        question: 'Quais são as formas de pagamento?',
        answer:
          'Cartão, Pix e demais opções disponíveis no checkout da Kiwify. O acesso é liberado logo após a confirmação do pagamento.',
      },
      {
        question: 'Como funciona a garantia?',
        answer: 'Você tem 7 dias para conhecer o produto e solicitar o reembolso caso ele não faça sentido para você.',
      },
      {
        question: 'O que devo fazer se estiver em uma crise?',
        answer:
          'O NeuroCalma não substitui atendimento de urgência. Em situações de risco imediato ou de agravamento intenso, procure um serviço de urgência da sua região.',
      },
    ],
  },
  finalCta: {
    label: '09 · Começar',
    title: 'Sua cabeça não precisa continuar trabalhando depois que o dia acabou.',
    paragraphs: [
      'Você pode continuar tentando dormir com a mente ligada.',
      'Ou pode aprender o que fazer para desacelerar, desligar e descansar melhor.',
    ],
    cta: 'Começar o NeuroCalma por R$97',
    close: ['Assista. Entenda. Aplique.', 'Comece hoje.'],
    disclaimer:
      '*Este conteúdo não substitui consulta, avaliação, diagnóstico ou tratamento médico ou psicológico.',
  },
  footer: {
    ecosystem:
      'NeuroCalma faz parte do ecossistema Dr. Thyago Henrique. Saturação Neural™ é apresentada como conceito em pesquisa, não como diagnóstico ou tratamento.',
  },
};
