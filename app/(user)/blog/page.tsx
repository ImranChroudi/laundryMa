'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import HeroSection from '@/app/components/common/HeroSection';
import { Calendar, Clock, ArrowRight, ArrowLeft, Heart, Sparkles, Leaf, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { ArticleSchema } from '@/app/lib/schema';

const blogPosts = [
  {
    slug: 'prolonger-vie-textiles',
    title: 'Conseils pour prolonger la vie des textiles',
    excerpt: 'Découvrez nos conseils d\'experts pour préserver la qualité et l\'apparence de vos vêtements au fil du temps.',
    category: 'Entretien',
    icon: <Heart className="w-5 h-5 text-primary" />,
    image: '/images/blog-prolonger-vie-textiles.png',
    readTime: '5 min',
    date: '15 Jan 2024',
  },
  {
    slug: 'enlever-taches-tenaces',
    title: 'Astuces pour enlever les taches tenaces',
    excerpt: 'Apprenez les techniques professionnelles pour éliminer efficacement les taches les plus difficiles de vos textiles.',
    category: 'Astuces',
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    image: '/images/blog-enlever-taches-tenaces.png',
    readTime: '4 min',
    date: '12 Jan 2024',
  },
  {
    slug: 'entretien-ecologique',
    title: 'Entretien écologique et durable',
    excerpt: 'Adoptez des pratiques de nettoyage respectueuses de l\'environnement tout en préservant vos vêtements.',
    category: 'Écologie',
    icon: <Leaf className="w-5 h-5 text-primary" />,
    image: '/images/blog-entretien-ecologique.png',
    readTime: '6 min',
    date: '10 Jan 2024',
  },
  {
    slug: 'tendances-mode-entretien',
    title: 'Tendances mode et entretien du linge',
    excerpt: 'Restez à la mode tout en préservant vos pièces favorites grâce à nos conseils d\'entretien spécialisés.',
    category: 'Mode',
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
    image: '/images/blog-tendances-mode-entretien.png',
    readTime: '8 min',
    date: '8 Jan 2024',
  },
];

export default function BlogPage() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <>
      <ArticleSchema
        headline="Blog & Conseils - Laundry.ma"
        description="Conseils professionnels et astuces pour prendre soin de vos textiles"
        image="/images/expert.png"
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection
          title={isArabic ? "المدونة والنصائح" : "Blog & Conseils"}
          subtitle={isArabic ? "الرئيسية / المدونة" : "HOME / BLOG"}
          backgroundImage="/images/services-laundry.png"
        />

        {/* Blog Posts */}
        <SectionWrapper className="py-16 md:py-24 bg-white">
          <SectionMargin>
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className={`text-center mb-12 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                <div className="mb-6 flex justify-center">
                  <SectionBadge text={isArabic ? "المدونة" : "Blog"} highlightText={isArabic ? "& نصائح" : "& Conseils"} />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-tertiary mb-4">
                  
                      Découvrez les Conseils de{' '}<br />
                      <span className="text-primary">Nos Experts</span>
                   
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {isArabic
                    ? 'احصل على نصائحنا وإرشاداتنا المهنية للعناية بمنسوجاتك'
                    : 'Accédez à nos conseils professionnels et astuces pour prendre soin de vos textiles'
                  }
                </p>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => {
                  const postPath = isArabic ? `/ar/blog/${post.slug}` : `/blog/${post.slug}`;
                  
                  return (
                    <Link href={postPath} key={post.slug}>
                      <article
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        style={{
                          boxShadow: '0 10px 25px rgba(77, 175, 239, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 15px 35px rgba(77, 175, 239, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(77, 175, 239, 0.1)';
                        }}
                      >
                        {/* Image */}
                        <div className="relative w-full h-[300px] overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Category */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="bg-primary/10 rounded-full p-2">
                              {post.icon}
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              {post.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className={`text-xl font-bold text-tertiary mb-3 line-clamp-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className={`text-gray-600 mb-4 line-clamp-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className={`flex items-center gap-4 text-sm text-gray-500 mb-4 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          {/* Read More */}
                          <div className={`flex items-center gap-2 text-tertiary hover:text-primary font-semibold transition-colors ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                            <span>{isArabic ? 'اقرأ المزيد' : 'Lire plus'}</span>
                            {isArabic ? (
                              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            ) : (
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SectionMargin>
        </SectionWrapper>
      </div>
    </>
  );
}
