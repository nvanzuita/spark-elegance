import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, MapPin, Mail, Instagram, Download, 
  ChevronDown, ChevronRight, ChevronLeft, Settings 
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const DashboardAluna = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({ perfil: true, cursos: true, certs: true });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [nomeReal, setNomeReal] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const docRef = doc(db, "usuarios", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNomeReal(docSnap.data().nome);
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const [userData] = useState({
    idade: "28 anos",
    email: auth.currentUser?.email || "aluna@email.com",
    instagram: "@bruna.beauty",
    endereco: "Lisboa, Portugal",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  });

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-[#1A1612] text-white font-body flex overflow-hidden">
      
      {/* BACKGROUND GLOBAL */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-gold/5 blur-[100px] rounded-full" />
      </div>

      {/* --- CONTEÚDO DINÂMICO --- */}
      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="border-b border-white/5 bg-[#1E1A16]/50 backdrop-blur-md px-10 py-6 sticky top-0 z-30 flex justify-between items-center">
          <div className="flex flex-col gap-1 cursor-pointer" onClick={() => navigate("/area-aluna")}>
            <span className="text-[10px] font-display text-white opacity-60 tracking-[0.4em] uppercase">Bruna Beauty</span>
            <span className="text-[14px] font-display text-gold tracking-[0.4em] uppercase font-bold">Academy</span>
          </div>

          <button onClick={handleLogout} className="text-white/30 hover:text-gold text-[9px] uppercase tracking-[0.3em] flex items-center gap-2 transition-colors font-bold group">
            <LogOut className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Sair
          </button>
        </header>

        <main className="p-6 md:p-16 max-w-7xl mx-auto w-full mb-20">
          <Outlet /> 
        </main>
      </div>

      {/* --- SIDEBAR RETRÁTIL --- */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 350 : 80 }}
        className="relative bg-[#1E1A16]/40 backdrop-blur-md border-l border-white/5 h-screen hidden lg:flex flex-col z-40"
      >
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -left-5 top-1/2 -translate-y-1/2 flex items-center justify-center z-50 group"
        >
          <div className="w-10 h-10 rounded-full border border-gold/40 bg-[#1E1A16] flex items-center justify-center text-gold group-hover:border-gold group-hover:scale-110 transition-all duration-300 shadow-2xl">
            {isSidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </div>
        </button>

        <div className="relative py-10 flex flex-col items-center border-b border-white/5 overflow-hidden z-10">
          <img 
            src={userData.foto} 
            alt="Perfil" 
            className={`rounded-full object-cover border-2 border-gold/20 p-1 transition-all duration-300 ${isSidebarOpen ? 'w-24 h-24' : 'w-12 h-12'}`} 
          />
          
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-4 whitespace-nowrap px-4 w-full">
                <h4 className="font-display text-[20px] uppercase tracking-tight truncate">
                  {nomeReal || "Aluna"}
                </h4>
                <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-bold block mt-1">Aluna Premium</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar z-10">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-6">
                
                {/* Perfil */}
                <div className="border-b border-white/5 pb-6">
                  <button onClick={() => setOpenMenus({...openMenus, perfil: !openMenus.perfil})} className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Perfil <ChevronDown className={`w-3 h-3 transition-transform ${openMenus.perfil ? 'rotate-180' : ''}`} />
                  </button>
                  {openMenus.perfil && (
                    <div className="space-y-3 px-1 text-[11px] text-white/60">
                      <div className="flex items-center gap-3"><MapPin size={12} className="text-gold" /> {userData.endereco}</div>
                      <div className="flex items-center gap-3"><Mail size={12} className="text-gold" /> {userData.email}</div>
                      <div className="flex items-center gap-3"><Instagram size={12} className="text-gold" /> {userData.instagram}</div>
                      <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-gold font-bold pt-4 hover:brightness-125 transition-all">
                        <Settings size={12} /> Editar Perfil
                      </button>
                    </div>
                  )}
                </div>

                {/* Cursos */}
                <div className="border-b border-white/5 pb-6">
                  <button onClick={() => setOpenMenus({...openMenus, cursos: !openMenus.cursos})} className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Meus Cursos <ChevronDown className={`w-3 h-3 transition-transform ${openMenus.cursos ? 'rotate-180' : ''}`} />
                  </button>
                  {openMenus.cursos && (
                    <div className="p-3 bg-black/20 text-[9px] uppercase tracking-widest border-l border-gold italic">
                      Masterclass Lash Lifting
                    </div>
                  )}
                </div>

                {/* Certificados */}
                <div className="pb-6">
                  <button onClick={() => setOpenMenus({...openMenus, certs: !openMenus.certs})} className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Certificados <ChevronDown className={`w-3 h-3 transition-transform ${openMenus.certs ? 'rotate-180' : ''}`} />
                  </button>
                  {openMenus.certs && (
                    <div className="flex items-center justify-between p-3 bg-black/20 group">
                      <span className="text-[9px] uppercase tracking-widest">Lash Pro 2024</span>
                      <Download size={14} className="text-gold cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* MODAL EDITAR PERFIL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)} />
            <motion.div className="relative w-full max-w-lg bg-[#1E1A16] border border-gold/20 p-8 shadow-2xl">
              <h3 className="font-display text-2xl uppercase italic mb-6">Editar <span className="text-gold">Dados</span></h3>
              <p className="text-xs text-white/40 mb-6 font-body">Funcionalidade de edição em breve.</p>
              <button onClick={() => setIsEditModalOpen(false)} className="bg-gold text-black w-full py-4 uppercase font-bold text-[10px] tracking-widest">Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardAluna;