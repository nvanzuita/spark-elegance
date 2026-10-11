import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const LOCALES: Record<string, string> = {
  pt: "pt-PT",
  en: "en-GB",
  fr: "fr-FR",
  es: "es-ES",
};

const Privacy = () => {
  const { t, lang } = useLanguage();
  const today = new Date().toLocaleDateString(LOCALES[lang] ?? "pt-PT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="min-h-screen bg-background px-6 py-24 md:py-32">
      <Helmet>
        <title>{t.privacy.pageTitle}</title>
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            {t.privacy.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            {t.privacy.title}
          </h1>
          <p className="font-body text-xs text-muted-foreground mb-2">
            {t.privacy.updated}: {today}
          </p>
          <div className="gold-separator w-24 mb-10" />

          <p className="font-elegant text-lg md:text-xl text-foreground/80 leading-relaxed mb-12 italic">
            {t.privacy.intro}
          </p>

          <div className="space-y-10">
            {t.privacy.sections.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-3">
                  {section.heading}
                </h2>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all"
            >
              <ArrowLeft size={14} />
              {t.privacy.backHome}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Privacy;
