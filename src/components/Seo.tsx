import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE_URL } from "@/lib/siteConfig";

// Atualiza título, descrição e idioma do documento conforme o idioma escolhido.
const Seo = () => {
  const { lang, t } = useLanguage();
  const htmlLang = lang === "pt" ? "pt-PT" : lang;

  // Dados estruturados de negócio local (SEO): ajudam o Google a mostrar
  // horário, contacto e localização nos resultados de pesquisa.
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Bruna Beauty",
    description: t.meta.description,
    url: SITE_URL,
    telephone: "+351 931 920 081",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Parede",
      addressRegion: "Lisboa",
      addressCountry: "PT",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <meta property="og:title" content={t.meta.title} />
      <meta property="og:description" content={t.meta.description} />
      <meta name="twitter:title" content={t.meta.title} />
      <meta name="twitter:description" content={t.meta.description} />
      {/* Idiomas alternativos para SEO multi-idioma */}
      <link rel="alternate" hrefLang="pt-PT" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
    </Helmet>
  );
};

export default Seo;
