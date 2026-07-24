// Conversions API (server-side) — recebe eventos do navegador e reenvia para a
// Meta com dados que só o servidor tem (IP, user-agent) e a PII hasheada.
//
// Variáveis de ambiente (defina na Vercel + .env.local):
//   META_PIXEL_ID         id do dataset/pixel (ex.: 2089912891592656)
//   META_CAPI_TOKEN       access token do System User (SECRETO)
//   META_TEST_EVENT_CODE  opcional — código do "Test Events" do Events Manager
//
// Projeto é CommonJS (package.json sem "type":"module"), então usamos require/
// module.exports. Node 24 na Vercel já traz fetch e crypto globais.

const crypto = require('node:crypto');

const GRAPH_VERSION = 'v21.0';

function sha256(value) {
  if (value === undefined || value === null) return undefined;
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

function normalizePhone(value) {
  if (!value) return undefined;
  const digits = String(value).replace(/[^0-9]/g, '');
  return digits || undefined;
}

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  return req.socket && req.socket.remoteAddress;
}

async function readJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
  const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res
      .status(500)
      .json({ error: 'CAPI não configurado (META_PIXEL_ID / META_CAPI_TOKEN ausentes).' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: 'JSON inválido.' });
  }

  const {
    event_name,
    event_id,
    event_source_url,
    action_source = 'website',
    custom_data = {},
    user_data = {},
    event_time,
  } = body || {};

  if (!event_name) {
    return res.status(400).json({ error: 'event_name é obrigatório.' });
  }

  const userData = {
    client_ip_address: getClientIp(req),
    client_user_agent: req.headers['user-agent'],
  };
  if (user_data.fbp) userData.fbp = user_data.fbp;
  if (user_data.fbc) userData.fbc = user_data.fbc;

  // PII sempre hasheada (SHA-256) e em array, como a Meta exige.
  const em = sha256(user_data.email);
  const ph = sha256(normalizePhone(user_data.phone));
  const fn = sha256(user_data.first_name);
  const ln = sha256(user_data.last_name);
  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];
  if (fn) userData.fn = [fn];
  if (ln) userData.ln = [ln];

  const eventPayload = {
    event_name,
    event_time: event_time || Math.floor(Date.now() / 1000),
    action_source,
    event_source_url,
    user_data: userData,
    custom_data,
  };
  if (event_id) eventPayload.event_id = event_id;

  const payload = {
    data: [eventPayload],
    access_token: ACCESS_TOKEN,
  };
  if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`;

  try {
    const fbRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await fbRes.json();
    if (!fbRes.ok) {
      return res.status(502).json({ error: 'Meta rejeitou o evento.', details: result });
    }
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    return res.status(500).json({ error: 'Falha ao enviar para a Meta.', message: err.message });
  }
};
