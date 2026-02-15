import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const mentorias = [
  { title: "Lash Design — Zero a Referência", description: "Formação completa para dominar a arte das pestanas e se tornar referência no mercado premium.", link: "https://brunabeauty.eu/assets/pdf/mentoria-lashdesigner.pdf" },
  { title: "Brow Lamination", description: "Domine a técnica de laminação de sobrancelhas com acabamento impecável.", link: "https://brunabeauty.eu/assets/pdf/mentoria-brow.pdf" },
  { title: "HydraLips", description: "Aprenda a técnica de hidratação labial premium com resultados duradouros.", link: "https://brunabeauty.eu/assets/pdf/mentoria-hydralips.pdf" },
  { title: "Depilação a Laser", description: "Formação prática e teórica em tecnologia laser de última geração.", link: "https://brunabeauty.eu/assets/pdf/mentoria-laser.pdf" },
];

const Mentorias = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="mentorias" className="py-24 md:py-32 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">Formação Profissional</p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            Mentorias <span className="italic text-gold-gradient">Premium</span>
          </h2>
          <div className="gold-separator w-16 mx-auto mb-8" />
          <p className="font-elegant text-lg text-muted-foreground max-w-2xl mx-auto">
            Formação completa para quem quer dominar a arte da estética e se tornar referência no mercado premium.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentorias.map((mentoria, index) => (
            <motion.a
              key={mentoria.title}
              href={mentoria.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex items-start gap-6 p-8 bg-card border border-border hover:border-gold/30 transition-all duration-500"
            >
              <span className="text-primary text-lg mt-1 shrink-0">✧</span>
              <div>
                <h3 className="font-display text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">{mentoria.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{mentoria.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/+351931920081"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-gold-gradient text-xs tracking-luxury uppercase text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Reservar via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Mentorias;
