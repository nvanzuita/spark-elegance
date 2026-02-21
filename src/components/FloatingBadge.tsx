import { motion, AnimatePresence } from "framer-motion";
import { Ticket, ExternalLink, X } from "lucide-react";
import { useState } from "react";

const FloatingBadge = () => {
  // Esta linha cria a lógica de "mostrar ou esconder"
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
        >
          {/* BOTÃO PARA FECHAR (O "X") */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsVisible(false);
            }}
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '50%',
              padding: '6px',
              cursor: 'pointer',
              border: '1px solid #d4af37',
              zIndex: 10000
            }}
          >
            <X size={16} strokeWidth={3} />
          </button>

          {/* O BADGE DA RASTELLI */}
          <a
            href="https://rastelliportugal.com/?bg_ref=3BSrM40lRW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#2A241E]/95 backdrop-blur-lg border border-gold/30 p-3 pr-6 rounded-full shadow-2xl"
            style={{ textDecoration: 'none', display: 'flex' }}
          >
            <div className="flex items-center justify-center bg-white/5 w-14 h-14 rounded-full border border-gold/10 p-2 shrink-0">
              <img src="/rastelli.webp" alt="Logo" className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-col">
              <span className="text-white text-[10px] tracking-widest font-bold uppercase">Parceiro Rastelli</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Ticket size={14} className="text-gold" />
                <span className="text-[14px] font-bold text-white tracking-widest">BRUNA10</span>
                <span className="text-[12px] text-gold font-bold ml-1">-10%</span>
              </div>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingBadge;