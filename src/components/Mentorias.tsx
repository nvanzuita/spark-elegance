import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

const mentorias = [
  { 
    title: "Lash Design — Zero a Referência", 
    description: "Formação completa para dominar a arte das pestanas e se tornar referência no mercado premium.", 
    href: "/pdf/mentoria-lashdesigner.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/v1773508786/mentoria4_riaavg.webm" 
  },
  { 
    title: "Brow Lamination", 
    description: "Domine a técnica de laminação de sobrancelhas com acabamento impecável.", 
    href: "/pdf/mentoria-brow.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/v1773508782/mentoria1_iomni6.webm" 
  },
  { 
    title: "HydraLips", 
    description: "Aprenda a técnica de hidratação labial premium com resultados duradouros.", 
    href: "/pdf/mentoria-hydralips.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/v1773508784/mentoria3_jid8ji.webm" 
  },
  { 
    title: "Depilação a Laser", 
    description: "Formação prática e teórica em tecnologia laser de última geração.", 
    href: "/pdf/mentoria-laser.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/v1773508788/mentoria2_kw96nf.webm" 
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  }
};

const Mentorias = () => {
  const scrollRef = useRef(null);
  const isVisible = useInView(scrollRef, { once: true, margin: "200px" });

  return (
    // ALTERAÇÃO: bg-background (seu tom nude/claro) para contrastar com os Serviços (escuros)
    <section id="mentorias" className="py-24 md:py-32 px-6 bg-background">
      <Helmet>
        <title>Mentorias Premium | Bruna Beauty</title>
      </Helmet>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-bold">Formação Profissional</p>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 text-foreground">
            Mentorias <span className="italic text-gold-gradient">Premium</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold/30 mx-auto" />
        </div>

        <motion.div 
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {mentorias.map((mentoria) => (
            <motion.a
              key={mentoria.title}
              variants={cardVariants}
              href={mentoria.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center min-h-[280px] overflow-hidden p-8 border border-gold/10 bg-[#1E1A16] luxury-shadow"
            >
              {/* VÍDEO SEM SCALE (Para não travar) */}
              {isVisible && (
                <video
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                >
                  <source src={mentoria.video} type="video/webm" />
                </video>
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1612] via-[#1A1612]/40 to-transparent z-10" />

              <div className="relative z-20 flex gap-6 items-start">
                <span className="text-primary text-xl mt-1 shrink-0">✧</span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl mb-2 text-white">
                    {mentoria.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed max-w-md">
                    {mentoria.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] tracking-widest uppercase text-gold font-bold transition-all">
                    <span>Ver Programa</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* BOTÃO DOURADO ORIGINAL (Recuperado) */}
        <div className="text-center mt-16">
          <a
            href="https://wa.me/+351931920081"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-gold-gradient text-black text-xs tracking-luxury uppercase font-bold hover:scale-105 transition-transform shadow-xl"
          >
            Reservar Vaga via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mentorias;