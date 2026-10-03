export type RoomArea = {
  label: string;
  area: number;
};

export type Apartment = {
  ref: string;
  area: number;
  typology: string;
  bedrooms: number;
  isDuplex?: boolean;
  hasPool?: boolean;
  exteriorArea?: number;
  provisional?: boolean;
  ficheNumber: number;
  ficheImage: string;
  rooms: RoomArea[];
};

export type GalleryImage = {
  src: string;
  title: string;
  alt: string;
};

export type HeroScene = {
  key: string;
  src: string;
  alt: string;
  label: string;
  note: string;
};

export type CataloguePage = {
  page: number;
  src: string;
};

export type Residence = {
  slug: string;
  name: string;
  shortName: string;
  neighborhood: string;
  city: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroTitleEmphasis: string;
  heroDescription: string;
  heroScenes: HeroScene[];
  facts: { label: string; value: string; suffix?: string; italic?: string }[];
  manifesto: {
    eyebrow: string;
    lines: string[];
    emphasis: string;
    paragraph: string;
  };
  livingFeature: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    image: string;
    imageAlt: string;
  };
  apartments: Apartment[];
  apartmentSeries: { key: string; label: string }[];
  gallery: GalleryImage[];
  details: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    intro: string;
    mainPhoto: { src: string; alt: string; label: string; caption: string; galleryIndex: number };
    sidePhoto: { src: string; alt: string; label: string; caption: string; galleryIndex: number };
    accordion: { title: string; body: string }[];
    footnote: string;
  };
  smartHome: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    intro: string[];
    image: string;
    imageAlt: string;
    benefits: { title: string; body: string }[];
  };
  serenity: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  address: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    coordinate: string;
    lines: string[];
    lat: number;
    lng: number;
    placeUrl: string;
    note: string;
  };
  vision: {
    quote: string;
    quoteEmphasis: string;
    author: string;
    role: string;
  };
  catalogPdf: string;
  catalogPages: string;
  cataloguePages: CataloguePage[];
  floorGroups: FloorGroup[];
  buildingProfile: string;
  answers: Record<"surfaces" | "prestations" | "tarifs" | "visite", string>;
};

export type FloorGroup = {
  key: string;
  label: string;
  floorLabel: string;
  caption: string;
  bandHeight: number;
  accent: "stone" | "navy" | "gold";
  units: string[];
};

const catalogueImage = (page: number) => `/catalogue/page-${String(page).padStart(2, "0")}.jpg`;

const cataloguePages: CataloguePage[] = Array.from({ length: 28 }, (_, index) => ({
  page: index + 1,
  src: catalogueImage(index + 1),
}));

