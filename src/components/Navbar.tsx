import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Mentorias", href: "#mentorias" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contactos", href: "#contactos" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Throttling básico para performance
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#1A1612]/80 backdrop-blur-lg border-b border-gold/10 py-3 shadow-2xl" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
        <a href="#" className="group flex flex-col">
          <span className="font-display text-xl md:text-2xl tracking-[0.3em] text-white">
            BRUNA <span className="text-gold-gradient">BEAUTY</span>
          </span>
          <span className="text-[8px] tracking-[0.5em] uppercase text-gold/60 -mt-1 group-hover:text-gold transition-colors">
            Estética Avançada
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 border-r border-white/10 pr-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-body text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:width-full" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/+351931920081"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gold-gradient text-[10px] tracking-widest uppercase text-black font-bold hover:scale-105 transition-transform duration-300"
            >
              Reservar
            </a>
            <a
              href="https://www.fresha.com/..."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-gold/30 text-[10px] tracking-widest uppercase text-white hover:bg-gold/10 transition-all"
            >
              Booking Online
            </a>
          </div>
          <div className="flex items-center gap-6">

            {/* NOVO BOTÃO BRUNA BEAUTY ACADEMY COM EFEITO GLOW */}

            <a

              href="https://academy.brunabeauty.eu"

              target="_blank"

              rel="noopener noreferrer"

              className="relative group inline-flex items-center justify-center transition-all duration-300"

            >
              {/* Corpo do botão */}

              <div>

                <span className="px-6 py-2.5 bg-gold-gradient text-[10px] tracking-widest uppercase text-black font-bold hover:scale-105 transition-transform duration-300"
            >

                <span className="text-[10px] animate-pulse">Bruna Beauty Academy</span>
</span>
              </div>

            </a>

          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-gold p-2 hover:bg-gold/5 rounded-full transition-colors"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-[60px] h-screen bg-[#1A1612] z-40 md:hidden px-6 py-12"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="font-display text-3xl tracking-widest uppercase text-white border-b border-gold/10 pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="https://wa.me/..."
                className="mt-4 w-full py-5 bg-gold-gradient text-center text-black font-bold tracking-widest uppercase"
              >
                Agendar Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;