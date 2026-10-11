import { motion, AnimatePresence } from "framer-motion";
import { Ticket, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { RASTELLI_COUPON, RASTELLI_URL } from "@/lib/siteConfig";

const FloatingBadge = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-6 right-6 z-[9999] flex items-center"
        >
          {/* BOTÃO FECHAR - Estilo Minimalista */}
          <button
            type="button"
            aria-label={t.badge.close}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute -top-2 -left-2 z-[10000] bg-[#1A1612] text-gold border border-gold/30 p-1 rounded-full hover:bg-gold hover:text-black transition-colors duration-300 shadow-xl"
            title={t.badge.close}
          >
            <X size={14} strokeWidth={3} />
          </button>

          {/* O BADGE */}
          <motion.a
            href={RASTELLI_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="group relative flex items-center gap-4 bg-[#2A241E]/90 backdrop-blur-md border border-gold/20 p-2 pr-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-gold/50 transition-all duration-500"
          >
            {/* Logo Wrapper */}
            <div className="relative flex items-center justify-center bg-[#2A241E]/90 w-14 h-14 rounded-full border border-gold/20 p-2 shrink-0 overflow-hidden">
              <img
                src="/rastelli.webp"
                alt="Rastelli Logo"
                width={56}
                height={56}
                loading="eager"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <span className="text-[9px] tracking-[0.2em] font-bold uppercase text-gold/80">
                {t.badge.official}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                  <Ticket size={12} className="text-gold" />
                  <span className="text-[13px] font-black text-white tracking-tighter">
                    {RASTELLI_COUPON}
                  </span>
                </div>
                <motion.span 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-[11px] text-gold font-bold"
                >
                  {t.badge.off}
                </motion.span>
              </div>
            </div>

            {/* Brilho interno ao passar o rato */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingBadge;