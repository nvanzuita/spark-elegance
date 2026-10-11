// Textos do site em 4 idiomas. Português é a base; os outros seguem exatamente a mesma estrutura.

export type Lang = "pt" | "en" | "fr" | "es";

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "pt", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "es", label: "ES", name: "Español" },
];

const pt = {
  meta: {
    title: "Bruna Beauty — Luxury Aesthetic Experience",
    description:
      "Studio de Estética & Pestanas em Portugal. Experiências exclusivas em pestanas, sobrancelhas, estética facial e laser.",
  },
  nav: {
    services: "Serviços",
    mentorias: "Mentorias",
    about: "Sobre",
    contacts: "Contactos",
    book: "Reservar",
    onlineBooking: "Booking Online",
    bookNow: "Agendar Agora",
    academy: "Bruna Beauty Academy",
    language: "Idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    tagline: "Estética Avançada",
  },
  hero: {
    eyebrow: "Studio de Estética & Pestanas",
    subtitle:
      "Onde a beleza encontra a excelência. Técnicas avançadas e ambiente sofisticado para resultados que transformam.",
    ctaServices: "Explorar Serviços",
    ctaBook: "Reservar Agora",
    scroll: "Scroll",
    logoAlt: "Logo Bruna Beauty",
  },
  novidades: {
    eyebrow: "Novidade Exclusiva",
    titleA: "Tecnologia",
    titleB: "Lash LED UV",
    description:
      "Apresentamos a revolucionária Tecnologia Lash LED UV: uma lâmpada de cura por luz LED UV de alta potência, desenvolvida para secar e fixar adesivos de extensão de pestanas em segundos. Com baixo consumo de energia, aquecimento mínimo e design ergonómico, garante uma aplicação mais rápida, segura e confortável — para si e para a sua profissional. Resultados impecáveis, com máxima durabilidade e total respeito pela saúde dos olhos.",
    cta: "Saiba Mais",
    badge: "Novidade",
    videoAlt: "Vídeo demonstrativo da Tecnologia Lash LED UV",
  },
  services: {
    eyebrow: "The Experience",
    titleA: "Nossos",
    titleB: "Serviços",
    details: "Ver Detalhes",
    items: {
      lashes: {
        title: "Pestanas / Lashes",
        description: "Técnicas avançadas de alongamento para realçar o seu olhar com volume e naturalidade.",
      },
      lifting: {
        title: "Lash Lifting",
        description: "Curvatura e hidratação dos fios naturais para um efeito de rímel duradouro e sofisticado.",
      },
      brows: {
        title: "Sobrancelhas / Brows",
        description: "Design personalizado e micropigmentação para harmonizar as linhas do seu rosto.",
      },
      laser: {
        title: "Depilação a Laser",
        description: "Tecnologia de ponta para uma remoção definitiva e indolor dos pelos indesejados.",
      },
      facial: {
        title: "Estética Facial",
        description: "Protocolos exclusivos de rejuvenescimento e cuidados profundos para a saúde da sua pele.",
      },
      tattoo: {
        title: "Tattoo Removal",
        description: "Remoção segura e eficaz de pigmentos com tecnologia laser de última geração.",
      },
    },
  },
  mentorias: {
    eyebrow: "Formação Profissional",
    titleA: "Mentorias",
    titleB: "Premium",
    program: "Ver Programa",
    cta: "Reservar Vaga via WhatsApp",
    items: {
      lash: {
        title: "Lash Design — Zero a Referência",
        description:
          "Formação completa para dominar a arte das pestanas e se tornar referência no mercado premium.",
      },
      brow: {
        title: "Brow Lamination",
        description: "Domine a técnica de laminação de sobrancelhas com acabamento impecável.",
      },
      hydra: {
        title: "HydraLips",
        description: "Aprenda a técnica de hidratação labial premium com resultados duradouros.",
      },
      laser: {
        title: "Lash LED UV",
        description: "Domine a Tecnologia Lash LED UV e leve a aplicação de extensões a outro nível de precisão e durabilidade.",
      },
    },
  },
  about: {
    eyebrow: "Nossa História",
    titleA: "Conheça a",
    titleB: "Bruna",
    quote: "Mais do que estética, eu ensino independência, confiança e transformação.",
    p1: "Olá, eu sou Bruna Rodrigues. Nasci em Cascavel, Paraná, vivi por 11 anos em Balneário Camboriú e em 2021 decidi atravessar o oceano para recomeçar em Lisboa, Portugal.",
    p2: "Após mais de 5 anos de atuação na área da estética, percebi que minha missão ia além de atender clientes. Reuni experiências, erros, acertos e aprendizados para criar conteúdo verdadeiramente focado em profissionalizar mulheres sonhadoras e determinadas.",
    p3: "Acredito que quando uma mulher se capacita, ela muda não só sua carreira, mas a própria vida.",
    studioTitle: "O Studio Bruna Beauty",
    studioText:
      "Fundado em outubro de 2023, em Portugal, o Studio nasceu com a proposta de oferecer uma experiência exclusiva em estética, onde beleza, técnica e sofisticação caminham lado a lado. Um ambiente cuidadosamente pensado para proporcionar conforto, confiança e uma experiência premium.",
    values: ["Excelência", "Sofisticação", "Inovação"],
    prev: "Foto anterior",
    next: "Foto seguinte",
    goTo: "Ir para a foto",
  },
  booking: {
    eyebrow: "Reserva de Experiência",
    titleA: "Garanta o Seu",
    titleB: "Momento",
    intro: "Garanta o seu momento de cuidado exclusivo em nosso Studio.",
    hoursTitle: "Horário",
    hoursLines: ["Terça a Sexta • 10h–19h", "Sábado • 10h–17h"],
    paymentTitle: "Pagamento",
    paymentLines: ["MB Way, Numerário", "ou Transferência Bancária"],
    etiquetteTitle: "Etiqueta",
    etiquetteLines: ["Taxa de reserva: 15€", "Cancelamento com 24h antecedência"],
    whatsapp: "Reservar via WhatsApp",
    online: "Reservar Online",
    waMessage: "Olá Bruna! Vim através do Site, e gostaria de Reservar um Horário! 🤩💜",
  },
  location: {
    eyebrow: "Onde Nos Encontrar",
    titleA: "Visite o",
    titleB: "Studio",
    addressLabel: "Endereço",
    address: "Rua Latino Coelho, Parede, Cascais, Portugal",
    hoursLabel: "Horário",
    hoursLines: ["Terça a Sexta • 10h–19h", "Sábado • 10h–17h"],
    transportLabel: "Como chegar",
    transport: "Fácil acesso e estacionamento nas proximidades. Estação de comboios de Parede a poucos minutos.",
    cta: "Ver no Google Maps",
  },
  reviews: {
    eyebrow: "Feedback das nossas clientes",
    titleA: "Avaliações no",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Esclareça suas dúvidas",
    titleA: "Dúvidas",
    titleB: "Frequentes",
    groups: [
      {
        title: "Serviços",
        items: [
          {
            q: "Sobre Pestanas",
            a: "Trabalhamos com mais de 12 opções de extensões, desde efeitos naturais até aos volumosos, utilizando materiais hipoalergênicos para garantir a saúde dos seus olhos.",
          },
          {
            q: "Sobre Limpeza de Pele",
            a: "Nossa limpeza profunda inclui extração manual e peeling ultrassônico para renovação celular completa.",
          },
          {
            q: "Sobre Hydralips",
            a: "Um tratamento de hidratação profunda que revitaliza o tecido labial, deixando-os com aspecto saudável e jovem.",
          },
          {
            q: "Sobre Depilação",
            a: "Utilizamos métodos que minimizam o desconforto, adequados para todos os tipos de pele, incluindo as mais sensíveis.",
          },
          {
            q: "Sobre Remoção de Tatuagem",
            a: "Realizamos o procedimento com laser de última geração, focado na segurança e eficácia da remoção do pigmento.",
          },
        ],
      },
      {
        title: "Reservas & Cancelamentos",
        items: [
          {
            q: "Como faço para reservar?",
            a: "Pode reservar diretamente pelo botão de Booking Online, por WhatsApp ou através da nossa página de reservas. A taxa de reserva é de 15€.",
          },
          {
            q: "Sobre Política de Cancelamento",
            a: "Cancelamentos devem ser feitos com no mínimo 24h de antecedência para evitarmos a cobrança de taxa de reserva.",
          },
        ],
      },
      {
        title: "Formações",
        items: [
          {
            q: "Sobre Mentorias",
            a: "Oferecemos formações exclusivas para profissionais que desejam elevar o nível técnico e de gestão no mundo da beleza.",
          },
        ],
      },
      {
        title: "O Studio",
        items: [
          {
            q: "Sobre Localização do Studio",
            a: "Estamos situados em uma zona privilegiada de Lisboa, com facilidade de estacionamento e acesso.",
          },
        ],
      },
    ],
    contactTitle: "Ainda tem dúvidas?",
    contactText: "A nossa equipa está disponível para a ajudar a escolher o tratamento ideal para si.",
    contactCta: "Falar no WhatsApp",
  },
  cookies: {
    title: "Utilizamos cookies",
    message:
      "Usamos cookies para melhorar a sua experiência de navegação, analisar o tráfego do site e apresentar conteúdos de terceiros (como as avaliações do Google). Pode aceitar todos ou manter apenas os essenciais.",
    acceptAll: "Aceitar todos",
    essentialOnly: "Apenas essenciais",
    policyLink: "Política de Privacidade",
  },
  privacy: {
    pageTitle: "Política de Privacidade & Cookies — Bruna Beauty",
    eyebrow: "Legal",
    title: "Política de Privacidade",
    updated: "Última atualização",
    backHome: "Voltar ao início",
    intro:
      "A sua privacidade é importante para nós. Esta política explica quais os dados que recolhemos, como os utilizamos e quais são os seus direitos, em conformidade com o RGPD (Regulamento Geral sobre a Proteção de Dados) e a legislação portuguesa aplicável.",
    sections: [
      {
        heading: "1. Quem somos",
        body: "O Studio Bruna Beauty é o responsável pelo tratamento dos dados recolhidos através deste website. Para qualquer questão relacionada com privacidade, pode contactar-nos por WhatsApp ou através das nossas redes sociais.",
      },
      {
        heading: "2. Que dados recolhemos",
        body: "Este website não possui formulários de registo nem área de cliente. Recolhemos apenas dados de navegação de forma agregada e anónima (páginas visitadas, idioma escolhido e tipo de dispositivo). As marcações são efetuadas através de plataformas externas (Fresha e WhatsApp), que têm as suas próprias políticas de privacidade.",
      },
      {
        heading: "3. Cookies",
        body: "Um cookie é um pequeno ficheiro guardado no seu dispositivo. Utilizamos cookies essenciais (necessários para o funcionamento do site e para recordar o idioma escolhido) e cookies de terceiros: Google Fonts (carregamento de tipos de letra), Cloudinary (alojamento de vídeos e imagens) e Elfsight (widget de avaliações do Google). Os cookies de terceiros só são ativados após o seu consentimento, que pode retirar a qualquer momento limpando os dados do site no seu navegador.",
      },
      {
        heading: "4. Com quem partilhamos os dados",
        body: "Não vendemos nem partilhamos os seus dados pessoais para fins comerciais. Partilhamos apenas informação técnica necessária com os prestadores de serviços mencionados acima, estritamente para operar o website.",
      },
      {
        heading: "5. Os seus direitos",
        body: "Ao abrigo do RGPD, tem o direito de aceder, retificar, apagar ou limitar o tratamento dos seus dados, bem como de retirar o consentimento a qualquer momento. Para exercer qualquer um destes direitos, contacte-nos pelos canais indicados.",
      },
      {
        heading: "6. Alterações a esta política",
        body: "Podemos atualizar esta política periodicamente. Quaisquer alterações serão publicadas nesta página com a data de atualização revista.",
      },
    ],
  },
  footer: {
    rights: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    partnerBefore: "Parceira Oficial Rastelli Global — Use o cupom",
    partnerAfter: "para 10% OFF",
  },
  badge: {
    official: "Parceiro Oficial",
    off: "-10% OFF",
    close: "Fechar",
  },
  notFound: {
    pageTitle: "404 | Página não encontrada — Bruna Beauty",
    eyebrow: "Erro 404",
    titleA: "Beleza em",
    titleB: "Construção",
    text: "A página que procura não existe ou foi movida. Permita-nos guiar o seu olhar de volta à excelência.",
    home: "Voltar ao Início",
    support: "Suporte via WhatsApp",
  },
};

