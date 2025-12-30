'use client'
import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import { Calendar, Clock, ArrowRight, Leaf, Sparkles, Heart, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const blogPosts: Record<string, {
  title: string;
  titleAr: string;
  content: string[];
  contentAr: string[];
  category: string;
  categoryAr: string;
  icon: React.ReactNode;
  image: string;
  readTime: string;
  readTimeAr: string;
  date: string;
  dateAr: string;
}> = {
  'prolonger-vie-textiles': {
    title: 'Conseils pour prolonger la vie des textiles',
    titleAr: 'نصائح لإطالة عمر المنسوجات',
    category: 'Entretien',
    categoryAr: 'صيانة',
    icon: <Heart className="w-6 h-6 text-primary" />,
    image: '/images/blog-prolonger-vie-textiles.png',
    readTime: '5 min',
    readTimeAr: '5 دقائق',
    date: '15 Jan 2024',
    dateAr: '15 يناير 2024',
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
    ],
    contentAr: [
      'العناية بمنسوجاتك أمر ضروري للحفاظ على جودتها ومظهرها مع مرور الوقت. إليك نصائح خبرائنا لإطالة عمر ملابسك:',
      '1. اقرأ دائماً ملصقات العناية قبل غسل ملابسك. كل نسيج يحتاج إلى معاملة خاصة.',
      '2. رتب ملابسك حسب اللون ونوع النسيج قبل الغسيل لتجنب تغير الألوان والأضرار.',
      '3. استخدم درجة حرارة الماء المناسبة: ماء بارد للألوان الداكنة والأنسجة الحساسة، ماء فاتر للأبيض والقطن.',
      '4. اقلب ملابسك قبل الغسيل للحفاظ على الألوان وتقليل التآكل.',
      '5. تجنب التجفيف الزائد في المجفف، الذي يمكن أن يضر بالألياف ويقلص الملابس.',
      '6. رتب ملابسك بشكل صحيح: علق البدلات والفساتين، اطوِ البلوزات والقمصان.',
      '7. استخدم شماعات مناسبة لتجنب التشوهات.',
      'باتباع هذه النصائح البسيطة ولكن الفعالة، يمكنك إطالة عمر منسوجاتك بشكل كبير والحفاظ على جودتها الأصلية.'
    ]
  },
  'enlever-taches-tenaces': {
    title: 'Astuces pour enlever les taches tenaces',
    titleAr: 'نصائح لإزالة البقع العنيدة',
    category: 'Astuces',
    categoryAr: 'نصائح',
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    image: '/images/blog-enlever-taches-tenaces.png',
    readTime: '7 min',
    readTimeAr: '7 دقائق',
    date: '12 Jan 2024',
    dateAr: '12 يناير 2024',
    content: [
      'Les taches peuvent être frustrantes, mais avec les bonnes techniques, la plupart peuvent être éliminées efficacement. Voici nos méthodes éprouvées :',
      'Taches de vin rouge : Appliquez du sel immédiatement, puis rincez à l\'eau froide. Utilisez du bicarbonate de soude et du vinaigre blanc si nécessaire.',
      'Taches de graisse : Saupoudrez de talc ou de fécule de maïs, laissez agir, puis brossez. Répétez si nécessaire.',
      'Taches de sang : Rincez à l\'eau froide immédiatement (jamais d\'eau chaude). Utilisez du peroxyde d\'hydrogène pour les taches persistantes.',
      'Taches de café/thé : Mélangez du vinaigre blanc et du liquide vaisselle, appliquez et laissez agir avant de laver.',
      'Taches d\'herbe : Utilisez de l\'alcool à friction ou du vinaigre blanc, puis lavez normalement.',
      'Taches de stylo : Appliquez du lait ou de l\'alcool à friction, puis lavez à l\'eau froide.',
      'Conseil général : Agissez rapidement ! Plus une tache est traitée tôt, plus elle sera facile à enlever. Testez toujours les produits sur une zone discrète avant utilisation.'
    ],
    contentAr: [
      'يمكن أن تكون البقع محبطة، ولكن بالتقنيات الصحيحة، يمكن إزالة معظمها بفعالية. إليك طرقنا المجربة:',
      'بقع النبيذ الأحمر: ضع الملح فوراً، ثم اشطف بالماء البارد. استخدم بيكربونات الصودا والخل الأبيض إذا لزم الأمر.',
      'بقع الدهون: رش التلك أو نشا الذرة، اتركه يعمل، ثم افرك. كرر إذا لزم الأمر.',
      'بقع الدم: اشطف بالماء البارد فوراً (أبداً لا تستخدم الماء الساخن). استخدم بيروكسيد الهيدروجين للبقع المستمرة.',
      'بقع القهوة/الشاي: اخلط الخل الأبيض وسائل غسيل الأطباق، ضعه واتركه يعمل قبل الغسيل.',
      'بقع العشب: استخدم الكحول الطبي أو الخل الأبيض، ثم اغسل بشكل طبيعي.',
      'بقع القلم: ضع الحليب أو الكحول الطبي، ثم اغسل بالماء البارد.',
      'نصيحة عامة: تصرف بسرعة! كلما تمت معالجة البقعة مبكراً، كان من السهل إزالتها. اختبر دائماً المنتجات على منطقة غير مرئية قبل الاستخدام.'
    ]
  },
  'entretien-ecologique': {
    title: 'Entretien écologique et durable',
    titleAr: 'الصيانة الإيكولوجية والمستدامة',
    category: 'Écologie',
    categoryAr: 'بيئة',
    icon: <Leaf className="w-6 h-6 text-primary" />,
    image: '/images/blog-entretien-ecologique.png',
    readTime: '6 min',
    readTimeAr: '6 دقائق',
    date: '10 Jan 2024',
    dateAr: '10 يناير 2024',
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
    ],
    contentAr: [
      'اعتماد ممارسات تنظيف صديقة للبيئة مفيد للبيئة وملابسك. إليك كيف:',
      '1. استخدم منتجات غسيل صديقة للبيئة وقابلة للتحلل، بدون فوسفات أو عوامل تبييض عدوانية.',
      '2. اغسل بالماء البارد قدر الإمكان لتوفير الطاقة والحفاظ على الألوان.',
      '3. املأ غسالتك بالكامل لتحسين استخدام الماء والطاقة.',
      '4. استخدم كرات التجفيف الصوفية بدلاً من منعمات الأقمشة الكيميائية.',
      '5. فضل التجفيف في الهواء الطلق بدلاً من المجفف لتقليل استهلاك الطاقة.',
      '6. أصلح بدلاً من الاستبدال: تعلم أساسيات الخياطة لإصلاح الخدوش الصغيرة.',
      '7. أعط حياة ثانية لملابسك: تبرع بها أو أعد تدويرها بدلاً من رميها.',
      '8. اختر أقمشة دائمة وطبيعية مثل القطن العضوي والكتان أو القنب.',
      'هذه الممارسات لا تحافظ على البيئة فحسب، بل تطيل أيضاً عمر ملابسك مع تقليل التكاليف.'
    ]
  },
  'tendances-mode-entretien': {
    title: 'Tendances mode et entretien du linge',
    titleAr: 'اتجاهات الموضة وصيانة الملابس',
    category: 'Mode',
    categoryAr: 'موضة',
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    image: '/images/blog-tendances-mode-entretien.png',
    readTime: '8 min',
    readTimeAr: '8 دقائق',
    date: '8 Jan 2024',
    dateAr: '8 يناير 2024',
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
    ],
    contentAr: [
      'البقاء على اطلاع بالموضة مع الحفاظ على قطعك المفضلة يتطلب عناية خاصة. إليك نصائحنا:',
      '1. اتبع الاتجاهات المستدامة: استثمر في قطع خالدة بدلاً من الموضة السريعة.',
      '2. اعتني بالأقمشة الحساسة: الحرير والكشمير والصوف تحتاج إلى صيانة متخصصة.',
      '3. التخزين المناسب: استخدم الأغطية لحماية ملابسك الموسمية.',
      '4. تناوب الملابس: بدل قطعك لتجنب التآكل المفرط.',
      '5. التنظيف المهني: ائتمن قطعك القيمة للمحترفين للحفاظ على جودتها.',
      '6. الإصلاح الوقائي: أصلح المشاكل الصغيرة قبل أن تتفاقم.',
      '7. إكسسوارات عالية الجودة: استثمر في شماعات جيدة وأنظمة تخزين.',
      'بدمج الموضة والصيانة المناسبة، يمكنك إنشاء خزانة ملابس دائمة وأنيقة تقاوم اختبار الزمن.'
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
              المقال غير موجود
            </h1>
            <Link
              href="/ar/blog"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              العودة إلى المدونة
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
          <div className="max-w-4xl mx-auto" dir="rtl">
            {/* Back Button */}
            <Link
              href="/ar/blog"
              className="inline-flex items-center gap-2 text-tertiary hover:text-primary mb-8 transition-colors flex-row-reverse"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة إلى المدونة</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-row-reverse justify-end">
                <div className="bg-primary/10 rounded-full p-3">
                  {post.icon}
                </div>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                  {post.categoryAr}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6 text-right">
                {post.titleAr}
              </h1>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
              <Image
                src={post.image}
                alt={post.titleAr}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.contentAr.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg text-right">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/20 text-right">
              <h3 className="text-2xl font-bold text-tertiary mb-4">
                هل تحتاج إلى مساعدة احترافية؟
              </h3>
              <p className="text-gray-600 mb-6">
                دع خبراءنا يعتنون بمنسوجاتك مع خدماتنا المهنية للغسيل.
              </p>
              <Link
                href="/ar/checkout"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                طلب استلام
              </Link>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
}
