import { motion } from "framer-motion";
import { Play, ChevronRight } from "lucide-react";

interface Mentoria {
  id: string;
  cursoTitulo: string;
}

interface RecentesCarrosselProps {
  historico: string[]; // ["Lash Lifting", "Pestanas"]
  progressoPorCurso: Record<string, number>; // {"Lash Lifting": 4}
  allMentorias: Mentoria[];
  onNavigate: (cursoNome: string) => void;
}

const RecentesCarrossel = ({ 
  historico, 
  progressoPorCurso, 
  allMentorias, 
  onNavigate 
}: RecentesCarrosselProps) => {

  if (!historico || historico.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gold font-display text-xs uppercase tracking-[0.4em] font-bold">
          Continuar Estudando
        </h3>
        <div className="h-[1px] flex-1 bg-white/5 ml-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {historico.map((cursoNome, idx) => {
          // Cálculo dinâmico do progresso para este card específico
          const aulasDesteCurso = allMentorias.filter(m => m.cursoTitulo === cursoNome);
          const totalAulas = aulasDesteCurso.length || 1;
          const aulaAtual = progressoPorCurso[cursoNome] || 0;
          const percentual = Math.min(Math.round((aulaAtual / totalAulas) * 100), 100);

          return (
            <motion.div
              key={cursoNome}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onNavigate(cursoNome)}
              className="group relative cursor-pointer overflow-hidden rounded-sm border border-white/5 bg-gradient-to-br from-[#12100E] to-black p-6 hover:border-gold/50 transition-all duration-500"
            >
              {/* Efeito de brilho ao fundo */}
              <div className="absolute -right-4 -top-4 size-24 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-colors" />

              <span className="text-[9px] text-gold/50 uppercase tracking-widest font-bold">Último Acesso</span>
              <h4 className="text-white font-display text-xl uppercase italic mt-1 group-hover:text-gold transition-colors">
                {cursoNome}
              </h4>

              <div className="mt-8 space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-white/40 uppercase tracking-tighter">Progresso do Curso</span>
                  <span className="text-[10px] text-gold font-bold">{percentual}%</span>
                </div>
                
                {/* Barra de Progresso Estilo Premium */}
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentual}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-full bg-gold"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                <div className="size-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold">
                  <Play size={12} className="group-hover:text-black fill-current" />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest">Retomar Aula</span>
                <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentesCarrossel;