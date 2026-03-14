import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

const mentorias = [
  { 
    title: "Lash Design — Zero a Referência", 
    description: "Formação completa para dominar a arte das pestanas e se tornar referência no mercado premium.", 
    href: "/pdf/mentoria-lashdesigner.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508786/mentoria4_riaavg.webm" 
  },
  { 
    title: "Brow Lamination", 
    description: "Domine a técnica de laminação de sobrancelhas com acabamento impecável.", 
    href: "/pdf/mentoria-brow.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508782/mentoria1_iomni6.webm" 
  },
  { 
    title: "HydraLips", 
    description: "Aprenda a técnica de hidratação labial premium com resultados duradouros.", 
    href: "/pdf/mentoria-hydralips.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508784/mentoria3_jid8ji.webm" 
  },
  { 
    title: "Depilação a Laser", 
    description: "Formação prática e teórica em tecnologia laser de última geração.", 
    href: "/pdf/mentoria-laser.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508788/mentoria2_kw96nf.webm" 
  },
];

// VARIANTES PRO
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Cascata entre os cards
      delayChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const Mentorias = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="mentorias" className="py-24 md:py-32 px-6 bg-background">
      <Helmet>
        <title>Mentorias Premium | Bruna Beauty — Formação Estética</title>
        <meta name="description" content="Torne-se uma referência no mercado da estética com nossas formações exclusivas em Lash Design, Brow Lamination e mais." />
      </Helmet>

      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">Formação Profissional</p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6 text-white">
            Mentorias <span className="italic text-gold-gradient">Premium</span>
          </h2>
          <div className="gold-separator w-16 mx-auto mb-8" />
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Formação completa para quem quer dominar a arte da estética e se tornar referência no mercado premium.
          </p>
        </motion.div>

        {/* Grid com animação Staggered */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {mentorias.map((mentoria) => (
            <motion.a
              key={mentoria.title}
              variants={cardVariants}
              href={mentoria.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center min-h-[250px] overflow-hidden p-8 border border-border/40 hover:border-gold/30 transition-all duration-500 luxury-shadow"
            >
              {/* Vídeo com otimização Cloudinary f_auto,q_auto */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              >
                <source src={mentoria.video} type="video/webm" />
                <source src={mentoria.video.replace('.webm', '.mp4')} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-[#1A1612]/80 transition-opacity duration-500 group-hover:bg-[#1A1612]/70 z-10" />

              <div className="relative z-20 flex gap-6 items-start">
                <span className="text-primary text-lg mt-1 shrink-0 animate-pulse">✧</span>
                <div>
                  <h3 className="font-display text-lg md:text-2xl mb-2 text-white group-hover:text-gold-gradient transition-all">
                    {mentoria.title}
                  </h3>
                  <p className="font-body text-sm text-white/70 leading-relaxed max-w-md">
                    {mentoria.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] tracking-widest uppercase text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <span>Ver Programa Detalhado</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://wa.me/+351931920081"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-[#2A241E] border border-gold/30 text-white text-[10px] tracking-ultra uppercase hover:bg-gold hover:text-black transition-all duration-500 rounded-sm"
          >
            Reservar Vaga via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Mentorias;