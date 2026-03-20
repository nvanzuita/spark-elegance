import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Lock, CheckCircle, Award, X, Loader2 } from "lucide-react";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot, collection, query, orderBy } from "firebase/firestore";

const MentoriasAluna = () => {
  const [mentorias, setMentorias] = useState<any[]>([]);
  const [aulaAtiva, setAulaAtiva] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [modoQuiz, setModoQuiz] = useState(false);
  const [tentativas, setTentativas] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [videoFinalizado, setVideoFinalizado] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "mentorias"), orderBy("ordem", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMentorias(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFinalizarVideo = () => setVideoFinalizado(true);

  // --- NOVA FUNÇÃO DE LIBERAÇÃO ---
  const liberarProximoConteudo = async () => {
    try {
      const ordemAtual = aulaAtiva.ordem;
      const proximaOrdem1 = ordemAtual + 1;
      const proximaOrdem2 = ordemAtual + 2;

      // Filtra as próximas duas aulas no array local
      const aulasParaLiberar = mentorias.filter(
        m => m.ordem === proximaOrdem1 || m.ordem === proximaOrdem2
      );

      const promessas = aulasParaLiberar.map(aula => {
        const docRef = doc(db, "mentorias", aula.id);
        return updateDoc(docRef, { status: "liberado" });
      });

      // Marca a aula atual como concluída
      const aulaAtualRef = doc(db, "mentorias", aulaAtiva.id);
      promessas.push(updateDoc(aulaAtualRef, { status: "concluido" }));

      await Promise.all(promessas);
    } catch (error) {
      console.error("Erro ao progredir:", error);
      alert("Erro ao salvar seu progresso. Verifique sua conexão.");
    }
  };

  const validarQuiz = async () => {
    const totalPerguntas = aulaAtiva.quiz.perguntas.length;
    const acertos = respostas.filter((r, i) => r === aulaAtiva.quiz.perguntas[i].correta).length;
    const aproveitamento = (acertos / totalPerguntas) * 100;

    if (aproveitamento >= 90) {
      alert("⭐ Incrível! Aproveitamento superior a 90%. Próximos conteúdos liberados!");
      
      // Chama a função de liberação antes de fechar
      await liberarProximoConteudo();
      
      setModoQuiz(false);
      setAulaAtiva(null);
      setVideoFinalizado(false);
    } else {
      if (tentativas === 0) {
        alert(`Você acertou ${aproveitamento.toFixed(0)}%. O mínimo é 90%. Sugerimos revisar os últimos vídeos antes da última tentativa.`);
        setTentativas(1);
      } else {
        alert("Segunda tentativa falha. Revise o conteúdo obrigatoriamente para tentar de novo.");
        setTentativas(0);
        setModoQuiz(false);
        setAulaAtiva(null);
        setVideoFinalizado(false);
      }
    }
    setRespostas([]);
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-gold animate-spin" size={40} />
      <p className="text-gold text-[10px] uppercase tracking-[0.4em]">Sincronizando Jornada...</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-20 text-white">
      {/* --- MODAL DE AULA / QUIZ --- */}
      <AnimatePresence>
        {aulaAtiva && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#0F0D0B]/98 backdrop-blur-3xl flex flex-col items-center justify-center p-4 md:p-10">
            <button onClick={() => { setAulaAtiva(null); setModoQuiz(false); setVideoFinalizado(false); }} className="absolute top-10 right-10 text-white/20 hover:text-gold transition-all"><X size={30} /></button>

            <div className="w-full max-w-5xl">
              {!modoQuiz ? (
                <div className="space-y-6">
                  <div className="relative aspect-video bg-black border border-white/5 shadow-2xl">
                    <video 
                      key={aulaAtiva.id}
                      className="w-full h-full"
                      controls
                      autoPlay
                      onEnded={handleFinalizarVideo}
                    >
                      <source src={aulaAtiva.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                  <div className="flex justify-between items-center bg-white/[0.02] p-6 border border-white/5">
                    <div>
                      <h2 className="font-display text-3xl uppercase italic text-gold">{aulaAtiva.titulo}</h2>
                      <p className="text-white/40 text-xs mt-1">{aulaAtiva.descricao}</p>
                    </div>
                    {aulaAtiva.temQuiz && videoFinalizado && (
                      <button 
                        onClick={() => setModoQuiz(true)}
                        className="bg-gold text-black px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all animate-pulse"
                      >
                        Fazer Avaliação
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="max-w-2xl mx-auto bg-[#1A1612] border border-gold/30 p-10 shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="text-center mb-10">
                    <h2 className="font-display text-4xl uppercase italic">Validação de <span className="text-gold">Módulo</span></h2>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2">Necessário 90% de acertos para progredir</p>
                  </div>

                  <div className="space-y-8">
                    {aulaAtiva.quiz.perguntas.map((q: any, i: number) => (
                      <div key={i} className="space-y-4">
                        <p className="text-sm font-medium italic text-white/80">{i + 1}. {q.pergunta}</p>
                        <div className="grid grid-cols-1 gap-2">
                          {q.opcoes.map((opcao: string, idx: number) => (
                            <button 
                              key={idx}
                              onClick={() => {
                                const newRespostas = [...respostas];
                                newRespostas[i] = idx;
                                setRespostas(newRespostas);
                              }}
                              className={`p-4 text-left text-[10px] uppercase tracking-widest border transition-all ${respostas[i] === idx ? "border-gold bg-gold/10 text-gold" : "border-white/5 bg-black/20 text-white/60 hover:border-white/20"}`}
                            >
                              {opcao}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={validarQuiz}
                    className="w-full mt-12 bg-gold text-black py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all"
                  >
                    Finalizar e Enviar
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- GRID DE AULAS --- */}
      <section>
        <header className="mb-12">
          <span className="text-gold/50 text-[9px] uppercase tracking-[0.4em] font-bold">Conteúdo</span>
          <h2 className="font-display text-4xl uppercase italic text-white">Sua <span className="text-gold">Evolução</span></h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentorias.map((item, index) => (
            <div key={item.id} className="relative group">
              <div 
                onClick={() => item.status !== 'bloqueado' && setAulaAtiva(item)}
                className={`relative aspect-video overflow-hidden border transition-all duration-500 ${
                  item.status === 'bloqueado' ? 'border-white/5 opacity-40' : 'border-white/10 group-hover:border-gold/50 cursor-pointer'
                }`}
              >
                <img src={item.thumb} className={`w-full h-full object-cover transition-transform duration-700 ${item.status !== 'bloqueado' && 'group-hover:scale-110'}`} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  {item.status === 'bloqueado' ? <Lock size={20} className="text-gold/20" /> : <Play size={24} className="text-gold" fill="currentColor" />}
                </div>
                {item.temQuiz && (
                  <div className="absolute top-4 right-4 bg-gold text-black px-2 py-1 text-[8px] font-bold uppercase tracking-tighter">
                    Possui Prova
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h4 className={`font-display text-xl uppercase ${item.status === 'bloqueado' ? 'text-white/20' : 'text-white'}`}>
                  {index + 1}. {item.titulo}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'concluido' ? 'bg-green-500' : item.status === 'liberado' ? 'bg-gold' : 'bg-white/10'}`} />
                  <span className="text-[9px] uppercase tracking-widest text-white/30">{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MentoriasAluna;