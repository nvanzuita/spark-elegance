import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, Loader2, FileText, Video, Plus, Trash2, HelpCircle } from "lucide-react";

const Admin = () => {
  const [tab, setTab] = useState<"materiais" | "mentorias">("materiais");
  const [loading, setLoading] = useState(false);

  // Estados Form
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Apostilas");
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [ordem, setOrdem] = useState(1);

  // Estados do Quiz
  const [temQuiz, setTemQuiz] = useState(false);
  const [perguntas, setPerguntas] = useState([{ pergunta: "", opcoes: ["", "", ""], correta: 0 }]);

  const CLOUD_NAME = "dudnl5whz"; 
  const UPLOAD_PRESET = "portal_aluna"; 

  // --- SEGURANÇA ---
  const ADMIN_EMAIL = "academy@brunabeauty.eu"; // Só quem tiver esse email pode acessar o Admin
  const user = auth.currentUser;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-[#1A1612] flex items-center justify-center text-gold font-display uppercase tracking-[0.5em]">
        Acesso Restrito
      </div>
    );
  }

  // Funções do Quiz
  const adicionarPergunta = () => setPerguntas([...perguntas, { pergunta: "", opcoes: ["", "", ""], correta: 0 }]);
  const removerPergunta = (index: number) => setPerguntas(perguntas.filter((_, i) => i !== index));
  const updatePergunta = (index: number, val: string) => {
    const novas = [...perguntas];
    novas[index].pergunta = val;
    setPerguntas(novas);
  };
  const updateOpcao = (pIdx: number, oIdx: number, val: string) => {
    const novas = [...perguntas];
    novas[pIdx].opcoes[oIdx] = val;
    setPerguntas(novas);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalUrl = videoUrl;

      // Upload para Cloudinary (Arquivo ou Thumb)
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, { method: "POST", body: formData });
        const data = await res.json();
        finalUrl = data.secure_url;
      }

      if (tab === "materiais") {
        await addDoc(collection(db, "materiais"), {
          nome, categoria, url: finalUrl,
          tamanho: file ? `${(file.size / (1024 * 1024)).toFixed(1)}MB` : "---",
          liberado: true, createdAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "mentorias"), {
          titulo: nome,
          descricao,
          videoUrl: videoUrl, // Link do streaming
          thumb: file ? finalUrl : "", // Se subiu arquivo, é a thumb
          ordem: Number(ordem),
          status: ordem === 1 ? "liberado" : "bloqueado", // Primeira aula já nasce liberada
          temQuiz,
          quiz: temQuiz ? { perguntas } : null,
          createdAt: serverTimestamp(),
        });
      }

      alert("Publicado com sucesso!");
      resetForm();
    } catch (err) {
      alert("Erro ao publicar.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNome(""); setDescricao(""); setVideoUrl(""); setFile(null); setTemQuiz(false);
    setPerguntas([{ pergunta: "", opcoes: ["", "", ""], correta: 0 }]);
  };

  return (
    <div className="min-h-screen bg-[#1A1612] text-white p-6 md:p-20 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        
        {/* Seletor de Abas */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab("materiais")} className={`flex-1 py-4 text-[10px] uppercase tracking-widest border transition-all ${tab === "materiais" ? "bg-gold text-black border-gold font-bold" : "border-white/10 text-white/40"}`}>
            <FileText size={14} className="inline mr-2" /> Materiais
          </button>
          <button onClick={() => setTab("mentorias")} className={`flex-1 py-4 text-[10px] uppercase tracking-widest border transition-all ${tab === "mentorias" ? "bg-gold text-black border-gold font-bold" : "border-white/10 text-white/40"}`}>
            <Video size={14} className="inline mr-2" /> Mentorias / Curso
          </button>
        </div>

        <motion.div layout className="bg-[#1E1A16] border border-gold/20 p-8 md:p-12 shadow-2xl">
          <header className="mb-10 text-center">
            <h2 className="font-display text-4xl uppercase italic">Novo <span className="text-gold">{tab === "materiais" ? "Material" : "Módulo"}</span></h2>
          </header>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Título</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} className="bg-black/40 border border-white/5 p-4 outline-none focus:border-gold/50 text-sm" required />
              </div>
              
              {tab === "materiais" ? (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Categoria</label>
                  <select value={categoria} onChange={e => setCategoria(e.target.value)} className="bg-black/40 border border-white/5 p-4 outline-none text-sm text-white">
                    <option value="Apostilas">Apostilas</option>
                    <option value="Guias">Guias</option>
                    <option value="Fichas">Fichas</option>
                  </select>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Ordem da Aula (Ex: 1, 2, 3...)</label>
                  <input type="number" value={ordem} onChange={e => setOrdem(Number(e.target.value))} className="bg-black/40 border border-white/5 p-4 outline-none focus:border-gold/50 text-sm text-gold" required />
                </div>
              )}
            </div>

            {tab === "mentorias" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Link do Vídeo (Arquivo/Streaming)</label>
                  <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="bg-black/40 border border-white/5 p-4 outline-none focus:border-gold/50 text-sm" placeholder="URL do vídeo no Cloudinary/Bunny" required />
                </div>
                <div className="flex items-center gap-3 p-4 bg-gold/5 border border-gold/10">
                   <input type="checkbox" checked={temQuiz} onChange={e => setTemQuiz(e.target.checked)} className="accent-gold" />
                   <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Este módulo encerra com um Quiz?</label>
                </div>
              </>
            )}

            <div className="relative border-2 border-dashed border-white/10 p-10 text-center hover:border-gold/30 transition-all cursor-pointer">
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" required={tab === "materiais"} />
              <div className="flex flex-col items-center gap-3">
                {file ? <CheckCircle className="text-gold" /> : <Upload className="text-white/20" />}
                <p className="text-xs text-white/60">{file ? file.name : tab === "materiais" ? "Selecionar PDF" : "Selecionar Capa (Thumb)"}</p>
              </div>
            </div>

            {/* --- SEÇÃO DINÂMICA DO QUIZ --- */}
            <AnimatePresence>
              {temQuiz && tab === "mentorias" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-8 pt-6 border-t border-white/5">
                  <h3 className="text-gold text-xs uppercase tracking-widest flex items-center gap-2"><HelpCircle size={14}/> Configuração da Prova</h3>
                  
                  {perguntas.map((p, pIdx) => (
                    <div key={pIdx} className="p-6 bg-black/20 border border-white/5 space-y-4 relative">
                      <button type="button" onClick={() => removerPergunta(pIdx)} className="absolute top-4 right-4 text-white/20 hover:text-red-500"><Trash2 size={16}/></button>
                      <input 
                        placeholder={`Pergunta ${pIdx + 1}`} 
                        value={p.pergunta} 
                        onChange={e => updatePergunta(pIdx, e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-gold text-sm"
                      />
                      <div className="space-y-2">
                        {p.opcoes.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-3">
                            <input type="radio" name={`correct-${pIdx}`} checked={p.correta === oIdx} onChange={() => {
                              const n = [...perguntas]; n[pIdx].correta = oIdx; setPerguntas(n);
                            }} />
                            <input 
                              placeholder={`Opção ${oIdx + 1}`} 
                              value={opt} 
                              onChange={e => updateOpcao(pIdx, oIdx, e.target.value)}
                              className="flex-1 bg-white/[0.03] p-3 text-xs outline-none focus:bg-white/5"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={adicionarPergunta} className="text-gold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:underline"><Plus size={14}/> Adicionar Pergunta</button>
                </motion.div>
              )}
            </AnimatePresence>

            <button disabled={loading} className="w-full bg-gold text-black font-bold py-5 uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Finalizar e Publicar"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;