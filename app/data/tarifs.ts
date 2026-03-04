// Tarifs avec images depuis public/images
export interface TarifItem {
  id: string;
  name: string;
  nameAr?: string;
  image: string;
  price: number;
  priceFrom?: boolean; // prix à partir de
  category: string;
}

export type CategoryKey = "Pressing" | "Cloth Spa Femme" | "Sneakers Spa" | "Blanchisserie" | "Linge" | "Accessoires";

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  labelAr: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  descriptionAr: string;
  showcaseImages: string[];
}

export const categories: CategoryInfo[] = [
  {
    key: "Pressing",
    label: "Pressing Homme",
    labelAr: "كوي الملابس الرجالية",
    icon: "👔",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    description: "Costume, veste, pantalon et plus — repassage professionnel",
    descriptionAr: "بدلة، سترة، بنطلون والمزيد — كوي احترافي",
    showcaseImages: ["/images/costume.avif", "/images/pantalon.avif", "/images/chemise-sur-cintre.avif"],
  },
  {
    key: "Cloth Spa Femme",
    label: "Cloth Spa Femme",
    labelAr: "سبا الملابس النسائية",
    icon: "👗",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    description: "Robes, caftans, takchita — soin premium pour vêtements femme",
    descriptionAr: "فساتين، قفطان، تكشيطة — عناية متميزة بالملابس النسائية",
    showcaseImages: ["/images/femme/femme-1.jpeg", "/images/femme/femme-6.jpeg", "/images/femme/femme-12.jpeg", "/images/femme/femme-18.jpeg"],
  },
  {
    key: "Sneakers Spa",
    label: "Sneakers Spa",
    labelAr: "سبا الأحذية الرياضية",
    icon: "👟",
    color: "#F97316",
    bgColor: "#FFF7ED",
    description: "Nettoyage professionnel de sneakers, cuir, daim et bottes",
    descriptionAr: "تنظيف احترافي للأحذية الرياضية والجلد والشامواه والأحذية الطويلة",
    showcaseImages: ["/images/sneakersspa/sneakers-1.jpeg", "/images/sneakersspa/sneakers-3.jpeg", "/images/sneakersspa/sneakers-5.jpeg", "/images/sneakersspa/sneakers-7.jpeg"],
  },
  {
    key: "Blanchisserie",
    label: "Blanchisserie",
    labelAr: "التنظيف والغسيل",
    icon: "🧺",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    description: "Couvertures, rideaux, linge de maison — nettoyage complet",
    descriptionAr: "أغطية، ستائر، مفروشات المنزل — تنظيف شامل",
    showcaseImages: ["/images/blanchesserie/blanchisserie-1.jpeg", "/images/blanchesserie/blanchisserie-5.jpeg", "/images/blanchesserie/blanchisserie-10.jpeg", "/images/blanchesserie/blanchisserie-15.jpeg"],
  },
  {
    key: "Linge",
    label: "Linge",
    labelAr: "الملابس",
    icon: "👕",
    color: "#22C55E",
    bgColor: "#DCFCE7",
    description: "Survêtement, pyjama et linge au quotidien",
    descriptionAr: "ملابس رياضية، بيجامة والملابس اليومية",
    showcaseImages: ["/images/survette.avif", "/images/pyjama-2-pieces.avif"],
  },
  {
    key: "Accessoires",
    label: "Accessoires",
    labelAr: "الإكسسوارات",
    icon: "🧢",
    color: "#EAB308",
    bgColor: "#FEF9C3",
    description: "Casquettes, cravates et accessoires divers",
    descriptionAr: "قبعات، ربطات عنق وإكسسوارات متنوعة",
    showcaseImages: ["/images/casquette.avif", "/images/gilet-cravate.avif"],
  },
];

