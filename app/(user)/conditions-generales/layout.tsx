import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation',
  description: 'Conditions générales d\'utilisation du service Laundry.ma. Pressing à domicile à Tanger.',
  alternates: { canonical: 'https://www.laundry.ma/conditions-generales/' },
  robots: { index: false, follow: true },
};

export default function ConditionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
