import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site Laundry.ma. Pressing à domicile à Tanger.',
  alternates: { canonical: 'https://www.laundry.ma/mentions-legales/' },
  robots: { index: false, follow: true },
};

export default function MentionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
