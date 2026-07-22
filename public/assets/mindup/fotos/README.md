# Fotos reais de pessoas — MindUp

Cenas de rotina ligadas às missões do aplicativo. O objetivo é pertencimento: quem lê
precisa reconhecer o próprio dia ali, não uma vida idealizada.

A seção só existe na página quando houver pelo menos uma foto entregue. Enquanto não
houver, ela não é renderizada em produção — em desenvolvimento aparecem placeholders com
o briefing de cada cena.

## Como publicar

1. Salve os arquivos nesta pasta (`public/assets/mindup/fotos/`).
2. Em `src/pages/MindUp/content.js`, bloco `photos.items`, preencha para cada item:
   `src`, `alt`, `width` e `height`.

```js
{
  id: 'luz-natural',
  mission: 'Luz natural ao acordar',
  brief: '...',
  src: '/assets/mindup/fotos/luz-natural.jpg',
  alt: 'Pessoa de pé junto à janela recebendo a luz da manhã no rosto',
  width: 1200,
  height: 1500,
}
```

Pode entregar uma foto de cada vez: itens sem `src` simplesmente não aparecem.

## As cinco cenas

| id | Missão | Briefing |
|---|---|---|
| `luz-natural` | Luz natural ao acordar | Pessoa de pé junto à janela logo ao acordar, luz da manhã no rosto, sem celular na mão |
| `caminhada` | Caminhada leve de 20 minutos | Caminhando em calçada arborizada ou parque, roupa comum de dia a dia, ritmo tranquilo |
| `respiracao` | Respiração consciente de 5 minutos | Sentada, olhos fechados, ombros soltos, ambiente doméstico ou escritório silencioso |
| `bloco-foco` | Um bloco de foco sem interrupções | Concentrada em mesa organizada, celular virado para baixo ou fora de alcance |
| `sem-tela` | Sem tela 1h antes de dormir | Ambiente noturno de luz baixa, pessoa com livro ou apenas desacelerando, telas desligadas |

As missões correspondem exatamente às que giram no ticker da página
(`missionTicker` em `content.js`). Se uma missão do ticker mudar, a foto correspondente
deve acompanhar.

## Especificação técnica

- **Proporção 4:5 (retrato).** O quadro corta em `object-fit: cover`, então deixe
  respiro nas bordas.
- **Resolução:** 1200×1500 px é suficiente. Acima de 1600×2000 é desperdício de banda.
- **Formato:** WebP de preferência (JPG aceito). Alvo de até 180 KB por arquivo.
- **Nome do arquivo:** igual ao `id` da tabela — `luz-natural.webp`, `caminhada.webp`...
- **Consistência:** as cinco fotos precisam parecer do mesmo ensaio — mesma paleta,
  mesma temperatura de cor, mesmo tratamento. Cinco fotos de bancos diferentes matam o
  efeito.

## Direção de arte

- Luz natural, tratamento suave, nada de saturação alta ou HDR.
- Pessoas comuns em contexto brasileiro, faixa 28–50 anos, diversidade real.
- Roupa de rotina — trabalho, casa —, nunca roupa de academia ou spa.
- A pessoa está **fazendo a missão**, não posando para a câmera. Sem olhar para a lente,
  sem sorriso de catálogo.
- Ambientes reais e um pouco imperfeitos. Casa habitada, mesa de trabalho de verdade.

## Restrições de compliance (publicidade médica, CFM)

Estas fotos ficam numa página do ecossistema de um médico. Portanto:

- **Não podem sugerir paciente, consulta ou atendimento.** São pessoas na própria rotina.
- **Não podem sugerir resultado, tratamento ou melhora.** Nada de antes/depois, nada de
  expressão de sofrimento contrastada com expressão de alívio.
- **Sem jaleco, consultório, equipamento médico ou qualquer signo clínico.**
- **Sem o Dr. Thyago nas fotos** — a seção fala do uso do aplicativo, não da pessoa dele.
- Se forem fotos de banco de imagens, guardar a licença. Se forem produzidas,
  guardar autorização de uso de imagem assinada de cada pessoa retratada.

## `alt` das imagens

Descreva a cena, não a missão (a missão já está na legenda visível ao lado).

- Bom: `"Pessoa de pé junto à janela recebendo a luz da manhã no rosto"`
- Ruim: `"Missão de luz natural ao acordar"`
