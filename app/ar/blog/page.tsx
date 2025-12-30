'use client'
import React from 'react';
import Link from 'next/link';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import HeroSection from '@/app/components/common/HeroSection';
import { Calendar, Clock, ArrowLeft, Heart, Sparkles, Leaf, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { ArticleSchema } from '@/app/lib/schema';

const blogPosts = [
  {
    slug: 'prolonger-vie-textiles',
    title: 'نصائح لإطالة عمر المنسوجات',
    excerpt: 'اكتشف نصائح خبرائنا للحفاظ على جودة ومظهر ملابسك مع مرور الوقت.',
    category: 'صيانة',
    icon: <Heart className="w-5 h-5 text-primary" />,
    image: '/images/blog-prolonger-vie-textiles.png',
    readTime: '5 دقائق',
    date: '15 يناير 2024',
  },
  {
    slug: 'enlever-taches-tenaces',
    title: 'نصائح لإزالة البقع العنيدة',
    excerpt: 'تعلم التقنيات المهنية لإزالة أصعب البقع من منسوجاتك بشكل فعال.',
    category: 'نصائح',
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    image: '/images/blog-enlever-taches-tenaces.png',
    readTime: '4 دقائق',
    date: '12 يناير 2024',
  },
  {
    slug: 'entretien-ecologique',
    title: 'الصيانة الإيكولوجية والمستدامة',
    excerpt: 'اعتمد ممارسات تنظيف صديقة للبيئة مع الحفاظ على ملابسك.',
    category: 'بيئة',
    icon: <Leaf className="w-5 h-5 text-primary" />,
    image: '/images/blog-entretien-ecologique.png',
    readTime: '6 دقائق',
    date: '10 يناير 2024',
  },
  {
    slug: 'tendances-mode-entretien',
    title: 'اتجاهات الموضة وصيانة الملابس',
    excerpt: 'ابق على اطلاع بالموضة مع الحفاظ على قطعك المفضلة بفضل نصائحنا المتخصصة.',
    category: 'موضة',
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
    image: '/images/blog-tendances-mode-entretien.png',
    readTime: '8 دقائق',
    date: '8 يناير 2024',
  },
];

export default function BlogPage() {
  return (
    <>
      <ArticleSchema
        headline="المدونة والنصائح - Laundry.ma"
        description="نصائح مهنية وحيل للعناية بمنسوجاتك"
        image="/images/expert.png"
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection
          title="المدونة والنصائح"
          subtitle="الرئيسية / المدونة"
          backgroundImage="/images/services-laundry.png"
          className="min-h-[50vh]"
        />

        {/* Blog Posts */}
        <SectionWrapper className="py-16 md:py-24 bg-white">
          <SectionMargin>
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12" dir="rtl">
                <div className="mb-6 flex justify-center">
                  <SectionBadge text="المدونة" highlightText="& نصائح" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-4">
                  اكتشف النصائح من{' '}
                  <span className="text-primary">خبرائنا</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  احصل على نصائحنا وإرشاداتنا المهنية للعناية بمنسوجاتك
                </p>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Link href={`/ar/blog/${post.slug}`} key={post.slug}>
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
                      <div className="relative w-full h-48 overflow-hidden">
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
                        <div className="flex items-center gap-2 mb-3 flex-row-reverse justify-end">
                          <div className="bg-primary/10 rounded-full p-2">
                            {post.icon}
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-tertiary mb-3 line-clamp-2 text-right">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3 text-right">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-row-reverse justify-end">
                          <div className="flex items-center gap-1 flex-row-reverse">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1 flex-row-reverse">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-tertiary hover:text-primary font-semibold transition-colors flex-row-reverse justify-end">
                          <span>اقرأ المزيد</span>
                          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </SectionMargin>
        </SectionWrapper>
      </div>
    </>
  );
}
