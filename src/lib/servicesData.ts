// ---------------------------------------------------------------------------
// Dados centralizados dos serviços (slug, preço, publicId Cloudinary)
// ---------------------------------------------------------------------------
// Os preços abaixo são placeholders em euros (€). Ajuste conforme os valores reais dos catálogos PDF.
export const SERVICES_DATA = {
  lashes: {
    slug: 'pestanas-lashes',
    price: 'a partir de €60',
    publicId: 'pestanas_i4nnur',
  },
  lifting: {
    slug: 'lash-lifting',
    price: 'a partir de €45',
    publicId: 'lifting_g24hbt',
  },
  brows: {
    slug: 'sobrancelhas-brows',
    price: 'a partir de €35',
    publicId: 'browlami_uwliq6',
  },
  laser: {
    slug: 'depilacao-laser',
    price: 'a partir de €50',
    publicId: 'depilacao_drvedo',
  },
  facial: {
    slug: 'estetica-facial',
    price: 'a partir de €70',
    publicId: 'facial_rvq2il',
  },
  tattoo: {
    slug: 'remocao-tatuagem',
    price: 'a partir de €80',
    publicId: 'tattoo_kvon7f',
  },
} as const;

export type ServiceSlug = keyof typeof SERVICES_DATA;
