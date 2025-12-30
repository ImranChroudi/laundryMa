"use client";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import { useGetProduits, type Produit } from "@/app/hooks/use-produit";
import LoaderCommponent from "@/app/components/ui/Loader";
import Image from "next/image";
import SectionBadge from "@/app/components/common/SectionBadge";
import { tarifsData, type TarifItem } from "@/app/data/tarifs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Tarifs() {
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = pathname?.startsWith('/ar');

  const { data, isLoading } = useGetProduits();

  // Combine database products with static tarifs data
  const allProducts: Produit[] = [];
  
  // Add static tarifs first
  tarifsData.forEach((tarif) => {
    allProducts.push({
      _id: tarif.id,
      nameProduct: isArabic ? (tarif.nameAr || tarif.name) : tarif.name,
      prix: tarif.price,
      image: tarif.image,
      type: "normal" as const,
    });
  });

  // Add database products (avoid duplicates by checking image path)
  if (data?.produits) {
    data.produits.forEach((product) => {
      // Only add if not already in static tarifs (check by image path)
      const existsInStatic = tarifsData.some(
        (tarif) => product.image === tarif.image || `/api/images/${product.image}` === tarif.image
      );
      if (!existsInStatic) {
        allProducts.push(product);
      }
    });
  }

  if (isLoading) {
    return <LoaderCommponent />;
  }



  if (allProducts.length === 0) {
    return (
      <SectionWrapper className="py-16 md:py-24">
        <SectionMargin>
          <div className="text-center mb-8">
            <div className="mb-6 flex justify-center">
              <SectionBadge text={isArabic ? "الأسعار" : "Tarifs"} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
              {isArabic ? (
                <span className="text-primary">أسعارنا</span>
              ) : (
                <>
                  Nos <span className="text-primary">Tarifs</span>
                </>
              )}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              {isArabic ? "لا توجد منتجات متاحة في الوقت الحالي" : "Aucun produit disponible pour le moment"}
            </p>
          </div>
        </SectionMargin>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="py-8 md:py-12 bg-white">
      <SectionMargin>
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="mb-4 flex justify-center">
            <SectionBadge text="Tarifs" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-tertiary mb-2">
            Nos <span className="text-primary">Tarifs</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Parcourez notre collection de services de blanchisserie et pressing
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {allProducts.map((product: Produit) => {
            const imagePath = typeof product.image === 'string' && product.image.startsWith('/images/')
              ? product.image
              : product.image
              ? `/api/images/${product.image}`
              : "/placeholder.svg";
            
            // Generate slug for the product
            // For static tarifs, use the id from tarifsData
            const staticTarif = tarifsData.find(t => 
              t.id === product._id || 
              t.name === product.nameProduct ||
              (isArabic && t.nameAr === product.nameProduct)
            );
            
            const productSlug = staticTarif 
              ? staticTarif.id 
              : typeof product._id === 'string'
              ? product._id
              : product.nameProduct?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || String(product._id);
            
            const slugPath = isArabic ? `/ar/tarifs/${productSlug}` : `/tarifs/${productSlug}`;
            
            return (
            <Link href={slugPath} key={product._id}>
              <div
                className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-white">
                  <Image
                    src={imagePath}
                    alt={product.nameProduct || (isArabic ? "منتج" : "Produit")}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  {/* Product Name */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 min-h-[2rem] line-clamp-2">
                    {product.nameProduct || "Produit sans nom"}
                  </h3>

                  {/* TARIFS Label */}
                  <div className="mb-1">
                    <span className="text-xs font-semibold text-orange-500">
                      {isArabic ? "الأسعار" : "TARIFS"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      {product.prix ? `${product.prix} ${isArabic ? "درهم" : "DH"}` : (isArabic ? "على التقدير" : "Sur devis")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
}

