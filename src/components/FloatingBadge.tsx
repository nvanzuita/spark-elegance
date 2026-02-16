import { motion } from "framer-motion";
import { Ticket, ExternalLink } from "lucide-react";

const FloatingBadge = () => {
  return (
    <motion.a
      href="https://rastelliportugal.com/?bg_ref=3BSrM40lRW" // Link oficial da parceria
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      whileHover={{ y: -5 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#4A423B]/95 backdrop-blur-md border border-gold/30 p-3 pr-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] group transition-all"
    >
      {/* Container do Logo */}
      <div className="flex items-center justify-center bg-white/5 w-16 h-16 rounded-full border border-gold/10 p-2 overflow-hidden">
        <img 
          src="./rastelli.webp" // Adicione o logo aqui
          alt="Rastelli Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Informações do Cupom */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-display text-white text-xs tracking-widest font-bold">PARCEIRO RASTELLI</span>
          <ExternalLink size={10} className="text-gold/50 group-hover:text-gold transition-colors" />
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Ticket size={12} className="text-gold" />
          <span className="font-body text-[14px] font-bold text-white tracking-wider ml-2">BRUNA10</span>
          <span className="text-[12px] text-white/90 ml-2">-10%</span>
        </div>
      </div>

      {/* Efeito de hover na borda */}
      <div className="absolute inset-0 rounded-full border border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
    </motion.a>
  );
};

export default FloatingBadge;