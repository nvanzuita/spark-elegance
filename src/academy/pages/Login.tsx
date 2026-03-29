import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Mail, X, Loader2, ShieldAlert, CheckCircle2 } from "lucide-react";
import { auth, db } from "../firebase"; 
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updatePassword 
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [step, setStep] = useState<"login" | "reset">("login");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const ADMIN_EMAIL = "academy@brunabeauty.eu";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Completa o e-mail internamente
    let emailFinal = username.includes("@") 
      ? username.toLowerCase().trim() 
      : `${username.toLowerCase().trim()}@brunabeauty.eu`;

    try {
      // 1. Tenta o login direto
      const userCredential = await signInWithEmailAndPassword(auth, emailFinal, password);
      const user = userCredential.user;

      if (user.email === ADMIN_EMAIL) {
        navigate("/admin");
      } else {
        // Aluna já autenticada vai para boas-vinda (o dashboard cuidará do modal de senha se necessário)
        navigate("/boas-vinda");
      }

    } catch (err: any) {
      // 2. Se falhar, tentamos o Auto-Registro pelo Firestore
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        try {
          const docRef = doc(db, "usuarios", emailFinal);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            
            if (data.senhaProvisoria === password) {
              // 3. CRIAÇÃO NO AUTHENTICATION + VÍNCULO DE UID
              const newCred = await createUserWithEmailAndPassword(auth, emailFinal, password);
              
              // Salva o UID oficial no documento (Cura o Loading Eterno)
              await updateDoc(docRef, {
                uidOficial: newCred.user.uid,
                status: "ativo"
              });

              // Sucesso: Manda para Boas Vindas
              navigate("/boas-vinda");
              return;
            }
          }
        } catch (fsErr) {
          console.error("Erro Firestore:", fsErr);
        }
      }
      
      setError("Acesso negado. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        const email = auth.currentUser.email;
        if (email) {
          await updateDoc(doc(db, "usuarios", email), {
            status: "ativo",
            senhaProvisoria: "" // Reseta a senha provisória para evitar reuso
          });
        }
        navigate("/area-aluna");
      }
    } catch (err: any) {
      setError("Sua sessão expirou. Faça login novamente.");
      setStep("login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1A1612] flex flex-col items-center justify-center font-body overflow-hidden text-white">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <nav className="absolute top-0 w-full z-50 px-6 md:px-20 py-4 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-col">
            <span className="font-display tracking-[0.3em] text-sm uppercase">Bruna Beauty</span>
            <span className="font-display text-gold tracking-[0.4em] text-sm uppercase text-center">Academy</span>
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={() => navigate("/")} className="text-[10px] uppercase tracking-widest text-white/70 hover:text-gold transition-colors flex items-center gap-2">
           <ChevronLeft className="w-4 h-4" /> Voltar
          </button>
          <button onClick={() => setIsHelpOpen(true)} className="text-[10px] uppercase tracking-widest text-white/70 hover:text-gold transition-colors flex items-center gap-2">
            <Mail className="w-3 h-3" /> Suporte
          </button>
        </div>
      </nav>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-md w-full mx-6">
        <div className="bg-white/[0.03] backdrop-blur-[20px] border border-white/10 p-8 md:p-10 shadow-2xl rounded-sm">
          
          <AnimatePresence mode="wait">
            {step === "login" ? (
              <motion.div key="login-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl mb-2 uppercase tracking-tighter">Portal da <span className="text-gold">Aluna</span></h2>
                  <div className="w-12 h-[1px] bg-gold mx-auto" />
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-3 block italic">Utilizador</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/5 p-4 text-sm outline-none focus:border-gold/50 transition-all italic tracking-widest"
                      placeholder="seu.nome"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-3 block italic">Palavra-passe</label>
                    <input 
                      type="password" 
                      className="w-full bg-black/40 border border-white/5 p-4 text-sm outline-none focus:border-gold/50 transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-[10px] flex items-center gap-2 uppercase tracking-widest bg-red-400/10 p-3 border border-red-400/20">
                      <ShieldAlert size={14}/> {error}
                    </div>
                  )}

                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-gold text-black py-4 font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : "Aceder ao Portal"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="reset-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-center mb-10">
                  <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                    <CheckCircle2 className="text-green-500" size={24} />
                  </div>
                  <h2 className="font-display text-3xl mb-2 uppercase tracking-tighter text-gold italic">Primeiro Acesso</h2>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Para sua segurança, defina uma senha pessoal</p>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-3 block italic">Nova Palavra-passe</label>
                    <input 
                      type="password" 
                      className="w-full bg-black/40 border border-gold/30 p-4 text-sm outline-none focus:border-gold transition-all"
                      placeholder="Mínimo 6 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-white text-black py-4 font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-gold transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : "Definir Senha e Entrar"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <footer className="absolute bottom-8 w-full text-center z-10 opacity-30">
        <p className="text-[9px] uppercase tracking-[0.4em]">© 2026 Bruna Beauty Academy</p>
      </footer>

      {/* Modal Suporte */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHelpOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#1E1A16] border border-gold/20 p-8 w-full max-w-lg">
              <button onClick={() => setIsHelpOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              <h3 className="font-display text-2xl text-white mb-6 uppercase italic">Suporte <span className="text-gold">Academy</span></h3>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">Se esqueceu suas credenciais ou está com dificuldades no primeiro acesso, contacte nossa equipa técnica pelo e-mail ou WhatsApp de suporte.</p>
              <button className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all font-bold">Enviar E-mail</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;