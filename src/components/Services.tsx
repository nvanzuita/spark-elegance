import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

const services = [
  {
    title: "Pestanas / Lashes",
    description: "Técnicas avançadas de alongamento para realçar o seu olhar com volume e naturalidade.",
    icon: "✦",
    href: "/pdf/catalogocilios.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/vc_auto,q_auto:eco,br_1m/v1773508783/pestanas_i4nnur.webm", 
  },
  {
    title: "Lash Lifting",
    description: "Curvatura e hidratação dos fios naturais para um efeito de rímel duradouro e sofisticado.",
    icon: "✦",
    href: "/pdf/catalogolifting.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/vc_auto,q_auto:eco,br_1m/v1773508785/lifting_g24hbt.webm",
  },
  {
    title: "Sobrancelhas / Brows",
    description: "Design personalizado e micropigmentação para harmonizar as linhas do seu rosto.",
    icon: "✦",
    href: "/pdf/catalogobrow.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/vc_auto,q_auto:eco,br_1m/v1773508781/browlami_uwliq6.webm",
  },
  {
    title: "Depilação a Laser",
    description: "Tecnologia de ponta para uma remoção definitiva e indolor dos pelos indesejados.",
    icon: "✦",
    href: "/pdf/catalogobody.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/vc_auto,q_auto:eco,br_1m/v1773508782/depilacao_drvedo.webm",
  },
  {
    title: "Estética Facial",
    description: "Protocolos exclusivos de rejuvenescimento e cuidados profundos para a saúde da sua pele.",
    icon: "✦",
    href: "/pdf/catalogofacial.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/vc_auto,q_auto:eco,br_1m/v1773508782/facial_rvq2il.webm",
  },
  {
    title: "Tattoo Removal",
    description: "Remoção segura e eficaz de pigmentos com tecnologia laser de última geração.",
    icon: "✦",
    href: "/pdf/catalogotattoo.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/vc_auto,q_auto:eco,br_1m/v1773508792/tattoo_kvon7f.webm",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const ref = useRef(null);
  
  // Lazy Loading Agressivo: Só monta o vídeo quando está próximo da tela
  // once: false permite que o browser limpe a memória do vídeo ao sair da seção
  const isInView = useInView(ref, { once: false, margin: "0px 0px 400px 0px" });

  return (
    <motion.a
      ref={ref}
      variants={cardVariants}
      href={service.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden p-8 md:p-10 border border-white/5 bg-[#1E1A16] min-h-[350px] flex flex-col justify-end transition-all duration-300 will-change-transform"
    >
      {/* VÍDEO OTIMIZADO - Renderização condicional para poupar CPU */}
      {isInView ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
        >
          <source src={service.video} type="video/webm" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-[#1A1612]" />
      )}

      {/* Overlay Sólido de Luxo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/60 to-transparent z-10" />

      <div className="relative z-20">
        <span className="text-primary text-2xl mb-4 block transition-transform group-hover:-translate-y-1">
          {service.icon}
        </span>
        <h3 className="font-display text-xl md:text-2xl mb-3 text-white uppercase tracking-tight">
          {service.title}
        </h3>
        <p className="font-body text-sm text-white/60 leading-relaxed mb-6 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-gold font-bold">
          <span>Ver Detalhes</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.a>
  );
};

const Services = () => {
  return (
    <section id="servicos" className="py-24 md:py-32 px-6 bg-[#1A1612]">
      <Helmet>
        <title>Serviços | Bruna Beauty</title>
      </Helmet>

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-bold">The Experience</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white">
            Nossos <span className="text-gold-gradient">Serviços</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold/30 mx-auto mt-6" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;