import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video com Película de Foco */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover blur-[4px]" /* <-- Aqui adicionamos o Blur direto no vídeo */
        >
          <source src="https://res.cloudinary.com/dudnl5whz/video/upload/v1773509327/background_xzpxyl.webm" />
        </video>
        
        {/* Película (Overlay) para dar foco total à escrita */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" /> 
        {/* O 'bg-background/60' usa sua cor nude com 60% de transparência */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="mb-8"
  >
    <div className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-8 rounded-full border border-gold/30 flex items-center justify-center bg-background/20 backdrop-blur-sm overflow-hidden p-5">
      {/* Trocamos o span pela imagem, mantendo o container intacto */}
      <img 
        src="/simbolo1.PNG" 
        alt="Logo" 
        className="w-full h-full object-contain"
      />
    </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-xs tracking-ultra uppercase text-primary mb-4"
        >
          Studio de Estética & Pestanas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-foreground"
        >
          Luxury Aesthetic
          <br />
          <span className="text-gold-gradient italic">Experience</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="gold-separator w-24 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-elegant text-lg md:text-xl text-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Onde a beleza encontra a excelência. Técnicas avançadas, ambiente sofisticado
          e resultados que transformam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#servicos"
            className="px-10 py-4 bg-gold-gradient text-xs tracking-luxury uppercase text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Explorar Serviços
          </a>
          <a
            href="https://wa.me/+351931920081?text=Olá%20Bruna!%20Vim%20através%20do%20Site,%20e%20gostaria%20de%20Reservar%20um%20Horário!%20🤩💜"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-gold/30 text-xs tracking-luxury uppercase text-foreground hover:border-gold/60 hover:bg-gold/5 transition-all"
          >
            Reservar Agora
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-gold/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;