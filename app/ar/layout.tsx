
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ConditionalHeaderAr from "@/app/components/layouts/ConditionalHeaderAr";
import FooterAr from "@/app/components/layouts/FooterComponentAr";
import Providers from "@/app/components/layouts/Providers";
import ConditionalFloatingCTA from "@/app/components/common/ConditionalFloatingCTA";
import ConditionalCookieBanner from "@/app/components/common/ConditionalCookieBanner";
import ConditionalFooter from "@/app/components/layouts/ConditionalFooter";
import PromotionPopup from "@/app/components/common/PromotionPopup";
import { AdminProvider } from "@/app/context/AdminProvider";
import { queryClient } from "../admin/layout";
import { QueryClientProvider } from "@tanstack/react-query";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Laundry.ma - خدمة التنظيف الجاف عالية الجودة في طنجة",
  description:
    "Laundry.ma - خدمة التنظيف الجاف عالية الجودة. جمع، غسيل، توصيل ملابسك وسجادك إلى المنزل في طنجة والمناطق. 100% تنظيف جاف.",
};

export default function ArabicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={poppins.variable}>
      <head>
        <link rel="preload" href="/images/laundry-tanger.avif" as="image" />
      </head>
      <body>
        <Providers>
          <AdminProvider>
            <QueryClientProvider client={queryClient}>
              <ConditionalHeaderAr showNavLinksDark={false} />
              {children}
              <ConditionalFooter />
              <ConditionalFloatingCTA />
              <ConditionalCookieBanner />
              <PromotionPopup />
            </QueryClientProvider>
          </AdminProvider>
        </Providers>
      </body>
    </html>
  );
}
