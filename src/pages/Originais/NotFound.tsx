import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-6 text-center">
      <Helmet>
        <title>404 | Página não encontrada — Bruna Beauty</title>
      </Helmet>

      {/* Elemento Decorativo de Fundo (Blur suave) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary mb-6 block font-bold"
        >
          Erro 404 — Not Found
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-[#1A1612] leading-[1.1]"
        >
          Beleza em <br />
          <span className="text-gold-gradient">Construção</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-body text-base md:text-lg text-[#1A1612]/60 mb-12 max-w-md mx-auto leading-relaxed"
        >
          A página que procura não existe ou foi movida. 
          Permita-nos guiar o seu olhar de volta à excelência.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Botão Dourado Original */}
          <a
            href="/"
            className="px-12 py-4 bg-gold-gradient text-black text-[10px] tracking-luxury uppercase font-bold hover:scale-105 transition-transform shadow-xl"
          >
            Voltar ao Início
          </a>

          <a
            href="https://wa.me/+351931920081"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-4 border border-gold/30 text-[10px] tracking-luxury uppercase text-[#1A1612] hover:bg-gold/5 transition-all"
          >
            Suporte via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;