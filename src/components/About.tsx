import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const images = [
  "/bruna1.webp",
  "/bruna2.webp", // Adicione os caminhos das suas novas fotos aqui
  "/bruna3.webp",
  "/bruna4.webp",
];

const About = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
// Lógica de Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]); // Reinicia o timer sempre que a imagem muda

  return (
        <section id="sobre" className="py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">{t.about.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            {t.about.titleA} <span className="italic text-gold-gradient">{t.about.titleB}</span>
          </h2>
          <div className="gold-separator w-16 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="aspect-[3/4] overflow-hidden relative rounded-sm luxury-shadow">
              <AnimatePresence mode="wait" initial={false}>
  <motion.img
    key={currentIndex}
    src={images[currentIndex]}
    alt="Bruna Rodrigues"
    // Só a primeira imagem carrega de imediato; as restantes em lazy para não
    // bloquear o carregamento inicial (as fotos do carrossel são pesadas).
    loading={currentIndex === 0 ? "eager" : "lazy"}
    decoding="async"
    fetchPriority={currentIndex === 0 ? "high" : "auto"}
    // Começa fora da tela à direita (x: 100%) e invisível
    initial={{ opacity: 0, x: 20 }} 
    // Desliza para a posição original (x: 0) e fica visível
    animate={{ opacity: 1, x: 0 }} 
    // Sai para a esquerda (x: -20) e desaparece
    exit={{ opacity: 0, x: -20 }} 
    transition={{ 
      duration: 1.2, // Aqui está o "Slow Motion" (mais de 1 segundo)
      ease: [0.22, 1, 0.36, 1] // Um ease chamado 'Quintic Out' - muito elegante e suave
    }}
    className="w-full h-full object-cover absolute inset-0"
  />
</AnimatePresence>

              {/* Botões de Navegação */}
              <button
                type="button"
                aria-label={t.about.prev}
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/20 backdrop-blur-md border border-gold/20 text-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label={t.about.next}
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/20 backdrop-blur-md border border-gold/20 text-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight size={20} />
              </button>

              {/* Indicadores (Dots) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${t.about.goTo} ${i + 1}`}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 transition-all rounded-full ${
                      currentIndex === i ? "w-6 bg-gold" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20 -z-10" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-elegant text-xl md:text-2xl text-foreground mb-6 leading-relaxed italic">
              "{t.about.quote}"
            </p>
            <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="gold-separator w-full my-8" />

            <div className="space-y-3">
              <h3 className="font-display text-lg">{t.about.studioTitle}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {t.about.studioText}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              {t.about.values.map((label) => (
                <div key={label} className="flex items-center gap-2 text-xs tracking-luxury uppercase text-primary">
                  <span>✨</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;