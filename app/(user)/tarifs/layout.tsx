import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Tarifs | Pressing & Blanchisserie à Tanger',
  description: 'Consultez nos tarifs de pressing, nettoyage à sec, repassage et blanchisserie. Des prix clairs et transparents. Collecte et livraison gratuites à Tanger.',
  alternates: { canonical: 'https://www.laundry.ma/tarifs/' },
  openGraph: {
    title: 'Nos Tarifs - Laundry.ma',
    description: 'Tarifs de pressing, nettoyage à sec, repassage. Prix clairs et transparents. Livraison gratuite à Tanger.',
    url: 'https://www.laundry.ma/tarifs/',
  },
};

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