export const residences: Residence[] = [
  {
    slug: "el-bahdja",
    name: "Résidence El Bahdja",
    shortName: "El Bahdja",
    neighborhood: "Saïd Hamdine",
    city: "Alger",
    metaDescription:
      "Découvrez la Résidence El Bahdja à Saïd Hamdine, Alger. Des appartements F3, F4, F5 et duplex avec piscine privée, pensés pour le confort, l'élégance et la sérénité.",
    heroEyebrow: "L'IMMOBILIER, AUTREMENT.",
    heroTitle: "Un lieu à part.",
    heroTitleEmphasis: "Une vie à soi.",
    heroDescription:
      "De l'espace. De la lumière. Et cette sensation d'être exactement à sa place.",
    heroScenes: [
      {
        key: "architecture",
        src: "/images/el-bahdja/hero-building.jpg",
        alt: "Résidence El Bahdja, tour contemporaine en pierre claire et bois, balcons filants et toit-terrasse végétalisé",
        label: "Architecture",
        note: "Perspective architecturale · non contractuelle",
      },
      {
        key: "interiors",
        src: "/images/el-bahdja/interior-living-view.jpg",
        alt: "Séjour haut standing avec vue dégagée sur le parc, cuisine et salon en enfilade",
        label: "Intérieurs",
        note: "Ambiance intérieure · illustration non contractuelle",
      },
      {
        key: "entree",
        src: "/images/el-bahdja/lobby-entrance.jpg",
        alt: "Entrée et hall de la Résidence El Bahdja, façade en pierre et enseigne Corail City",
        label: "Entrée",
        note: "Perspective architecturale · non contractuelle",
      },
    ],
    facts: [
      { label: "L'ESPACE DE VIVRE", value: "108", suffix: "m²", italic: "— 339" },
      { label: "14 RÉFÉRENCES", value: "F3 / F4 / F5", suffix: "& duplex" },
      { label: "AU CŒUR D'ALGER", value: "Saïd Hamdine" },
    ],
    manifesto: {
      eyebrow: "01 / UNE NOUVELLE PERSPECTIVE",
      lines: ["Il y a des endroits", "où l'on habite.", "Et ceux où l'on se sent"],
      emphasis: "pleinement chez soi.",
      paragraph:
        "À Saïd Hamdine, El Bahdja conjugue architecture contemporaine, intérieurs généreux et confort intelligent. Une résidence imaginée pour donner une autre dimension au quotidien.",
    },
    livingFeature: {
      eyebrow: "L'ESSENTIEL PREND DE LA PLACE.",
      title: "Du volume. De la lumière.",
      titleEmphasis: "De la vie.",
      image: "/images/el-bahdja/interior-living-view.jpg",
      imageAlt: "Ambiance intérieure : séjour lumineux avec vue dégagée sur le parc",
    },
    apartmentSeries: [
      { key: "A", label: "Série A" },
      { key: "B", label: "Série B" },
      { key: "duplex", label: "Duplex & piscine" },
    ],
    apartments: [
      {
        ref: "A1",
        area: 136.14,
        typology: "F4",
        bedrooms: 3,
        ficheNumber: 14,
        ficheImage: catalogueImage(14),
        rooms: [
          { label: "Séjour / salle à manger", area: 27.65 },
          { label: "Cuisine", area: 14.16 },
          { label: "Chambre 1", area: 17.81 },
          { label: "Chambre 2", area: 15.45 },
          { label: "Chambre 3", area: 15.35 },
          { label: "Hall + dégagement", area: 22.67 },
          { label: "Salle d'eau", area: 6.8 },
          { label: "Balcon 1", area: 6.37 },
          { label: "Balcon 2", area: 9.88 },
        ],
      },
      {
        ref: "A2",
        area: 108.88,
        typology: "F3 Open",
        bedrooms: 2,
        ficheNumber: 15,
        ficheImage: catalogueImage(15),
        rooms: [
          { label: "Séjour / salle à manger", area: 21.75 },
          { label: "Cuisine", area: 11.66 },
          { label: "Chambre", area: 13.85 },
          { label: "Suite parentale", area: 27.86 },
          { label: "Hall + dégagement", area: 17.36 },
          { label: "Salle d'eau", area: 7.04 },
          { label: "Balcon 1", area: 5.2 },
          { label: "Balcon 2", area: 4.16 },
        ],
      },
      {
        ref: "A3",
        area: 121.71,
        typology: "F4 Open",
        bedrooms: 3,
        ficheNumber: 16,
        ficheImage: catalogueImage(16),
        rooms: [
          { label: "Séjour / salle à manger", area: 24.7 },
          { label: "Cuisine", area: 16.65 },
          { label: "Chambre 1", area: 15.21 },
          { label: "Chambre 2", area: 15.45 },
          { label: "Suite parentale", area: 22.16 },
          { label: "Dégagement", area: 10.79 },
          { label: "Salle d'eau", area: 6.8 },
          { label: "Balcon", area: 9.95 },
        ],
      },
      {
        ref: "B1",
        area: 126.68,
        typology: "F3 Open",
        bedrooms: 2,
        ficheNumber: 17,
        ficheImage: catalogueImage(17),
        rooms: [
          { label: "Séjour / salle à manger", area: 29.42 },
          { label: "Cuisine", area: 10.37 },
          { label: "Chambre 1", area: 19.95 },
          { label: "Chambre 2", area: 15.58 },
          { label: "Dégagement", area: 14.56 },
          { label: "Salle d'eau", area: 7.68 },
          { label: "Terrasse", area: 29.12 },
        ],
      },
      {
        ref: "B2",
        area: 121.49,
        typology: "F3 Open",
        bedrooms: 2,
        ficheNumber: 18,
        ficheImage: catalogueImage(18),
        rooms: [
          { label: "Séjour / salle à manger", area: 27.62 },
          { label: "Cuisine", area: 13.27 },
          { label: "Chambre 1", area: 15.44 },
          { label: "Chambre 2", area: 13.24 },
          { label: "Dégagement", area: 16.65 },
          { label: "Salle d'eau", area: 6.2 },
          { label: "Terrasse", area: 29.07 },
        ],
      },
      {
        ref: "B3",
        area: 139.63,
        typology: "F3",
        bedrooms: 2,
        ficheNumber: 19,
        ficheImage: catalogueImage(19),
        rooms: [
          { label: "Séjour / salle à manger", area: 28.22 },
          { label: "Cuisine", area: 16.23 },
          { label: "Chambre 1", area: 16.71 },
          { label: "Chambre 2", area: 15.66 },
          { label: "Dégagement", area: 12.13 },
          { label: "Salle d'eau", area: 6.46 },
          { label: "Balcon", area: 10.01 },
          { label: "Terrasse", area: 34.21 },
        ],
      },
      {
        ref: "B4",
        area: 207.67,
        typology: "F5 Open",
        bedrooms: 4,
        ficheNumber: 20,
        ficheImage: catalogueImage(20),
        rooms: [
          { label: "Séjour / salle à manger", area: 23.65 },
          { label: "Cuisine", area: 13.26 },
          { label: "Suite parentale", area: 24.89 },
          { label: "Chambre 1", area: 15.44 },
          { label: "Chambre 2", area: 16.03 },
          { label: "Chambre 3", area: 17.11 },
          { label: "Dégagement", area: 17.69 },
          { label: "Salle d'eau", area: 6.83 },
          { label: "Balcon", area: 10.66 },
          { label: "Terrasse", area: 57.26 },
          { label: "Buanderie", area: 4.85 },
        ],
      },
      {
        ref: "B5",
        area: 113.9,
        typology: "F3",
        bedrooms: 2,
        ficheNumber: 21,
        ficheImage: catalogueImage(21),
        rooms: [
          { label: "Séjour / salle à manger", area: 27.54 },
          { label: "Cuisine", area: 16.88 },
          { label: "Chambre 1", area: 17.2 },
          { label: "Chambre 2", area: 16.13 },
          { label: "Dégagement", area: 14.13 },
          { label: "Salle d'eau", area: 6.8 },
          { label: "Balcon 1", area: 5.2 },
          { label: "Balcon 2", area: 10.02 },
        ],
      },
      {
        ref: "B6",
        area: 124.9,
        typology: "F3 Open",
        bedrooms: 2,
        ficheNumber: 22,
        ficheImage: catalogueImage(22),
        rooms: [
          { label: "Séjour / salle à manger", area: 35.94 },
          { label: "Cuisine", area: 11.84 },
          { label: "Suite parentale", area: 31.47 },
          { label: "Chambre", area: 17.44 },
          { label: "Dégagement", area: 8.88 },
          { label: "Salle d'eau", area: 8.74 },
          { label: "Balcon 1", area: 4.29 },
          { label: "Balcon 2", area: 6.3 },
        ],
      },
      {
        ref: "B7",
        area: 154.12,
        typology: "F5 Open",
        bedrooms: 4,
        ficheNumber: 23,
        ficheImage: catalogueImage(23),
        rooms: [
          { label: "Séjour / salle à manger", area: 26.29 },
          { label: "Cuisine", area: 13.26 },
          { label: "Suite parentale", area: 24.89 },
          { label: "Chambre 1", area: 15.44 },
          { label: "Chambre 2", area: 16.03 },
          { label: "Chambre 3", area: 17.11 },
          { label: "Dégagement", area: 17.5 },
          { label: "Salle d'eau", area: 6.83 },
          { label: "Balcon 1", area: 6.89 },
          { label: "Balcon 2", area: 9.88 },
        ],
      },
      {
        ref: "A26",
        area: 304.86,
        typology: "F5 duplex",
        bedrooms: 4,
        isDuplex: true,
        hasPool: true,
        exteriorArea: 94.25,
        ficheNumber: 24,
        ficheImage: catalogueImage(24),
        rooms: [
          { label: "Dégagement 1", area: 16.74 },
          { label: "Hall", area: 16.24 },
          { label: "Salle de bains 1", area: 4.97 },
          { label: "Salle de bains 2", area: 5.26 },
          { label: "WC 1", area: 2.07 },
          { label: "Dressing", area: 5.29 },
          { label: "Suite parentale", area: 24.66 },
          { label: "Chambre 1", area: 15.75 },
          { label: "Chambre 2", area: 15.7 },
          { label: "Balcon 1", area: 4.16 },
          { label: "Balcon 2", area: 5.2 },
          { label: "Terrasse + piscine", area: 78.52 },
          { label: "Chambre 3", area: 16.13 },
          { label: "WC 2", area: 2.13 },
          { label: "Salle de bains 3", area: 10.02 },
          { label: "Séjour / salle à manger", area: 45.13 },
          { label: "Dégagement 2", area: 16.01 },
          { label: "Cuisine", area: 14.51 },
          { label: "Balcon 3", area: 6.37 },
        ],
      },
      {
        ref: "A27",
        area: 288.64,
        typology: "F4 duplex",
        bedrooms: 3,
        isDuplex: true,
        hasPool: true,
        ficheNumber: 25,
        ficheImage: catalogueImage(25),
        rooms: [
          { label: "Dégagement 1", area: 9.97 },
          { label: "Hall", area: 19.76 },
          { label: "Suite parentale", area: 25.12 },
          { label: "Dressing", area: 4.95 },
          { label: "Salle de bains 1", area: 6.87 },
          { label: "Salle de bains 2", area: 6.59 },
          { label: "WC 1", area: 2.07 },
          { label: "Chambre 1", area: 15.39 },
          { label: "Chambre 2", area: 15.85 },
          { label: "Balcon", area: 9.95 },
          { label: "Terrasse", area: 80.58 },
          { label: "Cuisine", area: 24.03 },
          { label: "Séjour / salle à manger", area: 39.1 },
          { label: "Buanderie", area: 5.53 },
          { label: "Salle de bains 3", area: 12.37 },
          { label: "WC 2", area: 2.09 },
          { label: "Dégagement 2", area: 8.42 },
        ],
      },
      {
        ref: "B32",
        area: 288.29,
        typology: "F4 duplex",
        bedrooms: 3,
        isDuplex: true,
        hasPool: true,
        ficheNumber: 26,
        ficheImage: catalogueImage(26),
        rooms: [
          { label: "Séjour / salle à manger", area: 32.78 },
          { label: "Cuisine", area: 13.86 },
          { label: "Chambre 1", area: 16.87 },
          { label: "Chambre 2", area: 15.2 },
          { label: "Chambre 3", area: 15.37 },
          { label: "Salle d'eau", area: 4.22 },
          { label: "Salle de bains 1", area: 4.81 },
          { label: "Salle de bains 2", area: 5.2 },
          { label: "WC 1", area: 2.05 },
          { label: "WC 2", area: 2.16 },
          { label: "Dressing", area: 4.98 },
          { label: "Dégagement 1", area: 6.42 },
          { label: "Dégagement 2", area: 11.87 },
          { label: "Hall", area: 11.43 },
          { label: "Balcon 1", area: 8.7 },
          { label: "Balcon 2", area: 10.5 },
          { label: "Terrasse", area: 50.74 },
          { label: "Piscine", area: 12.0 },
        ],
      },
      {
        ref: "B33",
        area: 338.88,
        typology: "F5 duplex",
        bedrooms: 4,
        isDuplex: true,
        hasPool: true,
        ficheNumber: 27,
        ficheImage: catalogueImage(27),
        rooms: [
          { label: "Hall 1", area: 2.65 },
          { label: "Hall aménagé", area: 34.32 },
          { label: "Dressing", area: 5.46 },
          { label: "WC 1", area: 1.98 },
          { label: "Salle de bains 1", area: 6.92 },
          { label: "Salle de bains 2", area: 5.02 },
          { label: "Suite parentale", area: 21.7 },
          { label: "Chambre 1", area: 17.6 },
          { label: "Chambre 2", area: 17.12 },
          { label: "Dégagement 1", area: 3.5 },
          { label: "Balcon 1", area: 6.3 },
          { label: "Balcon 2", area: 4.29 },
          { label: "Cuisine", area: 16.58 },
          { label: "Séjour / salle à manger", area: 31.74 },
          { label: "Chambre 3", area: 16.78 },
          { label: "Salle de bains 3", area: 8.24 },
          { label: "WC 2", area: 2.04 },
          { label: "Dégagement 2", area: 9.55 },
          { label: "Hall 2", area: 15.62 },
          { label: "Terrasse + piscine", area: 104.58 },
          { label: "Balcon 3", area: 6.89 },
        ],
      },
    ],
    gallery: [
      {
        src: "/images/el-bahdja/interior-living-view.jpg",
        title: "Les espaces de vie",
        alt: "Séjour lumineux avec vue dégagée sur le parc",
      },
      {
        src: "/images/el-bahdja/interior-kitchen.jpg",
        title: "Le cœur de la maison",
        alt: "Ambiance de cuisine équipée avec un îlot central",
      },
      {
        src: "/images/el-bahdja/interior-bedroom-master.jpg",
        title: "La chambre principale",
        alt: "Chambre avec coin salon, dressing et téléviseur intégré",
      },
      {
        src: "/images/el-bahdja/interior-bedroom-twins-1.jpg",
        title: "Une chambre pour deux",
        alt: "Chambre à deux lits jumeaux avec tête de lit sur mesure",
      },
      {
        src: "/images/el-bahdja/interior-bedroom-twins-2.jpg",
        title: "Confort et intimité",
        alt: "Chambre à deux lits avec coin bureau et grande fenêtre",
      },
      {
        src: "/images/el-bahdja/interior-bedroom-study.jpg",
        title: "Un coin bureau intégré",
        alt: "Chambre avec bureau, écran et rangements sur mesure",
      },
      {
        src: "/images/el-bahdja/interior-office.jpg",
        title: "Un espace pour travailler",
        alt: "Bureau suspendu avec rangements bois et poste de travail",
      },
      {
        src: "/images/el-bahdja/interior-bathroom-main.jpg",
        title: "Douche à l'italienne",
        alt: "Salle de bains en pierre avec douche à l'italienne et niches bois",
      },
      {
        src: "/images/el-bahdja/interior-bathroom-suite.jpg",
        title: "Salle d'eau attenante",
        alt: "Douche vitrée et vasque suspendue en pierre grise",
      },
      {
        src: "/images/el-bahdja/interior-bathroom-ensuite.jpg",
        title: "Une salle de bains signée",
        alt: "Douche à l'italienne, marbre blanc et vasque bois foncé",
      },
      {
        src: "/images/el-bahdja/interior-wc.jpg",
        title: "Sanitaires haut de gamme",
        alt: "WC suspendu japonais et rangements sur mesure",
      },
      {
        src: "/images/el-bahdja/lobby-entrance.jpg",
        title: "Une entrée singulière",
        alt: "Façade et entrée de la Résidence El Bahdja",
      },
      {
        src: "/images/el-bahdja/entrance-signage.jpg",
        title: "Une signature Corail City",
        alt: "Enseigne illuminée de la Résidence El Bahdja à l'entrée, façade en pierre claire",
      },
      {
        src: "/images/el-bahdja/render-facade.png",
        title: "Façade contemporaine",
        alt: "Résidence El Bahdja, façade contemporaine en pierre claire et bois",
      },
      {
        src: "/images/el-bahdja/render-materiaux.png",
        title: "Pierre et bronze",
        alt: "Résidence El Bahdja, détail de matières en pierre et bronze",
      },
    ],
    details: {
      eyebrow: "LE SENS DU DÉTAIL.",
      title: "Ce qui se voit.",
      titleEmphasis: "Ce qui se ressent.",
      intro: "La qualité d'un lieu tient aussi à tout ce qui l'entoure.",
      mainPhoto: {
        src: "/images/el-bahdja/interior-kitchen.jpg",
        alt: "Cuisine contemporaine avec îlot central",
        label: "01 / LES INTÉRIEURS",
        caption: "Des matières. Du caractère.",
        galleryIndex: 1,
      },
      sidePhoto: {
        src: "/images/el-bahdja/lobby-entrance.jpg",
        alt: "Entrée et hall de la résidence El Bahdja",
        label: "02 / LES ESPACES COMMUNS",
        caption: "L'accueil, avec attention.",
        galleryIndex: 11,
      },
      accordion: [
        {
          title: "Des revêtements haut de gamme",
          body: "Sol en grès cérame porcelainé pâte blanche, durable et facile d'entretien. Marbre dans le hall d'entrée pour une première impression à la hauteur du projet.",
        },
        {
          title: "Une cuisine équipée et meublée",
          body: "Cuisine livrée meublée et équipée : four, plaque de cuisson, hotte et micro-ondes, avec matériaux nobles et grandes marques européennes.",
        },
        {
          title: "Des salles de bains signées",
          body: "Douches à l'italienne et robinetterie d'importation de grande marque européenne, type Grohe ou équivalent. Porte d'entrée blindée et portes intérieures italiennes.",
        },
        {
          title: "Une isolation soignée",
          body: "Isolation thermique et phonique, menuiseries aluminium à double vitrage et volets roulants électriques en aluminium extrudé.",
        },
        {
          title: "Des parties communes sécurisées",
          body: "Hall avec comptoir de réception, parking en sous-sol, 4 ascenseurs (2 par bloc, 6 personnes), contrôle d'accès par interphone, digicode et badges, vidéosurveillance et service de dépannage H24.",
        },
      ],
      footnote:
        "Prestations selon le catalogue, sous réserve des choix définitifs et des documents contractuels.",
    },
    smartHome: {
      eyebrow: "03 / L'ART DE VIVRE",
      title: "Votre intérieur.",
      titleEmphasis: "À votre rythme.",
      intro: [
        "Pilotage centralisé du confort et de la sécurité,",
        "depuis le logement ou le smartphone.",
        "La technologie se fait oublier.",
      ],
      image: "/images/el-bahdja/duplex-pool-terrace.jpg",
      imageAlt: "Terrasse d'un duplex Corail City avec piscine privée, vue dégagée sur le parc au coucher du soleil",
      benefits: [
        {
          title: "Une maison connectée",
          body: "Scénarios Smart Home, éclairage et volets roulants pilotables depuis le smartphone, compatibilité Alexa.",
        },
        {
          title: "Un confort intégré",
          body: "Climatisation LG multi-cassettes au plafond et chauffage central individuel avec chaudière murale au gaz type Beretta ou équivalent.",
        },
        {
          title: "Une sécurité automatisée",
          body: "Coupure automatique du gaz en cas de détection de fuite et coupure automatique de l'eau en cas de détection d'inondation.",
        },
      ],
    },
    serenity: {
      eyebrow: "SÉRÉNITÉ & QUALITÉ DE VIE",
      title: "Une présence humaine.",
      titleEmphasis: "Des accès maîtrisés.",
      intro: "Une présence humaine, des accès maîtrisés et des espaces entretenus pour le confort des résidents.",
      items: [
        { title: "Sécurité H24", body: "Des agents de sécurité présents 24 h/24 pour intervenir rapidement en cas d'incident." },
        { title: "Accès strictement contrôlé", body: "Un accès à la résidence réservé aux résidents et aux personnes autorisées." },
        { title: "Entretien quotidien", body: "Un entretien quotidien des parties communes pour préserver la propreté et la qualité du cadre de vie." },
        { title: "Espace dédié à l'Aïd", body: "Un coin abattoir spécialement aménagé pour les résidents à l'occasion du sacrifice de l'Aïd." },
      ],
    },
    address: {
      eyebrow: "04 / ALGER, À PORTÉE DE VIE",
      title: "La ville autour.",
      titleEmphasis: "Le calme, chez vous.",
      coordinate: "36.7256° N / 3.0278° E",
      lines: ["Une vie de quartier", "Les services à proximité", "L'accès aux grands axes"],
      lat: 36.7255961,
      lng: 3.0277796,
      placeUrl:
        "https://www.google.com/maps/place/R%C3%A9sidence+El+Bahdja+Corail+City/@36.7256004,3.0252047,904m/data=!3m2!1e3!4b1!4m6!3m5!1s0x128fad00008605bb:0xe2755cccc86d45c0!8m2!3d36.7255961!4d3.0277796!16s%2Fg%2F11nj88l7q6",
      note: "Localisation exacte de la Résidence El Bahdja sur Google Maps. L'adresse postale complète est communiquée par le bureau de vente.",
    },
    vision: {
      quote: "Construire l'Algérie de demain,",
      quoteEmphasis: "avec exigence.",
      author: "Nabil Mouici",
      role: "Président de Corail City",
    },
    catalogPdf: "/documents/catalogue-el-bahdja.pdf",
    catalogPages: "28 pages",
    cataloguePages,
    buildingProfile: "R+10+Attique",
    floorGroups: [
      {
        key: "entresol",
        label: "1er entre-sol",
        floorLabel: "S-SOL",
        caption: "Parking et accès résidents",
        bandHeight: 1,
        accent: "navy",
        units: ["B1", "B2"],
      },
      {
        key: "rdc",
        label: "Rez-de-chaussée",
        floorLabel: "RDC",
        caption: "Hall, réception et premiers logements",
        bandHeight: 1,
        accent: "navy",
        units: ["B3", "B4"],
      },
      {
        key: "premier",
        label: "1er étage",
        floorLabel: "1",
        caption: "Vue dégagée sur le quartier",
        bandHeight: 1,
        accent: "stone",
        units: ["B6"],
      },
      {
        key: "courants",
        label: "Étages courants",
        floorLabel: "2 — 9",
        caption: "Typologies répétées du 2e au 9e étage",
        bandHeight: 8,
        accent: "stone",
        units: ["A1", "A2", "A3", "B5", "B7"],
      },
      {
        key: "duplex",
        label: "Duplex & attique",
        floorLabel: "10 — 11",
        caption: "10e étage et attique, terrasses et piscines privées",
        bandHeight: 2,
        accent: "gold",
        units: ["A26", "A27", "B32", "B33"],
      },
    ],
    answers: {
      surfaces:
        "Le catalogue présente 14 références, du F3 aux duplex F4 et F5. Les surfaces totales vont de 108,88 à 338,88 m², balcons, terrasses et piscines privées incluses selon les lots. Notre équipe vous précise la typologie de chaque référence.",
      prestations:
        "Les prestations prévues comprennent notamment une cuisine équipée, la domotique, le chauffage, la climatisation LG, le contrôle d'accès, le parking en sous-sol et 4 ascenseurs. Consultez le catalogue complet pour le détail des surfaces, plans 3D et réserves.",
      tarifs:
        "Les tarifs et disponibilités sont communiqués par le bureau de vente. Appelez le 0541 31 31 31 ou préparez votre demande dans le formulaire de contact.",
      visite:
        "Notre équipe vous accompagne pour organiser une visite et vous communiquer l'adresse précise du projet. Contactez-nous par téléphone ou indiquez vos préférences dans votre demande.",
    },
  },
];

