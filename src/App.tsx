import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DashboardAluna from "./pages/DashboardAluna";
import VideoPlayer from "./pages/VideoPlayer";
import PrivateRoutes from "./components/PrivateRoutes"; 
import HomeDashboard from "./pages/HomeDashboard";
import MentoriasAluna from "./components/MentoriasAluna";
import Materiais from "./components/Materiais";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";

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