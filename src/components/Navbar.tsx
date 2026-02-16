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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-dark border-b border-gold/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
        <a href="#" className="font-display text-xl md:text-2xl tracking-luxury text-foreground">
          BRUNA <span className="text-gold-gradient">BEAUTY</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-xs tracking-luxury uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/+351931920081?text=Olá%20Bruna!%20Vim%20através%20do%20Site,%20e%20gostaria%20de%20Reservar%20um%20Horário!%20🤩💜"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-6 py-2.5 bg-gold-gradient text-xs tracking-luxury uppercase text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Reservar
          </a>
          <a
            href="https://www.fresha.com/pt/a/studio-bruna-beauty-parede-cascais-rua-latino-coelho-j2dtyrog/booking?allOffer"
            target="_blank"
            rel="noopener noreferrer"
            className="ml4 px-6 py-2.5 border border-gold/30 text-xs tracking-luxury uppercase text-foreground hover:border-gold/60 hover:bg-gold/5 transition-all text-center"
          >
            Reservar Online
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="font-body text-sm tracking-luxury uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/+351931920081?text=Olá%20Bruna!%20Vim%20através%20do%20Site,%20e%20gostaria%20de%20Reservar%20um%20Horário!%20🤩💜"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gold-gradient text-xs tracking-luxury uppercase text-primary-foreground font-medium"
              >
                Reservar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
