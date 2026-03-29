import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, db } from "../firebase"; // Importamos o db
import { doc, getDoc } from "firebase/firestore";

const Welcome = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [nomeReal, setNomeReal] = useState("");
  const navigate = useNavigate();

  // BUSCA O NOME NO FIRESTORE
  useEffect(() => {
    const fetchNome = async () => {
      if (auth.currentUser) {
        try {
          const docRef = doc(db, "usuarios", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNomeReal(docSnap.data().nome);
          }
        } catch (error) {
          console.error("Erro ao buscar nome:", error);
        }
      }
    };
    fetchNome();
  }, []);

  // Define o nome de exibição (Prioridade para o Firestore)
  const alunaNome = nomeReal || auth.currentUser?.email?.split('@')[0] || "Aluna";

  return (
    <div className="min-h-screen bg-[#1A1612] flex flex-col items-center justify-center p-6 text-center overflow-hidden font-body text-white">
      
      {/* Background Luxuoso */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl w-full"
      >
        <span className="text-gold text-[10px] uppercase tracking-[0.5em] mb-4 block animate-pulse">
          Início da sua Jornada
        </span>
        
        <h3 className="font-display text-4xl uppercase italic mb-8 tracking-tighter">
          Seja Bem-vinda, <span className="text-gold">{alunaNome}</span>
        </h3>

        {/* Player de Vídeo */}
        <div className="relative aspect-video bg-black border border-white/10 shadow-2xl mb-10 overflow-hidden rounded-sm">
          {/* NOTA: Use um link .mp4 direto para funcionar aqui. Se for usar YouTube, precisaremos de um iframe */}
          <video 
            className="w-full h-full object-cover"
            onEnded={() => setVideoEnded(true)}
            controls
            autoPlay
            playsInline
          >
            <source src="/background.webm" type="video/webm" />
            Seu navegador não suporta vídeos.
          </video>
        </div>

        {/* Botão que só aparece após o vídeo terminar */}
        {videoEnded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate("/area-aluna?firstLogin=true")}
            className="bg-gold text-black px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Aceder ao Portal Oficial
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;