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
        title: "Depilação a Laser",
        description: "Formação prática e teórica em tecnologia laser de última geração.",
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
  reviews: {
    eyebrow: "Feedback das nossas clientes",
    titleA: "Avaliações no",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Esclareça suas dúvidas",
    titleA: "Dúvidas",
    titleB: "Frequentes",
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
      {
        q: "Sobre Mentorias",
        a: "Oferecemos formações exclusivas para profissionais que desejam elevar o nível técnico e de gestão no mundo da beleza.",
      },
      {
        q: "Sobre Política de Cancelamento",
        a: "Cancelamentos devem ser feitos com no mínimo 24h de antecedência para evitarmos a cobrança de taxa de reserva.",
      },
      {
        q: "Sobre Localização do Studio",
        a: "Estamos situados em uma zona privilegiada de Lisboa, com facilidade de estacionamento e acesso.",
      },
    ],
  },
  footer: {
    rights: "Todos os direitos reservados.",
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
        title: "Laser Hair Removal",
        description: "Practical and theoretical training in state-of-the-art laser technology.",
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
  reviews: {
    eyebrow: "What our clients say",
    titleA: "Reviews on",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Get your questions answered",
    titleA: "Frequently Asked",
    titleB: "Questions",
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
      {
        q: "About Mentorships",
        a: "We offer exclusive training for professionals who want to raise their technical and management level in the beauty world.",
      },
      {
        q: "About the Cancellation Policy",
        a: "Cancellations must be made at least 24 hours in advance to avoid a booking fee charge.",
      },
      {
        q: "About the Studio Location",
        a: "We are located in a privileged area of Lisbon, with easy parking and access.",
      },
    ],
  },
  footer: {
    rights: "All rights reserved.",
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
        title: "Épilation laser",
        description: "Formation pratique et théorique à la technologie laser de dernière génération.",
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
  reviews: {
    eyebrow: "Avis de nos clientes",
    titleA: "Avis sur",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Vos questions, nos réponses",
    titleA: "Questions",
    titleB: "Fréquentes",
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
      {
        q: "À propos des mentorats",
        a: "Nous proposons des formations exclusives pour les professionnelles qui souhaitent élever leur niveau technique et de gestion dans le monde de la beauté.",
      },
      {
        q: "À propos de la politique d'annulation",
        a: "Les annulations doivent être faites au moins 24 h à l'avance afin d'éviter la facturation des frais de réservation.",
      },
      {
        q: "À propos de l'emplacement du Studio",
        a: "Nous sommes situés dans un quartier privilégié de Lisbonne, avec un accès et un stationnement faciles.",
      },
    ],
  },
  footer: {
    rights: "Tous droits réservés.",
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
        title: "Depilación láser",
        description: "Formación práctica y teórica en tecnología láser de última generación.",
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
  reviews: {
    eyebrow: "Opiniones de nuestras clientas",
    titleA: "Reseñas en",
    titleB: "Google",
  },
  faq: {
    eyebrow: "Resuelve tus dudas",
    titleA: "Preguntas",
    titleB: "Frecuentes",
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
      {
        q: "Sobre las mentorías",
        a: "Ofrecemos formaciones exclusivas para profesionales que desean elevar su nivel técnico y de gestión en el mundo de la belleza.",
      },
      {
        q: "Sobre la política de cancelación",
        a: "Las cancelaciones deben hacerse con un mínimo de 24 h de antelación para evitar el cobro de la tarifa de reserva.",
      },
      {
        q: "Sobre la ubicación del Studio",
        a: "Estamos ubicados en una zona privilegiada de Lisboa, con facilidad de aparcamiento y acceso.",
      },
    ],
  },
  footer: {
    rights: "Todos los derechos reservados.",
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
