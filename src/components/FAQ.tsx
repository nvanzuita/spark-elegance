import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/LanguageContext";
import { whatsappLink } from "@/lib/siteConfig";

const FAQ = () => {
  const { t } = useLanguage();
  const groups = t.faq.groups;
  // Permite várias perguntas abertas ao mesmo tempo, identificadas por um id único.
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // Achata todos os itens para gerar o JSON-LD de FAQPage (SEO / rich results).
  const allItems = groups.flatMap((g) => g.items);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="bg-[#4A423B] py-24 px-6 border-t border-gold/10">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="container mx-auto max-w-4xl">
        {/* Header da Seção - Padronizado com o Hero/Serviços */}
        <div className="text-center mb-20">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/80 mb-4 font-medium">
            {t.faq.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6 font-light">
            {t.faq.titleA} <span className="italic text-gold-gradient font-light">{t.faq.titleB}</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </div>

        {/* Grupos temáticos */}
        <div className="space-y-14">
          {groups.map((group, gi) => (
            <div key={group.title}>
              <h3 className="font-display text-lg md:text-xl text-gold/90 mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gold/40" aria-hidden="true" />
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, ii) => {
                  const id = `faq-${gi}-${ii}`;
                  const isOpen = openIds.includes(id);
                  return (
                    <div key={id} className="border-b border-gold/15">
                      <button
                        type="button"
                        id={`${id}-button`}
                        aria-expanded={isOpen}
                        aria-controls={`${id}-panel`}
                        onClick={() => toggle(id)}
                        className="w-full py-6 flex justify-between items-center text-left transition-all group"
                      >
                        <span className="font-body text-[13px] uppercase tracking-[0.15em] text-white/90 group-hover:text-gold transition-colors duration-300">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`text-gold/70 transition-transform duration-500 ease-out shrink-0 ml-4 ${
                            isOpen ? "rotate-180 text-gold" : ""
                          }`}
                          size={16}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`${id}-panel`}
                            role="region"
                            aria-labelledby={`${id}-button`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-8 pr-6 text-sm text-white/60 leading-relaxed font-light">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA de conversão no final */}
        <div className="mt-16 text-center border-t border-gold/15 pt-12">
          <h3 className="font-display text-2xl text-white mb-3 font-light">{t.faq.contactTitle}</h3>
          <p className="font-body text-sm text-white/60 mb-8 max-w-md mx-auto">{t.faq.contactText}</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gold-gradient text-[10px] tracking-luxury uppercase text-black font-bold hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={14} />
            {t.faq.contactCta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
