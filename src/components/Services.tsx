import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

const services = [
  {
    title: "Pestanas / Lashes",
    description: "Técnicas avançadas de alongamento para realçar o seu olhar com volume e naturalidade.",
    icon: "✦",
    href: "/pdf/catalogocilios.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508783/pestanas_i4nnur.webm", 
  },
  {
    title: "Lash Lifting",
    description: "Curvatura e hidratação dos fios naturais para um efeito de rímel duradouro e sofisticado.",
    icon: "✦",
    href: "/pdf/catalogolifting.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508785/lifting_g24hbt.webm",
  },
  {
    title: "Sobrancelhas / Brows",
    description: "Design personalizado e micropigmentação para harmonizar as linhas do seu rosto.",
    icon: "✦",
    href: "/pdf/catalogobrow.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508781/browlami_uwliq6.webm",
  },
  {
    title: "Depilação a Laser",
    description: "Tecnologia de ponta para uma remoção definitiva e indolor dos pelos indesejados.",
    icon: "✦",
    href: "/pdf/catalogobody.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508782/depilacao_drvedo.webm",
  },
  {
    title: "Estética Facial",
    description: "Protocolos exclusivos de rejuvenescimento e cuidados profundos para a saúde da sua pele.",
    icon: "✦",
    href: "/pdf/catalogofacial.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508782/facial_rvq2il.webm",
  },
  {
    title: "Tattoo Removal",
    description: "Remoção segura e eficaz de pigmentos com tecnologia laser de última geração.",
    icon: "✦",
    href: "/pdf/catalogotattoo.pdf",
    video: "https://res.cloudinary.com/dudnl5whz/video/upload/f_auto,q_auto/v1773508792/tattoo_kvon7f.webm",
  },
];

const containerVariants: Variants = { // Adiciona o tipo aqui
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = { // Adiciona o tipo aqui
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.a
      ref={ref}
      variants={cardVariants} // Aqui é minúsculo
      href={service.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden p-8 md:p-10 border border-border/40 transition-all duration-500 luxury-shadow min-h-[350px] flex flex-col justify-end"
    >
      {isInView && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        >
          <source src={service.video} type="video/webm" />
          <source src={service.video.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#2A241E]/80 to-transparent z-10" />

      <div className="relative z-20">
        <span className="text-primary text-2xl mb-4 block group-hover:translate-y-[-5px] transition-transform duration-500">
          {service.icon}
        </span>
        <h3 className="font-display text-xl md:text-2xl mb-3 text-white">
          {service.title}
        </h3>
        <p className="font-body text-sm text-white/70 leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {service.description}
        </p>
        
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
          <span>Explorar Catálogo</span>
          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
        </div>
      </div>
    </motion.a>
  );
};

const Services = () => {
  return (
    <section id="servicos" className="py-24 md:py-32 px-6 bg-[#1A1612]">
      <Helmet>
        <title>Serviços | Bruna Beauty — Estética de Luxo em Portugal</title>
        <meta name="description" content="Pestanas, Lash Lifting, Micropigmentação e Laser. Descubra os nossos serviços exclusivos." />
      </Helmet>

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            The Experience
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 text-white">
            Nossos <span className="italic text-gold-gradient">Serviços</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold/30 mx-auto" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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