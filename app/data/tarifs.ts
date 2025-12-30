// Tarifs avec images depuis public/images
export interface TarifItem {
  id: string;
  name: string;
  nameAr?: string;
  image: string;
  price: number;
  category?: string;
}

// Liste des tarifs avec images et prix
// Ajoutez vos images et prix ici
export const tarifsData: TarifItem[] = [
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
    category: "Repassage"
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
    id: "doudoune-simple",
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
    id: "veste-cuir-daim",
    name: "Veste cuir/daim",
    nameAr: "سترة جلد/صوف",
    image: "/images/veste-cuir-daim.avif",
    price: 45,
    category: "Pressing"
  },
  {
    id: "chaussette-calecon",
    name: "Chaussette/Caleçon",
    nameAr: "جورب/كلسون",
    image: "/images/chaussette-calecon.avif",
    price: 8,
    category: "Linge"
  },
  {
    id: "casquette",
    name: "Casquette",
    nameAr: "قبعة",
    image: "/images/casquette.avif",
    price: 10,
    category: "Accessoires"
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
];

