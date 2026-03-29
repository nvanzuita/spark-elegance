import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./academy/pages/Login";
import DashboardAluna from "./academy/pages/DashboardAluna";
import VideoPlayer from "./academy/pages/VideoPlayer";
import PrivateRoutes from "./academy/components/PrivateRoutes"; 
import HomeDashboard from "./academy/pages/HomeDashboard";
import MentoriasAluna from "./academy/components/MentoriasAluna";
import Materiais from "./academy/components/Materiais";
import Welcome from "./academy/pages/Welcome";
import Admin from "./academy/pages/Admin";

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop /> 
          <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {/* --- Rotas Protegidas (Só acessa se estiver logada) --- */}
            <Route element={<PrivateRoutes />}>
             <Route path="/admin" element={<Admin />} />
              {/* Rota do Vídeo de Boas-vindas */}
              <Route path="/boas-vinda" element={<Welcome />} />

              {/* Layout da Área da Aluna e suas Sub-rotas */}
              <Route path="/area-aluna" element={<DashboardAluna />}>
                <Route index element={<HomeDashboard />} />
                <Route path="Materiais" element={<Materiais />} />
                <Route path="MentoriasAluna" element={<MentoriasAluna />} />
                <Route path="video/:id" element={<VideoPlayer />} />
              </Route>

            </Route>

            {/* Rota de Erro */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;