// Liste des tarifs avec images et prix
export const tarifsData: TarifItem[] = [
  // ========================
  // PRESSING HOMME
  // ========================
  {
    id: "pantalon",
    name: "Pantalon",
    nameAr: "بنطلون",
    image: "/images/pantalon.avif",
    price: 20,
    category: "Pressing"
  },
  {
    id: "chemise-sur-cintre",
    name: "Chemise sur cintre",
    nameAr: "قميص على شماعة",
    image: "/images/chemise-sur-cintre.avif",
    price: 22,
    category: "Pressing"
  },
  {
    id: "costume",
    name: "Costume",
    nameAr: "بدلة",
    image: "/images/costume.avif",
    price: 50,
    category: "Pressing"
  },
  {
    id: "polo",
    name: "Polo",
    nameAr: "بولو",
    image: "/images/polo.avif",
    price: 18,
    category: "Pressing"
  },
  {
    id: "djellaba",
    name: "Djellaba",
    nameAr: "جلابة",
    image: "/images/djellaba.avif",
    price: 30,
    category: "Pressing"
  },
  {
    id: "chemise-plie",
    name: "Chemise pliée",
    nameAr: "قميص مطوي",
    image: "/images/chemise-plie.avif",
    price: 15,
    category: "Pressing"
  },
  {
    id: "veste-jacket-blouson",
    name: "Veste/Jacket/Blouson",
    nameAr: "سترة/جاكيت",
    image: "/images/veste-jacket-blouson.avif",
    price: 25,
    category: "Pressing"
  },
  {
    id: "manteau-simple",
    name: "Manteau simple",
    nameAr: "معطف بسيط",
    image: "/images/manteau-simple.avif",
    price: 40,
    category: "Pressing"
  },
  {
    id: "doudoune-simple-homme",
    name: "Doudoune simple",
    nameAr: "سترة شتوية بسيطة",
    image: "/images/doudoune-simple.avif",
    price: 35,
    category: "Pressing"
  },
  {
    id: "gandoura",
    name: "Gandoura",
    nameAr: "قندورة",
    image: "/images/gandoura.avif",
    price: 28,
    category: "Pressing"
  },
  {
    id: "veste-cuir-daim-homme",
    name: "Veste cuir/daim",
    nameAr: "سترة جلد/صوف",
    image: "/images/veste-cuir-daim.avif",
    price: 45,
    category: "Pressing"
  },
  {
    id: "costume-2",
    name: "Costume 2 pièces",
    nameAr: "بدلة قطعتين",
    image: "/images/costume-2.avif",
    price: 55,
    category: "Pressing"
  },
  {
    id: "djellaba-2",
    name: "Djellaba 2",
    nameAr: "جلابة 2",
    image: "/images/djellaba-2.avif",
    price: 32,
    category: "Pressing"
  },
  {
    id: "combinaison-simple",
    name: "Combinaison simple",
    nameAr: "بدلة عمل بسيطة",
    image: "/images/combinaison-simple.avif",
    price: 30,
    category: "Pressing"
  },
  {
    id: "gilet-cravate",
    name: "Gilet/Cravate",
    nameAr: "سترة/ربطة عنق",
    image: "/images/gilet-cravate.avif",
    price: 20,
    category: "Pressing"
  },

  // ========================
  // LINGE
  // ========================
  {
    id: "chaussette-calecon",
    name: "Chaussette/Caleçon",
    nameAr: "جورب/كلسون",
    image: "/images/chaussette-calecon.avif",
    price: 8,
    category: "Linge"
  },
  {
    id: "survette",
    name: "Survêtement",
    nameAr: "ملابس رياضية",
    image: "/images/survette.avif",
    price: 25,
    category: "Linge"
  },
  {
    id: "pyjama-2-pieces",
    name: "Pyjama 2 pièces",
    nameAr: "بيجامة قطعتين",
    image: "/images/pyjama-2-pieces.avif",
    price: 20,
    category: "Linge"
  },

  // ========================
  // ACCESSOIRES
  // ========================
  {
    id: "casquette",
    name: "Casquette",
    nameAr: "قبعة",
    image: "/images/casquette.avif",
    price: 10,
    category: "Accessoires"
  },

  // ========================
  // CLOTH SPA FEMME
  // ========================
  {
    id: "femme-pantalon",
    name: "Pantalon",
    nameAr: "بنطلون",
    image: "/images/femme/femme-1.jpeg",
    price: 20,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-chemise-cintre",
    name: "Chemise sur cintre",
    nameAr: "قميص على شماعة",
    image: "/images/femme/femme-2.jpeg",
    price: 22,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-chemise-plie",
    name: "Chemise pliée",
    nameAr: "قميص مطوي",
    image: "/images/femme/femme-3.jpeg",
    price: 25,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-veste-jacket",
    name: "Veste / Jacket / Blouson",
    nameAr: "سترة / جاكيت / بلوزون",
    image: "/images/femme/femme-4.jpeg",
    price: 30,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-tshirt-polo-cintre",
    name: "T-Shirt / Polo (sur cintre)",
    nameAr: "تي شيرت / بولو (على شماعة)",
    image: "/images/femme/femme-5.jpeg",
    price: 17,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-polo-tshirt-plie",
    name: "Polo / T-Shirt (plié)",
    nameAr: "بولو / تي شيرت (مطوي)",
    image: "/images/femme/femme-6.jpeg",
    price: 19,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-jupe",
    name: "Jupe",
    nameAr: "تنورة",
    image: "/images/femme/femme-7.jpeg",
    price: 22,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-manteau",
    name: "Manteau",
    nameAr: "معطف",
    image: "/images/femme/femme-8.jpeg",
    price: 40,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-fourrure",
    name: "Fourrure",
    nameAr: "فرو",
    image: "/images/femme/femme-9.jpeg",
    price: 100,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-doudoune-simple",
    name: "Doudoune simple",
    nameAr: "سترة شتوية بسيطة",
    image: "/images/femme/femme-10.jpeg",
    price: 40,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-doudoune-duvet",
    name: "Doudoune duvet",
    nameAr: "جاكيت ريش",
    image: "/images/femme/femme-11.jpeg",
    price: 60,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-pullover-sweat",
    name: "Pull Over / Sweat Shirt / Tricot",
    nameAr: "سترة / سويت شيرت / تريكو",
    image: "/images/femme/femme-12.jpeg",
    price: 22,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-robe-simple",
    name: "Robe simple",
    nameAr: "فستان بسيط",
    image: "/images/femme/femme-13.jpeg",
    price: 30,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-robe-soiree",
    name: "Robe soirée",
    nameAr: "فستان سهرة",
    image: "/images/femme/femme-14.jpeg",
    price: 70,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-veste-cuir-daim",
    name: "Veste cuir / daim",
    nameAr: "سترة جلد / شامواه",
    image: "/images/femme/femme-15.jpeg",
    price: 150,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-djellaba-simple",
    name: "Djellaba simple",
    nameAr: "جلابة بسيطة",
    image: "/images/femme/femme-16.jpeg",
    price: 30,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-djellaba-perles",
    name: "Djellaba perles",
    nameAr: "جلابة بالخرز",
    image: "/images/femme/femme-17.jpeg",
    price: 50,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-farach-simple",
    name: "Farach simple",
    nameAr: "فراشة بسيطة",
    image: "/images/femme/femme-18.jpeg",
    price: 30,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-farach-perles",
    name: "Farach perles",
    nameAr: "فراشة بالخرز",
    image: "/images/femme/femme-19.jpeg",
    price: 50,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-caftan-simple",
    name: "Caftan simple",
    nameAr: "قفطان بسيط",
    image: "/images/femme/femme-20.jpeg",
    price: 50,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-caftan-perles",
    name: "Caftan perles",
    nameAr: "قفطان بالخرز",
    image: "/images/femme/femme-21.jpeg",
    price: 70,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-takchita-simple",
    name: "Takchita simple",
    nameAr: "تكشيطة بسيطة",
    image: "/images/femme/femme-22.jpeg",
    price: 80,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-takchita-perles",
    name: "Takchita perles",
    nameAr: "تكشيطة بالخرز",
    image: "/images/femme/femme-23.jpeg",
    price: 100,
    priceFrom: true,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-robe-mariee",
    name: "Robe de mariée",
    nameAr: "فستان زفاف",
    image: "/images/femme/femme-24.jpeg",
    price: 400,
    category: "Cloth Spa Femme"
  },
  {
    id: "femme-echarpe-foulard",
    name: "Écharpe / Foulard",
    nameAr: "وشاح / حجاب",
    image: "/images/femme/femme-25.jpeg",
    price: 17,
    category: "Cloth Spa Femme"
  },

  // ========================
  // SNEAKERS SPA
  // ========================
  {
    id: "sneakers-classic",
    name: "Sneakers Classic",
    nameAr: "حذاء رياضي كلاسيكي",
    image: "/images/sneakersspa/sneakers-1.jpeg",
    price: 50,
    category: "Sneakers Spa"
  },
  {
    id: "sneakers-daim",
    name: "Sneakers en daim",
    nameAr: "حذاء رياضي شامواه",
    image: "/images/sneakersspa/sneakers-2.jpeg",
    price: 100,
    priceFrom: true,
    category: "Sneakers Spa"
  },
  {
    id: "sneakers-cuir",
    name: "Sneakers en cuir",
    nameAr: "حذاء رياضي جلد",
    image: "/images/sneakersspa/sneakers-3.jpeg",
    price: 80,
    priceFrom: true,
    category: "Sneakers Spa"
  },
  {
    id: "sneakers-luxe",
    name: "Sneakers de luxe",
    nameAr: "حذاء رياضي فاخر",
    image: "/images/sneakersspa/sneakers-4.jpeg",
    price: 120,
    priceFrom: true,
    category: "Sneakers Spa"
  },
  {
    id: "sneakers-bottes",
    name: "Bottes",
    nameAr: "أحذية طويلة",
    image: "/images/sneakersspa/sneakers-5.jpeg",
    price: 150,
    category: "Sneakers Spa"
  },
  {
    id: "sneakers-impermeabilisation",
    name: "Imperméabilisation & Anti-Taches",
    nameAr: "مقاومة الماء ومضاد البقع",
    image: "/images/sneakersspa/sneakers-6.jpeg",
    price: 80,
    priceFrom: true,
    category: "Sneakers Spa"
  },
  {
    id: "sneakers-blanchiment-semelles",
    name: "Blanchiment des semelles",
    nameAr: "تبييض النعل",
    image: "/images/sneakersspa/sneakers-7.jpeg",
    price: 50,
    category: "Sneakers Spa"
  },
  {
    id: "sneakers-formule-premium",
    name: "Formule Premium",
    nameAr: "الباقة المميزة",
    image: "/images/sneakersspa/sneakers-8.jpeg",
    price: 150,
    priceFrom: true,
    category: "Sneakers Spa"
  },

  // ========================
  // BLANCHISSERIE
  // ========================
  {
    id: "couverture",
    name: "Couverture",
    nameAr: "بطانية",
    image: "/images/blanchesserie/blanchisserie-1.jpeg",
    price: 40,
    category: "Blanchisserie"
  },
  {
    id: "couverture-ete",
    name: "Couverture été",
    nameAr: "بطانية صيفية",
    image: "/images/blanchesserie/blanchisserie-2.jpeg",
    price: 30,
    category: "Blanchisserie"
  },
  {
    id: "couverture-xxl",
    name: "Couverture XXL",
    nameAr: "بطانية حجم كبير",
    image: "/images/blanchesserie/blanchisserie-3.jpeg",
    price: 50,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "couette-synthetique",
    name: "Couette synthétique",
    nameAr: "غطاء",
    image: "/images/blanchesserie/blanchisserie-4.jpeg",
    price: 50,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "couette-duvet-plume",
    name: "Couette en duvet ou plume",
    nameAr: "غطاء الريش",
    image: "/images/blanchesserie/blanchisserie-5.jpeg",
    price: 100,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "drap-plat",
    name: "Drap plat",
    nameAr: "شرشف",
    image: "/images/blanchesserie/blanchisserie-6.jpeg",
    price: 25,
    category: "Blanchisserie"
  },
  {
    id: "drap-housse",
    name: "Drap housse",
    nameAr: "غطاء المرتبة",
    image: "/images/blanchesserie/blanchisserie-7.jpeg",
    price: 25,
    category: "Blanchisserie"
  },
  {
    id: "housse-couette",
    name: "Housse de couette",
    nameAr: "غطاء اللحاف",
    image: "/images/blanchesserie/blanchisserie-8.jpeg",
    price: 40,
    category: "Blanchisserie"
  },
  {
    id: "oreiller",
    name: "Oreiller",
    nameAr: "وسادة",
    image: "/images/blanchesserie/blanchisserie-9.jpeg",
    price: 25,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "taie-oreiller",
    name: "Taie d'oreiller",
    nameAr: "غطاء الوسادة",
    image: "/images/blanchesserie/blanchisserie-10.jpeg",
    price: 10,
    category: "Blanchisserie"
  },
  {
    id: "lhaf-salon",
    name: "Lhaf de salon",
    nameAr: "لحاف صالون مغربي",
    image: "/images/blanchesserie/blanchisserie-11.jpeg",
    price: 25,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "housse-salon-marocain",
    name: "Housse de salon marocain",
    nameAr: "تلحط",
    image: "/images/blanchesserie/blanchisserie-12.jpeg",
    price: 20,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "housse-coussins-p",
    name: "Housse de coussins (P)",
    nameAr: "غطاء المخدة (ص)",
    image: "/images/blanchesserie/blanchisserie-13.jpeg",
    price: 12,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "housse-coussins-g",
    name: "Housse de coussins (G)",
    nameAr: "غطاء المخدة (ك)",
    image: "/images/blanchesserie/blanchisserie-14.jpeg",
    price: 20,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "traversin",
    name: "Traversin",
    nameAr: "وسادة طويلة",
    image: "/images/blanchesserie/blanchisserie-15.jpeg",
    price: 25,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "housse-canape",
    name: "Housse de canapé (m²)",
    nameAr: "غطاء الأريكة",
    image: "/images/blanchesserie/blanchisserie-16.jpeg",
    price: 25,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "rideau-normal",
    name: "Rideau normal (m²)",
    nameAr: "ستارة عادية",
    image: "/images/blanchesserie/blanchisserie-17.jpeg",
    price: 10,
    category: "Blanchisserie"
  },
  {
    id: "rideau-special",
    name: "Rideau spécial (m²)",
    nameAr: "ستارة خاصة",
    image: "/images/blanchesserie/blanchisserie-18.jpeg",
    price: 15,
    category: "Blanchisserie"
  },
  {
    id: "rideau-double",
    name: "Rideau double (m²)",
    nameAr: "ستارة مزدوجة",
    image: "/images/blanchesserie/blanchisserie-19.jpeg",
    price: 25,
    category: "Blanchisserie"
  },
  {
    id: "nappe",
    name: "Nappe",
    nameAr: "مفارش المائدة",
    image: "/images/blanchesserie/blanchisserie-20.jpeg",
    price: 25,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "serviette-table",
    name: "Serviette de table",
    nameAr: "منديل",
    image: "/images/blanchesserie/blanchisserie-21.jpeg",
    price: 8,
    category: "Blanchisserie"
  },
  {
    id: "coussin-salon-p",
    name: "Coussin salon (P)",
    nameAr: "مخدة الصالون (ص)",
    image: "/images/blanchesserie/blanchisserie-22.jpeg",
    price: 15,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "protege-matelas-p",
    name: "Protège matelas (P)",
    nameAr: "حامي المرتبة (ص)",
    image: "/images/blanchesserie/blanchisserie-23.jpeg",
    price: 80,
    category: "Blanchisserie"
  },
  {
    id: "protege-matelas-g",
    name: "Protège matelas (G)",
    nameAr: "حامي المرتبة (ك)",
    image: "/images/blanchesserie/blanchisserie-24.jpeg",
    price: 130,
    category: "Blanchisserie"
  },
  {
    id: "surmatelas",
    name: "Surmatelas",
    nameAr: "مرتبة فوقية",
    image: "/images/blanchesserie/blanchisserie-25.jpeg",
    price: 200,
    priceFrom: true,
    category: "Blanchisserie"
  },
  {
    id: "serviette-grande",
    name: "Serviette (G)",
    nameAr: "فوطة كبيرة",
    image: "/images/blanchesserie/blanchisserie-26.jpeg",
    price: 20,
    category: "Blanchisserie"
  },
  {
    id: "peignoire",
    name: "Peignoire",
    nameAr: "رداء الحمام",
    image: "/images/blanchesserie/blanchisserie-27.jpeg",
    price: 30,
    category: "Blanchisserie"
  },
];

