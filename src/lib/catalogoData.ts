// ---------------------------------------------------------------------------
// Dados do catálogo de serviços (itens individuais de cada categoria)
// ---------------------------------------------------------------------------
// Fotos preenchidas automaticamente da pasta public/
// freshaLink: ainda vazios — preencha com os links individuais do Fresha quando tiver.

export type CatalogoItem = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  fotoPublicId: string;
  fotoLocal: string;
  freshaLink: string;
  pdf: string;
};

export const CATALOGO_DATA: Record<string, CatalogoItem[]> = {
  // =========================================================================
  // LASH LIFTING  -> public/pdf/catalogolifting.pdf
  // =========================================================================
  "lash-lifting": [
    {
      id: "lash-lifting-1",
      nome: "Lash Lifting",
      descricao: "Oferece um efeito de rímel, proporcionando curvatura, alongamento e coloraçăo das suas pestanas sem o uso de fios sintéticos. Com um resultado leve e sofisticado. Deixe suas pestanas igualmente impressionantes e naturais!",
      preco: "Aplicaçăo 40€",
      fotoPublicId: "",
      fotoLocal: "/lifting_de_pestanas.png",
      freshaLink: "",
      pdf: "catalogolifting.pdf",
    },
  ],

  // =========================================================================
  // PESTANAS / LASHES  -> public/pdf/catalogocilios.pdf
  // =========================================================================
  "pestanas-lashes": [
    {
      id: "lashes-classico",
      nome: "Fio a Fio Clássico (Categoria Soft)",
      descricao: "Opçăo na cor Preto ou Castanho. Ideal para quem deseja destacar a beleza dos cílios sem abrir măo da naturalidade. Proporciona um efeito suave e sofisticado, perfeito para o dia a dia.",
      preco: "Aplicaçăo 45€ | Manutençăo até 21 dias 40€",
      fotoPublicId: "",
      fotoLocal: "/fio_a_fio_classico.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-molhado",
      nome: "Efeito Molhado / Rímel (Categoria Médio)",
      descricao: "Opçăo na cor Preto ou Castanho. Propoem um efeito equilibrado, perfeito para quem busca um resultado delicado e natural, garantindo um efeito suave e harmonioso que mantém a leveza dos cílios.",
      preco: "Aplicaçăo 45€ | Manutençăo até 21 dias 40€",
      fotoPublicId: "",
      fotoLocal: "/efeito_molhado_rimel_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-egipcio",
      nome: "Volume Egípcio 3D (Categoria Médio)",
      descricao: "Opçăo na cor Preto ou Castanho. Volume leve e um efeito rendado incrível. Com fios em formato de \"W\" 3D, essa extensăo de cílios é perfeita para quem deseja realçar a expressăo de maneira sutil e delicada.",
      preco: "Aplicaçăo 45€ | Manutençăo até 21 dias 40€",
      fotoPublicId: "",
      fotoLocal: "/volume_egipcio_3d_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-brasileiro",
      nome: "Volume Brasileiro (Categoria Médio)",
      descricao: "Opçăo na cor Preto ou Castanho. Efeito rendado deslumbrante. Os fios duplos em formato \"Y\" proporcionam um resultado natural e elegante, ideal para quem busca realçar a expressividade dos olhos.",
      preco: "Aplicaçăo 45€ | Manutençăo até 21 dias 40€",
      fotoPublicId: "",
      fotoLocal: "/volume_brasileiro_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-sublime",
      nome: "Efeito Sublime (Categoria Médio)",
      descricao: "Opçăo na cor Preto ou Castanho. Esse efeito é ideal para quem busca cílios com volume leve e alongamento sutil, realçando a beleza natural dos olhos sem perder a sofisticaçăo. O resultado é um olhar marcante com aquele toque glamouroso na medida certa.",
      preco: "Aplicaçăo 45€ | Manutençăo até 21 dias 40€",
      fotoPublicId: "",
      fotoLocal: "/efeito_sublime_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-luxo",
      nome: "Volume Luxo (Categoria Volume)",
      descricao: "Volume elevado e um efeito rendado irresistível. Este serviço é ideal para quem deseja adicionar sensualidade e destaque aos olhos, criando um visual marcante e elegante.",
      preco: "Aplicaçăo 52€ | Manutençăo até 21 dias 47€",
      fotoPublicId: "",
      fotoLocal: "/volume_luxo_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-sirena",
      nome: "Volume Sirena (Categoria Artística)",
      descricao: "Técnica de extensăo de cílios que destaca o canto externo dos olhos, proporcionando um resultado suave e elegante. Ideal para quem aprecia a naturalidade com um toque de modernidade.",
      preco: "Aplicaçăo 45€ | Manutençăo até 21 dias 47€",
      fotoPublicId: "",
      fotoLocal: "/volume_sirena_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-fox",
      nome: "Efeito Fox Eye (Categoria Artística)",
      descricao: "Volume leve que proporciona um efeito moderno, delicado e sensual. Ideal para quem deseja valorizar a beleza natural dos cílios.",
      preco: "Aplicaçăo 52€ | Manutençăo até 21 dias 47€",
      fotoPublicId: "",
      fotoLocal: "/efeito_fox_eye_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-wispy",
      nome: "Efeito Wispy (Categoria Artística)",
      descricao: "Técnica que mescla fios de diferentes comprimentos para criar um efeito sutilmente desalinhado, volumoso e com \"picos\" de destaque. O resultado é um olhar marcante, moderno e com aquela leveza natural e glamourosa \"Kim Kardashian\".",
      preco: "Aplicaçăo 55€ | Manutençăo até 21 dias 50€",
      fotoPublicId: "",
      fotoLocal: "/efeito_wispy_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-delineado",
      nome: "Efeito Delineado (Categoria Artística)",
      descricao: "O poder do delineado, sem precisar de maquiagem! Esta técnica utiliza fios estrategicamente mais curtos e densos na base, que văo se alongando gradualmente em direçăo ao canto externo dos olhos. O resultado é uma linha de base bem marcada que imita perfeitamente o traço de um delineador gatinho.",
      preco: "Aplicaçăo 55€ | Manutençăo até 21 dias 50€",
      fotoPublicId: "",
      fotoLocal: "/efeito_delineado_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-inferiores",
      nome: "Pestanas Inferiores",
      descricao: "O toque final para um olhar simétrico e radiante! A aplicaçăo nas pestanas inferiores equilibra o volume da parte superior, abrindo o olhar e proporcionando um efeito de \"olhos de boneca\" super elegante. Utiliza fios bem finos e delicados para garantir total leveza e um acabamento impecável.",
      preco: "Aplicaçăo 15€",
      fotoPublicId: "",
      fotoLocal: "/pestanas_inferiores.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
    {
      id: "lashes-custom",
      nome: "Customizaçăo Premium",
      descricao: "Torne o seu olhar inesquecível com delicados toques de cor ou o brilho exclusivo de cristais Swarovski.",
      preco: "Adicional 5€",
      fotoPublicId: "",
      fotoLocal: "/customizacao_premium_1.png",
      freshaLink: "",
      pdf: "catalogocilios.pdf",
    },
  ],

  // =========================================================================
  // SOBRANCELHAS  -> public/pdf/catalogobrow.pdf
  // =========================================================================
  "sobrancelhas-brows": [
    {
      id: "brows-design",
      nome: "Design de Sobrancelhas",
      descricao: "O Designer consiste em remodelar as sobrancelhas, através da construçăo de um mapeamento facial: realizamos mediçőes precisas de acordo com a estrutura óssea e as proporçőes exclusivas de cada cliente. Dessa forma, garantimos uma simetria perfeita e natural, respeitando a sua identidade e realçando a sua beleza única.",
      preco: "Designer Personalizado: 18€ | Limpeza (a măo livre): 10€",
      fotoPublicId: "",
      fotoLocal: "/design_sobrancelhas.png",
      freshaLink: "",
      pdf: "catalogobrow.pdf",
    },
    {
      id: "brows-lamination",
      nome: "Brow Lamination",
      descricao: "O Brow Lamination entrega uma sobrancelha mais alinhada e modela, deixando com aspecto moderno e efeito de preenchimento natural.",
      preco: "Brow Lamination (sem tintura): 38€ | Brow Lamination (com tintura): 44€",
      fotoPublicId: "",
      fotoLocal: "/brow_lamination.png",
      freshaLink: "",
      pdf: "catalogobrow.pdf",
    },
    {
      id: "brows-tintura",
      nome: "Tintura de Sobrancelhas",
      descricao: "Ideal para quem busca realce e definiçăo com máxima naturalidade. Este procedimento năo utiliza Henna. Em vez disso, aplicamos a coloraçăo profissional RefectoCil, uma tinta específica e de alta tecnologia que tinge delicadamente os fios (inclusive os brancos) e sombreia a pele de forma sutil. Sobrancelhas preenchidas, alinhadas e com aspecto natural. Alta fixaçăo com duraçăo de até 4 semanas.",
      preco: "Tintura 12€",
      fotoPublicId: "",
      fotoLocal: "/tintura_sobrancelhas.png",
      freshaLink: "",
      pdf: "catalogobrow.pdf",
    },
  ],

  // =========================================================================
  // ESTÉTICA FACIAL  -> public/pdf/catalogofacial.pdf
  // =========================================================================
  "estetica-facial": [
    {
      id: "facial-blackdoll",
      nome: "Peeling de Hollywood (Black Doll)",
      descricao: "Pele de porcelana em minutos! O queridinho das celebridades, o Black Doll combina laser e carbono ativado para limpar profundamente, fechar poros e deixar a pele com aquele glow radiante que todo mundo ama. Nota-se resultados logo na primeira sessăo. Pele mais lisa, iluminada e com aspecto saudável, zero efeito colateral, sai do procedimento com a pele já iluminada.",
      preco: "Sessăo individual 45€ (Pode ser combinado com protocolo de Limpeza de pele e Microagulhamento facial)",
      fotoPublicId: "",
      fotoLocal: "/peeling_hollywood_black_doll.png",
      freshaLink: "",
      pdf: "catalogofacial.pdf",
    },
    {
      id: "facial-limpeza-profunda",
      nome: "Limpeza de Pele Profunda",
      descricao: "A queridinha das skincare lovers, essa técnica vai muito além do básico: remove cravos, impurezas e células mortas, desobstrui os poros e prepara sua pele para absorver melhor qualquer tratamento. Logo na primeira sessăo, você já sente a diferença: pele mais leve, macia, luminosa e com aquele toque de frescor que transforma!",
      preco: "Limpeza de Pele Profunda (Indicado para quem năo faz há mais de 6 meses): 60€ | Limpeza de Pele Básica (Indicado para manutençăo antes de 6 meses): 40€",
      fotoPublicId: "",
      fotoLocal: "/limpeza_de_pele.png",
      freshaLink: "",
      pdf: "catalogofacial.pdf",
    },
    {
      id: "facial-microagulhamento",
      nome: "Microagulhamento Facial",
      descricao: "Tratamento de hiper hidrataçăo e rejuvenescimento facial. Utilizaçăo de ativos combinados de acordo com a necessidade de cada cliente. Nesse tratamento é possível trabalhar com clareamento de manchas de melasma, acne. Melhorando o aspecto da pele, através do fechamento de poros, ajuda a ativar a produçăo de colágeno e elastina da pele através da renovaçăo celular.",
      preco: "Sessăo individual: 65€ | Pack 3 sessőes: 160€",
      fotoPublicId: "",
      fotoLocal: "/microagulhamento_facial.png",
      freshaLink: "",
      pdf: "catalogofacial.pdf",
    },
    {
      id: "facial-dermaplaning",
      nome: "Dermaplaning",
      descricao: "Tratamento totalmente indolor, rápido e sem contra indicaçăo. Elimina todas as células mortas, sujidades, maquiagem encrostadas e poluiçăo que permanecem na superfície da pele. Além de uma poderosíssima máscara regeneradora que deixa a pele com textura aveludada.",
      preco: "Sessăo individual: 40€ | Dermaplaning + Limpeza de pele: 75€",
      fotoPublicId: "",
      fotoLocal: "/dermaplaning.png",
      freshaLink: "",
      pdf: "catalogofacial.pdf",
    },
  ],

  // =========================================================================
  // DEPILAÇÃO A LASER  -> public/pdf/catalogobody.pdf
  // =========================================================================
  "depilacao-laser": [
    {
      id: "laser-diodo",
      nome: "Depilaçăo a Laser Diodo 4 Ondas",
      descricao: "Diga Adeus aos pêlos indesejáveis. O laser de Diodo é a mais nova e poderosa tecnologia que elimina os pêlos e clareia zonas escuras. Proporciona resultados notáveis já na primeira sessăo. Esse permite trabalhar com todos os tipos de peles e pêlos. (Feminino / Masculino). Tratamento médio de 6 sessőes.",
      preco: "Área avulsa: A partir de 5€ | Corpo e Rosto (Sem limite de zonas): Feminino 95€ | Masculino 75€ | Pernas completas + Virilha total + Axilas + Buço: Feminino 68€ | Masculino 75€ | Meia perna + Virilha total + Axilas + Buço: Feminino 58€ | Virilha total + Axilas + Buço: Feminino 50€ | Masculino 60€ | Virilha + Axilas: Feminino 42€ | Buço + Queixo + Maçă do Rosto: Feminino 35€ | Masculino 40€",
      fotoPublicId: "",
      fotoLocal: "/depilacao_laser_diodo.png",
      freshaLink: "",
      pdf: "catalogobody.pdf",
    },
  ],

  // =========================================================================
  // REMOÇÃO DE TATUAGEM  -> public/pdf/catalogotattoo.pdf
  // =========================================================================
  "remocao-tatuagem": [
    {
      id: "tattoo-laser",
      nome: "Remoçăo de Tatuagem a Laser",
      descricao: "Procedimento seguro e eficaz para remoçăo de tatuagens e micropigmentaçăo. Utilizamos tecnologia a laser que fragmenta o pigmento da pele, permitindo que o corpo elimine os resíduos naturalmente. Indicado para quem deseja apagar ou clarear sobrancelhas antigas e tatuagens indesejadas. Tempo médio de 30 a 40min/sessăo.",
      preco: "Mini (até 6cm²): 50€ | Pequena (até 16cm²): 70€ | Média (até 50cm²): 90€ | Grande (até 150cm²): 120€ | Extra grande: Sob consulta | Sobrancelhas: 65€",
      fotoPublicId: "",
      fotoLocal: "/remocao_tatuagem.png",
      freshaLink: "",
      pdf: "catalogotattoo.pdf",
    },
  ],
};

export type CatalogoCategoria = keyof typeof CATALOGO_DATA;
