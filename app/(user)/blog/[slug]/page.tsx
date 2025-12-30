'use client'
import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import { Calendar, Clock, ArrowLeft, Leaf, Sparkles, Heart, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const blogPosts: Record<string, {
  title: string;
  content: string[];
  category: string;
  icon: React.ReactNode;
  image: string;
  readTime: string;
  date: string;
}> = {
  'prolonger-vie-textiles': {
    title: 'Conseils pour prolonger la vie des textiles',
    category: 'Entretien',
    icon: <Heart className="w-6 h-6 text-primary" />,
    image: '/images/blog-prolonger-vie-textiles.png',
    readTime: '5 min',
    date: '15 Jan 2024',
    content: [
      'Prendre soin de vos textiles est essentiel pour préserver leur qualité et leur apparence au fil du temps. Voici nos conseils d\'experts pour prolonger la vie de vos vêtements :',
      '1. Lisez toujours les étiquettes d\'entretien avant de laver vos vêtements. Chaque tissu nécessite un traitement spécifique.',
      '2. Triez vos vêtements par couleur et par type de tissu avant le lavage pour éviter les décolorations et les dommages.',
      '3. Utilisez la bonne température d\'eau : eau froide pour les couleurs foncées et les tissus délicats, eau tiède pour le blanc et le coton.',
      '4. Retournez vos vêtements avant le lavage pour préserver les couleurs et réduire l\'usure.',
      '5. Évitez le sur-séchage dans le sèche-linge, qui peut endommager les fibres et rétrécir les vêtements.',
      '6. Rangez vos vêtements correctement : suspendez les costumes et robes, pliez les pulls et t-shirts.',
      '7. Utilisez des cintres adaptés pour éviter les déformations.',
      'En suivant ces conseils simples mais efficaces, vous pouvez considérablement prolonger la durée de vie de vos textiles et maintenir leur qualité d\'origine.'
    ]
  },
  'enlever-taches-tenaces': {
    title: 'Astuces pour enlever les taches tenaces',
    category: 'Astuces',
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    image: '/images/blog-enlever-taches-tenaces.png',
    readTime: '7 min',
    date: '12 Jan 2024',
    content: [
      'Les taches peuvent être frustrantes, mais avec les bonnes techniques, la plupart peuvent être éliminées efficacement. Voici nos méthodes éprouvées :',
      'Taches de vin rouge : Appliquez du sel immédiatement, puis rincez à l\'eau froide. Utilisez du bicarbonate de soude et du vinaigre blanc si nécessaire.',
      'Taches de graisse : Saupoudrez de talc ou de fécule de maïs, laissez agir, puis brossez. Répétez si nécessaire.',
      'Taches de sang : Rincez à l\'eau froide immédiatement (jamais d\'eau chaude). Utilisez du peroxyde d\'hydrogène pour les taches persistantes.',
      'Taches de café/thé : Mélangez du vinaigre blanc et du liquide vaisselle, appliquez et laissez agir avant de laver.',
      'Taches d\'herbe : Utilisez de l\'alcool à friction ou du vinaigre blanc, puis lavez normalement.',
      'Taches de stylo : Appliquez du lait ou de l\'alcool à friction, puis lavez à l\'eau froide.',
      'Conseil général : Agissez rapidement ! Plus une tache est traitée tôt, plus elle sera facile à enlever. Testez toujours les produits sur une zone discrète avant utilisation.'
    ]
  },
  'entretien-ecologique': {
    title: 'Entretien écologique et durable',
    category: 'Écologie',
    icon: <Leaf className="w-6 h-6 text-primary" />,
    image: '/images/blog-entretien-ecologique.png',
    readTime: '6 min',
    date: '10 Jan 2024',
    content: [
      'Adopter des pratiques de nettoyage écologiques est bénéfique pour l\'environnement et pour vos vêtements. Voici comment :',
      '1. Utilisez des produits de lessive écologiques et biodégradables, sans phosphates ni agents de blanchiment agressifs.',
      '2. Lavez à l\'eau froide autant que possible pour économiser l\'énergie et préserver les couleurs.',
      '3. Remplissez complètement votre machine à laver pour optimiser l\'utilisation de l\'eau et de l\'énergie.',
      '4. Utilisez des boules de séchage en laine au lieu d\'assouplissants chimiques.',
      '5. Privilégiez le séchage à l\'air libre plutôt que le sèche-linge pour réduire la consommation d\'énergie.',
      '6. Réparez plutôt que remplacer : apprenez les bases de la couture pour réparer les petits accrocs.',
      '7. Donnez une seconde vie à vos vêtements : donnez-les ou recyclez-les au lieu de les jeter.',
      '8. Choisissez des tissus durables et naturels comme le coton bio, le lin ou le chanvre.',
      'Ces pratiques non seulement préservent l\'environnement mais aussi prolongent la vie de vos vêtements tout en réduisant vos coûts.'
    ]
  },
  'tendances-mode-entretien': {
    title: 'Tendances mode et entretien du linge',
    category: 'Mode',
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    image: '/images/blog-tendances-mode-entretien.png',
    readTime: '8 min',
    date: '8 Jan 2024',
    content: [
      'Rester à la mode tout en préservant vos pièces favorites nécessite une attention particulière. Voici nos conseils :',
      '1. Suivez les tendances durables : investissez dans des pièces intemporelles plutôt que dans la fast fashion.',
      '2. Prenez soin des tissus délicats : soie, cachemire et laine nécessitent un entretien spécialisé.',
      '3. Stockage approprié : utilisez des housses pour protéger vos vêtements de saison.',
      '4. Rotation des vêtements : alternez vos pièces pour éviter l\'usure excessive.',
      '5. Nettoyage professionnel : confiez vos pièces de valeur à des professionnels pour préserver leur qualité.',
      '6. Réparation préventive : réparez les petits problèmes avant qu\'ils ne s\'aggravent.',
      '7. Accessoires de qualité : investissez dans de bons cintres et systèmes de rangement.',
      'En combinant mode et entretien approprié, vous pouvez créer une garde-robe durable et élégante qui résiste à l\'épreuve du temps.'
    ]
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const pathname = usePathname();
  const slug = params.slug as string;
  const isArabic = pathname?.startsWith('/ar');
  const post = blogPosts[slug];

  if (!post) {
    return (
      <SectionWrapper className="py-16 md:py-24 min-h-screen flex items-center justify-center">
        <SectionMargin>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {isArabic ? 'المقال غير موجود' : 'Article non trouvé'}
            </h1>
            <Link
              href={isArabic ? '/ar/blog' : '/blog'}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              {isArabic ? 'العودة إلى المدونة' : 'Retour au blog'}
            </Link>
          </div>
        </SectionMargin>
      </SectionWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SectionWrapper className="py-16 md:py-24 bg-white">
        <SectionMargin>
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href={isArabic ? '/ar/blog' : '/blog'}
              className="inline-flex items-center gap-2 text-tertiary hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isArabic ? 'العودة إلى المدونة' : 'Retour au blog'}</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-full p-3">
                  {post.icon}
                </div>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">
                {post.title}
              </h1>

            </div>

            {/* Featured Image */}
            <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="text-2xl font-bold text-tertiary mb-4">
                {isArabic ? 'هل تحتاج إلى مساعدة احترافية؟' : 'Besoin d\'aide professionnelle ?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isArabic 
                  ? 'Laissez nos experts prendre soin de vos textiles avec nos services professionnels de blanchisserie.'
                  : 'Laissez nos experts prendre soin de vos textiles avec nos services professionnels de blanchisserie.'
                }
              </p>
              <Link
                href={isArabic ? '/ar/checkout' : '/checkout'}
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {isArabic ? 'طلب استلام' : 'Demander une ramassage'}
              </Link>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
}


