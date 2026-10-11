import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { Dict, Lang, LANGS, translations } from "./translations";

const STORAGE_KEY = "bb-lang";

const isLang = (value: unknown): value is Lang => LANGS.some((l) => l.code === value);

// Ordem de decisão: 1) escolha guardada do visitante, 2) idioma do navegador, 3) inglês para os restantes países.
const detectInitialLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // localStorage indisponível (modo privado, etc.): segue para a deteção automática
  }
  const browser = (navigator.languages?.[0] || navigator.language || "pt").slice(0, 2).toLowerCase();
  return isLang(browser) ? browser : "en";
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // sem persistência; a escolha vale apenas para esta visita
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage deve ser usado dentro de <LanguageProvider>");
  return ctx;
};
