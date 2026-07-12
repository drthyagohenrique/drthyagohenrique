import { PRODUCTS } from '../../config/products.js';
import { DOCTOR } from '../../data/doctor.js';
import { SATURATION_NEURAL } from '../../data/saturation-neural.js';

// Copy do NeuroCalma — Experiência Guiada.
// Conceito narrativo: "do ruído ao silêncio" — a página começa densa
// (ondas, camadas, luz violeta) e vai se limpando ao longo do scroll.
// Compliance: sem "protocolo", sem promessa clínica, Saturação Neural™
// sempre como conceito em pesquisa.
export const neuroCalmaContent = {
  product: PRODUCTS.neurocalma,
  hero: {
    eyebrow: 'NeuroCalma · Experiência Guiada',
    headline: ['Seu dia termina.', 'Sua mente, não.'],
    subheadline:
      'Uma experiência prática para compreender a sobrecarga mental, reduzir o excesso de estímulos e começar a construir momentos reais de desaceleração.',
    cta: 'Começar o NeuroCalma',
    priceLine: `${PRODUCTS.neurocalma.price} · ${PRODUCTS.neurocalma.priceNote}`,
    secondaryCta: 'Conhecer a experiência',
    disclaimer:
      'Este conteúdo não substitui avaliação, acompanhamento ou tratamento médico ou psicológico.',
  },
  recognition: {
    label: '01 · Reconhecimento',
    title: 'A sobrecarga nem sempre parece uma crise.',
    paragraphs: [
      'Você encerra o expediente, mas continua revendo decisões. Deita, mas ainda responde conversas mentalmente. Tenta descansar, mas qualquer silêncio abre espaço para tudo o que ficou pendente.',
      'Muitas vezes, a sobrecarga aparece de forma silenciosa: dificuldade para desacelerar, irritação sem motivo claro, sensação de urgência constante, sono pouco reparador, pensamentos fragmentados e um cansaço que não desaparece depois de uma noite de descanso.',
    ],
    close: ['Você continua funcionando.', 'Mas funcionar não significa estar recuperado.'],
  },
  productIntro: {
    label: '02 · A experiência',
    title: 'Um ponto de interrupção no excesso.',
    text: 'O NeuroCalma é uma experiência guiada criada para ajudar você a reconhecer padrões de sobrecarga, reduzir estímulos desnecessários e construir práticas simples de desaceleração dentro da rotina real.',
    boundaries: [
      'Não é uma coleção de frases motivacionais.',
      'Não é um desafio de produtividade.',
      'Não é uma promessa de transformação instantânea.',
    ],
    differentiation:
      'O NeuroCalma não foi criado para distrair a mente por alguns minutos. Ele organiza uma sequência de compreensão e aplicação, para que você perceba o que mantém seu estado de demanda e comece a criar transições mais conscientes entre exigência e recuperação.',
  },
  journey: {
    label: '03 · O percurso',
    title: 'Quatro eixos para sair do piloto automático.',
    axes: [
      { title: 'Perceber', text: 'Reconhecer sinais e padrões antes que se transformem em ruído constante.' },
      { title: 'Reduzir', text: 'Diminuir os estímulos que prolongam o estado de demanda.' },
      { title: 'Regular', text: 'Criar pausas guiadas para recuperar presença e espaço mental.' },
      { title: 'Sustentar', text: 'Levar pequenas práticas de recuperação para dentro da rotina real.' },
    ],
    close:
      'O NeuroCalma não exige que você abandone sua rotina. Ele ajuda a construir recuperação dentro dela.',
  },
  deliverables: {
    label: '04 · O que você recebe',
    title: 'Menos informação solta. Mais direção.',
    text: 'O NeuroCalma é 100% digital: você acessa um ambiente on-line organizado como um percurso — não uma pilha de conteúdos soltos.',
    items: [
      {
        title: 'Encontros guiados',
        text: 'Conteúdos diretos, em linguagem clara, para compreender a sobrecarga sem jargão técnico.',
      },
      {
        title: 'Práticas de desaceleração',
        text: 'Exercícios guiados e curtos, pensados para caber em dias cheios — não em rotinas ideais.',
      },
      {
        title: 'Percurso em quatro eixos',
        text: 'Perceber, Reduzir, Regular e Sustentar: uma sequência com começo, direção e aplicação.',
      },
      {
        title: 'Acesso imediato, no seu ritmo',
        text: 'Ambiente digital disponível logo após a confirmação, em qualquer dispositivo.',
      },
    ],
  },
  saturation: {
    label: '05 · Conceito em pesquisa',
    title: 'Quando a mente permanece tempo demais em estado de demanda.',
    definition: SATURATION_NEURAL.officialDefinition,
    connection:
      'O NeuroCalma atua na camada inicial da sobrecarga: percepção dos sinais, redução de estímulos e construção de momentos de regulação.',
    central:
      'O NeuroCalma não resolve toda a sobrecarga. Ele ajuda a interromper padrões cotidianos que podem alimentá-la.',
    limit:
      'Quando existem sintomas intensos, agravamento persistente ou necessidade clínica, uma experiência educativa não substitui avaliação profissional individualizada.',
  },
  audience: {
    label: '06 · Para quem é',
    title: 'Para quem é. E o que ele não substitui.',
    for: [
      'Pessoas com a mente acelerada ao final do dia',
      'Quem sente excesso de estímulos e dificuldade para desligar',
      'Quem percebe que o descanso não está produzindo recuperação',
      'Quem busca um primeiro passo educativo e prático',
      'Quem deseja construir pequenas pausas dentro de uma rotina exigente',
    ],
    notReplace: [
      'Atendimento de urgência',
      'Avaliação médica ou psicológica',
      'Psicoterapia',
      'Diagnóstico',
      'Tratamento',
      'Acompanhamento profissional quando necessário',
    ],
    urgencyNotice:
      'Em situações de risco imediato ou de agravamento intenso, procure um serviço de urgência da sua região.',
  },
  authority: {
    label: '07 · Origem médica',
    title: 'Origem médica, linguagem clara.',
    intro:
      'O NeuroCalma foi desenvolvido dentro da linha de trabalho do Dr. Thyago Henrique sobre saúde mental, sobrecarga e recuperação em contextos de alta exigência.',
    bio: DOCTOR.shortAuthority,
  },
  offer: {
    label: '08 · Oferta',
    title: 'Um primeiro passo para começar a desacelerar.',
    text: 'Uma experiência digital educativa para quem precisa começar a desacelerar sem abandonar a rotina.',
    ctaActive: 'Começar o NeuroCalma',
    guarantee: {
      badge: 'Garantia de 7 dias',
      text: 'Se a experiência não fizer sentido para você, devolvemos o valor integral — basta pedir dentro de 7 dias.',
    },
    disclaimer:
      'Este conteúdo não substitui consulta, avaliação, diagnóstico ou tratamento médico ou psicológico.',
  },
  faq: {
    label: '09 · Perguntas frequentes',
    title: 'Informações práticas antes de começar.',
    items: [
      {
        question: 'O NeuroCalma é uma consulta?',
        answer:
          'Não. O NeuroCalma é um produto digital educativo e guiado. Ele não substitui avaliação médica ou psicológica.',
      },
      {
        question: 'O NeuroCalma é um tratamento para ansiedade?',
        answer:
          'Não. O NeuroCalma é uma experiência educativa sobre sobrecarga mental e desaceleração. Ele não é tratamento, não realiza diagnóstico e não substitui acompanhamento médico ou psicológico quando ele é necessário.',
      },
      {
        question: 'O NeuroCalma é um produto físico?',
        answer:
          'Não. O NeuroCalma é 100% digital. Nada é enviado para sua casa: o acesso acontece em ambiente on-line, logo após a confirmação, e você pode usar de qualquer dispositivo.',
      },
      {
        question: 'Preciso ter algum diagnóstico para participar?',
        answer:
          'Não. O NeuroCalma foi pensado para quem percebe sinais de sobrecarga no dia a dia — mente acelerada, dificuldade para desligar, descanso pouco reparador. Ele não realiza triagem clínica nem exige qualquer diagnóstico.',
      },
      {
        question: 'Saturação Neural é um diagnóstico?',
        answer:
          'Não. Saturação Neural™ é apresentada como conceito em pesquisa sobre estados de sobrecarga mental crônica. Não constitui diagnóstico, doença ou tratamento.',
      },
      {
        question: 'Preciso seguir uma ordem?',
        answer:
          'A experiência foi organizada como uma sequência de compreensão e aplicação, e a ordem proposta ajuda a aproveitar melhor o percurso. Você pode caminhar no seu ritmo.',
      },
      {
        question: 'Posso utilizar se já faço acompanhamento profissional?',
        answer:
          'Sim. Por ser um conteúdo educativo, o NeuroCalma pode ser usado em paralelo ao acompanhamento que você já realiza — e não substitui as orientações do seu médico ou psicólogo.',
      },
      {
        question: 'Quais são as formas de pagamento?',
        answer:
          'O acesso custa R$97, e você pode pagar à vista ou parcelar em até 12x no cartão. A liberação acontece logo após a confirmação do pagamento.',
      },
      {
        question: 'O NeuroCalma tem garantia?',
        answer:
          'Sim. Você tem 7 dias de garantia: se a experiência não fizer sentido para você, devolvemos o valor integral — basta pedir dentro do prazo.',
      },
      {
        question: 'O que devo fazer se estiver em uma crise?',
        answer:
          'O NeuroCalma não substitui atendimento de urgência. Em situações de risco imediato, de agravamento intenso ou de possibilidade de dano a si ou a terceiros, procure um serviço de urgência da sua região.',
      },
    ],
  },
  finalCta: {
    label: '10 · Começar',
    title: 'Você não precisa esperar o colapso para começar a desacelerar.',
    text: 'O NeuroCalma é um primeiro passo para quem percebe que a mente está ocupada demais e recuperada de menos.',
    disclaimer:
      'Este conteúdo não substitui consulta, avaliação, diagnóstico ou tratamento médico ou psicológico.',
  },
  footer: {
    ecosystem:
      'NeuroCalma faz parte do ecossistema Dr. Thyago Henrique. Saturação Neural™ é apresentada como conceito em pesquisa, não como diagnóstico ou tratamento.',
  },
};
