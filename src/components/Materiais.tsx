import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Lock, ChevronRight, Loader2 } from "lucide-react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Materiais = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Apostilas");
  const [materiaisData, setMateriaisData] = useState<any>({ Apostilas: [], Guias: [], Fichas: [] });
  const [loading, setLoading] = useState(true);

  const menus = ["Apostilas", "Guias", "Fichas"];

  useEffect(() => {
    // Escuta o Firestore em tempo real. Sempre que a Bruna postar no Admin, aparece aqui.
    const q = query(collection(db, "materiais"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: any = { Apostilas: [], Guias: [], Fichas: [] };
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (docs[data.categoria]) {
          docs[data.categoria].push(data);
        }
      });
      setMateriaisData(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-gold animate-spin" size={32} />
        <p className="text-gold text-[10px] uppercase tracking-[0.4em] opacity-50">Carregando Biblioteca...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row gap-12"
    >
      {/* --- MENU LATERAL --- */}
      <aside className="w-full md:w-64 flex flex-col gap-2">
        <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-bold mb-4 opacity-50">Categorias</span>
        {menus.map((menu) => (
          <button
            key={menu}
            onClick={() => setCategoriaAtiva(menu)}
            className={`flex items-center justify-between px-6 py-4 text-[10px] uppercase tracking-[0.2em] transition-all border ${
              categoriaAtiva === menu 
                ? "bg-gold text-black border-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
                : "bg-transparent text-white/40 border-white/5 hover:border-gold/30"
            }`}
          >
            {menu}
            {categoriaAtiva === menu && <ChevronRight size={12} />}
          </button>
        ))}
      </aside>

      {/* --- LISTA DE MATERIAIS --- */}
      <div className="flex-1">
        <header className="mb-10 text-white">
          <h1 className="font-display text-4xl uppercase italic">
            Materiais / <span className="text-gold">{categoriaAtiva}</span>
          </h1>
        </header>

        {materiaisData[categoriaAtiva].length === 0 ? (
          <div className="p-20 border border-white/5 bg-white/[0.02] text-center">
            <p className="text-white/20 text-[10px] uppercase tracking-widest italic">Nenhum material publicado nesta aba.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {materiaisData[categoriaAtiva].map((item: any, i: number) => (
              <div 
                key={i} 
                className="relative group overflow-hidden border border-white/5 bg-[#1E1A16]/40 backdrop-blur-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-black/40 border border-gold/10">
                      <FileText className={`w-6 h-6 ${item.liberado ? "text-gold" : "text-white/10"}`} />
                    </div>
                    <div>
                      <h4 className={`font-display text-lg uppercase tracking-tight text-white ${!item.liberado && "opacity-20"}`}>
                        {item.nome}
                      </h4>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest">{item.tamanho}</span>
                    </div>
                  </div>

                  {item.liberado && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-gold text-black hover:bg-white transition-all shadow-xl"
                    >
                      <Download size={16} />
                    </a>
                  )}
                </div>

                {/* --- OVERLAY DE BLOQUEIO --- */}
                {!item.liberado && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center bg-[#1A1612]">
                        <Lock size={16} className="text-gold" />
                      </div>
                      <span className="text-[8px] uppercase tracking-[0.3em] text-gold font-bold">Conteúdo Bloqueado</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-8 border border-white/5 bg-white/[0.02] text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Dúvidas sobre os materiais? Entre em contato com o suporte da <span className="text-gold font-bold italic">Academy</span>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Materiais;