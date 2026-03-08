
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../global.css";
import ConditionalHeader from "@/app/components/layouts/ConditionalHeader";
import Footer from "@/app/components/layouts/FooterComponent";
import Providers from "@/app/components/layouts/Providers";
import ConditionalFloatingCTA from "@/app/components/common/ConditionalFloatingCTA";
import CookieBanner from "@/app/components/common/CookieBanner";
import TrustBar from "@/app/components/common/TrustBar";
import { AdminProvider } from "@/app/context/AdminProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laundry.ma"),
  title: {
    default: "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
    template: "%s | Laundry.ma",
  },
  description:
    "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec.",
  keywords: "pressing, nettoyage à sec, blanchisserie, Tanger, service à domicile, repassage, nettoyage tapis, laundry, livraison",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://www.laundry.ma/",
  },
  openGraph: {
    locale: "fr_FR",
    type: "website",
    title: "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
    description:
      "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec.",
    url: "https://www.laundry.ma/",
    siteName: "Laundry.ma",
    images: ["/images/laundry-tanger.avif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
    description:
      "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec.",
    images: ["/images/laundry-tanger.avif"],
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/images/laundry-tanger.avif" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.laundry.ma/#website",
                  "url": "https://www.laundry.ma/",
                  "name": "Laundry.ma",
                  "description": "Pressing à domicile de haute qualité à Tanger",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.laundry.ma/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "ImageObject",
                  "@id": "https://www.laundry.ma/#primaryimage",
                  "url": "https://www.laundry.ma/images/laundry-tanger.avif"
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.laundry.ma/#webpage",
                  "url": "https://www.laundry.ma/",
                  "inLanguage": "fr-FR",
                  "name": "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
                  "isPartOf": { "@id": "https://www.laundry.ma/#website" },
                  "primaryImageOfPage": { "@id": "https://www.laundry.ma/#primaryimage" },
                  "datePublished": "2017-01-02T13:26:32+00:00",
                  "dateModified": "2021-05-13T01:58:21+00:00",
                  "description": "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec."
                }
              ]
            })
          }}
        />
        
      </head>
      <body>
        <Providers>
          <AdminProvider>
            <ConditionalHeader showNavLinksDark={false} />
            <TrustBar />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
            <Footer />
            <ConditionalFloatingCTA />
            <CookieBanner />
          </AdminProvider>
        </Providers>
      </body>
    </html>
  );
}
