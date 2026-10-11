import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, RASTELLI_COUPON, RASTELLI_URL } from "@/lib/siteConfig";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl tracking-luxury mb-2">
            BRUNA <span className="text-gold-gradient">BEAUTY</span>
          </h3>
          <p className="font-elegant text-lg text-muted-foreground italic">Luxury Aesthetic Experience</p>
        </div>

        <div className="gold-separator w-32 mx-auto mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-body text-xs tracking-wider">{INSTAGRAM_HANDLE}</span>
            </a>
          </div>

          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} Bruna Beauty. {t.footer.rights}
          </p>
        </div>

        {/* Rastelli Partnership */}
        <div className="mt-10 pt-8 border-t border-border text-center">
          <a
            href={RASTELLI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
          >
            {t.footer.partnerBefore} <span className="text-primary font-medium">{RASTELLI_COUPON}</span> {t.footer.partnerAfter}
          </a>
        </div>

        {/* Legal */}
        <div className="mt-6 text-center">
          <Link
            to="/politica-de-privacidade"
            className="font-body text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider underline underline-offset-4"
          >
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
