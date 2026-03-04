
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../global.css";
import ConditionalHeader from "@/app/components/layouts/ConditionalHeader";
import Footer from "@/app/components/layouts/FooterComponent";
import Providers from "@/app/components/layouts/Providers";
import ConditionalFloatingCTA from "@/app/components/common/ConditionalFloatingCTA";
import CookieBanner from "@/app/components/common/CookieBanner";
import PromotionPopup from "@/app/components/common/PromotionPopup";
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
  title: "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
  description:
    "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className={poppins.variable}>
      <head>
        <link rel="preload" href="/images/laundry-tanger.avif" as="image" />
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
            <PromotionPopup />
          </AdminProvider>
        </Providers>
      </body>
    </html>
  );
}
