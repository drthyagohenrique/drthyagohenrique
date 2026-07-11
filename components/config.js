// Configuração institucional - fonte única de contato e CTA.
// Toda a landing marca consulta pelo WhatsApp; não há venda.

export const CONTACT = {
  phoneLabel: '(62) 3413-6085',
  email: 'dr.thyago.henrique@gmail.com',
  instagram: '@drthyagohenrique',
  instagramUrl: 'https://instagram.com/drthyagohenrique',
  crm: 'CRM-GO 30.392',
};

// Mensagem normalizada enviada ao clicar em qualquer CTA de agendamento.
export const WHATSAPP_MESSAGE = 'Vim do site e quero marcar a minha consulta.';

// Número no formato solicitado para o CTA institucional.
export const WHATSAPP_URL = `https://wa.me/+556234136085?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// Abre o WhatsApp em nova aba com a mensagem pré-preenchida.
export const openWhatsApp = () =>
  window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