export function getResidence(slug: string): Residence | undefined {
  return residences.find((residence) => residence.slug === slug);
}

/**
 * El Bahdja est composée de deux blocs distincts (Bloc A et Bloc B), chacun avec
 * son propre palier et ses propres ascenseurs, confirmé par les plans d'exécution.
 */
export function getApartmentBlock(ref: string): "A" | "B" {
  return ref.startsWith("A") ? "A" : "B";
}

export function formatArea(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const company = {
  name: "SARL Corail City",
  tagline: "L'excellence au service de votre avenir.",
  phone: "0541 31 31 31",
  phoneHref: "tel:+213541313131",
  secondaryPhone: "+213 37 50 59 80",
  secondaryPhoneHref: "tel:+21337505980",
  email: "contact@corailcity.com",
  address: "Cité de l'Aéroport 85/147, 12000 Tébessa, Algérie",
  president: "Nabil Mouici",
  presidentMessage: [
    "Chez Corail City, nous sommes convaincus qu'un projet immobilier ne se résume pas à construire des logements. Notre ambition est de créer de véritables lieux de vie, pensés pour offrir durablement confort, sérénité et qualité à ceux qui y vivront.",
    "Lorsque nous avons imaginé la Résidence El Bahdja, notre ambition était claire : créer bien plus qu'une résidence, créer un véritable cadre de vie.",
    "Avec la Résidence El Bahdja, nous avons souhaité donner pleinement vie à cette vision. De son architecture à ses équipements, de la qualité de construction aux matériaux et technologies intégrés, chaque détail a été étudié avec la même attention et la même exigence.",
    "El Bahdja incarne notre engagement pour un immobilier moderne, responsable et tourné vers l'avenir.",
  ],
  socials: {
    instagram: { label: "@sarl.corail.city", href: "https://www.instagram.com/sarl.corail.city" },
    facebook: { label: "Corail City", href: "https://www.facebook.com/CorailCity" },
    tiktok: { label: "@corail.city", href: "https://www.tiktok.com/@corail.city" },
    linkedin: { label: "Corail City", href: "https://www.linkedin.com/company/corail-city" },
  },
};
