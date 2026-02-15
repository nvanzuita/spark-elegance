import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">Nossa História</p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            Conheça a <span className="italic text-gold-gradient">Bruna</span>
          </h2>
          <div className="gold-separator w-16 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://brunabeauty.eu/assets/image/bruna1.webp"
                alt="Bruna Rodrigues"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-elegant text-xl md:text-2xl text-foreground mb-6 leading-relaxed italic">
              "Mais do que estética, eu ensino independência, confiança e transformação."
            </p>
            <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
              <p>
                Olá, eu sou Bruna Rodrigues. Nasci em Cascavel, Paraná, vivi por 11 anos em Balneário Camboriú e em 2021 decidi atravessar o oceano para recomeçar em Lisboa, Portugal.
              </p>
              <p>
                Após mais de 5 anos de atuação na área da estética, percebi que minha missão ia além de atender clientes. Reuni experiências, erros, acertos e aprendizados para criar conteúdo verdadeiramente focado em profissionalizar mulheres sonhadoras e determinadas.
              </p>
              <p>
                Acredito que quando uma mulher se capacita, ela muda não só sua carreira, mas a própria vida.
              </p>
            </div>

            <div className="gold-separator w-full my-8" />

            <div className="space-y-3">
              <h3 className="font-display text-lg">O Studio Bruna Beauty</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Fundado em outubro de 2023, em Portugal, o Studio nasceu com a proposta de oferecer uma experiência exclusiva em estética, onde beleza, técnica e sofisticação caminham lado a lado. Um ambiente cuidadosamente pensado para proporcionar conforto, confiança e uma experiência premium.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { label: "Excelência", icon: "✨" },
                { label: "Sofisticação", icon: "✨" },
                { label: "Inovação", icon: "✨" },
              ].map((value) => (
                <div key={value.label} className="flex items-center gap-2 text-xs tracking-luxury uppercase text-primary">
                  <span>{value.icon}</span>
                  <span>{value.label}</span>
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