export type Dict = typeof pt;

const en: Dict = {
  meta: {
    title: "Bruna Beauty — Luxury Aesthetic Experience",
    description:
      "Aesthetics & Lash Studio in Portugal. Exclusive experiences in lashes, brows, facial aesthetics and laser treatments.",
  },
  nav: {
    services: "Services",
    mentorias: "Mentorships",
    about: "About",
    contacts: "Contact",
    book: "Book",
    onlineBooking: "Online Booking",
    bookNow: "Book Now",
    academy: "Bruna Beauty Academy",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    tagline: "Advanced Aesthetics",
  },
  hero: {
    eyebrow: "Aesthetics & Lash Studio",
    subtitle:
      "Where beauty meets excellence. Advanced techniques and a sophisticated setting for results that transform.",
    ctaServices: "Explore Services",
    ctaBook: "Book Now",
    scroll: "Scroll",
    logoAlt: "Bruna Beauty logo",
  },
  novidades: {
    eyebrow: "Exclusive New Arrival",
    titleA: "Lash LED UV",
    titleB: "Technology",
    description:
      "Introducing the revolutionary Lash LED UV Technology: a high-power LED UV curing lamp designed to dry and set eyelash extension adhesives in seconds. With low energy consumption, minimal heat and an ergonomic design, it ensures a faster, safer and more comfortable application — for you and your technician. Flawless results with maximum longevity and full respect for the health of your eyes.",
    cta: "Learn More",
    badge: "New",
    videoAlt: "Demonstration video of the Lash LED UV Technology",
  },
  services: {
    eyebrow: "The Experience",
    titleA: "Our",
    titleB: "Services",
    details: "View Details",
    items: {
      lashes: {
        title: "Lash Extensions",
        description: "Advanced extension techniques to enhance your eyes with volume and a natural finish.",
      },
      lifting: {
        title: "Lash Lifting",
        description: "Curl and hydration for your natural lashes, for a lasting, sophisticated mascara effect.",
      },
      brows: {
        title: "Brows",
        description: "Personalised design and micropigmentation to harmonise the lines of your face.",
      },
      laser: {
        title: "Laser Hair Removal",
        description: "Cutting-edge technology for permanent, painless removal of unwanted hair.",
      },
      facial: {
        title: "Facial Aesthetics",
        description: "Exclusive rejuvenation protocols and deep care for the health of your skin.",
      },
      tattoo: {
        title: "Tattoo Removal",
        description: "Safe, effective pigment removal with state-of-the-art laser technology.",
      },
    },
  },
  mentorias: {
    eyebrow: "Professional Training",
    titleA: "Premium",
    titleB: "Mentorships",
    program: "View Program",
    cta: "Reserve Your Spot on WhatsApp",
    items: {
      lash: {
        title: "Lash Design — From Zero to Reference",
        description:
          "Complete training to master the art of lashes and become a reference in the premium market.",
      },
      brow: {
        title: "Brow Lamination",
        description: "Master the brow lamination technique with an impeccable finish.",
      },
      hydra: {
        title: "HydraLips",
        description: "Learn the premium lip hydration technique with long-lasting results.",
      },
      laser: {
        title: "Lash LED UV",
        description: "Master Lash LED UV Technology and take your extension application to the next level of precision and longevity.",
      },
    },
  },
  about: {
    eyebrow: "Our Story",
    titleA: "Meet",
    titleB: "Bruna",
    quote: "More than aesthetics, I teach independence, confidence and transformation.",
    p1: "Hello, I'm Bruna Rodrigues. I was born in Cascavel, Paraná, lived for 11 years in Balneário Camboriú, and in 2021 decided to cross the ocean to start over in Lisbon, Portugal.",
    p2: "After more than 5 years working in aesthetics, I realised my mission went beyond serving clients. I gathered experiences, mistakes, successes and lessons to create content truly focused on professionalising women who are dreamers and determined.",
    p3: "I believe that when a woman builds her skills, she changes not only her career, but her whole life.",
    studioTitle: "The Bruna Beauty Studio",
    studioText:
      "Founded in October 2023 in Portugal, the Studio was created to offer an exclusive aesthetics experience, where beauty, technique and sophistication go hand in hand. A carefully designed space that provides comfort, confidence and a premium experience.",
    values: ["Excellence", "Sophistication", "Innovation"],
    prev: "Previous photo",
    next: "Next photo",
    goTo: "Go to photo",
  },
  booking: {
    eyebrow: "Book Your Experience",
    titleA: "Secure Your",
    titleB: "Moment",
    intro: "Secure your moment of exclusive care at our Studio.",
    hoursTitle: "Opening Hours",
    hoursLines: ["Tuesday to Friday • 10am–7pm", "Saturday • 10am–5pm"],
    paymentTitle: "Payment",
    paymentLines: ["MB Way, Cash", "or Bank Transfer"],
    etiquetteTitle: "Booking Policy",
    etiquetteLines: ["Booking fee: €15", "Cancel at least 24h in advance"],
    whatsapp: "Book via WhatsApp",
    online: "Book Online",
    waMessage: "Hi Bruna! I found you through your website and I'd like to book an appointment! 🤩💜",
  },
  location: {
    eyebrow: "Find Us",
    titleA: "Visit the",
    titleB: "Studio",
    addressLabel: "Address",
    address: "Rua Latino Coelho, Parede, Cascais, Portugal",
    hoursLabel: "Opening hours",
    hoursLines: ["Tuesday to Friday • 10am–7pm", "Saturday • 10am–5pm"],
    transportLabel: "Getting here",
    transport: "Easy access with parking nearby. Parede train station is just a few minutes away.",
    cta: "View on Google Maps",
  },
  reviews: {
    eyebrow: "What our clients say",
    titleA: "Reviews on",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Get your questions answered",
    titleA: "Frequently Asked",
    titleB: "Questions",
    groups: [
      {
        title: "Services",
        items: [
          {
            q: "About Lashes",
            a: "We offer more than 12 extension options, from natural to voluminous effects, using hypoallergenic materials to protect the health of your eyes.",
          },
          {
            q: "About Facial Cleansing",
            a: "Our deep cleansing includes manual extraction and ultrasonic peeling for complete cell renewal.",
          },
          {
            q: "About Hydralips",
            a: "A deep hydration treatment that revitalises the lip tissue, leaving lips looking healthy and youthful.",
          },
          {
            q: "About Hair Removal",
            a: "We use methods that minimise discomfort, suitable for all skin types, including the most sensitive.",
          },
          {
            q: "About Tattoo Removal",
            a: "We perform the procedure with a state-of-the-art laser, focused on the safety and effectiveness of pigment removal.",
          },
        ],
      },
      {
        title: "Bookings & Cancellations",
        items: [
          {
            q: "How do I book?",
            a: "You can book directly through the Online Booking button, via WhatsApp, or through our booking page. The booking fee is €15.",
          },
          {
            q: "About the Cancellation Policy",
            a: "Cancellations must be made at least 24 hours in advance to avoid a booking fee charge.",
          },
        ],
      },
      {
        title: "Training",
        items: [
          {
            q: "About Mentorships",
            a: "We offer exclusive training for professionals who want to raise their technical and management level in the beauty world.",
          },
        ],
      },
      {
        title: "The Studio",
        items: [
          {
            q: "About the Studio Location",
            a: "We are located in a privileged area of Lisbon, with easy parking and access.",
          },
        ],
      },
    ],
    contactTitle: "Still have questions?",
    contactText: "Our team is available to help you choose the ideal treatment for you.",
    contactCta: "Chat on WhatsApp",
  },
  cookies: {
    title: "We use cookies",
    message:
      "We use cookies to improve your browsing experience, analyse site traffic and display third-party content (such as Google reviews). You can accept all of them or keep only the essential ones.",
    acceptAll: "Accept all",
    essentialOnly: "Essential only",
    policyLink: "Privacy Policy",
  },
  privacy: {
    pageTitle: "Privacy & Cookie Policy — Bruna Beauty",
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: "Last updated",
    backHome: "Back to home",
    intro:
      "Your privacy is important to us. This policy explains what data we collect, how we use it and what your rights are, in accordance with the GDPR (General Data Protection Regulation) and applicable law.",
    sections: [
      {
        heading: "1. Who we are",
        body: "Studio Bruna Beauty is the data controller for the information collected through this website. For any privacy-related question, you can contact us via WhatsApp or through our social media.",
      },
      {
        heading: "2. What data we collect",
        body: "This website has no registration forms or customer area. We only collect browsing data in an aggregated, anonymous way (pages visited, chosen language and device type). Bookings are made through external platforms (Fresha and WhatsApp), which have their own privacy policies.",
      },
      {
        heading: "3. Cookies",
        body: "A cookie is a small file stored on your device. We use essential cookies (required for the site to work and to remember your chosen language) and third-party cookies: Google Fonts (font loading), Cloudinary (video and image hosting) and Elfsight (Google reviews widget). Third-party cookies are only activated after your consent, which you can withdraw at any time by clearing the site data in your browser.",
      },
      {
        heading: "4. Who we share data with",
        body: "We do not sell or share your personal data for commercial purposes. We only share the technical information necessary with the service providers mentioned above, strictly to operate the website.",
      },
      {
        heading: "5. Your rights",
        body: "Under the GDPR, you have the right to access, rectify, erase or restrict the processing of your data, as well as to withdraw your consent at any time. To exercise any of these rights, please contact us through the channels indicated.",
      },
      {
        heading: "6. Changes to this policy",
        body: "We may update this policy from time to time. Any changes will be published on this page with a revised update date.",
      },
    ],
  },
  footer: {
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    partnerBefore: "Official Rastelli Global Partner — Use code",
    partnerAfter: "for 10% OFF",
  },
  badge: {
    official: "Official Partner",
    off: "-10% OFF",
    close: "Close",
  },
  notFound: {
    pageTitle: "404 | Page not found — Bruna Beauty",
    eyebrow: "Error 404",
    titleA: "Beauty under",
    titleB: "Construction",
    text: "The page you're looking for doesn't exist or has been moved. Let us guide your gaze back to excellence.",
    home: "Back to Home",
    support: "Support via WhatsApp",
  },
};

