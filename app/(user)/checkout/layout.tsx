import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commander | Demander un ramassage',
  description: 'Commandez votre pressing à domicile. Collecte et livraison gratuites à Tanger. Service express en 24h.',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
