import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

// Guarda a escolha de cookies do visitante. "essential" recusa scripts de
// terceiros (ex.: Elfsight); "all" aceita. Enquanto não houver escolha, é null.
export type ConsentStatus = "all" | "essential" | null;

const STORAGE_KEY = "bb-cookie-consent";

const readStored = (): ConsentStatus => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "all" || value === "essential" ? value : null;
  } catch {
    // localStorage indisponível: assume apenas essenciais (não carrega terceiros)
    return null;
  }
};

interface CookieConsentValue {
  consent: ConsentStatus;
  hasDecided: boolean;
  hasAnalyticsConsent: boolean;
  acceptAll: () => void;
  essentialOnly: () => void;
}

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

// O consentimento vive num Context partilhado: assim, quando o visitante
// escolhe no banner, toda a app (ex.: secção de Avaliações) reage de imediato.
export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentStatus>(readStored);

  const decide = useCallback((choice: Exclude<ConsentStatus, null>) => {
    setConsent(choice);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // sem persistência; a escolha vale só para esta visita
    }
  }, []);

  // Mantém abas diferentes do mesmo site sincronizadas.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setConsent(readStored());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<CookieConsentValue>(
    () => ({
      consent,
      hasDecided: consent !== null,
      hasAnalyticsConsent: consent === "all",
      acceptAll: () => decide("all"),
      essentialOnly: () => decide("essential"),
    }),
    [consent, decide]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent deve ser usado dentro de <CookieConsentProvider>");
  return ctx;
};

