import { motion, Variants, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { AdvancedVideo } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { cld } from "@/hooks/Cloudinary";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Dict } from "@/i18n/translations";

type ServiceKey = keyof Dict["services"]["items"];

// Os textos de cada serviço vêm de src/i18n/translations.ts; aqui ficam só o link e o vídeo.
const services: { key: ServiceKey; href: string; publicId: string }[] = [
  { key: "lashes", href: "/pdf/catalogocilios.pdf", publicId: "pestanas_i4nnur" },
  { key: "lifting", href: "/pdf/catalogolifting.pdf", publicId: "lifting_g24hbt" },
  { key: "brows", href: "/pdf/catalogobrow.pdf", publicId: "browlami_uwliq6" },
  { key: "laser", href: "/pdf/catalogobody.pdf", publicId: "depilacao_drvedo" },
  { key: "facial", href: "/pdf/catalogofacial.pdf", publicId: "facial_rvq2il" },
  { key: "tattoo", href: "/pdf/catalogotattoo.pdf", publicId: "tattoo_kvon7f" },
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

const ServiceCard = ({ service }: { service: (typeof services)[number] }) => {
  const { t } = useLanguage();
  const item = t.services.items[service.key];
  const cardRef = useRef<HTMLAnchorElement>(null);
  // Alteração: Tipagem correta para o componente do Cloudinary
  const videoRef = useRef<any>(null);

  const isInView = useInView(cardRef, {
    once: false,
    margin: "0px 0px 300px 0px",
  });

  // Função segura para dar play
  const safePlay = () => {
    // O AdvancedVideo guarda o elemento real em .videoElement
    const video = videoRef.current?.videoElement;
    if (video && typeof video.play === 'function') {
      video.play().catch(() => {});
    }
  };

  // Função segura para dar pause
  const safePause = () => {
    const video = videoRef.current?.videoElement;
    if (video && typeof video.pause === 'function') {
      video.pause();
    }
  };

  useEffect(() => {
    if (isInView) {
      safePlay();
    } else {
      safePause();
    }
  }, [isInView]);

  const videoAsset = cld
    .video(service.publicId)
    .resize(fill().width(800).height(600).gravity("auto"))
    .quality(auto())
    .format("auto");

  const posterUrl = cld.video(service.publicId).format("auto").toURL();

  return (
    <motion.a
      ref={cardRef} 
      variants={cardVariants}
      href={service.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden p-8 md:p-10 border border-white/5 bg-[#1E1A16] min-h-[350px] flex flex-col justify-end transition-all duration-300 will-change-transform"
      onMouseEnter={safePlay}
      onMouseLeave={safePause}
    >
      {isInView ? (
        <AdvancedVideo
          ref={videoRef}
          cldVid={videoAsset}
          loop
          muted
          playsInline
          autoPlay // Adicionado para garantir o play inicial
          preload="auto"
          poster={posterUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
          controls={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[#1A1612]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/60 to-transparent z-10" />

      <div className="relative z-20">
        <span className="text-primary text-2xl mb-4 block transition-transform group-hover:-translate-y-1">
          ✦
        </span>
        <h3 className="font-display text-xl md:text-2xl mb-3 text-white uppercase tracking-tight">
          {item.title}
        </h3>
        <p className="font-body text-sm text-white/60 leading-relaxed mb-6 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-gold font-bold">
          <span>{t.services.details}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.a>
  );
};

const Services = () => {
  const { t } = useLanguage();
  return (
    <section id="servicos" className="py-24 md:py-32 px-6 bg-[#1A1612]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            {t.services.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white">
            {t.services.titleA} <span className="text-gold-gradient">{t.services.titleB}</span>
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
            <ServiceCard key={service.key} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;