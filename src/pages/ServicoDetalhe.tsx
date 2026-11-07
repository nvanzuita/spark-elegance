import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { cld } from "@/hooks/Cloudinary";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, Instagram } from "lucide-react";
import { whatsappLink } from "@/lib/siteConfig";
import { SERVICES_DATA, type ServiceSlug } from "@/lib/servicesData";

// Mapeia o slug da URL para a key usada em translations.ts / SERVICES_DATA
const SLUG_TO_KEY: Record<string, ServiceSlug> = {
  "pestanas-lashes": "lashes",
  "lash-lifting": "lifting",
  "sobrancelhas-brows": "brows",
  "depilacao-laser": "laser",
  "estetica-facial": "facial",
  "remocao-tatuagem": "tattoo",
};

const ServicoDetalhe = () => {
  const { t, lang } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const key = SLUG_TO_KEY[slug ?? ""] as ServiceSlug | undefined;
  const data = key ? SERVICES_DATA[key] : undefined;
  const item = key ? t.services.items[key] : undefined;

  if (!data || !item) {
    return (
      <section className="min-h-screen bg-background px-6 py-24 md:py-32">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Serviço não encontrado
          </h1>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all">
            <ArrowLeft size={14} /> Voltar ao início
          </Link>
        </div>
      </section>
    );
  }

  const videoAsset = cld
    .video(data.publicId)
    .resize(fill().width(1200).height(800).gravity("auto"))
    .quality(auto())
    .format("auto");

  const posterUrl = cld.video(data.publicId).format("auto").toURL();

  const pageTitle = `${item.title} | Bruna Beauty`;

  return (
    <section className="min-h-screen bg-background px-6 py-24 md:py-32">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={item.description} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container mx-auto max-w-7xl">
        {/* Botão voltar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all"
          >
            <ArrowLeft size={14} /> {t.nav.about === "Sobre" ? "Voltar ao início" : "Voltar ao início"}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Coluna esquerda: vídeo/foto do serviço */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-[#1A1612] shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <AdvancedVideo
              cldVid={videoAsset}
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              poster={posterUrl}
              className="w-full h-full object-cover"
              controls={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/80 to-transparent z-10" />
          </motion.div>

          {/* Coluna direita: título, descrição, preço, CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold">
              {t.services.eyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
              {item.title}
            </h1>
            <div className="w-20 h-[1px] bg-gold/30 mb-6" />

            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              {item.description}
            </p>

            {/* Preço */}
            <div className="p-6 rounded-sm border border-gold/30 bg-[#1A1612]/30">
              <p className="font-body text-xs md:text-sm text-muted-foreground mb-2">
                Valor
              </p>
              <p className="font-display text-2xl md:text-3xl text-foreground font-light">
                {data.price}
              </p>
            </div>

            {/* Informação adicional */}
            <div className="p-6 rounded-sm border border-white/10 bg-[#1A1612]/30">
              <h3 className="font-display text-sm md:text-base text-foreground mb-3">
                Como agendar
              </h3>
              <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                Escolha o seu horário diretamente pelo WhatsApp ou através da nossa plataforma de reservas online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink(`Olá! Gostaria de agendar o serviço de ${item.title}. Qual a disponibilidade?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-[#1A1612] text-[10px] tracking-luxury uppercase font-bold hover:opacity-90 transition-all"
                >
                  <span>Agendar via WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/brunabeauty.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all"
                >
                  <Instagram size={14} /> Ver inspirações no Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicoDetalhe;
