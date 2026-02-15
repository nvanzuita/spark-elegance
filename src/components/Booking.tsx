import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CreditCard, CalendarCheck } from "lucide-react";

const Booking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="contactos" className="py-24 md:py-32 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">Reserva de Experiência</p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            Garanta o Seu <span className="italic text-gold-gradient">Momento</span>
          </h2>
          <div className="gold-separator w-16 mx-auto mb-8" />
          <p className="font-elegant text-lg text-muted-foreground max-w-lg mx-auto">
            Garanta o seu momento de cuidado exclusivo em nosso Studio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Clock className="w-5 h-5 text-primary" />,
              title: "Horário",
              lines: ["Terça a Sexta • 10h–19h", "Sábado • 10h–17h"],
            },
            {
              icon: <CreditCard className="w-5 h-5 text-primary" />,
              title: "Pagamento",
              lines: ["MB Way, Numerário", "ou Transferência Bancária"],
            },
            {
              icon: <CalendarCheck className="w-5 h-5 text-primary" />,
              title: "Etiqueta",
              lines: ["Taxa de reserva: 15€", "Cancelamento com 24h antecedência"],
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 bg-card border border-border text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-display text-lg mb-3">{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line} className="font-body text-sm text-muted-foreground">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/+351931920081?text=Olá%20Bruna!%20Vim%20através%20do%20Site,%20e%20gostaria%20de%20Reservar%20um%20Horário!%20🤩💜"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-gold-gradient text-xs tracking-luxury uppercase text-primary-foreground font-medium hover:opacity-90 transition-opacity text-center"
          >
            Reservar via WhatsApp
          </a>
          <a
            href="https://www.fresha.com/pt/a/studio-bruna-beauty-parede-cascais-rua-latino-coelho-j2dtyrog/booking?allOffer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-gold/30 text-xs tracking-luxury uppercase text-foreground hover:border-gold/60 hover:bg-gold/5 transition-all text-center"
          >
            Reservar Online
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
