"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import { useGetProduits, type Produit } from "@/app/hooks/use-produit";
import { tarifsData } from "@/app/data/tarifs";
import LoaderCommponent from "@/app/components/ui/Loader";
import CTAButton from "@/app/components/common/CTAButton";
import { Search } from "lucide-react";
import { ProductSchema, BreadcrumbSchema } from '@/app/lib/schema';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const slug = params.slug as string;
  
  const { data, isLoading } = useGetProduits();
  const [product, setProduct] = useState<Produit | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Produit[]>([]);

  useEffect(() => {
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

    // Add database products
    if (data?.produits) {
      data.produits.forEach((product) => {
        const existsInStatic = tarifsData.some(
          (tarif) => product.image === tarif.image || `/api/images/${product.image}` === tarif.image
        );
        if (!existsInStatic) {
          allProducts.push(product);
        }
      });
    }

    // Find current product
    const foundProduct = allProducts.find((p) => {
      const productSlug = typeof p._id === 'string' 
        ? p._id 
        : p.nameProduct?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || String(p._id);
      return productSlug === slug;
    });

    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find similar products (same category or random 3)
      const similar = allProducts
        .filter((p) => p._id !== foundProduct._id)
        .slice(0, 3);
      setSimilarProducts(similar);
    }
  }, [slug, data, isArabic]);

  if (isLoading) {
    return <LoaderCommponent />;
  }

  if (!product) {
    return (
      <SectionWrapper className="py-16 md:py-24">
        <SectionMargin>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {isArabic ? "المنتج غير موجود" : "Produit non trouvé"}
            </h1>
            <button
              onClick={() => router.push(isArabic ? '/ar/tarifs' : '/tarifs')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              {isArabic ? "العودة إلى الأسعار" : "Retour aux tarifs"}
            </button>
          </div>
        </SectionMargin>
      </SectionWrapper>
    );
  }

  const imagePath = typeof product.image === 'string' && product.image.startsWith('/images/')
    ? product.image
    : product.image
    ? `/api/images/${product.image}`
    : "/placeholder.svg";

  const productCategory = tarifsData.find(t => t.id === slug || t.name.toLowerCase() === product.nameProduct?.toLowerCase())?.category || "The Quick Laundry";

  return (
    <SectionWrapper className="py-8 md:py-16 bg-white min-h-screen">
      <SectionMargin>
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Product Image */}
          <div className="relative w-full h-[500px] md:h-[600px] bg-white rounded-lg overflow-hidden">
            
            <Image
              src={imagePath}
              alt={product.nameProduct || "Produit"}
              fill
              className="object-contain p-8"
              unoptimized
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {product.nameProduct}
            </h1>
            
            <div className="mb-6">
              <span className="text-3xl md:text-4xl font-semibold text-gray-700">
                {product.prix ? `${product.prix} ${isArabic ? "درهم" : "DH"}` : (isArabic ? "على التقدير" : "Sur devis")}
              </span>
            </div>

            <div className="mb-8">
              <span className="text-base text-gray-600">
                {isArabic ? "الفئة:" : "Catégorie :"} <span className="font-semibold text-primary">{productCategory}</span>
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <CTAButton 
                text={isArabic ? "اطلب الاستلام" : "Demander ramassage"}
                href={isArabic ? "/ar/checkout" : "/checkout"}
                className="max-w-max"
              />
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {isArabic ? "منتجات مشابهة" : "Produits similaires"}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((similarProduct) => {
                const similarSlug = typeof similarProduct._id === 'string' 
                  ? similarProduct._id 
                  : similarProduct.nameProduct?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || String(similarProduct._id);
                
                const similarUrl = isArabic ? `/ar/tarifs/${similarSlug}` : `/tarifs/${similarSlug}`;
                const similarImagePath = typeof similarProduct.image === 'string' && similarProduct.image.startsWith('/images/')
                  ? similarProduct.image
                  : similarProduct.image
                  ? `/api/images/${similarProduct.image}`
                  : "/placeholder.svg";
                
                const similarCategory = tarifsData.find(t => t.id === similarSlug || t.name.toLowerCase() === similarProduct.nameProduct?.toLowerCase())?.category || "THE QUICK LAUNDRY";

                return (
                  <div
                    key={similarProduct._id}
                    onClick={() => router.push(similarUrl)}
                    className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="relative w-full h-56 bg-white">
                      <Image
                        src={similarImagePath}
                        alt={similarProduct.nameProduct || "Produit"}
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {similarProduct.nameProduct}
                      </h3>
                      <p className="text-xs text-red-600 font-semibold mb-3 uppercase">
                        {similarCategory}
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {similarProduct.prix ? `${similarProduct.prix} ${isArabic ? "درهم" : "DH"}` : (isArabic ? "على التقدير" : "Sur devis")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </SectionMargin>
    </SectionWrapper>
  );
}

