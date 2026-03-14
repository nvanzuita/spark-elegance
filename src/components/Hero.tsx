import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#1A1612]">
      {/* Background Video Container - REMOVIDO PARALLAX PARA PERFORMANCE */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Removi os parâmetros auto e quality do Cloudinary para testar a entrega direta se o vídeo já estiver otimizado */}
          <source src="https://res.cloudinary.com/dudnl5whz/video/upload/v1773509327/background_xzpxyl.webm" type="video/webm" />
        </video>
        
        {/* Overlay PRO: Removido o BACKDROP-BLUR que é o maior vilão da performance */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1612]/70 via-[#1A1612]/50 to-[#1A1612] z-[1]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo Animation - Simplificada */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-10"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto flex items-center justify-center">
            {/* Glow Aura - Mantida, mas sem o blur-3xl exagerado */}
            <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full" />
            <div className="relative w-full h-full rounded-full border border-gold/20 p-6 flex items-center justify-center bg-black/20">
              <img 
                src="/simbolo1.PNG" 
                alt="Logo Bruna Beauty" 
                className="w-full h-full object-contain brightness-110"
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-body text-[10px] md:text-xs uppercase text-gold mb-6 font-bold tracking-[0.4em]"
        >
          Studio de Estética & Pestanas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-[1.1] text-white"
        >
          Luxury Aesthetic
          <br />
          <span className="text-gold-gradient">Experience</span> {/* Removido o italic conforme pedido anteriormente */}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-24 h-[1px] bg-gold/50 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-body text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Onde a beleza encontra a excelência. Técnicas avançadas e ambiente sofisticado para resultados que transformam.
        </motion.p>

        {/* BOTOES RECUPERADOS: Dourado Sólido e Texto Preto (O que você gostava) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <a
            href="#servicos"
            className="px-12 py-4 bg-gold-gradient text-[10px] tracking-[0.3em] uppercase text-black font-bold hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            Explorar Serviços
          </a>
          
          <a
            href="https://wa.me/+351931920081"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-4 border border-gold/30 text-[10px] tracking-[0.3em] uppercase text-white hover:bg-gold/10 transition-all duration-300"
          >
            Reservar Agora
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator - Mantido, é leve */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[8px] uppercase tracking-[0.4em] text-gold/50 font-bold">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;