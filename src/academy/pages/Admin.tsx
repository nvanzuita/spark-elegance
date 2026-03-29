import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, BookOpen, FileText, 
  Video, LogOut, Trash2, Loader2, 
  ShieldCheck, ShieldAlert, Search, Check, Settings, PlusCircle, Camera, Eye
} from "lucide-react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { 
  collection, addDoc, query, doc, updateDoc, deleteDoc,
  orderBy, serverTimestamp, onSnapshot, arrayUnion, arrayRemove
} from "firebase/firestore";

// Componentes Externos
import GerenciarAlunas from "../components/GerenciarAlunas";

// --- TIPAGEM ---
interface Pergunta {
  pergunta: string;
  opcoes: string[];
  correta: number;
}

interface ItemGrade {
  id: string;
  titulo: string;
  tipo: "video" | "quiz";
  url?: string;
  questoes?: Pergunta[];
  ordem: number;
}

const Admin = () => {
  // --- CONFIGURAÇÕES CLOUDINARY ---
  const CLOUD_NAME = "dudnl5whz";
  const UPLOAD_PRESET = "portal_aluna";

  // --- ESTADOS DE INTERFACE ---
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<any[]>([]);

  // --- ESTADO DO PERFIL ADMIN ---
  const [adminData, setAdminData] = useState({
    nome: "", foto: "", pais: "", ddi: "", whatsapp: "", email: ""
  });

  // --- ESTADOS DE DADOS ---
  const [alunas, setAlunas] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [materiais, setMateriais] = useState<any[]>([]);
  const [mentorias, setMentorias] = useState<any[]>([]);
  const [selectedAluna, setSelectedAluna] = useState<any | null>(null);

  // --- ESTADOS PARA CRIAÇÃO DE CURSO ---
  const [cursoNome, setCursoNome] = useState("");
  const [cursoThumb, setCursoThumb] = useState("");
  const [aulasLista, setAulasLista] = useState<ItemGrade[]>([]);
  const [tipoConteudo, setTipoConteudo] = useState<"video" | "quiz">("video");
  const [tempTitulo, setTempTitulo] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [quizPerguntas, setQuizPerguntas] = useState<Pergunta[]>([]);
  const [novaPergunta, setNovaPergunta] = useState("");
  const [opcoes, setOpcoes] = useState(["", "", "", ""]);
  const [indexCorreta, setIndexCorreta] = useState(0);

  // --- ESTADOS PARA MATERIAIS ---
  const [materialForm, setMaterialForm] = useState({
    nome: "", tipo: "link" as "link" | "upload", url: "", categoria: "Apostilas"
  });

  // --- LÓGICA DE UPLOAD REUTILIZÁVEL ---
  const uploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      return data.secure_url || null;
    } catch (error) {
      console.error("Erro Cloudinary:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // 1. Carregar Países
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,idd,cca2,flag")
      .then(res => res.json())
      .then(data => {
        setCountries(data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common)));
      });
  }, []);

  // 2. Listeners Firebase
  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubAlunas = onSnapshot(collection(db, "usuarios"), (snap) => setAlunas(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubCursos = onSnapshot(collection(db, "cursos"), (snap) => setCursos(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubMat = onSnapshot(query(collection(db, "materiais"), orderBy("createdAt", "desc")), (snap) => setMateriais(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubMent = onSnapshot(query(collection(db, "mentorias"), orderBy("createdAt", "desc")), (snap) => setMentorias(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubAdmin = onSnapshot(doc(db, "usuarios", auth.currentUser.uid), (ds) => {
      if (ds.exists()) { setAdminData(ds.data() as any); setLoading(false); }
    });

    return () => { unsubAlunas(); unsubCursos(); unsubMat(); unsubMent(); unsubAdmin(); };
  }, []);

  // --- AÇÕES ---
  const handleLogout = () => signOut(auth);

  const handleAdminUpdate = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    await updateDoc(doc(db, "usuarios", auth.currentUser.uid), adminData);
    setLoading(false);
    alert("Perfil atualizado!");
  };

  const handleSaveMaterial = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    let finalUrl = materialForm.url;

    if (materialForm.tipo === "upload" && e?.target.files?.[0]) {
      const uploadedUrl = await uploadFile(e.target.files[0]);
      if (uploadedUrl) finalUrl = uploadedUrl;
    }

    if (!materialForm.nome || !finalUrl) return alert("Preencha o nome e o arquivo/link.");

    await addDoc(collection(db, "materiais"), {
      nome: materialForm.nome,
      tipo: materialForm.tipo,
      url: finalUrl,
      categoria: materialForm.categoria,
      createdAt: serverTimestamp()
    });

    setMaterialForm({ nome: "", tipo: "link", url: "", categoria: "Apostilas" });
    alert("Material cadastrado!");
  };

  const adicionarPerguntaAoFila = () => {
    if (!novaPergunta || opcoes.some(o => o === "")) return alert("Preencha a pergunta e todas as opções.");
    setQuizPerguntas([...quizPerguntas, { pergunta: novaPergunta, opcoes: [...opcoes], correta: indexCorreta }]);
    setNovaPergunta("");
    setOpcoes(["", "", "", ""]);
  };

  const incluirNaGrade = () => {
    if (!tempTitulo) return alert("Insira o título.");
    const novoItem: ItemGrade = {
      id: Date.now().toString(),
      titulo: tempTitulo,
      tipo: tipoConteudo,
      url: tipoConteudo === "video" ? tempUrl : "",
      questoes: tipoConteudo === "quiz" ? quizPerguntas : [],
      ordem: aulasLista.length + 1
    };
    setAulasLista([...aulasLista, novoItem]);
    setTempTitulo(""); setTempUrl(""); setQuizPerguntas([]);
  };

  const salvarCursoCompleto = async () => {
    setLoading(true);
    try {
      const cursoRef = await addDoc(collection(db, "cursos"), { 
        nome: cursoNome, thumbnail: cursoThumb, createdAt: serverTimestamp() 
      });
      for (const aula of aulasLista) {
        await addDoc(collection(db, "aulas"), { ...aula, cursoId: cursoRef.id });
      }
      setAulasLista([]); setCursoNome(""); setCursoThumb(""); setActiveSection("dashboard");
      alert("Curso publicado!");
    } catch (e) { alert("Erro ao salvar."); } finally { setLoading(false); }
  };

  const toggleAcesso = async (alunaId: string, itemId: string, jaTemAcesso: boolean) => {
    await updateDoc(doc(db, "usuarios", alunaId), { 
      acessos: jaTemAcesso ? arrayRemove(itemId) : arrayUnion(itemId) 
    });
  };

  if (loading) return <div className="h-screen bg-[#0F0D0B] flex items-center justify-center"><Loader2 className="animate-spin text-gold" /></div>;

  return (
    <div className="min-h-screen bg-[#0F0D0B] text-white font-body flex overflow-hidden">
      
      {/* SIDEBAR */}
      <motion.aside animate={{ width: isSidebarOpen ? 260 : 80 }} className="bg-[#161310] border-r border-white/5 flex flex-col z-50">
        <div className="p-8 mb-4 flex items-center justify-between cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-display text-gold tracking-[0.4em] uppercase">Bruna Beauty</span>
            {isSidebarOpen && <span className="text-[12px] font-display text-white tracking-[0.4em] uppercase font-bold">Academy</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "alunas", label: "Alunas & Contas", icon: Users },
            { id: "cursos", label: "Cursos", icon: BookOpen },
            { id: "materiais", label: "Materiais", icon: FileText },
            { id: "mentorias", label: "Lives / Encontros", icon: Video },
            { id: "config", label: "Meu Perfil", icon: Settings },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all ${activeSection === item.id ? "bg-gold text-black font-bold" : "text-white/40 hover:bg-white/5"}`}>
              <item.icon size={18} />
              {isSidebarOpen && <span className="text-[10px] uppercase tracking-widest">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-4 text-white/20 hover:text-red-400">
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-[10px] uppercase tracking-widest font-bold">Sair</span>}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 h-screen overflow-y-auto bg-[#0F0D0B]">
        <header className="h-20 border-b border-white/5 bg-[#161310]/80 backdrop-blur-xl px-10 flex justify-between items-center sticky top-0 z-40">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 italic font-display">
            Gestão / <span className="text-gold font-bold not-italic">{activeSection}</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-bold uppercase tracking-widest">{adminData.nome || "Administradora"}</p>
              <p className="text-[8px] text-white/30 uppercase tracking-widest">{adminData.pais || "Acesso Global"}</p>
            </div>
            <img src={adminData.foto || "https://via.placeholder.com/150"} className="w-10 h-10 rounded-full border border-gold/30 object-cover" alt="Perfil" />
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          
          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in">
              {[
                { label: "Total de Alunas", val: alunas.length, icon: Users },
                { label: "Cursos Ativos", val: cursos.length, icon: BookOpen },
                { label: "Materiais", val: materiais.length, icon: FileText },
                { label: "Lives / Encontros", val: mentorias.length, icon: Video },
              ].map((stat, i) => (
                <div key={i} className="bg-[#161310] border border-white/5 p-6 group hover:border-gold/20 transition-all">
                  <stat.icon className="w-5 h-5 text-gold/40 mb-4 group-hover:text-gold" />
                  <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-display italic text-white">{stat.val}</h3>
                </div>
              ))}
            </div>
          )}

          {/* MEU PERFIL */}
          {activeSection === "config" && (
            <div className="max-w-4xl bg-[#161310] border border-white/5 p-12 animate-in fade-in">
              <h3 className="font-display text-3xl uppercase italic mb-12 text-gold">Configurações Master</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative group cursor-pointer">
                    <div className="w-40 h-40 rounded-full border-2 border-gold/30 overflow-hidden bg-black/40">
                      <img src={adminData.foto || "https://via.placeholder.com/150"} className="w-full h-full object-cover transition-opacity group-hover:opacity-40" alt="Admin" />
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Camera size={24} className="text-gold" />
                      <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadFile(file);
                          if (url) setAdminData({...adminData, foto: url});
                        }
                      }} />
                    </label>
                    {uploading && <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full"><Loader2 className="animate-spin text-gold" /></div>}
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-white/40">Foto de Perfil</p>
                </div>

                <div className="md:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase text-white/40 tracking-widest">Nome do Administrador</label>
                      <input value={adminData.nome} onChange={e => setAdminData({...adminData, nome: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase text-white/40 tracking-widest">Localidade</label>
                      <select value={adminData.pais} onChange={e => setAdminData({...adminData, pais: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold text-white">
                        <option value="">Selecione o País</option>
                        {countries.map(c => <option key={c.cca2} value={c.name.common}>{c.flag} {c.name.common}</option>)}
                      </select>
                    </div>
                  </div>
                  <button onClick={handleAdminUpdate} className="w-full bg-gold text-black py-5 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-white transition-all">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MATERIAIS - COM CLOUDINARY */}
          {activeSection === "materiais" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in">
              <div className="lg:col-span-1 bg-[#161310] p-8 border border-white/5 h-fit">
                <h3 className="font-display text-2xl uppercase italic mb-8">Novo <span className="text-gold">Material</span></h3>
                <div className="space-y-4">
                  <input value={materialForm.nome} onChange={e => setMaterialForm({...materialForm, nome: e.target.value})} placeholder="Título do Material" className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold" />
                  
                  <div className="flex gap-2">
                    <button onClick={() => setMaterialForm({...materialForm, tipo: "link"})} className={`flex-1 py-2 text-[8px] border ${materialForm.tipo === "link" ? 'bg-gold text-black' : 'border-white/10 text-white/40'}`}>LINK</button>
                    <button onClick={() => setMaterialForm({...materialForm, tipo: "upload"})} className={`flex-1 py-2 text-[8px] border ${materialForm.tipo === "upload" ? 'bg-gold text-black' : 'border-white/10 text-white/40'}`}>ARQUIVO</button>
                  </div>

                  {materialForm.tipo === "link" ? (
                    <input value={materialForm.url} onChange={e => setMaterialForm({...materialForm, url: e.target.value})} placeholder="URL do Drive/Link" className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold" />
                  ) : (
                    <div className="relative border border-white/10 p-4 bg-black/20 text-center">
                       <input type="file" onChange={handleSaveMaterial} className="absolute inset-0 opacity-0 cursor-pointer" />
                       <p className="text-[10px] text-white/40 uppercase tracking-widest">{uploading ? "Enviando..." : "Clique para Upload"}</p>
                    </div>
                  )}

                  <select value={materialForm.categoria} onChange={e => setMaterialForm({...materialForm, categoria: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 text-xs text-white/60 outline-none">
                    <option>Apostilas</option><option>Guias</option><option>Fichas</option>
                  </select>

                  {materialForm.tipo === "link" && (
                    <button onClick={() => handleSaveMaterial()} className="w-full bg-gold text-black py-4 font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all">Salvar Material</button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {materiais.map(m => (
                  <div key={m.id} className="bg-[#161310] border border-white/5 p-4 flex justify-between items-center group hover:border-gold/20 transition-all">
                    <div className="flex items-center gap-4">
                      <FileText size={18} className="text-gold/40" />
                      <div><p className="text-[11px] font-bold uppercase">{m.nome}</p><p className="text-[8px] text-white/20 uppercase">{m.categoria} • {m.tipo}</p></div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <a href={m.url} target="_blank" rel="noreferrer" className="text-white/10 hover:text-gold"><Eye size={16} /></a>
                      <button onClick={async () => {if(confirm("Excluir?")) await deleteDoc(doc(db, "materiais", m.id))}} className="text-white/5 hover:text-red-500"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CURSOS E QUIZZES */}
          {activeSection === "cursos" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in">
              <div className="space-y-6 bg-[#161310] p-8 border border-white/5 h-fit">
                <h3 className="font-display text-2xl uppercase italic">Novo <span className="text-gold">Curso</span></h3>
                <div className="grid grid-cols-2 gap-4">
                  <input value={cursoNome} onChange={e => setCursoNome(e.target.value)} placeholder="Nome do Curso" className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold" />
                  <input value={cursoThumb} onChange={e => setCursoThumb(e.target.value)} placeholder="URL da Capa" className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold" />
                </div>
                <div className="p-6 border border-gold/10 bg-gold/[0.02] space-y-4">
                  <div className="flex gap-2 p-1 bg-black/40 rounded-sm">
                    <button onClick={() => setTipoConteudo("video")} className={`flex-1 py-2 text-[8px] font-bold uppercase tracking-widest transition-all ${tipoConteudo === "video" ? 'bg-gold text-black' : 'text-white/40'}`}>VÍDEO-AULA</button>
                    <button onClick={() => setTipoConteudo("quiz")} className={`flex-1 py-2 text-[8px] font-bold uppercase tracking-widest transition-all ${tipoConteudo === "quiz" ? 'bg-gold text-black' : 'text-white/40'}`}>QUIZ INTERATIVO</button>
                  </div>
                  <input value={tempTitulo} onChange={e => setTempTitulo(e.target.value)} placeholder={tipoConteudo === "video" ? "Título da Aula" : "Título do Quiz"} className="w-full bg-black/40 border border-white/5 p-4 text-xs outline-none" />
                  {tipoConteudo === "video" ? (
                    <input value={tempUrl} onChange={e => setTempUrl(e.target.value)} placeholder="Link do Vídeo" className="w-full bg-black/40 border border-white/5 p-4 text-xs outline-none" />
                  ) : (
                    <div className="space-y-4 bg-black/40 p-4 border border-white/5">
                      <p className="text-[8px] text-gold uppercase tracking-tighter">Editor de Questões</p>
                      <input value={novaPergunta} onChange={e => setNovaPergunta(e.target.value)} placeholder="A pergunta é..." className="w-full bg-transparent border-b border-white/10 p-2 text-[10px] outline-none" />
                      <div className="grid grid-cols-1 gap-2">
                        {opcoes.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <button onClick={() => setIndexCorreta(i)} className={`p-1 rounded-full border ${indexCorreta === i ? 'bg-green-500 border-green-500' : 'border-white/10'}`}><Check size={10} /></button>
                            <input value={opt} onChange={e => { const n = [...opcoes]; n[i] = e.target.value; setOpcoes(n); }} placeholder={`Opção ${i+1}`} className="flex-1 bg-transparent border-b border-white/5 text-[10px] p-1 outline-none" />
                          </div>
                        ))}
                      </div>
                      <button onClick={adicionarPerguntaAoFila} className="text-[9px] text-gold underline">+ Adicionar Pergunta</button>
                    </div>
                  )}
                  <button onClick={incluirNaGrade} className="w-full py-4 bg-white/5 text-[9px] uppercase font-bold border border-white/10 hover:bg-gold hover:text-black transition-all">+ Incluir na Grade</button>
                </div>
              </div>
              <div className="bg-[#161310] p-10 border border-white/5 flex flex-col min-h-[500px]">
                <h4 className="text-[10px] uppercase font-bold text-white/40 mb-8 tracking-[0.3em]">Grade do Curso ({aulasLista.length})</h4>
                <div className="flex-1 space-y-3">
                  {aulasLista.map((a, idx) => (
                    <div key={a.id} className="flex justify-between items-center p-4 bg-black/40 border border-white/5 group">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-white/20">#{idx+1}</span>
                        {a.tipo === "video" ? <Video size={14} className="text-gold/40" /> : <ShieldCheck size={14} className="text-blue-400" />}
                        <p className="text-[10px] font-bold uppercase tracking-wider">{a.titulo}</p>
                      </div>
                      <Trash2 size={14} className="text-white/5 group-hover:text-red-500 cursor-pointer" onClick={() => setAulasLista(aulasLista.filter(i => i.id !== a.id))} />
                    </div>
                  ))}
                </div>
                <button onClick={salvarCursoCompleto} disabled={loading || !cursoNome || aulasLista.length === 0} className="w-full mt-10 bg-gold text-black py-6 font-bold uppercase text-[11px] tracking-[0.4em] hover:bg-white transition-all disabled:opacity-20">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Publicar Curso Completo"}
                </button>
              </div>
            </div>
          )}

          {/* LIVES E MENTORIAS */}
          {activeSection === "mentorias" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in">
              <div className="bg-[#161310] p-8 border border-white/5 h-fit">
                <h3 className="font-display text-2xl uppercase italic mb-6">Agendar <span className="text-gold">Live / Mentoria</span></h3>
                <div className="space-y-4">
                  <input value={tempTitulo} onChange={e => setTempTitulo(e.target.value)} placeholder="Tema da Live" className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold" />
                  <input value={tempUrl} onChange={e => setTempUrl(e.target.value)} placeholder="Link do Zoom/Meet" className="w-full bg-black/40 border border-white/10 p-4 text-xs outline-none focus:border-gold" />
                  <button onClick={async () => {
                    setLoading(true);
                    await addDoc(collection(db, "mentorias"), { titulo: tempTitulo, url: tempUrl, createdAt: serverTimestamp() });
                    setTempTitulo(""); setTempUrl(""); setLoading(false);
                    alert("Live publicada!");
                  }} className="w-full bg-gold text-black py-4 font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                    {loading ? <Loader2 className="animate-spin mx-auto"/> : "Publicar Encontro Ao Vivo"}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {mentorias.map(m => (
                  <div key={m.id} className="bg-[#161310] border border-white/5 p-5 flex justify-between items-center group hover:border-gold/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <div><p className="text-[11px] font-bold uppercase">{m.titulo}</p><p className="text-[8px] text-white/20 uppercase">Acesso à Live</p></div>
                    </div>
                    <button onClick={async () => {if(confirm("Excluir?")) await deleteDoc(doc(db, "mentorias", m.id))}} className="text-white/10 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ALUNAS & CONTAS */}
          {activeSection === "alunas" && (
            <div className="space-y-16 animate-in fade-in">
              <GerenciarAlunas />
              <div className="border-t border-white/5 pt-16">
                <h3 className="text-gold text-[10px] uppercase tracking-[0.4em] mb-10 italic">Controle de Permissões</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-1 space-y-4">
                    <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input placeholder="Buscar Aluna..." className="w-full bg-[#161310] border border-white/5 p-4 pl-12 text-xs outline-none focus:border-gold" onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      {alunas.filter(a => a.nome?.toLowerCase().includes(searchTerm.toLowerCase())).map(aluna => (
                        <button key={aluna.id} onClick={() => setSelectedAluna(aluna)} className={`w-full text-left p-4 border transition-all ${selectedAluna?.id === aluna.id ? 'bg-gold border-gold text-black' : 'bg-[#161310] border-white/5 text-white/60 hover:border-white/20'}`}>
                          <div className="flex justify-between items-start">
                            <p className="text-[10px] font-bold uppercase">{aluna.nome || 'Sem Nome'}</p>
                            <span className="text-[8px] opacity-60">{aluna.pais === "Brasil" ? "🇧🇷" : "🇵🇹"}</span>
                          </div>
                          <p className={`text-[8px] ${selectedAluna?.id === aluna.id ? 'text-black/60' : 'text-white/20'}`}>{aluna.email}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    {selectedAluna ? (
                      <div className="bg-[#161310] border border-white/5 p-8">
                        <div className="flex justify-between items-center mb-10">
                          <h3 className="text-2xl font-display italic uppercase">{selectedAluna.nome}</h3>
                          <div className="text-right">
                             <p className="text-[9px] text-white/40 uppercase">WhatsApp</p>
                             <p className="text-[10px] text-gold font-bold">{selectedAluna.whatsapp || "Não informado"}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div>
                            <h4 className="text-[9px] font-bold uppercase text-white/40 mb-4 tracking-widest">Acesso a Materiais</h4>
                            <div className="space-y-2">
                              {materiais.map(m => {
                                const jaTem = selectedAluna.acessos?.includes(m.id);
                                return (
                                  <div key={m.id} className="flex items-center justify-between p-3 bg-black/20 border border-white/5 text-[10px] uppercase">
                                    <span>{m.nome}</span>
                                    <button onClick={() => toggleAcesso(selectedAluna.id, m.id, jaTem)} className={`p-2 ${jaTem ? 'text-green-500' : 'text-white/10'}`}>
                                      {jaTem ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[9px] font-bold uppercase text-white/40 mb-4 tracking-widest">Cursos</h4>
                            <div className="space-y-2">
                              {cursos.map(item => {
                                const jaTem = selectedAluna.acessos?.includes(item.id);
                                return (
                                  <div key={item.id} className="flex items-center justify-between p-3 bg-black/20 border border-white/5 text-[10px] uppercase">
                                    <span>{item.nome}</span>
                                    <button onClick={() => toggleAcesso(selectedAluna.id, item.id, jaTem)} className={`p-2 ${jaTem ? 'text-green-500' : 'text-white/10'}`}>
                                      {jaTem ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/5 text-white/20 p-20 text-center">
                        <PlusCircle className="mb-4 opacity-10" size={40} />
                        <p className="text-[10px] uppercase tracking-[0.3em]">Selecione uma aluna para gerenciar permissões</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Admin;