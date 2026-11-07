import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Instagram as InstagramIcon } from "lucide-react";

const INSTAGRAM_HANDLE = "brunabeauty.eu";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

// ---------------------------------------------------------------------------
// CONFIGURAÇÃO DA BIO (pré-visualização ao lado)
// ---------------------------------------------------------------------------
// A descrição pode ser ajustada livremente aqui.
const BIO = {
  name: "Bruna Beauty",
  username: INSTAGRAM_HANDLE,
  description:
    "Especialista em extensões de pestanas, estética facial e bem-estar. Técnicas avançadas e ambiente sofisticado para resultados que transformam. Agende o seu horário via WhatsApp ou link na bio.",
} as const;

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
const extractFirstHashtag = (text: string): string => {
  const match = text.match(/#\w+/);
  return match ? match[0] : "";
};

const instagramOEmbed = async (url: string) => {
  const response = await fetch(
    `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&hidecaption=true&omitscript=true`,
    { cache: "no-store" }
  );
  if (!response.ok) throw new Error("oEmbed indisponível");
  return response.json();
};

const InstagramFeed = () => {
  const { lang } = useLanguage();
  const [profile, setProfile] = useState<{
    name: string;
    username: string;
    profilePic: string;
    description: string;
  } | null>(null);
  const [posts, setPosts] = useState<
    Array<{ shortcode: string; embedHtml: string; caption: string; firstHashtag: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Tenta buscar dados do perfil (foto + nome)
        try {
          const profileData = await instagramOEmbed(`${INSTAGRAM_URL}/`);
          setProfile({
            name: profileData.author_name || BIO.name,
            username: INSTAGRAM_HANDLE,
            profilePic: profileData.thumbnail_profile_url || "",
            description: BIO.description,
          });
        } catch {
          setProfile({
            ...BIO,
            profilePic: "",
          });
        }

        // Shortcodes de exemplo — SUBSTITUA pelos reais das publicações do Instagram
        const shortcodes = ["CxxEXEMPLO1", "CxxEXEMPLO2", "CxxEXEMPLO3", "CxxEXEMPLO4"];

        const resultados = await Promise.allSettled(
          shortcodes.map(async (shortcode) => {
            const data = await instagramOEmbed(`https://instagram.com/p/${shortcode}/`);
            const caption = data.title || "";
            return {
              shortcode,
              embedHtml: data.html || "",
              caption,
              firstHashtag: extractFirstHashtag(caption),
            };
          })
        );

        const preenchidos = resultados
          .filter(
            (r): r is PromiseFulfilledResult<{
              shortcode: string;
              embedHtml: string;
              caption: string;
              firstHashtag: string;
            }> => r.status === "fulfilled"
          )
          .map((r) => r.value);

        if (!cancelled) {
          setPosts(preenchidos);
          if (preenchidos.length > 0 && preenchidos[0].firstHashtag) {
            setSectionTitle(preenchidos[0].firstHashtag);
          }
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const tSection =
    lang === "pt"
      ? { eyebrow: "Do Instagram", titleA: "Novidades", cta: "Ver perfil no Instagram" }
      : lang === "en"
        ? { eyebrow: "From Instagram", titleA: "News", cta: "View profile on Instagram" }
        : lang === "fr"
          ? { eyebrow: "Depuis Instagram", titleA: "Actualités", cta: "Voir le profil Instagram" }
          : { eyebrow: "Desde Instagram", titleA: "Novedades", cta: "Ver perfil en Instagram" };

  return (
    <section id="instagram" className="py-24 md:py-32 px-6 border-y border-border">
      <div className="container mx-auto max-w-7xl">
        {/* Cabeçalho seguindo o padrão das outras seções */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold">
            {tSection.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 text-foreground">
            {tSection.titleA} <span className="italic text-gold-gradient">{sectionTitle || "do Instagram"}</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Lado esquerdo: prévia da bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              {profile?.profilePic ? (
                <img
                  src={profile.profilePic}
                  alt={`Foto de perfil do ${profile.username}`}
                  className="w-36 h-36 rounded-full border-4 border-gold/50 object-cover shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                />
              ) : (
                <div className="w-36 h-36 rounded-full border-4 border-gold/50 bg-secondary flex items-center justify-center text-muted-foreground text-sm font-medium">
                  <InstagramIcon size={20} />
                </div>
              )}
            </div>
            <h3 className="font-display text-xl md:text-2xl text-foreground">{profile?.name || BIO.name}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {profile?.description || BIO.description}
            </p>
            <div className="pt-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-2.5 border border-gold/30 text-[10px] tracking-luxury uppercase text-foreground hover:bg-gold/5 hover:border-gold/60 transition-all"
              >
                <InstagramIcon size={14} /> {tSection.cta}
              </a>
            </div>
          </motion.div>

          {/* Lado direito: fotos diretamente do Instagram */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">
                A carregar publicações do Instagram…
              </div>
            ) : posts.length === 0 ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground text-sm">
                Nenhuma publicação disponível.
                <br />
                Adicione shortcodes reais em `src/components/InstagramFeed.tsx`.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.shortcode}
                    className="aspect-[1/1] rounded-sm overflow-hidden border-2 border-gold/50 relative group shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:border-gold transition-all duration-300"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: post.embedHtml }}
                      className="block w-full h-full"
                    />
                    {/* Título com fundo blur marrom escuro 60% */}
                    <div className="absolute inset-0 bg-[#2d2018]/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                      <h4 className="text-xs md:text-sm font-display text-center text-white leading-tight">
                        {post.firstHashtag || "Do Instagram"}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
