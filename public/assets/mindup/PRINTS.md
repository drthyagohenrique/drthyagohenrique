# Capturas de tela do MindUp

Estado de cada print e o que falta para ele poder ir ao ar.

Ligar/desligar um print na landing é uma linha em `src/pages/MindUp/content.js`:
adicione `real: true` ao objeto `image` e o quadro do device passa a renderizar o PNG
em vez do mockup em HTML. Sem a flag, o mockup continua sendo usado.

## No ar

| Arquivo | Onde aparece | Observação |
|---|---|---|
| `06-checkin.png` | Galeria "O MindUp por dentro" | OK |
| `03-focus.png` | Galeria | OK — melhor print do conjunto |
| `05-attributes.png` | Galeria | OK. Todos os atributos em 60% deixam a tela uniforme; uma conta com valores variados renderia mais |
| `04-avatar-growth.png` | Galeria | OK. Estágio 1 de 7 ("Semente") comunica início; se quiser transmitir progresso, recapturar num estágio mais avançado |

## Bloqueados — não usar até recapturar

| Arquivo | Problema | O que fazer |
|---|---|---|
| `01-home.png` | Conta de teste: diz **"Olá, Google"**, sequência **0 dias**, **XP total 0**, estágio Semente. Estado vazio, comunica o contrário de progresso | Recapturar com conta que tenha nome real de exibição e algumas semanas de histórico |
| `02-mission-detail.png` | Acentuação faltando no próprio app: **"Gesto De Ativacao Ao Acordar"**, **"para comecar o dia"**. Título em Title Case | Corrigir a acentuação no app e recapturar. Bug de aplicativo, não da landing |
| `07-content.png` | Estado vazio: "Nenhum conteúdo publicado" | Recapturar depois que a biblioteca tiver conteúdos |

## Faltando

- **Questionário de perfil.** A copy nova ("Duas pessoas com o mesmo problema podem
  receber missões diferentes") apoia-se no perfil respondido no cadastro, e não existe
  print dessa tela. É a captura mais importante a produzir.

## Ao recapturar

- Resolução 1080×1920 (9/16), igual às atuais — o quadro `.mu-device--shot` assume isso.
- Conta com histórico: sequência de dias, XP acumulado, atributos em valores diferentes
  entre si.
- Nome de exibição real, nunca a conta de review da loja.
- Conferir acentuação em todos os textos antes de exportar.
- Mesmo horário na barra de status entre as telas, se possível.

## Alinhamento com a copy

A missão usada como exemplo nos cards da seção "Do seu momento para um próximo passo" é
**"buscar luz natural ao acordar"**. Se um print de missão for publicado ao lado desse
texto, ele precisa mostrar essa mesma missão — hoje `02-mission-detail.png` mostra
"Gesto de Ativação ao Acordar", que é outra.