const fr: Dict = {
  meta: {
    title: "Bruna Beauty — Luxury Aesthetic Experience",
    description:
      "Studio d'esthétique et de cils au Portugal. Expériences exclusives : cils, sourcils, soins du visage et laser.",
  },
  nav: {
    services: "Services",
    mentorias: "Mentorats",
    about: "À propos",
    contacts: "Contact",
    book: "Réserver",
    onlineBooking: "Réservation en ligne",
    bookNow: "Réserver maintenant",
    academy: "Bruna Beauty Academy",
    language: "Langue",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    tagline: "Esthétique Avancée",
  },
  hero: {
    eyebrow: "Studio d'Esthétique & Cils",
    subtitle:
      "Là où la beauté rencontre l'excellence. Techniques avancées et cadre raffiné pour des résultats qui transforment.",
    ctaServices: "Découvrir les services",
    ctaBook: "Réserver maintenant",
    scroll: "Défiler",
    logoAlt: "Logo Bruna Beauty",
  },
  novidades: {
    eyebrow: "Nouveauté exclusive",
    titleA: "Technologie",
    titleB: "Lash LED UV",
    description:
      "Découvrez la révolutionnaire Technologie Lash LED UV : une lampe de polymérisation LED UV haute puissance conçue pour sécher et fixer les colles d'extensions de cils en quelques secondes. Avec une faible consommation d'énergie, un dégagement de chaleur minimal et un design ergonomique, elle garantit une application plus rapide, plus sûre et plus confortable — pour vous comme pour votre professionnelle. Des résultats impeccables, longue tenue et plein respect de la santé de vos yeux.",
    cta: "En Savoir Plus",
    badge: "Nouveauté",
    videoAlt: "Vidéo de démonstration de la Technologie Lash LED UV",
  },
  services: {
    eyebrow: "L'Expérience",
    titleA: "Nos",
    titleB: "Services",
    details: "Voir les détails",
    items: {
      lashes: {
        title: "Extensions de cils",
        description: "Techniques d'extension avancées pour sublimer votre regard avec volume et naturel.",
      },
      lifting: {
        title: "Lash Lifting",
        description: "Courbure et hydratation des cils naturels pour un effet mascara durable et raffiné.",
      },
      brows: {
        title: "Sourcils",
        description: "Design personnalisé et micropigmentation pour harmoniser les traits de votre visage.",
      },
      laser: {
        title: "Épilation laser",
        description: "Technologie de pointe pour une épilation définitive et indolore des poils indésirables.",
      },
      facial: {
        title: "Esthétique du visage",
        description: "Protocoles exclusifs de rajeunissement et soins profonds pour la santé de votre peau.",
      },
      tattoo: {
        title: "Détatouage",
        description:
          "Élimination sûre et efficace des pigments grâce à une technologie laser de dernière génération.",
      },
    },
  },
  mentorias: {
    eyebrow: "Formation professionnelle",
    titleA: "Mentorats",
    titleB: "Premium",
    program: "Voir le programme",
    cta: "Réserver votre place sur WhatsApp",
    items: {
      lash: {
        title: "Lash Design — De zéro à référence",
        description:
          "Formation complète pour maîtriser l'art des cils et devenir une référence sur le marché premium.",
      },
      brow: {
        title: "Brow Lamination",
        description: "Maîtrisez la technique de lamination des sourcils avec une finition impeccable.",
      },
      hydra: {
        title: "HydraLips",
        description: "Apprenez la technique premium d'hydratation des lèvres aux résultats durables.",
      },
      laser: {
        title: "Lash LED UV",
        description: "Maîtrisez la Technologie Lash LED UV et amenez la pose d'extensions à un niveau supérieur de précision et de tenue.",
      },
    },
  },
  about: {
    eyebrow: "Notre histoire",
    titleA: "Rencontrez",
    titleB: "Bruna",
    quote: "Plus que de l'esthétique, j'enseigne l'indépendance, la confiance et la transformation.",
    p1: "Bonjour, je suis Bruna Rodrigues. Je suis née à Cascavel, dans le Paraná, j'ai vécu 11 ans à Balneário Camboriú et, en 2021, j'ai décidé de traverser l'océan pour recommencer à Lisbonne, au Portugal.",
    p2: "Après plus de 5 ans dans l'esthétique, j'ai compris que ma mission allait au-delà de servir des clientes. J'ai réuni expériences, erreurs, réussites et apprentissages pour créer un contenu vraiment axé sur la professionnalisation de femmes rêveuses et déterminées.",
    p3: "Je crois que lorsqu'une femme se forme, elle change non seulement sa carrière, mais sa vie tout entière.",
    studioTitle: "Le Studio Bruna Beauty",
    studioText:
      "Fondé en octobre 2023 au Portugal, le Studio est né avec l'ambition d'offrir une expérience d'esthétique exclusive, où beauté, technique et sophistication vont de pair. Un cadre soigneusement pensé pour offrir confort, confiance et une expérience premium.",
    values: ["Excellence", "Sophistication", "Innovation"],
    prev: "Photo précédente",
    next: "Photo suivante",
    goTo: "Aller à la photo",
  },
  booking: {
    eyebrow: "Réservez votre expérience",
    titleA: "Réservez Votre",
    titleB: "Moment",
    intro: "Réservez votre moment de soin exclusif dans notre Studio.",
    hoursTitle: "Horaires",
    hoursLines: ["Mardi au vendredi • 10h–19h", "Samedi • 10h–17h"],
    paymentTitle: "Paiement",
    paymentLines: ["MB Way, espèces", "ou virement bancaire"],
    etiquetteTitle: "Politique de réservation",
    etiquetteLines: ["Frais de réservation : 15 €", "Annulation 24 h à l'avance"],
    whatsapp: "Réserver via WhatsApp",
    online: "Réserver en ligne",
    waMessage: "Bonjour Bruna ! Je viens de votre site et j'aimerais réserver un rendez-vous ! 🤩💜",
  },
  location: {
    eyebrow: "Où Nous Trouver",
    titleA: "Visitez le",
    titleB: "Studio",
    addressLabel: "Adresse",
    address: "Rua Latino Coelho, Parede, Cascais, Portugal",
    hoursLabel: "Horaires",
    hoursLines: ["Mardi au vendredi • 10h–19h", "Samedi • 10h–17h"],
    transportLabel: "Comment y venir",
    transport: "Accès facile et stationnement à proximité. La gare de Parede est à quelques minutes.",
    cta: "Voir sur Google Maps",
  },
  reviews: {
    eyebrow: "Avis de nos clientes",
    titleA: "Avis sur",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Vos questions, nos réponses",
    titleA: "Questions",
    titleB: "Fréquentes",
    groups: [
      {
        title: "Services",
        items: [
          {
            q: "À propos des cils",
            a: "Nous proposons plus de 12 options d'extensions, des effets naturels aux effets volumineux, avec des matériaux hypoallergéniques pour préserver la santé de vos yeux.",
          },
          {
            q: "À propos du nettoyage de peau",
            a: "Notre nettoyage en profondeur comprend une extraction manuelle et un peeling ultrasonique pour un renouvellement cellulaire complet.",
          },
          {
            q: "À propos de Hydralips",
            a: "Un soin d'hydratation profonde qui revitalise les lèvres et leur donne un aspect sain et jeune.",
          },
          {
            q: "À propos de l'épilation",
            a: "Nous utilisons des méthodes qui minimisent l'inconfort, adaptées à tous les types de peau, y compris les plus sensibles.",
          },
          {
            q: "À propos du détatouage",
            a: "Nous réalisons la procédure avec un laser de dernière génération, axé sur la sécurité et l'efficacité de l'élimination du pigment.",
          },
        ],
      },
      {
        title: "Réservations & annulations",
        items: [
          {
            q: "Comment réserver ?",
            a: "Vous pouvez réserver directement via le bouton Réservation en ligne, par WhatsApp ou via notre page de réservation. Les frais de réservation sont de 15 €.",
          },
          {
            q: "À propos de la politique d'annulation",
            a: "Les annulations doivent être faites au moins 24 h à l'avance afin d'éviter la facturation des frais de réservation.",
          },
        ],
      },
      {
        title: "Formations",
        items: [
          {
            q: "À propos des mentorats",
            a: "Nous proposons des formations exclusives pour les professionnelles qui souhaitent élever leur niveau technique et de gestion dans le monde de la beauté.",
          },
        ],
      },
      {
        title: "Le Studio",
        items: [
          {
            q: "À propos de l'emplacement du Studio",
            a: "Nous sommes situés dans un quartier privilégié de Lisbonne, avec un accès et un stationnement faciles.",
          },
        ],
      },
    ],
    contactTitle: "Vous avez encore des questions ?",
    contactText: "Notre équipe est disponible pour vous aider à choisir le soin idéal pour vous.",
    contactCta: "Discuter sur WhatsApp",
  },
  cookies: {
    title: "Nous utilisons des cookies",
    message:
      "Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et afficher du contenu tiers (comme les avis Google). Vous pouvez tous les accepter ou ne conserver que l'essentiel.",
    acceptAll: "Tout accepter",
    essentialOnly: "Essentiels uniquement",
    policyLink: "Politique de confidentialité",
  },
  privacy: {
    pageTitle: "Politique de confidentialité & cookies — Bruna Beauty",
    eyebrow: "Mentions légales",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour",
    backHome: "Retour à l'accueil",
    intro:
      "Votre vie privée est importante pour nous. Cette politique explique quelles données nous collectons, comment nous les utilisons et quels sont vos droits, conformément au RGPD (Règlement général sur la protection des données) et à la législation applicable.",
    sections: [
      {
        heading: "1. Qui sommes-nous",
        body: "Le Studio Bruna Beauty est le responsable du traitement des données collectées via ce site web. Pour toute question relative à la confidentialité, vous pouvez nous contacter par WhatsApp ou via nos réseaux sociaux.",
      },
      {
        heading: "2. Quelles données nous collectons",
        body: "Ce site ne comporte ni formulaire d'inscription ni espace client. Nous collectons uniquement des données de navigation de manière agrégée et anonyme (pages visitées, langue choisie et type d'appareil). Les réservations sont effectuées via des plateformes externes (Fresha et WhatsApp), qui ont leurs propres politiques de confidentialité.",
      },
      {
        heading: "3. Cookies",
        body: "Un cookie est un petit fichier stocké sur votre appareil. Nous utilisons des cookies essentiels (nécessaires au fonctionnement du site et pour mémoriser votre langue) et des cookies tiers : Google Fonts (chargement des polices), Cloudinary (hébergement vidéo et image) et Elfsight (widget d'avis Google). Les cookies tiers ne sont activés qu'après votre consentement, que vous pouvez retirer à tout moment en effaçant les données du site dans votre navigateur.",
      },
      {
        heading: "4. Avec qui nous partageons les données",
        body: "Nous ne vendons ni ne partageons vos données personnelles à des fins commerciales. Nous partageons uniquement les informations techniques nécessaires avec les prestataires mentionnés ci-dessus, strictement pour faire fonctionner le site.",
      },
      {
        heading: "5. Vos droits",
        body: "En vertu du RGPD, vous avez le droit d'accéder, de rectifier, d'effacer ou de limiter le traitement de vos données, ainsi que de retirer votre consentement à tout moment. Pour exercer l'un de ces droits, contactez-nous via les canaux indiqués.",
      },
      {
        heading: "6. Modifications de cette politique",
        body: "Nous pouvons mettre à jour cette politique périodiquement. Toute modification sera publiée sur cette page avec une date de mise à jour révisée.",
      },
    ],
  },
  footer: {
    rights: "Tous droits réservés.",
    privacy: "Politique de confidentialité",
    partnerBefore: "Partenaire officielle Rastelli Global — Utilisez le code",
    partnerAfter: "pour 10 % de réduction",
  },
  badge: {
    official: "Partenaire officiel",
    off: "-10 %",
    close: "Fermer",
  },
  notFound: {
    pageTitle: "404 | Page introuvable — Bruna Beauty",
    eyebrow: "Erreur 404",
    titleA: "Beauté en",
    titleB: "Construction",
    text: "La page que vous recherchez n'existe pas ou a été déplacée. Laissez-nous ramener votre regard vers l'excellence.",
    home: "Retour à l'accueil",
    support: "Assistance via WhatsApp",
  },
};

