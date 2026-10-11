import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { ArrowRight } from "lucide-react";
import { cld } from "@/hooks/Cloudinary";
import { useLanguage } from "@/i18n/LanguageContext";
import { whatsappLink } from "@/lib/siteConfig";

// Secção "Novidades": destaca a Tecnologia Lash LED UV. Usa o mesmo vídeo do
// Hero como placeholder (a URL será trocada depois pelo vídeo do produto).
const NOVIDADES_PUBLIC_ID = "background_xzpxyl";

const Novidades = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const videoAsset = cld
    .video(NOVIDADES_PUBLIC_ID)
    .resize(fill().width(1400).height(800).gravity("auto"))
    .quality(auto())
    .format("auto");

  const posterUrl = cld.video(NOVIDADES_PUBLIC_ID).quality("auto").format("auto").toURL();

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

        {/* Cartão com moldura dourada; o vídeo ocupa toda a área interior */}
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative block border border-gold/40 luxury-shadow overflow-hidden"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#1A1612]">
            <AdvancedVideo
              cldVid={videoAsset}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={posterUrl}
              aria-label={t.novidades.videoAlt}
              className="w-full h-full object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.04]"
            />

            {/* Película: mais escura por base (para o texto em toque); no desktop clareia e escurece no hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/85 via-[#1A1612]/45 to-[#1A1612]/50 transition-all duration-500 md:from-[#1A1612]/50 md:via-transparent md:to-transparent md:group-hover:from-[#1A1612]/90 md:group-hover:via-[#1A1612]/55 md:group-hover:to-[#1A1612]/60" />

            {/* Badge no canto superior direito (sempre visível) */}
            <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 border border-gold/40 bg-[#1A1612]/70 backdrop-blur-sm px-3 py-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              {t.novidades.badge}
            </span>

            {/* Conteúdo: em desktop só aparece no hover; em ecrãs de toque fica sempre visível */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 transition-all duration-500 ease-out md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 pointer-events-none">
              <p className="font-elegant text-base sm:text-lg md:text-xl text-white/90 leading-relaxed italic max-w-2xl mb-7">
                {t.novidades.description}
              </p>
              <span className="inline-flex items-center gap-2 font-body text-[11px] tracking-luxury uppercase text-gold font-bold">
                {t.novidades.cta}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default Novidades;
