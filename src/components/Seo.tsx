import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";

// Atualiza título, descrição e idioma do documento conforme o idioma escolhido.
const Seo = () => {
  const { lang, t } = useLanguage();
  const htmlLang = lang === "pt" ? "pt-PT" : lang;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <meta property="og:title" content={t.meta.title} />
      <meta property="og:description" content={t.meta.description} />
      <meta name="twitter:title" content={t.meta.title} />
      <meta name="twitter:description" content={t.meta.description} />
    </Helmet>
  );
};

export default Seo;
