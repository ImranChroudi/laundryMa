"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import { useGetProduits, type Produit } from "@/app/hooks/use-produit";
import LoaderCommponent from "@/app/components/ui/Loader";
import Image from "next/image";
import SectionBadge from "@/app/components/common/SectionBadge";
import {
  tarifsData,
  categories,
  type TarifItem,
  type CategoryKey,
} from "@/app/data/tarifs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Sparkles,
  Star,
  ArrowUpDown,
  Plus,
  Check as CheckIcon,
} from "lucide-react";
import { useAuth } from "@/app/context/AdminProvider";

function TarifsContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isArabic = pathname?.startsWith("/ar");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get category from URL
  const urlCategory = searchParams.get("category") as CategoryKey | null;

  const [activeCategory, setActiveCategory] = useState<"all" | CategoryKey>(
    urlCategory || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category from URL
  useEffect(() => {
    if (urlCategory && categories.some((c) => c.key === urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const { data, isLoading } = useGetProduits();

  // Build products list
  const allProducts: (TarifItem & { source: "static" | "db" })[] = [];

  // Add static tarifs
  tarifsData.forEach((tarif) => {
    allProducts.push({ ...tarif, source: "static" });
  });

  // Filter by category
  let filteredProducts = allProducts.filter((product) => {
    if (activeCategory !== "all" && product.category !== activeCategory)
      return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        (product.nameAr && product.nameAr.includes(query))
      );
    }
    return true;
  });

  // Sort
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Get active category info
  const activeCategoryInfo =
    activeCategory !== "all"
      ? categories.find((c) => c.key === activeCategory)
      : null;

  const accentColor = activeCategoryInfo?.color || "#4DAFEF";

  // Count items per category
  const categoryCounts: Record<string, number> = { all: tarifsData.length };
  categories.forEach((cat) => {
    categoryCounts[cat.key] = tarifsData.filter(
      (t) => t.category === cat.key
    ).length;
  });

  // Scroll category tabs
  const scrollTabs = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return <LoaderCommponent />;
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Hero Header */}
      <div
        className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1E3A5F 0%, #2C5282 60%, #4DAFEF 100%)",
        }}
      >
        {/* Decorative patterns */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <SectionWrapper className="relative z-10">
          <SectionMargin>
            <div className="text-center">
              <div className="mb-5 flex justify-center">
                <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium text-white/90">
                    {isArabic
                      ? `${tarifsData.length}+ منتج وخدمة`
                      : `${tarifsData.length}+ produits & services`}
                  </span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {isArabic ? (
                  <>
                    جميع{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-cyan-200">
                      أسعارنا
                    </span>
                  </>
                ) : (
                  <>
                    Tous Nos{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-cyan-200">
                      Tarifs
                    </span>
                  </>
                )}
              </h1>
              <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
                {isArabic
                  ? "استكشف مجموعتنا الكاملة من خدمات التنظيف والعناية بأسعار شفافة"
                  : "Explorez notre gamme complète de services de nettoyage et d'entretien à prix transparents"}
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      isArabic
                        ? "ابحث عن منتج..."
                        : "Rechercher un produit..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-400 border-0 outline-none focus:ring-2 focus:ring-white/50 shadow-xl text-base"
                  />
                </div>
              </div>
            </div>
          </SectionMargin>
        </SectionWrapper>
      </div>

      {/* Main Content with Sidebar */}
      <SectionWrapper className="py-6 md:py-10">
        <SectionMargin>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 border-2"
                style={{
                  backgroundColor: showMobileFilters ? `${accentColor}10` : 'white',
                  borderColor: showMobileFilters ? accentColor : '#e5e7eb',
                  color: showMobileFilters ? accentColor : '#374151',
                }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{isArabic ? 'تصفية حسب الفئة' : 'Filtrer par catégorie'}</span>
                <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {activeCategory === 'all'
                    ? (isArabic ? 'الكل' : 'Tout')
                    : (isArabic ? activeCategoryInfo?.labelAr : activeCategoryInfo?.label)}
                </span>
              </button>
            </div>

            {/* Mobile Filter Dropdown */}
            {showMobileFilters && (
              <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-lg p-4 -mt-2 animate-in slide-in-from-top duration-200">
                <div className="flex flex-wrap gap-2">
                  {/* All Tab */}
                  <button
                    onClick={() => { setActiveCategory('all'); setShowMobileFilters(false); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                      activeCategory === 'all'
                        ? 'bg-tertiary text-white border-tertiary shadow-lg'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <span>✨</span>
                    <span>{isArabic ? 'الكل' : 'Tout'}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {categoryCounts.all}
                    </span>
                  </button>

                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => { setActiveCategory(cat.key); setShowMobileFilters(false); }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                          isActive
                            ? 'text-white shadow-lg'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                        style={isActive ? {
                          backgroundColor: cat.color,
                          borderColor: cat.color,
                          boxShadow: `0 4px 15px ${cat.color}35`,
                        } : {}}
                      >
                        <span>{cat.icon}</span>
                        <span className="whitespace-nowrap">{isArabic ? cat.labelAr : cat.label}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {categoryCounts[cat.key] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LEFT SIDEBAR — Desktop Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Sidebar Header */}
                  <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-bold text-gray-700">
                        {isArabic ? 'الفئات' : 'Catégories'}
                      </span>
                    </div>
                  </div>

                  {/* Sidebar Filters */}
                  <div className="p-2">
                    {/* All */}
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                        activeCategory === 'all'
                          ? 'bg-tertiary text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-base">✨</span>
                      <span className="flex-1 text-left">{isArabic ? 'الكل' : 'Tout'}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {categoryCounts.all}
                      </span>
                    </button>

                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.key;
                      return (
                        <button
                          key={cat.key}
                          onClick={() => setActiveCategory(cat.key)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                            isActive
                              ? 'text-white shadow-md'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          style={isActive ? {
                            backgroundColor: cat.color,
                            boxShadow: `0 4px 12px ${cat.color}30`,
                          } : {}}
                        >
                          <span className="text-base">{cat.icon}</span>
                          <span className="flex-1 text-left">{isArabic ? cat.labelAr : cat.label}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {categoryCounts[cat.key] || 0}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sort section in sidebar */}
                  <div className="px-5 py-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {isArabic ? 'ترتيب' : 'Trier par'}
                    </p>
                    <div className="space-y-1">
                      {[
                        { key: 'default' as const, label: isArabic ? 'الافتراضي' : 'Par défaut' },
                        { key: 'price-asc' as const, label: isArabic ? 'السعر: من الأقل' : 'Prix croissant' },
                        { key: 'price-desc' as const, label: isArabic ? 'السعر: من الأعلى' : 'Prix décroissant' },
                      ].map((option) => (
                        <button
                          key={option.key}
                          onClick={() => setSortBy(option.key)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            sortBy === option.key
                              ? 'text-primary bg-primary/5 font-medium'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT — Main Content */}
            <div className="flex-1 min-w-0">

              {/* Category Banner (when specific category selected) */}
              {activeCategoryInfo && (
                <div
                  className="rounded-2xl p-5 md:p-6 mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${activeCategoryInfo.bgColor} 0%, white 100%)`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl"
                      style={{
                        backgroundColor: `${activeCategoryInfo.color}15`,
                        boxShadow: `0 8px 25px ${activeCategoryInfo.color}15`,
                      }}
                    >
                      {activeCategoryInfo.icon}
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-gray-900">
                        {isArabic ? activeCategoryInfo.labelAr : activeCategoryInfo.label}
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {isArabic ? activeCategoryInfo.descriptionAr : activeCategoryInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sort Controls (Mobile only) + Count */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                  {filteredProducts.length}{' '}
                  {isArabic ? 'منتج' : filteredProducts.length > 1 ? 'produits' : 'produit'}
                </p>
                <div className="relative lg:hidden">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    <span>{isArabic ? 'ترتيب' : 'Trier'}</span>
                  </button>
                  {showSortMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                      <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 min-w-45">
                        {[
                          { key: 'default' as const, label: isArabic ? 'الافتراضي' : 'Par défaut' },
                          { key: 'price-asc' as const, label: isArabic ? 'السعر: من الأقل' : 'Prix croissant' },
                          { key: 'price-desc' as const, label: isArabic ? 'السعر: من الأعلى' : 'Prix décroissant' },
                        ].map((option) => (
                          <button
                            key={option.key}
                            onClick={() => { setSortBy(option.key); setShowSortMenu(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              sortBy === option.key
                                ? 'text-primary bg-primary/5 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {isArabic
                  ? "لم يتم العثور على منتجات"
                  : "Aucun produit trouvé"}
              </h3>
              <p className="text-gray-500">
                {isArabic
                  ? "حاول تغيير معايير البحث"
                  : "Essayez de modifier vos critères de recherche"}
              </p>
            </div>
          ) : (
            <>
              {/* When "all" is selected, show by category groups */}
              {activeCategory === "all" ? (
                <div className="space-y-12">
                  {categories.map((cat) => {
                    const catProducts = filteredProducts.filter(
                      (p) => p.category === cat.key
                    );
                    if (catProducts.length === 0) return null;

                    return (
                      <div key={cat.key}>
                        {/* Category Group Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                              style={{
                                backgroundColor: `${cat.color}15`,
                              }}
                            >
                              {cat.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {isArabic ? cat.labelAr : cat.label}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {catProducts.length}{" "}
                                {isArabic ? "منتج" : "articles"}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveCategory(cat.key)}
                            className="text-sm font-medium hover:underline transition-colors"
                            style={{ color: cat.color }}
                          >
                            {isArabic ? "عرض الكل" : "Voir tout →"}
                          </button>
                        </div>

                        {/* Category Products */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                          {catProducts.slice(0, 5).map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              isArabic={!!isArabic}
                              accentColor={cat.color}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Single category view - full grid */
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isArabic={!!isArabic}
                      accentColor={accentColor}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Sneakers Premium Banner */}
          {(activeCategory === "all" || activeCategory === "Sneakers Spa") && (
            <div
              className="mt-12 rounded-3xl overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 50%, #F97316 0%, transparent 50%)",
                }}
              />
              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 bg-orange-500/20 px-3 py-1.5 rounded-full mb-4">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="text-sm font-medium text-orange-300">
                      {isArabic ? "الباقة المميزة" : "Formule Premium"}
                    </span>
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {isArabic
                      ? "سبا الأحذية الرياضية المميز"
                      : "Sneakers Spa Premium"}
                  </h3>
                  <p className="text-white/60 mb-4 text-sm md:text-base leading-relaxed">
                    {isArabic
                      ? "تنظيف عميق داخلي وخارجي • تعقيم مضاد للبكتيريا • إزالة الروائح • حماية ضد الماء • تبييض النعل • تشطيب دقيق"
                      : "Nettoyage profond intérieur & extérieur • Désinfection anti-bactérienne • Élimination des odeurs • Protection imperméabilisante • Blanchiment des semelles • Finition détaillée"}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-white/50">
                      {isArabic ? "ابتداءً من" : "À partir de"}
                    </span>
                    <span className="text-4xl font-bold text-orange-400">
                      150
                    </span>
                    <span className="text-lg font-medium text-orange-400/70">
                      DH
                    </span>
                  </div>
                </div>
                <div className="shrink-0 w-48 h-48 md:w-56 md:h-56 relative">
                  <Image
                    src="/images/sneakersspa/sneakers-8.jpeg"
                    alt="Sneakers Spa Premium"
                    fill
                    className="object-cover rounded-2xl"
                    unoptimized
                  />
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-500/30" />
                </div>
              </div>
            </div>
          )}
            </div>
            {/* end RIGHT main content */}

          </div>
          {/* end flex layout */}
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
}

export default function Tarifs() {
  return (
    <Suspense fallback={<LoaderCommponent />}>
      <TarifsContent />
    </Suspense>
  );
}

// Product Card Component
function ProductCard({
  product,
  isArabic,
  accentColor,
}: {
  product: TarifItem;
  isArabic: boolean;
  accentColor: string;
}) {
  const { addToCart, cart } = useAuth();
  const [justAdded, setJustAdded] = useState(false);
  const isInCart = cart.some((item) => String(item.id) === String(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: isArabic ? (product.nameAr || product.name) : product.name,
      price: product.price,
      image: product.image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-transparent cursor-pointer h-full"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 35px ${accentColor}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      {/* Image with price overlay */}
      <div className="relative w-full aspect-4/5 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={isArabic ? (product.nameAr || product.name) : product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* "À partir de" badge top-left */}
        {product.priceFrom && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className="text-[10px] sm:text-xs font-semibold text-white px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ backgroundColor: `${accentColor}CC` }}
            >
              {isArabic ? "ابتداءً من" : "À partir de"}
            </span>
          </div>
        )}

        {/* Cart badge top-right */}
        {isInCart && !justAdded && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white px-2 py-1 rounded-full bg-green-500/90 backdrop-blur-sm">
              <CheckIcon className="w-3 h-3" />
              {isArabic ? "في السلة" : "Ajouté"}
            </span>
          </div>
        )}

        {/* Price overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5 line-clamp-2 leading-tight drop-shadow-md">
            {isArabic ? (product.nameAr || product.name) : product.name}
          </h3>
          {/* Price + Add to cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                {product.price}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/80">
                DH
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm active:scale-90"
              style={{
                backgroundColor: justAdded ? "#22c55e" : `${accentColor}CC`,
              }}
              title={isArabic ? "أضف إلى السلة" : "Ajouter au panier"}
            >
              {justAdded ? (
                <CheckIcon className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
