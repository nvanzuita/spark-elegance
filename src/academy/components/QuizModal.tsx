import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

interface QuizModalProps {
  quiz: {
    perguntas: Array<{
      pergunta: string;
      opcoes: string[];
      correta: number;
    }>;
  };
  onSubmit: (acertos: number, total: number) => void;
  onClose: () => void;
}

export default function QuizModal({ quiz, onSubmit, onClose }: QuizModalProps) {
  const [respostas, setRespostas] = useState<number[]>([]);
  const [enviado, setEnviado] = useState(false);

  const totalPerguntas = quiz.perguntas.length;

  const handleResposta = (perguntaIdx: number, opcaoIdx: number) => {
    const novas = [...respostas];
    novas[perguntaIdx] = opcaoIdx;
    setRespostas(novas);
  };

  const handleEnviar = () => {
    const acertos = respostas.filter(
      (resp, idx) => resp === quiz.perguntas[idx].correta
    ).length;

    setEnviado(true);
    onSubmit(acertos, totalPerguntas);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="bg-[#1A1612] border border-gold/30 rounded-xl p-6 md:p-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-gold"
          >
            <X size={28} />
          </button>

          <h2 className="font-display text-3xl md:text-4xl text-gold uppercase tracking-tight mb-8 text-center">
            Quiz de Certificação
          </h2>

          {!enviado ? (
            <div className="space-y-10">
              {quiz.perguntas.map((q, idx) => (
                <div key={idx} className="space-y-4">
                  <p className="text-lg md:text-xl font-medium leading-relaxed">
                    {idx + 1}. {q.pergunta}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {q.opcoes.map((op, opIdx) => (
                      <button
                        key={opIdx}
                        onClick={() => handleResposta(idx, opIdx)}
                        className={`p-4 text-left border transition-all rounded-md ${
                          respostas[idx] === opIdx
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-white/10 bg-black/20 text-white/80 hover:border-white/30"
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleEnviar}
                disabled={respostas.length < totalPerguntas}
                className="w-full mt-10 bg-gold text-black py-5 font-bold uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Enviar Respostas
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="mx-auto text-green-500 w-20 h-20 mb-6" />
              <p className="text-xl md:text-2xl font-medium">
                Respostas enviadas!
              </p>
              <p className="text-white/60 mt-4">
                Aguarde a validação...
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}