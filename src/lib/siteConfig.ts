// Configuração central do site: altere aqui contactos e links externos num só sítio.

export const SITE_URL = "https://brunabeauty.eu";

// Número de WhatsApp no formato internacional, sem "+" nem espaços (formato exigido pelo wa.me).
export const WHATSAPP_NUMBER = "351931920081";

export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// TODO: substituir pelo link de reservas atual do Fresha quando o tiver.
// (Este é o link que já existia na secção "Reserva", mantido até ser atualizado.)
export const FRESHA_URL =
  "https://www.fresha.com/pt/a/studio-bruna-beauty-parede-cascais-rua-latino-coelho-j2dtyrog/booking?allOffer";

export const ACADEMY_URL = "https://academy.brunabeauty.eu";
export const INSTAGRAM_URL = "https://instagram.com/studio.brunabeauty";
export const INSTAGRAM_HANDLE = "@studio.brunabeauty";

export const RASTELLI_URL = "https://rastelliportugal.com/?bg_ref=3BSrM40lRW";
export const RASTELLI_COUPON = "BRUNA10";
