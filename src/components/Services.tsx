import { motion, Variants, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AdvancedVideo } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { cld } from "@/hooks/Cloudinary"; // ajuste o caminho correto

const services = [
  {
    title: "Pestanas / Lashes",
    description: "Técnicas avançadas de alongamento para realçar o seu olhar com volume e naturalidade.",
    icon: "✦",
    href: "/pdf/catalogocilios.pdf",
    publicId: "pestanas_i4nnur", // extraído da URL original
  },
  {
    title: "Lash Lifting",
    description: "Curvatura e hidratação dos fios naturais para um efeito de rímel duradouro e sofisticado.",
    icon: "✦",
    href: "/pdf/catalogolifting.pdf",
    publicId: "lifting_g24hbt",
  },
  {
    title: "Sobrancelhas / Brows",
    description: "Design personalizado e micropigmentação para harmonizar as linhas do seu rosto.",
    icon: "✦",
    href: "/pdf/catalogobrow.pdf",
    publicId: "browlami_uwliq6",
  },
  {
    title: "Depilação a Laser",
    description: "Tecnologia de ponta para uma remoção definitiva e indolor dos pelos indesejados.",
    icon: "✦",
    href: "/pdf/catalogobody.pdf",
    publicId: "depilacao_drvedo",
  },
  {
    title: "Estética Facial",
    description: "Protocolos exclusivos de rejuvenescimento e cuidados profundos para a saúde da sua pele.",
    icon: "✦",
    href: "/pdf/catalogofacial.pdf",
    publicId: "facial_rvq2il",
  },
  {
    title: "Tattoo Removal",
    description: "Remoção segura e eficaz de pigmentos com tecnologia laser de última geração.",
    icon: "✦",
    href: "/pdf/catalogotattoo.pdf",
    publicId: "tattoo_kvon7f",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isInView = useInView(cardRef, {
    once: false, // permite recarregar/pausar múltiplas vezes
    margin: "0px 0px 300px 0px", // carrega um pouco antes (ajustável)
  });

  // Controle de play/pause baseado em visibilidade
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      videoRef.current.play().catch(() => {}); // catch silencioso (políticas mobile)
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  // Config do vídeo otimizado
  const videoAsset = cld
    .video(service.publicId)
    .resize(fill().width(800).height(600).gravity("auto")) // ideal para cards
    .quality(auto()) // auto:eco se quiser ainda mais leve
    .format("auto");

  // Poster automático (Cloudinary pega frame inicial)
  const posterUrl = cld.video(service.publicId).format("auto").toURL();

  return (
    <motion.a
      ref={cardRef} 
      variants={cardVariants}
      href={service.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden p-8 md:p-10 border border-white/5 bg-[#1E1A16] min-h-[350px] flex flex-col justify-end transition-all duration-300 will-change-transform"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      {isInView ? (
        <AdvancedVideo
          ref={videoRef as any} // ref funciona direto no AdvancedVideo (acessa <video> interno)
          cldVid={videoAsset}
          loop
          muted
          playsInline
          preload="none" // crucial para lazy real
          poster={posterUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
          controls={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[#1A1612]" /> // placeholder simples
      )}

      {/* Overlay */}
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
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            The Experience
          </p>
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