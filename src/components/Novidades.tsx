import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  // Mobile: controla o mini-carrossel vídeo ↔ texto (sem hover em ecrãs de toque).
  const [showText, setShowText] = useState(false);

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

        {/* ============ MOBILE: mini-carrossel vídeo ↔ texto com setas (sem hover) ============ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:hidden relative overflow-hidden border border-gold/40 luxury-shadow bg-[#1A1612]"
        >
          {/* Vídeo — mantém proporção natural; sai quando o texto entra */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={NOVIDADES_POSTER_URL}
            aria-label={t.novidades.videoAlt}
            className={
              "block w-full h-auto transition-all duration-500 ease-out " +
              (showText ? "opacity-0 scale-105" : "opacity-100")
            }
          >
            <source src={NOVIDADES_VIDEO_URL} type="video/mp4" />
          </video>

          {/* Fundo escuro — aparece com o texto para dar contraste */}
          <div
            className={
              "absolute inset-0 bg-[#1A1612] transition-opacity duration-500 ease-out " +
              (showText ? "opacity-100" : "opacity-0 pointer-events-none")
            }
          />

          {/* Badge */}
          <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 border border-gold/40 bg-[#1A1612]/70 backdrop-blur-sm px-3 py-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
            {t.novidades.badge}
          </span>

          {/* Texto — entra por cima do vídeo; SEM título (só no cabeçalho da secção) */}
          <div
            className={
              "absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-10 transition-all duration-500 ease-out " +
              (showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")
            }
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/80 mb-4 font-bold">
              {t.novidades.eyebrow}
            </p>
            <p className="font-elegant text-base text-white/85 leading-relaxed italic mb-8 max-w-sm">
              {t.novidades.description}
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-luxury uppercase text-gold font-bold"
              onClick={(e) => e.stopPropagation()}
            >
              {t.novidades.cta}
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Setas de navegação — cantos inferiores.
              Vídeo ativo → → no canto inferior direito; Texto ativo → ← no canto inferior esquerdo. */}
          {/* Voltar ao vídeo (←) — canto inferior esquerdo, só quando o texto está ativo */}
          <button
            type="button"
            aria-label={t.novidades.hoverHint}
            onClick={() => setShowText(false)}
            className={
              "absolute left-4 bottom-6 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold/40 bg-[#1A1612]/70 backdrop-blur-sm text-gold transition-opacity duration-300 " +
              (showText ? "opacity-100" : "opacity-0 pointer-events-none")
            }
          >
            <ArrowLeft size={18} />
          </button>

          {/* Ir para o texto (→) — canto inferior direito, só quando o vídeo está ativo */}
          <button
            type="button"
            aria-label={t.novidades.hoverHint}
            onClick={() => setShowText(true)}
            className={
              "absolute right-4 bottom-6 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold/40 bg-[#1A1612]/70 backdrop-blur-sm text-gold transition-opacity duration-300 " +
              (showText ? "opacity-0 pointer-events-none" : "opacity-100")
            }
          >
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* ============ DESKTOP: grid 2 colunas (vídeo esquerda / texto direita) — só md+ ============ */}
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group hidden md:grid md:grid-cols-2 items-stretch border border-gold/40 luxury-shadow overflow-hidden bg-[#1A1612]"
        >
          {/* Vídeo (esquerda) */}
          <div className="relative w-full min-h-[560px] overflow-hidden bg-[#1A1612]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={NOVIDADES_POSTER_URL}
              aria-label={t.novidades.videoAlt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            >
              <source src={NOVIDADES_VIDEO_URL} type="video/mp4" />
            </video>

            <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 border border-gold/40 bg-[#1A1612]/70 backdrop-blur-sm px-3 py-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              {t.novidades.badge}
            </span>
          </div>

          {/* Texto (direita) — sempre visível */}
          <div className="flex flex-col items-start justify-center text-left p-12 lg:p-14">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/80 mb-4 font-bold">
              {t.novidades.eyebrow}
            </p>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-5 leading-tight">
              {t.novidades.titleA}{" "}
              <span className="italic text-gold-gradient">{t.novidades.titleB}</span>
            </h3>
            <div className="w-16 h-[1px] bg-gradient-to-r from-gold/60 to-transparent mb-6" />
            <p className="font-elegant text-base md:text-lg text-white/80 leading-relaxed italic mb-8">
              {t.novidades.description}
            </p>
            <span className="inline-flex items-center gap-2 font-body text-[11px] tracking-luxury uppercase text-gold font-bold group-hover:text-white transition-colors duration-300">
              {t.novidades.cta}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default Novidades;
