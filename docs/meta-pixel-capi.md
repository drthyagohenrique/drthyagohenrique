# Meta Pixel + Conversions API (CAPI)

Rastreamento deduplicado: cada evento vai ao **Pixel (navegador)** e à **Conversions
API (servidor)** com o mesmo `event_id`, para a Meta contar como um só.

## Arquitetura

- `src/lib/meta-pixel.js` — carrega o `fbq`, gera `event_id`, dispara no navegador e
  faz `POST /api/capi`. Lê `_fbp`/`_fbc` (ou deriva `_fbc` do `fbclid` da URL).
- `src/components/analytics/MetaPixel.jsx` — montado no router; inicializa o Pixel e
  dispara `PageView` em **toda troca de rota** (site inteiro).
- `api/capi.js` — Vercel Function. Adiciona IP + user-agent, hasheia PII (SHA-256) e
  reenvia para `graph.facebook.com/v21.0/<PIXEL_ID>/events`.

## Variáveis de ambiente

| Variável                | Onde        | Secreta | Uso                                   |
|-------------------------|-------------|:-------:|---------------------------------------|
| `VITE_META_PIXEL_ID`    | build/front |   não   | Pixel ID embutido no bundle           |
| `META_PIXEL_ID`         | server      |   não   | Pixel ID usado pela Function          |
| `META_CAPI_TOKEN`       | server      | **sim** | Access Token do System User           |
| `META_TEST_EVENT_CODE`  | server      |   não   | Opcional — valida no "Test Events"    |

Local: já estão no `.env.local` (gitignored).

**Produção (Vercel):** adicione as 3 primeiras em
Project → Settings → Environment Variables (Production + Preview). `VITE_*` precisa
existir **no build**, então após adicioná-la faça um novo deploy.

## Disparar um evento

```js
import { trackEvent } from '../lib/meta-pixel.js';

// Evento padrão da Meta
trackEvent('Lead', { customData: { content_name: 'MindUp', value: 0, currency: 'BRL' } });

// Com PII (hasheada no servidor — nunca em texto puro no navegador)
trackEvent('Contact', { userData: { email: 'a@b.com', phone: '+5562...' } });

// Evento customizado
trackEvent('WhatsAppClick', { standard: false, customData: { origem: 'links' } });
```

`PageView` já é automático em todas as rotas. Hoje há uma conversão `Lead` no clique
de download do MindUp (`src/pages/MindUp/MindUpDownload.jsx`).

## Testar

1. Events Manager → seu dataset → **Test Events**, copie o código.
2. Ponha em `META_TEST_EVENT_CODE` no `.env.local` (e/ou na Vercel).
3. `vercel dev` (para a Function `/api/capi` rodar localmente) ou deploy de preview.
4. Navegue pelo site — os eventos aparecem no Test Events com origem Browser **e**
   Server, marcados como *deduplicados*.
5. Remova o `META_TEST_EVENT_CODE` para produção.

## Segurança

- O `META_CAPI_TOKEN` só existe no servidor. Confirme que ele **não** está no bundle:
  `grep -r EAAE dist/` não deve retornar nada.
- Se o token já circulou fora daqui, rotacione no Events Manager (gera novo, invalida
  o anterior) e atualize a env var.
