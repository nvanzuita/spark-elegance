import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl tracking-luxury mb-2">
            BRUNA <span className="text-gold-gradient">BEAUTY</span>
          </h3>
          <p className="font-elegant text-lg text-muted-foreground italic">Luxury Aesthetic Experience</p>
        </div>

        <div className="gold-separator w-32 mx-auto mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/studio.brunabeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-body text-xs tracking-wider">@studio.brunabeauty</span>
            </a>
          </div>

          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} Bruna Beauty. Todos os direitos reservados.
          </p>
        </div>

        {/* Rastelli Partnership */}
        <div className="mt-10 pt-8 border-t border-border text-center">
          <a
            href="https://rastelliportugal.com/?bg_ref=3BSrM40lRW"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
          >
            Parceira Oficial Rastelli Global — Use o cupom <span className="text-primary font-medium">BRUNA10</span> para 10% OFF
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
