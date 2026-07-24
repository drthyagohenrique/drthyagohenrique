// Meta Pixel (navegador) + ponte para a Conversions API (servidor).
//
// A cada evento geramos um `event_id` único e enviamos o MESMO id para o
// Pixel (fbq) e para /api/capi. É isso que permite a Meta *deduplicar* o
// evento que chega pelos dois caminhos, contando como um só.
//
// O Pixel ID é público (VITE_META_PIXEL_ID, embutido no bundle). O Access
// Token NUNCA aparece aqui — ele vive apenas no servidor (/api/capi).

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const CAPI_ENDPOINT = '/api/capi';

const isBrowser = typeof window !== 'undefined';
const isLocalhost =
  isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname);

let initialized = false;

function getCookie(name) {
  if (!isBrowser) return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Se o clique veio de um anúncio, a Meta manda ?fbclid=... na URL. Quando o
// cookie _fbc ainda não existe, derivamos ele do fbclid para não perder o match.
function fbcFromUrl() {
  if (!isBrowser) return undefined;
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

export function newEventId() {
  if (isBrowser && window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function initPixel() {
  if (!isBrowser || initialized) return;
  if (!PIXEL_ID) {
    if (import.meta.env.DEV) {
      console.warn('[meta-pixel] VITE_META_PIXEL_ID ausente — Pixel desativado.');
    }
    return;
  }

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  // Não usamos `fbq('init', id, advancedMatching)` com PII em texto puro —
  // qualquer dado pessoal segue hasheado pelo servidor (LGPD-friendly).
  window.fbq('init', PIXEL_ID);
  initialized = true;
}

async function sendToCapi(payload) {
  // Em localhost não mandamos nada para a Meta (a menos que você configure um
  // test_event_code no servidor e queira testar apontando para produção).
  if (isLocalhost) {
    if (import.meta.env.DEV) console.debug('[meta-pixel] (localhost) CAPI ignorado:', payload);
    return;
  }
  try {
    await fetch(CAPI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // sobrevive a navegações (ex.: clique que sai da página)
    });
  } catch {
    // Analytics nunca pode quebrar a página.
  }
}

/**
 * Dispara um evento no Pixel (navegador) e na Conversions API (servidor) com
 * o mesmo event_id para deduplicação.
 *
 * @param {string} eventName  Evento padrão da Meta (PageView, Lead, ViewContent,
 *                            Contact, Purchase...) ou um evento customizado.
 * @param {object} [options]
 * @param {object} [options.customData]  Ex.: { content_name, value, currency }.
 * @param {object} [options.userData]    PII opcional { email, phone, first_name,
 *                                        last_name } — hasheada no servidor.
 * @param {string} [options.eventId]     Force um id específico (senão geramos).
 * @param {boolean}[options.standard]    true = fbq('track'), false = fbq('trackCustom').
 * @returns {string} o event_id usado.
 */
export function trackEvent(eventName, options = {}) {
  const {
    customData = {},
    userData = {},
    eventId = newEventId(),
    standard = true,
  } = options;

  if (isBrowser && typeof window.fbq === 'function') {
    const method = standard ? 'track' : 'trackCustom';
    window.fbq(method, eventName, customData, { eventID: eventId });
  }

  sendToCapi({
    event_name: eventName,
    event_id: eventId,
    event_source_url: isBrowser ? window.location.href : undefined,
    action_source: 'website',
    custom_data: customData,
    user_data: {
      ...userData,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc') || fbcFromUrl(),
    },
  });

  return eventId;
}

export function trackPageView(customData = {}) {
  return trackEvent('PageView', { customData });
}
