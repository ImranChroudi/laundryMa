import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services Professionnels B2B | Pressing pour entreprises',
  description: 'Solutions de pressing et blanchisserie pour hôtels, restaurants, entreprises à Tanger. Service professionnel, collecte et livraison adaptées.',
  alternates: { canonical: 'https://www.laundry.ma/professionnels/' },
  openGraph: {
    title: 'Services Professionnels - Laundry.ma',
    description: 'Pressing et blanchisserie B2B pour entreprises à Tanger.',
    url: 'https://www.laundry.ma/professionnels/',
  },
};

export default function ProfessionnelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
