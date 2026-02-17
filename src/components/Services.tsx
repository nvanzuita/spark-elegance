import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useHref } from "react-router-dom";

const services = [
  {
    title: "Pestanas / Lashes",
    description: "Técnicas avançadas de alongamento para realçar o seu olhar com volume e naturalidade.",
    icon: "✦",
    href: "/pdf/catalogocilios.pdf",
    video: "/video/pestanas.webm", // Nome do vídeo na pasta public
  },
  {
    title: "Lash Lifting",
    description: "Curvatura e hidratação dos fios naturais para um efeito de rímel duradouro e sofisticado.",
    icon: "✦",
    href: "/pdf/catalogolifting.pdf",
    video: "/video/lifting.webm",
  },
  {
    title: "Sobrancelhas / Brows",
    description: "Design personalizado e micropigmentação para harmonizar as linhas do seu rosto.",
    icon: "✦",
    href: "/pdf/catalogobrow.pdf",
    video: "/video/browlami.webm",
  },
  {
    title: "Depilação a Laser",
    description: "Tecnologia de ponta para uma remoção definitiva e indolor dos pelos indesejados.",
    icon: "✦",
    href: "/pdf/catalogobody.pdf",
    video: "/video/depilacao.webm",
  },
  {
    title: "Estética Facial",
    description: "Protocolos exclusivos de rejuvenescimento e cuidados profundos para a saúde da sua pele.",
    icon: "✦",
    href: "/pdf/catalogofacial.pdf",
    video: "/video/facial.webm",
  },
  {
    title: "Tattoo Removal",
    description: "Remoção segura e eficaz de pigmentos com tecnologia laser de última geração.",
    icon: "✦",
    href: "/pdf/catalogotattoo.pdf",
    video: "/video/tattoo.webm",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={service.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative block overflow-hidden p-8 md:p-10 border border-border transition-all duration-500 luxury-shadow min-h-[320px] flex flex-col justify-end"
    >
      {/* 1. Camada do Vídeo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      >
        <source src={service.video} type="video/webm" />
      </video>

      {/* 2. Camada de Película (Overlay Marrom 70%) */}
      {/* Nota: Usando bg-charcoal/70 que definimos no seu CSS para manter o tom marrom escuro */}
      <div className="absolute inset-0 bg-[#2A241E]/75 transition-opacity duration-500 group-hover:bg-[#2A241E]/60 z-10" />

      {/* 3. Conteúdo (Texto e Ícone) */}
      <div className="relative z-20">
        <span className="text-primary text-2xl mb-4 block group-hover:scale-110 transition-transform duration-300">
            {service.icon}
        </span>
        <h3 className="font-display text-xl md:text-2xl mb-3 text-white group-hover:text-gold-gradient transition-colors duration-300">
          {service.title}
        </h3>
        <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
          {service.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs tracking-luxury uppercase text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span>Ver Catálogo</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.a>
  );
};

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="servicos" className="py-24 md:py-32 px-6 bg-background">
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