import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { whatsappLink } from "@/lib/siteConfig";

// Secção "Novidades": destaca a Tecnologia Lash LED UV.
// Layout lado a lado: vídeo vertical à esquerda, texto à direita.
// Para trocar o vídeo no futuro, basta substituir as duas URLs abaixo.
const NOVIDADES_VIDEO_URL =
  "https://res.cloudinary.com/dudnl5whz/video/upload/q_auto,f_auto/v1791721856/videolashleduv_ci2qts";
const NOVIDADES_POSTER_URL =
  "https://res.cloudinary.com/dudnl5whz/video/upload/q_auto,f_auto,so_0/v1791721856/videolashleduv_ci2qts.jpg";

const Novidades = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="novidades" className="py-24 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            {t.novidades.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 text-foreground">
            {t.novidades.titleA} <span className="italic text-gold-gradient">{t.novidades.titleB}</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </motion.div>

        {/* Cartão interativo: só o vídeo aparece; ao passar o mouse o texto entra
            (transição estilo carrossel). Em ecrãs de toque o texto fica sempre visível. */}
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative block w-full h-[560px] md:h-[640px] overflow-hidden border border-gold/40 luxury-shadow bg-[#1A1612]"
        >
          {/* Vídeo — camada de fundo, com leve zoom no hover */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={NOVIDADES_POSTER_URL}
            aria-label={t.novidades.videoAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          >
            <source src={NOVIDADES_VIDEO_URL} type="video/mp4" />
          </video>

          {/* Overlay escuro — só no hover (ou sempre em ecrãs de toque) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/85 to-[#1A1612]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100" />

          {/* Badge no canto superior direito */}
          <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 border border-gold/40 bg-[#1A1612]/70 backdrop-blur-sm px-3 py-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
            {t.novidades.badge}
          </span>

          {/* Texto — escondido, entra no hover (estilo carrossel); visível em toque */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-10 opacity-0 translate-y-8 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/80 mb-4 font-bold">
              {t.novidades.eyebrow}
            </p>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-5 leading-tight">
              {t.novidades.titleA}{" "}
              <span className="italic text-gold-gradient">{t.novidades.titleB}</span>
            </h3>
            <div className="w-16 h-[1px] bg-gradient-to-r from-gold/60 to-transparent mb-6" />
            <p className="font-elegant text-base md:text-lg text-white/80 leading-relaxed italic mb-8 max-w-lg">
              {t.novidades.description}
            </p>
            <span className="inline-flex items-center gap-2 font-body text-[11px] tracking-luxury uppercase text-gold font-bold group-hover:text-white transition-colors duration-300">
              {t.novidades.cta}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>

          {/* Hint "passe o mouse para ler" — visível por padrão, some no hover; oculto em toque */}
          <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2 [@media(hover:none)]:hidden">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#1A1612]/70 backdrop-blur-sm px-4 py-2 font-body text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gold font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              {t.novidades.hoverHint}
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default Novidades;
