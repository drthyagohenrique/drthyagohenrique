export const CONTACT = {
  doctorName: 'Dr. Thyago Henrique',
  crm: 'CRM-GO 30.392',
  phoneLabel: '(62) 3413-6085',
  phoneE164: '+55-62-3413-6085',
  whatsappDigits: '556234136085',
  email: 'dr.thyago.henrique@gmail.com',
  instagram: '@drthyagohenrique',
  instagramUrl: 'https://instagram.com/drthyagohenrique',
};

export const WHATSAPP_MESSAGE =
  'Olá, vim pelo site do Dr. Thyago Henrique e gostaria de receber informações. Meu nome é ';

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
