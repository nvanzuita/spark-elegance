import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Lock, ChevronRight, Loader2, ExternalLink } from "lucide-react";
import { auth, db } from "../firebase";
import { collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";

const Materiais = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Apostilas");
  const [materiaisData, setMateriaisData] = useState<any>({ Apostilas: [], Guias: [], Fichas: [] });
  const [acessosAluna, setAcessosAluna] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const menus = ["Apostilas", "Guias", "Fichas"];
  
  // CONFIGURAÇÃO DO SEU WHATSAPP
  const WHATSAPP_SUPORTE = "351931920081"; // <-- Coloque seu número aqui (Ex: 351 para Portugal ou 55 para Brasil + DDD)

  useEffect(() => {
    // 1. Escuta os materiais globais do banco
    const q = query(collection(db, "materiais"), orderBy("createdAt", "desc"));
    const unsubMateriais = onSnapshot(q, (snapshot) => {
      const docs: any = { Apostilas: [], Guias: [], Fichas: [] };
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (docs[data.categoria]) {
          docs[data.categoria].push({ id: doc.id, ...data });
        }
      });
      setMateriaisData(docs);
      if (!auth.currentUser) setLoading(false);
    });

    // 2. Escuta os acessos da aluna logada
    let unsubAcessos = () => {};
    if (auth.currentUser) {
      unsubAcessos = onSnapshot(doc(db, "usuarios", auth.currentUser.uid), (docSnap) => {
        if (docSnap.exists()) {
          setAcessosAluna(docSnap.data().acessos || []);
        }
        setLoading(false);
      });
    }

    return () => {
      unsubMateriais();
      unsubAcessos();
    };
  }, []);

  const handleAcaoMaterial = (item: any) => {
    const liberado = acessosAluna.includes(item.id);

    if (liberado) {
      // LOGICA DE DOWNLOAD/ACESSO
      setDownloadingId(item.id);
      setTimeout(() => {
        window.open(item.url, "_blank");
        setDownloadingId(null);
      }, 1000);
    } else {
      // LOGICA DE COMPRA (WHATSAPP)
      const mensagem = encodeURIComponent(`Olá Bruna! Quero adquirir o acesso ao material: ${item.nome}`);
      window.open(`https://wa.me/${WHATSAPP_SUPORTE}?text=${mensagem}`, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-gold animate-spin" size={32} />
        <p className="text-gold text-[10px] uppercase tracking-[0.4em] opacity-50">Sincronizando Biblioteca...</p>
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
                ? "bg-gold text-black border-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.1)]" 
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {materiaisData[categoriaAtiva].map((item: any) => {
              const liberado = acessosAluna.includes(item.id);

              return (
                <motion.div 
                  key={item.id} 
                  whileHover={{ y: -5 }}
                  className="relative group bg-[#1A1612] border border-white/5 overflow-hidden flex flex-col transition-all hover:border-gold/20"
                >
                  {/* --- THUMBNAIL AREA --- */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-black">
                    <img 
                      src={item.thumbnail || "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop"} 
                      alt={item.nome}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!liberado ? "grayscale opacity-20" : "opacity-40"}`}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] to-transparent opacity-90" />

                    {!liberado && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
                        <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center bg-black/80 mb-3">
                          <Lock size={18} className="text-gold" />
                        </div>
                        <button 
                          onClick={() => handleAcaoMaterial(item)}
                          className="px-5 py-2 border border-gold/50 bg-gold/10 text-gold text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-black transition-all"
                        >
                          Adquirir Acesso
                        </button>
                      </div>
                    )}
                  </div>

                  {/* --- CONTEÚDO --- */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className={`font-display text-lg uppercase tracking-tight leading-tight ${liberado ? "text-white" : "text-white/20"}`}>
                        {item.nome}
                      </h4>
                      <span className="text-[9px] text-gold/60 uppercase tracking-[0.2em] font-medium">
                        {liberado ? (item.tipo === "upload" ? "Arquivo PDF" : "Link Externo") : "Conteúdo Restrito"}
                      </span>
                    </div>

                    {liberado && (
                      <button 
                        onClick={() => handleAcaoMaterial(item)}
                        disabled={downloadingId === item.id}
                        className="relative p-4 bg-transparent border border-white/10 group/btn overflow-hidden transition-all hover:border-gold"
                      >
                        <div className="relative z-10">
                          {downloadingId === item.id ? (
                            <Loader2 size={18} className="text-gold animate-spin" />
                          ) : (
                            <Download size={18} className="text-white group-hover/btn:text-gold" />
                          )}
                        </div>
                      </button>
                    )}
                  </div>

                  <div className={`absolute bottom-0 left-0 h-[2px] bg-gold w-0 transition-all duration-500 ${liberado ? "group-hover:w-full" : ""}`} />
                </motion.div>
              );
            })}
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