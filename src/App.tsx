import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
import { CookieConsentProvider } from "./hooks/useCookieConsent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
    <CookieConsentProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<Index />} />
            <Route path="/politica-de-privacidade" element={<Privacy />} />
            {/* Rota de Erro */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </CookieConsentProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;