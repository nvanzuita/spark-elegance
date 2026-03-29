import { useState, useEffect } from "react";
import { db } from "../firebase";
import { 
  collection, setDoc, getDoc, deleteDoc, doc, 
  query, orderBy, onSnapshot, serverTimestamp 
} from "firebase/firestore";
import { UserPlus, Trash2, Search, Loader2, User, Copy, Check, AlertCircle } from "lucide-react";

// Interface reforçada
interface Aluna {
  id: string;
  nome: string;
  email: string;
  username: string;
  role: string;
  status: string;
  senhaProvisoria?: string;
  acessos: string[];
  createdAt: any;
}

const GerenciarAlunas = () => {
  const [alunas, setAlunas] = useState<Aluna[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [novoNome, setNovoNome] = useState("");
  const [novoUsername, setNovoUsername] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Listener em tempo real
  useEffect(() => {
    const q = query(collection(db, "usuarios"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ 
        id: d.id, 
        ...d.data() 
      })) as Aluna[];

      // Filtra apenas quem tem role "aluna"
      const apenasAlunas = docs.filter(u => u.role === "aluna");
      
      setAlunas(apenasAlunas);
      setLoading(false);
    }, (error) => {
      console.error("Erro no Snapshot:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddAluna = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim() || !novoUsername.trim()) return;
    
    setIsAdding(true);
    
    // Normalização do username: minúsculo, sem espaços, sem caracteres especiais simples
    const usernameLimpo = novoUsername
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/\s+/g, '.');
      
    const emailGerado = `${usernameLimpo}@brunabeauty.eu`;

    try {
      // Verificação de duplicidade
      const docRef = doc(db, "usuarios", emailGerado);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert("⚠️ Este username já está em uso por outra aluna.");
        setIsAdding(false);
        return;
      }

      await setDoc(docRef, {
        nome: novoNome.trim(),
        email: emailGerado,
        username: usernameLimpo,
        role: "aluna",
        status: "pendente",
        senhaProvisoria: "123456", // Senha padrão inicial
        progressoAulas: {},
        historicoRecentes: [],
        acessos: [], // Importante iniciar vazio para o Admin gerenciar depois
        createdAt: serverTimestamp(),
      });

      setNovoNome("");
      setNovoUsername("");
      alert(`✅ Matriculada com Sucesso!\n\nNome: ${novoNome}\nLogin: ${emailGerado}\nSenha: 123456`);
      
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao salvar no banco de dados. Verifique sua conexão.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const alunasFiltradas = alunas.filter(a => 
    a.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* SEÇÃO: CADASTRO DE MATRÍCULA */}
      <section className="bg-[#161310] border border-white/5 p-8 rounded-sm">
        <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gold/10 rounded-lg">
                <UserPlus className="text-gold" size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase italic">Matricular <span className="text-gold">Nova Aluna</span></h3>
        </div>
        
        <form onSubmit={handleAddAluna} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Nome Completo da Aluna</label>
            <input 
              type="text" 
              placeholder="Ex: Maria Oliveira" 
              className="w-full bg-black/40 border border-white/10 p-4 text-xs text-white outline-none focus:border-gold transition-all"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Username de Acesso</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="maria.oliveira" 
                className="w-full bg-black/40 border border-white/10 p-4 text-xs text-white outline-none focus:border-gold transition-all"
                value={novoUsername}
                onChange={(e) => setNovoUsername(e.target.value)}
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-white/20 font-mono">@brunabeauty.eu</span>
            </div>
          </div>

          <div className="flex items-end">
            <button 
              type="submit"
              disabled={isAdding}
              className="w-full bg-gold text-black font-bold uppercase text-[10px] tracking-[0.3em] py-4 hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAdding ? <Loader2 className="animate-spin" size={18} /> : "Gerar Acesso"}
            </button>
          </div>
        </form>
      </section>

      {/* SEÇÃO: LISTAGEM E BUSCA */}
      <section className="bg-[#161310] border border-white/5 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 bg-black/20">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">Base de Alunas Ativas</h3>
            <p className="text-[8px] text-white/20 uppercase tracking-widest mt-1">Total: {alunasFiltradas.length} alunas</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              className="w-full bg-black/40 border border-white/5 pl-10 pr-4 py-3 text-[10px] text-white outline-none focus:border-gold transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[9px] uppercase tracking-widest text-gold/50 border-b border-white/5 bg-black/40">
                <th className="p-6 font-bold">Identificação da Aluna</th>
                <th className="p-6 font-bold">Credenciais de Login</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                    <td colSpan={4} className="p-20 text-center">
                        <Loader2 className="animate-spin mx-auto text-gold mb-4" />
                        <p className="text-[10px] uppercase tracking-widest text-white/20">Carregando base de dados...</p>
                    </td>
                </tr>
              ) : alunasFiltradas.length === 0 ? (
                <tr>
                    <td colSpan={4} className="p-20 text-center">
                        <AlertCircle className="mx-auto text-white/10 mb-4" size={30} />
                        <p className="text-[10px] uppercase tracking-widest text-white/20">Nenhuma aluna encontrada</p>
                    </td>
                </tr>
              ) : (
                alunasFiltradas.map((aluna) => (
                  <tr key={aluna.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-gold/5 flex items-center justify-center text-gold border border-gold/10 group-hover:border-gold/30 transition-all">
                          <User size={16} />
                        </div>
                        <div>
                            <p className="text-xs text-white/80 font-bold uppercase tracking-wider">{aluna.nome}</p>
                            <p className="text-[8px] text-white/20 uppercase">Membro desde: {aluna.createdAt?.toDate ? new Date(aluna.createdAt.toDate()).toLocaleDateString() : '---'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <code className="text-[10px] text-white/40 bg-black/40 px-2 py-1 rounded border border-white/5">{aluna.email}</code>
                        <button 
                            onClick={() => handleCopy(aluna.email)} 
                            className="p-1.5 text-white/10 hover:text-gold hover:bg-gold/10 rounded transition-all"
                            title="Copiar e-mail"
                        >
                          {copiedId === aluna.email ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </td>
                    <td className="p-6">
                        <span className={`text-[8px] uppercase px-2 py-1 rounded-full border ${
                            aluna.status === 'ativo' 
                            ? 'border-green-500/20 text-green-500 bg-green-500/5' 
                            : 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5'
                        }`}>
                            {aluna.status}
                        </span>
                    </td>
                    <td className="p-6 text-center">
                      <button 
                        onClick={async () => {
                          if(confirm(`⚠️ ATENÇÃO: Deseja remover permanentemente o acesso de ${aluna.nome}?\nEsta ação não pode ser desfeita.`)) {
                            try {
                                await deleteDoc(doc(db, "usuarios", aluna.id));
                            } catch (e) {
                                alert("Erro ao excluir aluna.");
                            }
                          }
                        }}
                        className="p-3 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default GerenciarAlunas;