const es: Dict = {
  meta: {
    title: "Bruna Beauty — Luxury Aesthetic Experience",
    description:
      "Estudio de estética y pestañas en Portugal. Experiencias exclusivas en pestañas, cejas, estética facial y láser.",
  },
  nav: {
    services: "Servicios",
    mentorias: "Mentorías",
    about: "Sobre Bruna",
    contacts: "Contacto",
    book: "Reservar",
    onlineBooking: "Reserva online",
    bookNow: "Reservar ahora",
    academy: "Bruna Beauty Academy",
    language: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    tagline: "Estética Avanzada",
  },
  hero: {
    eyebrow: "Estudio de Estética y Pestañas",
    subtitle:
      "Donde la belleza se encuentra con la excelencia. Técnicas avanzadas y un ambiente sofisticado para resultados que transforman.",
    ctaServices: "Explorar servicios",
    ctaBook: "Reservar ahora",
    scroll: "Desliza",
    logoAlt: "Logo Bruna Beauty",
  },
  novidades: {
    eyebrow: "Novedad exclusiva",
    titleA: "Tecnología",
    titleB: "Lash LED UV",
    description:
      "Presentamos la revolucionaria Tecnología Lash LED UV: una lámpara de curado LED UV de alta potencia diseñada para secar y fijar adhesivos de extensiones de pestañas en segundos. Con bajo consumo de energía, calor mínimo y diseño ergonómico, garantiza una aplicación más rápida, segura y cómoda — para ti y para tu profesional. Resultados impecables, máxima duración y total respeto por la salud de tus ojos.",
    cta: "Saber Más",
    badge: "Novedad",
    videoAlt: "Vídeo de demostración de la Tecnología Lash LED UV",
  },
  services: {
    eyebrow: "La Experiencia",
    titleA: "Nuestros",
    titleB: "Servicios",
    details: "Ver detalles",
    items: {
      lashes: {
        title: "Extensiones de pestañas",
        description: "Técnicas avanzadas de extensión para realzar tu mirada con volumen y naturalidad.",
      },
      lifting: {
        title: "Lash Lifting",
        description:
          "Curvatura e hidratación de las pestañas naturales para un efecto rímel duradero y sofisticado.",
      },
      brows: {
        title: "Cejas",
        description: "Diseño personalizado y micropigmentación para armonizar las líneas de tu rostro.",
      },
      laser: {
        title: "Depilación láser",
        description: "Tecnología de vanguardia para una eliminación definitiva e indolora del vello no deseado.",
      },
      facial: {
        title: "Estética Facial",
        description: "Protocolos exclusivos de rejuvenecimiento y cuidados profundos para la salud de tu piel.",
      },
      tattoo: {
        title: "Eliminación de tatuajes",
        description: "Eliminación segura y eficaz de pigmentos con tecnología láser de última generación.",
      },
    },
  },
  mentorias: {
    eyebrow: "Formación profesional",
    titleA: "Mentorías",
    titleB: "Premium",
    program: "Ver programa",
    cta: "Reservar plaza por WhatsApp",
    items: {
      lash: {
        title: "Lash Design — De cero a referente",
        description:
          "Formación completa para dominar el arte de las pestañas y convertirte en referente del mercado premium.",
      },
      brow: {
        title: "Brow Lamination",
        description: "Domina la técnica de laminado de cejas con un acabado impecable.",
      },
      hydra: {
        title: "HydraLips",
        description: "Aprende la técnica premium de hidratación labial con resultados duraderos.",
      },
      laser: {
        title: "Lash LED UV",
        description: "Domina la Tecnología Lash LED UV y lleva la aplicación de extensiones a otro nivel de precisión y duración.",
      },
    },
  },
  about: {
    eyebrow: "Nuestra historia",
    titleA: "Conoce a",
    titleB: "Bruna",
    quote: "Más que estética, enseño independencia, confianza y transformación.",
    p1: "Hola, soy Bruna Rodrigues. Nací en Cascavel, Paraná, viví 11 años en Balneário Camboriú y en 2021 decidí cruzar el océano para empezar de nuevo en Lisboa, Portugal.",
    p2: "Tras más de 5 años en el sector de la estética, comprendí que mi misión iba más allá de atender clientas. Reuní experiencias, errores, aciertos y aprendizajes para crear contenido verdaderamente enfocado en profesionalizar a mujeres soñadoras y decididas.",
    p3: "Creo que cuando una mujer se capacita, cambia no solo su carrera, sino su propia vida.",
    studioTitle: "El Studio Bruna Beauty",
    studioText:
      "Fundado en octubre de 2023 en Portugal, el Studio nació con la propuesta de ofrecer una experiencia exclusiva de estética, donde belleza, técnica y sofisticación van de la mano. Un ambiente cuidadosamente pensado para ofrecer comodidad, confianza y una experiencia premium.",
    values: ["Excelencia", "Sofisticación", "Innovación"],
    prev: "Foto anterior",
    next: "Foto siguiente",
    goTo: "Ir a la foto",
  },
  booking: {
    eyebrow: "Reserva tu experiencia",
    titleA: "Asegura Tu",
    titleB: "Momento",
    intro: "Asegura tu momento de cuidado exclusivo en nuestro Studio.",
    hoursTitle: "Horario",
    hoursLines: ["Martes a viernes • 10h–19h", "Sábado • 10h–17h"],
    paymentTitle: "Pago",
    paymentLines: ["MB Way, efectivo", "o transferencia bancaria"],
    etiquetteTitle: "Política de reserva",
    etiquetteLines: ["Tarifa de reserva: 15 €", "Cancelación con 24 h de antelación"],
    whatsapp: "Reservar por WhatsApp",
    online: "Reservar online",
    waMessage: "¡Hola Bruna! Vengo a través de tu sitio web y me gustaría reservar una cita 🤩💜",
  },
  location: {
    eyebrow: "Dónde Encontrarnos",
    titleA: "Visita el",
    titleB: "Studio",
    addressLabel: "Dirección",
    address: "Rua Latino Coelho, Parede, Cascais, Portugal",
    hoursLabel: "Horario",
    hoursLines: ["Martes a viernes • 10h–19h", "Sábado • 10h–17h"],
    transportLabel: "Cómo llegar",
    transport: "Fácil acceso y aparcamiento en las cercanías. La estación de tren de Parede está a pocos minutos.",
    cta: "Ver en Google Maps",
  },
  reviews: {
    eyebrow: "Opiniones de nuestras clientas",
    titleA: "Reseñas en",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Resuelve tus dudas",
    titleA: "Preguntas",
    titleB: "Frecuentes",
    groups: [
      {
        title: "Servicios",
        items: [
          {
            q: "Sobre las pestañas",
            a: "Trabajamos con más de 12 opciones de extensiones, desde efectos naturales hasta voluminosos, con materiales hipoalergénicos para cuidar la salud de tus ojos.",
          },
          {
            q: "Sobre la limpieza facial",
            a: "Nuestra limpieza profunda incluye extracción manual y peeling ultrasónico para una renovación celular completa.",
          },
          {
            q: "Sobre Hydralips",
            a: "Un tratamiento de hidratación profunda que revitaliza el tejido labial, dejando los labios con aspecto saludable y joven.",
          },
          {
            q: "Sobre la depilación",
            a: "Utilizamos métodos que minimizan las molestias, adecuados para todo tipo de piel, incluso las más sensibles.",
          },
          {
            q: "Sobre la eliminación de tatuajes",
            a: "Realizamos el procedimiento con láser de última generación, centrado en la seguridad y la eficacia de la eliminación del pigmento.",
          },
        ],
      },
      {
        title: "Reservas y cancelaciones",
        items: [
          {
            q: "¿Cómo reservo?",
            a: "Puedes reservar directamente con el botón de Reserva online, por WhatsApp o a través de nuestra página de reservas. La tasa de reserva es de 15 €.",
          },
          {
            q: "Sobre la política de cancelación",
            a: "Las cancelaciones deben hacerse con un mínimo de 24 h de antelación para evitar el cobro de la tarifa de reserva.",
          },
        ],
      },
      {
        title: "Formaciones",
        items: [
          {
            q: "Sobre las mentorías",
            a: "Ofrecemos formaciones exclusivas para profesionales que desean elevar su nivel técnico y de gestión en el mundo de la belleza.",
          },
        ],
      },
      {
        title: "El Studio",
        items: [
          {
            q: "Sobre la ubicación del Studio",
            a: "Estamos ubicados en una zona privilegiada de Lisboa, con facilidad de aparcamiento y acceso.",
          },
        ],
      },
    ],
    contactTitle: "¿Aún tienes dudas?",
    contactText: "Nuestro equipo está disponible para ayudarte a elegir el tratamiento ideal para ti.",
    contactCta: "Hablar por WhatsApp",
  },
  cookies: {
    title: "Usamos cookies",
    message:
      "Usamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio y mostrar contenido de terceros (como las reseñas de Google). Puedes aceptarlas todas o mantener solo las esenciales.",
    acceptAll: "Aceptar todas",
    essentialOnly: "Solo esenciales",
    policyLink: "Política de privacidad",
  },
  privacy: {
    pageTitle: "Política de privacidad y cookies — Bruna Beauty",
    eyebrow: "Legal",
    title: "Política de privacidad",
    updated: "Última actualización",
    backHome: "Volver al inicio",
    intro:
      "Tu privacidad es importante para nosotros. Esta política explica qué datos recopilamos, cómo los usamos y cuáles son tus derechos, de conformidad con el RGPD (Reglamento General de Protección de Datos) y la legislación aplicable.",
    sections: [
      {
        heading: "1. Quiénes somos",
        body: "El Studio Bruna Beauty es el responsable del tratamiento de los datos recopilados a través de este sitio web. Para cualquier cuestión relacionada con la privacidad, puedes contactarnos por WhatsApp o a través de nuestras redes sociales.",
      },
      {
        heading: "2. Qué datos recopilamos",
        body: "Este sitio web no tiene formularios de registro ni área de cliente. Solo recopilamos datos de navegación de forma agregada y anónima (páginas visitadas, idioma elegido y tipo de dispositivo). Las reservas se realizan a través de plataformas externas (Fresha y WhatsApp), que tienen sus propias políticas de privacidad.",
      },
      {
        heading: "3. Cookies",
        body: "Una cookie es un pequeño archivo almacenado en tu dispositivo. Utilizamos cookies esenciales (necesarias para el funcionamiento del sitio y para recordar tu idioma) y cookies de terceros: Google Fonts (carga de tipografías), Cloudinary (alojamiento de vídeo e imágenes) y Elfsight (widget de reseñas de Google). Las cookies de terceros solo se activan tras tu consentimiento, que puedes retirar en cualquier momento borrando los datos del sitio en tu navegador.",
      },
      {
        heading: "4. Con quién compartimos los datos",
        body: "No vendemos ni compartimos tus datos personales con fines comerciales. Solo compartimos la información técnica necesaria con los proveedores de servicios mencionados arriba, estrictamente para operar el sitio web.",
      },
      {
        heading: "5. Tus derechos",
        body: "En virtud del RGPD, tienes derecho a acceder, rectificar, suprimir o limitar el tratamiento de tus datos, así como a retirar tu consentimiento en cualquier momento. Para ejercer cualquiera de estos derechos, contáctanos a través de los canales indicados.",
      },
      {
        heading: "6. Cambios en esta política",
        body: "Podemos actualizar esta política periódicamente. Cualquier cambio se publicará en esta página con la fecha de actualización revisada.",
      },
    ],
  },
  footer: {
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    partnerBefore: "Socia oficial de Rastelli Global — Usa el cupón",
    partnerAfter: "para un 10 % de descuento",
  },
  badge: {
    official: "Socio oficial",
    off: "-10 % DTO",
    close: "Cerrar",
  },
  notFound: {
    pageTitle: "404 | Página no encontrada — Bruna Beauty",
    eyebrow: "Error 404",
    titleA: "Belleza en",
    titleB: "Construcción",
    text: "La página que buscas no existe o ha sido movida. Permítenos guiar tu mirada de vuelta a la excelencia.",
    home: "Volver al inicio",
    support: "Soporte por WhatsApp",
  },
};

export const translations: Record<Lang, Dict> = { pt, en, fr, es };
