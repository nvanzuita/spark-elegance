import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CreditCard, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { FRESHA_URL, whatsappLink } from "@/lib/siteConfig";

const Booking = () => {
  const { t } = useLanguage();
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
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">{t.booking.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            {t.booking.titleA} <span className="italic text-gold-gradient">{t.booking.titleB}</span>
          </h2>
          <div className="gold-separator w-16 mx-auto mb-8" />
          <p className="font-elegant text-lg text-muted-foreground max-w-lg mx-auto">
            {t.booking.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Clock className="w-5 h-5 text-primary" />,
              title: t.booking.hoursTitle,
              lines: t.booking.hoursLines,
            },
            {
              icon: <CreditCard className="w-5 h-5 text-primary" />,
              title: t.booking.paymentTitle,
              lines: t.booking.paymentLines,
            },
            {
              icon: <CalendarCheck className="w-5 h-5 text-primary" />,
              title: t.booking.etiquetteTitle,
              lines: t.booking.etiquetteLines,
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
            href={whatsappLink(t.booking.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-gold-gradient text-xs tracking-luxury uppercase text-primary-foreground font-medium hover:opacity-90 transition-opacity text-center"
          >
            {t.booking.whatsapp}
          </a>
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-gold/30 text-xs tracking-luxury uppercase text-foreground hover:border-gold/60 hover:bg-gold/5 transition-all text-center"
          >
            {t.booking.online}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
