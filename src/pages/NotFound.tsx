import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-8xl md:text-9xl text-gold-gradient opacity-50"
        >
          404
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-2xl md:text-3xl text-white mb-6 uppercase tracking-widest">
            Página Não Encontrada
          </h2>
          <p className="font-body text-white/60 mb-10 max-w-md mx-auto">
            O conteúdo que procura foi movido ou não existe. 
            Permita-nos guiá-lo de volta à experiência exclusiva.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2A241E] border border-gold/30 text-white hover:bg-gold hover:text-black transition-all duration-500 rounded-full"
          >
            <ArrowLeft size={18} />
            <span>Voltar ao Início</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;