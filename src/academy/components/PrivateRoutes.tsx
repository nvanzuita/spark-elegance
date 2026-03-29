import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importando o contexto real

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  // 1. Enquanto o Firebase checa se existe sessão, mostramos uma tela de espera
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#1A1612] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           {/* Um loading simples com as cores da sua marca */}
           <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
           <span className="text-gold text-[10px] uppercase tracking-[0.4em] animate-pulse">
             Verificando Acesso...
           </span>
        </div>
      </div>
    );
  }

  // 2. Se o Firebase confirmou que NÃO tem usuário, manda para o Login
  // 3. Se TEM usuário, libera o Outlet (as páginas internas)
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;