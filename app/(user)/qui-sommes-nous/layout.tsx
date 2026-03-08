import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qui sommes-nous | Laundry.ma à Tanger',
  description: 'Découvrez l\'histoire, la mission et les valeurs de Laundry.ma. Pressing à domicile de haute qualité à Tanger avec des produits écologiques.',
  alternates: { canonical: 'https://www.laundry.ma/qui-sommes-nous/' },
  openGraph: {
    title: 'Qui sommes-nous - Laundry.ma',
    description: 'Notre mission : un pressing à domicile de haute qualité, rapide et écologique à Tanger.',
    url: 'https://www.laundry.ma/qui-sommes-nous/',
  },
};

export default function QuiSommesNousLayout({ children }: { children: React.ReactNode }) {
  return children;
}
