import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Conseils pressing & entretien textile',
  description: 'Conseils et astuces pour l\'entretien de vos vêtements, tapis et textiles. Articles du blog Laundry.ma.',
  alternates: { canonical: 'https://www.laundry.ma/blog/' },
  openGraph: {
    title: 'Blog - Laundry.ma',
    description: 'Conseils pressing, entretien textile et astuces blanchisserie par Laundry.ma.',
    url: 'https://www.laundry.ma/blog/',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
