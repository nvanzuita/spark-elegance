import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Instagram, ChevronDown, ChevronRight, ChevronLeft, Settings,
  Loader2, User, Phone, Camera, Check, AlertCircle
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, onSnapshot, updateDoc, collection, getDocs } from "firebase/firestore";

const DashboardAluna = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados de Controle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({ perfil: true, cursos: true });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Estados dos Dados da Aluna
  const [userData, setUserData] = useState<any>({
    nome: "",
    instagram: "",
    whatsapp: "",
    foto: "",
    progresso: {}
  });

  const [totalAulasPorCurso, setTotalAulasPorCurso] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!auth.currentUser) return;

    // 1. Busca o total de aulas real de cada curso para o cálculo de progresso
    const fetchTotals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mentorias"));
        const counts: Record<string, number> = {};
        querySnapshot.forEach((doc) => {
          const curso = doc.data().cursoTitulo;
          if (curso) counts[curso] = (counts[curso] || 0) + 1;
        });
        setTotalAulasPorCurso(counts);
      } catch (error) {
        console.error("Erro ao buscar totais de aulas:", error);
      }
    };
    fetchTotals();

    // 2. Escuta em tempo real os dados da aluna
    const userRef = doc(db, "usuarios", auth.currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          ...data,
          email: auth.currentUser?.email,
          foto: data.foto || "https://res.cloudinary.com/demo/image/upload/v1631587645/sample.jpg" // Fallback
        });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Lógica de Upload para o Cloudinary
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portal_aluna"); // <--- SUBSTITUA PELO SEU PRESET DO CLOUDINARY
    formData.append("cloud_name", "dudnl5whz");     // <--- SUBSTITUA PELO SEU CLOUD NAME

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dudnl5whz/image/upload`, // <--- SUBSTITUA O CLOUD NAME AQUI TAMBÉM
        { method: "POST", body: formData }
      );
      const data = await response.json();
      
      if (data.secure_url) {
        setUserData({ ...userData, foto: data.secure_url });
      }
    } catch (error) {
      console.error("Erro no upload Cloudinary:", error);
      alert("Erro ao carregar imagem.");
    } finally {
      setUploading(false);
    }
  };

  const calcularPercentual = (cursoNome: string) => {
    const cursoProgresso = userData.progresso?.[cursoNome];
    if (!cursoProgresso) return 0;

    const aulasConcluidas = Object.values(cursoProgresso).filter((a: any) => a.concluido).length;
    const totalAulas = totalAulasPorCurso[cursoNome] || 1;
    
    return Math.min(Math.round((aulasConcluidas / totalAulas) * 100), 100);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const userRef = doc(db, "usuarios", auth.currentUser!.uid);
      await updateDoc(userRef, {
        nome: userData.nome,
        instagram: userData.instagram,
        whatsapp: userData.whatsapp,
        foto: userData.foto
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-screen bg-[#1A1612] flex items-center justify-center">
      <Loader2 className="text-gold animate-spin" size={32} />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#1A1612] text-white font-body flex overflow-hidden">
      
      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="border-b border-white/5 bg-[#1E1A16]/50 backdrop-blur-md px-10 py-6 sticky top-0 z-30 flex justify-between items-center">
          <div className="flex flex-col gap-1 cursor-pointer" onClick={() => navigate("/area-aluna")}>
            <span className="text-[10px] font-display text-white opacity-60 tracking-[0.4em] uppercase">Bruna Beauty</span>
            <span className="text-[14px] font-display text-gold tracking-[0.4em] uppercase font-bold">Academy</span>
          </div>
          <button onClick={() => auth.signOut()} className="text-white/30 hover:text-gold text-[9px] uppercase tracking-[0.3em] flex items-center gap-2 font-bold group">
            <LogOut className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Sair
          </button>
        </header>

        <main className="p-6 md:p-16 max-w-7xl mx-auto w-full mb-20">
          <Outlet /> 
        </main>
      </div>

      {/* --- SIDEBAR --- */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 350 : 80 }} 
        className="relative bg-[#1E1A16]/40 backdrop-blur-md border-l border-white/5 h-screen hidden lg:flex flex-col z-40"
      >
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/40 bg-[#1E1A16] flex items-center justify-center text-gold z-50"
        >
          {isSidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div className="relative py-10 flex flex-col items-center border-b border-white/5">
          <div className="relative group">
            <img src={userData.foto} className={`rounded-full object-cover border-2 border-gold/20 p-1 transition-all ${isSidebarOpen ? 'w-24 h-24' : 'w-12 h-12'}`} />
            {isSidebarOpen && (
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <Camera size={20} className="text-gold" />
              </button>
            )}
          </div>
          {isSidebarOpen && (
            <div className="text-center mt-6 px-8 w-full">
              <h4 className="font-display text-[20px] uppercase tracking-tight truncate">{userData.nome || "Aluna"}</h4>
              <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-bold block mt-1">Aluna Premium</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {isSidebarOpen && (
            <>
              <div>
                <button onClick={() => setOpenMenus({...openMenus, perfil: !openMenus.perfil})} className="w-full flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-6 hover:text-gold transition-colors">
                  Redes Sociais <ChevronDown className={`w-3 h-3 ${openMenus.perfil ? 'rotate-180' : ''}`} />
                </button>
                {openMenus.perfil && (
                  <div className="space-y-4 text-[11px] text-white/60">
                    <div className="flex items-center gap-4"><Instagram size={14} className="text-gold" /> {userData.instagram || "@instagram"}</div>
                    <button onClick={() => setIsEditModalOpen(true)} className="w-full flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.3em] text-black bg-gold py-3 mt-4 font-bold hover:bg-white transition-all">
                      <Settings size={12} /> Editar Perfil
                    </button>
                  </div>
                )}
              </div>

              <div>
                <button onClick={() => setOpenMenus({...openMenus, cursos: !openMenus.cursos})} className="w-full flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-6 hover:text-gold transition-colors">
                  Inscrições Ativas <ChevronDown className={`w-3 h-3 ${openMenus.cursos ? 'rotate-180' : ''}`} />
                </button>
                {openMenus.cursos && (
                  <div className="space-y-6">
                    {Object.keys(userData.progresso || {}).length > 0 ? (
                      Object.keys(userData.progresso).map((cursoNome) => {
                        const percent = calcularPercentual(cursoNome);
                        return (
                          <div key={cursoNome} className="space-y-3">
                            <div className="flex flex-col border-l-2 border-gold pl-4">
                              <span className="text-[10px] text-white font-display uppercase">{cursoNome}</span>
                              <span className="text-[8px] text-gold/60 uppercase font-bold">{percent}% Concluído</span>
                            </div>
                            <div className="h-[1.5px] w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} className="h-full bg-gold" />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-[9px] text-white/20 uppercase italic">Nenhum progresso registrado</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </motion.aside>

      {/* --- MODAL DE EDIÇÃO --- */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-full max-w-lg bg-[#1E1A16] border border-gold/30 p-10 shadow-2xl">
              
              <div className="flex justify-center mb-8">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <img src={userData.foto} className="w-24 h-24 rounded-full object-cover border-2 border-gold" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center group-hover:bg-black/60 transition-all">
                    {uploading ? <Loader2 className="animate-spin text-gold" /> : <Camera className="text-gold" />}
                  </div>
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} accept="image/*" />
                </div>
              </div>

              <h3 className="font-display text-2xl uppercase italic text-center mb-2">Configurações de <span className="text-gold">Perfil</span></h3>
              <p className="text-[9px] text-gold/60 uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-2">
                <AlertCircle size={10} /> O nome será usado para a emissão de certificados.
              </p>

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/40">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
                    <input type="text" value={userData.nome} onChange={(e) => setUserData({...userData, nome: e.target.value})} className="w-full bg-black/40 border border-white/5 p-4 pl-12 text-sm outline-none focus:border-gold" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Instagram</label>
                    <div className="relative">
                      <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
                      <input type="text" value={userData.instagram} onChange={(e) => setUserData({...userData, instagram: e.target.value})} className="w-full bg-black/40 border border-white/5 p-4 pl-12 text-sm outline-none focus:border-gold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
                      <input type="text" value={userData.whatsapp} onChange={(e) => setUserData({...userData, whatsapp: e.target.value})} className="w-full bg-black/40 border border-white/5 p-4 pl-12 text-sm outline-none focus:border-gold" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 border border-white/10 text-white/40 py-4 uppercase font-bold text-[10px] tracking-widest hover:bg-white/5">Sair</button>
                  <button type="submit" disabled={saving || uploading} className="flex-1 bg-gold text-black py-4 uppercase font-bold text-[10px] tracking-widest hover:bg-white disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                    {saving ? "Salvando..." : "Confirmar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardAluna;