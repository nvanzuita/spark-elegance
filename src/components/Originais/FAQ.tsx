import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  { q: "Sobre Pestanas", a: "Trabalhamos com mais de 12 opções de extensões, desde efeitos naturais até aos volumosos, utilizando materiais hipoalergênicos para garantir a saúde dos seus olhos." },
  { q: "Sobre Limpeza de Pele", a: "Nossa limpeza profunda inclui extração manual e peeling ultrassônico para renovação celular completa." },
  { q: "Sobre Hydralips", a: "Um tratamento de hidratação profunda que revitaliza o tecido labial, deixando-os com aspecto saudável e jovem." },
  { q: "Sobre Depilação", a: "Utilizamos métodos que minimizam o desconforto, adequados para todos os tipos de pele, incluindo as mais sensíveis." },
  { q: "Sobre Remoção de Tatuagem", a: "Realizamos o procedimento com laser de última geração, focado na segurança e eficácia da remoção do pigmento." },
  { q: "Sobre Mentorias", a: "Oferecemos formações exclusivas para profissionais que desejam elevar o nível técnico e de gestão no mundo da beleza." },
  { q: "Sobre Política de Cancelamento", a: "Cancelamentos devem ser feitos com no mínimo 24h de antecedência para evitarmos a cobrança de taxa de reserva." },
  { q: "Sobre Localização do Studio", a: "Estamos situados em uma zona privilegiada de Lisboa, com facilidade de estacionamento e acesso." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#4A423B] py-24 px-6 border-t border-gold/10">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header da Seção - Padronizado com o Hero/Serviços */}
        <div className="text-center mb-20">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/80 mb-4 font-medium">
            Esclareça suas dúvidas
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6 font-light">
            Dúvidas <span className="italic text-gold-gradient font-light">Frequentes</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </div>

        {/* Grid de 2 colunas: md:grid-cols-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gold/15 h-fit">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-7 flex justify-between items-center text-left transition-all group"
              >
                <span className="font-body text-[13px] uppercase tracking-[0.15em] text-white/90 group-hover:text-gold transition-colors duration-300">
                  {item.q}
                </span>
                <ChevronDown 
                  className={`text-gold/70 transition-transform duration-500 ease-out ${
                    openIndex === index ? 'rotate-180 text-gold' : ''
                  }`} 
                  size={16} 
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-sm text-white/60 leading-relaxed font-light max-w-[90%]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;