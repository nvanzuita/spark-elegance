import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Navigation, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// Embed do Google Maps por query (não precisa de API key). Centralizado no
// endereço do studio. Trocar a query se a morada exata mudar.
const MAP_QUERY = "Rua Latino Coelho, Parede, Cascais, Portugal";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

const Location = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="localizacao" className="py-24 md:py-32 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            {t.location.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 text-foreground">
            {t.location.titleA} <span className="italic text-gold-gradient">{t.location.titleB}</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Informações */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 mt-1 flex items-center justify-center w-10 h-10 rounded-full border border-gold/30 text-gold">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg mb-1 text-foreground">{t.location.addressLabel}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.location.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 mt-1 flex items-center justify-center w-10 h-10 rounded-full border border-gold/30 text-gold">
                <Clock size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg mb-1 text-foreground">{t.location.hoursLabel}</h3>
                {t.location.hoursLines.map((line) => (
                  <p key={line} className="font-body text-sm text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 mt-1 flex items-center justify-center w-10 h-10 rounded-full border border-gold/30 text-gold">
                <Navigation size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg mb-1 text-foreground">{t.location.transportLabel}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.location.transport}</p>
              </div>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all"
            >
              <ExternalLink size={14} aria-hidden="true" />
              {t.location.cta}
            </a>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative border border-gold/30 luxury-shadow overflow-hidden"
          >
            <iframe
              title={t.location.address}
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="w-full h-[360px] md:h-[440px] border-0 block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
