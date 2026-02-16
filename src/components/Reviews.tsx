import { useEffect } from "react";

const Reviews = () => {
  useEffect(() => {
    // 1. Injetamos o script do Elfsight
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    // O Elfsight recomenda carregar o platform.js uma única vez
    document.body.appendChild(script);

    return () => {
      // Limpeza opcional: em SPAs (Single Page Apps), 
      // ajuda a manter a performance ao navegar
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="reviews" className="py-24 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-ultra uppercase text-primary mb-4">
            Feedback das nossas clientes
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
            Avaliações no <span className="italic text-gold-gradient">Google</span>
          </h2>
          <div className="gold-separator w-16 mx-auto" />
        </div>

        {/* 2. A DIV MÁGICA: O Elfsight vai ler este ID e injetar o carrossel aqui */}
        <div 
          className="elfsight-app-9ac8bb6a-2d76-4507-9b51-2f4fe62ae5c9" 
          data-elfsight-app-lazy 
        />
      </div>
    </section>
  );
};

export default Reviews;