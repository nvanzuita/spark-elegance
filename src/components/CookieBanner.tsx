import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCookieConsent } from "@/hooks/useCookieConsent";

// Banner de consentimento de cookies (RGPD/GDPR). Só aparece enquanto o
// visitante não tiver feito uma escolha, e liga-se ao visual escuro do site.
const CookieBanner = () => {
  const { t } = useLanguage();
  const { hasDecided, acceptAll, essentialOnly } = useCookieConsent();

  return (
    <AnimatePresence>
      {!hasDecided && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={t.cookies.title}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-sm border border-gold/20 bg-[#1A1612]/95 backdrop-blur-md p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:p-6">
              <div className="flex items-start gap-3">
                <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-display text-base text-white mb-1">{t.cookies.title}</p>
                  <p className="font-body text-xs leading-relaxed text-white/60 max-w-2xl">
                    {t.cookies.message}{" "}
                    <Link
                      to="/politica-de-privacidade"
                      className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors"
                    >
                      {t.cookies.policyLink}
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={essentialOnly}
                  className="flex-1 md:flex-none px-5 py-2.5 border border-gold/30 text-[10px] tracking-luxury uppercase text-white/80 hover:border-gold/60 hover:text-white transition-all"
                >
                  {t.cookies.essentialOnly}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-gold-gradient text-[10px] tracking-luxury uppercase text-black font-bold hover:opacity-90 transition-opacity"
                >
                  {t.cookies.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
