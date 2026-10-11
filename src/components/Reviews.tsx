import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";

const Reviews = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // O Elfsight só deve ser carregado uma vez; se já estiver na página, não voltamos a inseri-lo.
    if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = ELFSIGHT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="reviews" className="py-24 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">
            {t.reviews.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            {t.reviews.titleA} <span className="italic text-gold-gradient">{t.reviews.titleB}</span>
          </h2>
          <div className="gold-separator w-16 mx-auto" />
        </div>

        {/* O Elfsight lê este ID e injeta aqui o carrossel de avaliações */}
        <div className="elfsight-app-9ac8bb6a-2d76-4507-9b51-2f4fe62ae5c9" data-elfsight-app-lazy />
      </div>
    </section>
  );
};

export default Reviews;
