import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { ACADEMY_URL, FRESHA_URL, whatsappLink } from "@/lib/siteConfig";

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.services, href: "#servicos" },
    { label: t.nav.mentorias, href: "#mentorias" },
    { label: t.nav.about, href: "#sobre" },
    { label: t.nav.contacts, href: "#contactos" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia o scroll da página enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const academyIcon = (
    <a
      href={ACADEMY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.nav.academy}
      title={t.nav.academy}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black transition-colors duration-300"
    >
      <GraduationCap size={18} />
    </a>
  );

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-500 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      {/*
        O fundo com blur fica num elemento à parte: se o blur/transform estivesse na própria <nav>,
        o menu mobile (position: fixed) passaria a posicionar-se em relação à barra e não ao ecrã.
      */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-all duration-500 ${
          isScrolled ? "bg-[#1A1612]/80 backdrop-blur-lg border-b border-gold/10 shadow-2xl" : "bg-transparent"
        }`}
      />

      <div className="relative z-50 container mx-auto flex items-center justify-between px-6 lg:px-12">
        <a href="/" className="group flex flex-col">
          <span className="font-display text-xl md:text-2xl tracking-[0.3em] text-white">
            BRUNA <span className="text-gold-gradient">BEAUTY</span>
          </span>
          <span className="text-[8px] tracking-[0.5em] uppercase text-gold/60 -mt-1 group-hover:text-gold transition-colors">
            {t.nav.tagline}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-8 border-r border-white/10 pr-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-body text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gold-gradient text-[10px] tracking-widest uppercase text-black font-bold hover:scale-105 transition-transform duration-300"
            >
              {t.nav.book}
            </a>
            <a
              href={FRESHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-gold/30 text-[10px] tracking-widest uppercase text-white hover:bg-gold/10 transition-all"
            >
              {t.nav.onlineBooking}
            </a>
            {academyIcon}
          </div>

          <LanguageSwitcher className="pl-2 border-l border-white/10" />
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={isMobileOpen}
          className="lg:hidden text-gold p-2 hover:bg-gold/5 rounded-full transition-colors"
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
            className="fixed inset-0 z-40 lg:hidden bg-[#1A1612] px-6 pt-28 pb-10 overflow-y-auto"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="font-display text-3xl tracking-widest uppercase text-white border-b border-gold/10 pb-4"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="flex flex-col gap-4 mt-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-gold-gradient text-center text-black font-bold tracking-widest uppercase"
                >
                  {t.nav.bookNow}
                </a>
                <a
                  href={FRESHA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 border border-gold/30 text-center text-white font-bold tracking-widest uppercase"
                >
                  {t.nav.onlineBooking}
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                {academyIcon}
                <LanguageSwitcher large />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
