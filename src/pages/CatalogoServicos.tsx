import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { cld } from "@/hooks/Cloudinary";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, FileText } from "lucide-react";
import { CATALOGO_DATA, type CatalogoItem, type CatalogoCategoria } from "@/lib/catalogoData";

const CATEGORIA_LABEL: Record<string, string> = {
  "pestanas-lashes": "Pestanas / Lashes",
  "lash-lifting": "Lash Lifting",
  "sobrancelhas-brows": "Sobrancelhas / Brows",
  "depilacao-laser": "Depilação a Laser",
  "estetica-facial": "Estética Facial",
  "remocao-tatuagem": "Remoção de Tatuagem",
};

const catalogoCategoriaParaKey = (categoria: string): CatalogoCategoria | undefined => {
  const chaves: CatalogoCategoria[] = [
    "pestanas-lashes",
    "lash-lifting",
    "sobrancelhas-brows",
    "depilacao-laser",
    "estetica-facial",
    "remocao-tatuagem",
  ];
  return chaves.includes(categoria as CatalogoCategoria) ? (categoria as CatalogoCategoria) : undefined;
};

const CatalogoServicos = () => {
  const { t, lang } = useLanguage();
  const { categoria } = useParams<{ categoria: string }>();
  const key = catalogoCategoriaParaKey(categoria ?? "");
  const itens = key ? CATALOGO_DATA[key] : [];
  const label = CATEGORIA_LABEL[categoria ?? ""] || "Catálogo";
  const pdfDoCategoria = itens.length > 0 ? itens[0].pdf : "";

  if (!key || itens.length === 0) {
    return (
      <section className="min-h-screen bg-background px-6 py-24 md:py-32">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Catálogo não encontrado
          </h1>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all">
            <ArrowLeft size={14} /> Voltar ao início
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background px-6 py-24 md:py-32">
      <Helmet>
        <title>{label} | Bruna Beauty</title>
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container mx-auto max-w-7xl">
        {/* Cabeçalho da página */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all mb-6"
          >
            <ArrowLeft size={14} /> {t.nav.services}
          </Link>
          <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            {t.services.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-4">
            {label}
          </h1>
          {pdfDoCategoria && (
            <a
              href={`/pdf/${pdfDoCategoria}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-8 py-3 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all"
            >
              <FileText size={14} /> Ver catálogo completo (PDF)
            </a>
          )}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Grid de itens do catálogo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {itens.map((item) => {
            const temFotoCloudinary = Boolean(item.fotoPublicId);
            const temFotoLocal = Boolean(item.fotoLocal);
            const posterUrl = temFotoCloudinary ? cld.video(item.fotoPublicId).format("auto").toURL() : "";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-sm overflow-hidden border border-white/10 bg-[#1A1612] shadow-[0_0_20px_rgba(0,0,0,0.4)] flex flex-col"
              >
                {/* Foto / vídeo do item */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {temFotoCloudinary ? (
                    <>
                      <AdvancedVideo
                        cldVid={cld
                          .video(item.fotoPublicId)
                          .resize(fill().width(600).height(800).gravity("auto"))
                          .quality(auto())
                          .format("auto")}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        poster={posterUrl}
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                    </>
                  ) : temFotoLocal ? (
                    <img
                      src={item.fotoLocal}
                      alt={item.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1A1612] flex items-center justify-center text-muted-foreground text-xs">
                      Sem imagem
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/80 to-transparent z-10" />
                  {item.preco && (
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-3 py-1 bg-gold text-[#1A1612] text-[10px] tracking-luxury uppercase font-bold rounded">
                        {item.preco}
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo do item */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg md:text-xl mb-2 text-foreground">
                    {item.nome || "Serviço sem nome"}
                  </h3>
                  {item.descricao && (
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {item.descricao}
                    </p>
                  )}

                  {item.freshaLink ? (
                    <a
                      href={item.freshaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1612] border border-white/10 text-[10px] tracking-luxury uppercase text-foreground hover:bg-white/5 hover:border-white/20 transition-all"
                    >
                      Agendar
                    </a>
                  ) : (
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-[10px] tracking-luxury uppercase text-muted-foreground hover:border-white/20 transition-all" disabled>
                      Agendar em breve
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all"
          >
            <ArrowLeft size={14} /> Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CatalogoServicos;
