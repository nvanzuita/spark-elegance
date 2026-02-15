import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Pestanas / Lashes",
    description: "Técnicas avançadas de alongamento para realçar o seu olhar com volume e naturalidade.",
    icon: "✦",
    link: "https://brunabeauty.eu/assets/pdf/catalogocilios.pdf",
  },
  {
    title: "Lash Lifting",
    description: "Curvatura e hidratação dos fios naturais para um efeito de rímel duradouro e sofisticado.",
    icon: "✦",
    link: "https://brunabeauty.eu/assets/pdf/catalogolifting.pdf",
  },
  {
    title: "Sobrancelhas / Brows",
    description: "Design personalizado e micropigmentação para harmonizar as linhas do seu rosto.",
    icon: "✦",
    link: "https://brunabeauty.eu/assets/pdf/catalogobrow.pdf",
  },
  {
    title: "Depilação a Laser",
    description: "Tecnologia de ponta para uma remoção definitiva e indolor dos pelos indesejados.",
    icon: "✦",
    link: "https://brunabeauty.eu/assets/pdf/catalogobody.pdf",
  },
  {
    title: "Estética Facial",
    description: "Protocolos exclusivos de rejuvenescimento e cuidados profundos para a saúde da sua pele.",
    icon: "✦",
    link: "https://brunabeauty.eu/assets/pdf/catalogofacial.pdf",
  },
  {
    title: "Tattoo Removal",
    description: "Remoção segura e eficaz de pigmentos com tecnologia laser de última geração.",
    icon: "✦",
    link: "https://brunabeauty.eu/assets/pdf/catalogotattoo.pdf",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={service.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group block p-8 md:p-10 bg-card border border-border hover:border-gold/30 transition-all duration-500 luxury-shadow"
    >
      <span className="text-primary text-2xl mb-6 block">{service.icon}</span>
      <h3 className="font-display text-xl md:text-2xl mb-3 group-hover:text-gold-gradient transition-colors duration-300">
        {service.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {service.description}
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs tracking-luxury uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Ver Catálogo</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </motion.a>
  );
};

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="servicos" className="py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">
            Os Nossos Serviços
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            Experiências <span className="italic text-gold-gradient">Exclusivas</span>
          </h2>
          <div className="gold-separator w-16 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
