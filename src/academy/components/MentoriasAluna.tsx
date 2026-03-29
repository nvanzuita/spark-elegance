import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Lock, CheckCircle, X, Loader2 } from "lucide-react";
import { auth, db } from "../firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { useVideoProgress } from "../hooks/UseVideoProgress";
import CertificateGenerator from "../components/CertificateGenerator";

interface Mentoria {
  id: string;
  titulo: string;
  descricao?: string;
  cursoTitulo: string;
  videoUrl?: string;
  thumb?: string;
  ordem: number;
  temQuiz?: boolean;
  quiz?: any;
}

const MentoriasAluna = () => {
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [aulaAtiva, setAulaAtiva] = useState<Mentoria | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados da Aluna
  const [cursosAdquiridos, setCursosAdquiridos] = useState<string[]>([]); 
  const [progressoPorCurso, setProgressoPorCurso] = useState<Record<string, number>>({});
  const [historicoRecentes, setHistoricoRecentes] = useState<string[]>([]);
  const [nomeReal, setNomeReal] = useState("Aluna");

  const [modoQuiz, setModoQuiz] = useState(false);
  const [videoFinalizado, setVideoFinalizado] = useState(false);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const WHATSAPP_SUPORTE = "5511999999999"; 

  const videoRef = useVideoProgress({
    videoId: aulaAtiva?.id || "",
    videoUrl: aulaAtiva?.videoUrl || "",
    onVideoComplete: () => setVideoFinalizado(true),
  });

  useEffect(() => {
    if (!auth.currentUser) return;

    // 1. Carrega aulas
    const q = query(collection(db, "mentorias"), orderBy("ordem", "asc"));
    const unsubMentorias = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Mentoria));
      setMentorias(data);
    });

    // 2. Carrega perfil completo da aluna
    const userRef = doc(db, "usuarios", auth.currentUser.uid);
    const unsubUser = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setNomeReal(data.nome || "Aluna");
        setCursosAdquiridos(data.acessos || []);
        setProgressoPorCurso(data.progressoAulas || {});
        setHistoricoRecentes(data.historicoRecentes || []); // Para o Carrossel Netflix
      }
      setLoading(false);
    });

    return () => {
      unsubMentorias();
      unsubUser();
    };
  }, []);

  const handleAcessoAula = async (aula: Mentoria, indexNoCurso: number) => {
    const cursoNome = aula.cursoTitulo;
    const temAcessoAoCurso = cursosAdquiridos.includes(cursoNome);

    if (!temAcessoAoCurso) {
      const msg = encodeURIComponent(`Olá! Quero adquirir o curso: ${cursoNome}`);
      window.open(`https://wa.me/${WHATSAPP_SUPORTE}?text=${msg}`, "_blank");
      return;
    }

    const limiteAtual = progressoPorCurso[cursoNome] || 2;

    if (indexNoCurso < limiteAtual) {
      setAulaAtiva(aula);

      // Atualiza Histórico Recentes (Lógica Netflix)
      if (auth.currentUser) {
        try {
          const userRef = doc(db, "usuarios", auth.currentUser.uid);
          const novoHistorico = [
            cursoNome, 
            ...historicoRecentes.filter((c: string) => c !== cursoNome)
          ].slice(0, 3);

          await updateDoc(userRef, {
            historicoRecentes: novoHistorico
          });
        } catch (error) {
          console.error("Erro ao atualizar recentes:", error);
        }
      }
    } else {
      alert("🔒 Finalize o Quiz das aulas anteriores para liberar este conteúdo!");
    }
  };

  const handleQuizSubmit = async (acertos: number, total: number) => {
    const aproveitamento = (acertos / total) * 100;

    if (aproveitamento >= 90) {
      if (!auth.currentUser || !aulaAtiva) return;

      const cursoAtual = aulaAtiva.cursoTitulo;
      const limiteAtual = progressoPorCurso[cursoAtual] || 2;
      const novoLimite = limiteAtual + 2;

      const userRef = doc(db, "usuarios", auth.currentUser.uid);
      await updateDoc(userRef, {
        [`progressoAulas.${cursoAtual}`]: novoLimite
      });

      alert("⭐ Incrível! Mais 2 aulas liberadas para você.");
      
      const totalAulasCurso = mentorias.filter(m => m.cursoTitulo === cursoAtual).length;
      if (novoLimite >= totalAulasCurso) {
        setShowCertificate(true);
      }

      setModoQuiz(false);
      setAulaAtiva(null);
      setRespostas([]);
      setVideoFinalizado(false);
    } else {
      alert("Quase lá! Você precisa de 90% de acertos. Revise o vídeo e tente de novo.");
    }
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-gold animate-spin" size={40} />
      <p className="text-gold text-[10px] uppercase tracking-[0.4em]">Sincronizando sua jornada...</p>
    </div>
  );

  const cursosUnicos = Array.from(new Set(mentorias.map(m => m.cursoTitulo)));

  return (
    <div className="space-y-20 pb-20 text-white">
      
      {cursosUnicos.map((cursoNome) => {
        const aulasDoCurso = mentorias.filter(m => m.cursoTitulo === cursoNome);
        const comprouCurso = cursosAdquiridos.includes(cursoNome);
        const limiteAluna = progressoPorCurso[cursoNome] || 2;

        return (
          <section key={cursoNome} className="relative">
            <header className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-gold/50 text-[9px] uppercase tracking-[0.4em] font-bold">Módulo</span>
                <h2 className="font-display text-4xl uppercase italic text-white">{cursoNome}</h2>
              </div>
              {!comprouCurso && (
                <span className="bg-white/5 text-white/40 px-3 py-1 text-[9px] uppercase tracking-widest border border-white/10">Bloqueado</span>
              )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {aulasDoCurso.map((aula, idx) => {
                const aulaBloqueada = !comprouCurso || idx >= limiteAluna;

                return (
                  <div key={aula.id} onClick={() => handleAcessoAula(aula, idx)} className="group cursor-pointer">
                    <div className={`relative aspect-video overflow-hidden border transition-all duration-500 ${
                      aulaBloqueada ? "border-white/5 opacity-40" : "border-white/10 group-hover:border-gold"
                    }`}>
                      <img src={aula.thumb} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={aula.titulo} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        {aulaBloqueada ? <Lock size={20} className="text-gold/30" /> : <Play size={24} className="text-gold" fill="currentColor" />}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className={`font-display text-lg uppercase ${aulaBloqueada ? "text-white/20" : "text-white"}`}>
                        {idx + 1}. {aula.titulo}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <AnimatePresence>
        {aulaAtiva && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4"
          >
            <button onClick={() => {setAulaAtiva(null); setModoQuiz(false);}} className="absolute top-10 right-10 text-white/40 hover:text-gold"><X size={32} /></button>
            <div className="w-full max-w-4xl">
               {!modoQuiz ? (
                 <div className="space-y-6">
                    <h2 className="text-center text-gold font-display text-3xl uppercase">{aulaAtiva.titulo}</h2>
                    <div className="aspect-video bg-black rounded border border-white/10 overflow-hidden">
                      <video ref={videoRef} controls autoPlay className="w-full h-full" onEnded={() => setVideoFinalizado(true)}>
                        <source src={aulaAtiva.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                    {videoFinalizado && aulaAtiva.temQuiz && (
                      <button onClick={() => setModoQuiz(true)} className="w-full bg-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors">
                        Fazer Prova de Liberação
                      </button>
                    )}
                 </div>
               ) : (
                 <div className="bg-[#1A1612] p-10 border border-gold/20 max-h-[80vh] overflow-y-auto rounded-lg">
                    <h3 className="text-gold font-display text-2xl mb-8 uppercase text-center">Quiz de Evolução</h3>
                    {aulaAtiva.quiz?.perguntas?.map((q: any, i: number) => (
                      <div key={i} className="mb-8">
                        <p className="text-white mb-4 text-lg">{q.pergunta}</p>
                        <div className="grid gap-2">
                          {q.opcoes.map((opt: string, idx: number) => (
                            <button 
                              key={idx}
                              onClick={() => { const r = [...respostas]; r[i] = idx; setRespostas(r); }}
                              className={`p-4 text-left border text-sm transition-all ${respostas[i] === idx ? "border-gold bg-gold/10 text-gold" : "border-white/5 hover:border-white/20 text-white/70"}`}
                            >{opt}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button 
                      disabled={respostas.length < (aulaAtiva.quiz?.perguntas?.length || 0)}
                      onClick={() => {
                        const acertos = respostas.filter((r, i) => r === aulaAtiva.quiz.perguntas[i]?.correta).length;
                        handleQuizSubmit(acertos, aulaAtiva.quiz.perguntas.length);
                      }}
                      className="w-full bg-gold text-black py-4 font-bold uppercase disabled:opacity-30 hover:bg-white transition-colors"
                    >Enviar Respostas</button>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-6 backdrop-blur-sm">
             <div className="bg-[#1A1612] border border-gold/30 p-10 text-center rounded-lg shadow-2xl max-w-2xl w-full">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={60} />
                <h2 className="text-gold font-display text-4xl mb-4 uppercase">Parabéns!</h2>
                <CertificateGenerator nomeAluno={nomeReal} cursoNome={aulaAtiva?.cursoTitulo || ""} />
                <button onClick={() => setShowCertificate(false)} className="mt-8 text-white/30 hover:text-white uppercase text-[10px] tracking-widest">Fechar Janela</button>
             </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MentoriasAluna;