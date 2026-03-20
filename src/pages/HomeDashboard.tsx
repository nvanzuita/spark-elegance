import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Video, BookOpen, GraduationCap, ShieldCheck, Lock, Loader2, CheckCircle2 } from "lucide-react";
import { auth, db } from "../firebase"; // Importamos o 'db' para acessar o Firestore
import { updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importamos funções do Firestore

const HomeDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para o Modal de Segurança e Dados
  const [nomeReal, setNomeReal] = useState(""); 
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Lógica para buscar o nome no Firestore e verificar o primeiro login
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          // Buscamos o documento na coleção 'usuarios' usando o UID da aluna
          const docRef = doc(db, "usuarios", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setNomeReal(docSnap.data().nome);
          }
        } catch (err) {
          console.error("Erro ao buscar nome:", err);
        }
      }
    };

    fetchUserData();

    // Detecta se veio da página de Welcome pelo parâmetro na URL
    const params = new URLSearchParams(location.search);
    if (params.get("firstLogin") === "true") {
      setShowSecurityModal(true);
    }
  }, [location]);

  // Fallback: se o nome ainda não carregou do Firestore, usa o nickname
  const nomeExibicao = nomeReal || auth.currentUser?.email?.split('@')[0] || "Aluna";

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        setSuccess(true);
        
        // Sucesso: Limpa a URL e fecha o modal após 2 segundos
        setTimeout(() => {
          setShowSecurityModal(false);
          navigate("/area-aluna", { replace: true });
        }, 2000);
      }
    } catch (err: any) {
      setError("Sessão expirada. Por favor, faça login novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- Conteúdo Principal da Dashboard --- */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
        <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-3 block italic underline decoration-gold/20">
          Dashboard
        </span>
        <h2 className="font-display text-5xl md:text-6xl font-light text-white">
          Olá, <span className="text-gold italic">{nomeExibicao.split(' ')[0]}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button onClick={() => navigate("MentoriasAluna")} className="group relative bg-[#1E1A16]/60 backdrop-blur-sm border border-white/5 p-10 text-left hover:border-gold/30 transition-all">
          <Video className="text-gold mb-6 w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-display text-2xl uppercase mb-3 tracking-tighter text-white">Mentorias Online</h3>
          <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">Acesso completo a conteúdos práticos e mentorias gravadas.</p>
        </button>

        <button onClick={() => navigate("Materiais")} className="group relative bg-[#1E1A16]/60 backdrop-blur-sm border border-white/5 p-10 text-left hover:border-gold/30 transition-all">
          <BookOpen className="text-gold mb-6 w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-display text-2xl uppercase mb-3 tracking-tighter text-white">Aulas Teóricas</h3>
          <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">Material didático, apostilas e guias de suporte.</p>
        </button>
      </div>

      <div className="mt-12 p-10 bg-gold/90 flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="flex items-center gap-6">
          <div className="bg-black/10 p-4 rounded-full"><GraduationCap className="text-black w-6 h-6" /></div>
          <div>
            <h4 className="text-black font-display text-xl uppercase tracking-tight">Próxima Aula ao Vivo</h4>
            <p className="text-black/70 text-sm font-body font-medium">Segunda-feira, às 20:00h — Técnicas Avançadas</p>
          </div>
        </div>
        <button className="bg-black text-white px-10 py-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-[#2A2622] transition-colors shadow-2xl">
          Marcar na Agenda
        </button>
      </div>

      {/* --- Modal de Segurança (Efeito 90% escuro e Blur) --- */}
      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1A1612] border border-gold/30 p-10 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

              {!success ? (
                <>
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 border border-gold/20 text-gold">
                      <ShieldCheck size={32} />
                    </div>
                    <h4 className="font-display text-2xl text-white uppercase italic tracking-tighter">
                      Privacidade <span className="text-gold">Ativada</span>
                    </h4>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-2">
                      Olá {nomeExibicao.split(' ')[0]}, por segurança, <br /> personalize sua senha de acesso.
                    </p>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <div className="relative text-white">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 w-4 h-4" />
                      <input 
                        type="password" 
                        placeholder="DEFINIR NOVA SENHA"
                        className="w-full bg-black/40 border border-white/10 p-4 pl-12 text-sm outline-none focus:border-gold transition-all"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    {error && <p className="text-red-400 text-[9px] uppercase tracking-widest text-center">{error}</p>}

                    <button 
                      disabled={loading}
                      className="w-full bg-gold text-black py-4 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                    >
                      {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Confirmar e Aceder"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="text-green-500 w-16 h-16 mb-4 animate-bounce" />
                  <h4 className="text-white font-display text-xl uppercase italic">Senha Atualizada</h4>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Acesso liberado. Bem-vinda!</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeDashboard;