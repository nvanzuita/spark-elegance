import { Globe } from "lucide-react";
import { LANGS } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";

interface LanguageSwitcherProps {
  large?: boolean;
  className?: string;
}

const LanguageSwitcher = ({ large = false, className = "" }: LanguageSwitcherProps) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center gap-1 ${className}`}>
      <Globe size={large ? 18 : 14} className="text-gold/70 mr-1" aria-hidden="true" />
      {LANGS.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          title={name}
          lang={code}
          className={`font-bold uppercase transition-colors ${
            large ? "px-3 py-2 text-xs tracking-[0.2em]" : "px-1.5 py-1 text-[10px] tracking-[0.2em]"
          } ${lang === code ? "text-gold" : "text-white/50 hover:text-white"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
