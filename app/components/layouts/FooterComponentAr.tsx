"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Timer,
  MapPin,
  Mail,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "الرئيسية", href: "/ar" },
  { label: "من نحن", href: "/ar/qui-sommes-nous" },
  { label: "خدماتنا", href: "/ar/services" },
  { label: "المهنيين", href: "/ar/professionnels" },
  { label: "قيمنا", href: "/ar/values" },
  { label: "الأسعار", href: "/ar/tarifs" },
];

const FooterAr = () => {
  const footerLinks = [
    { label: "من نحن", href: "/ar/qui-sommes-nous" }, 
    { label: "الخدمات", href: "/ar/services" },
    { label: "المدونة والنصائح", href: "/ar/blog" },
    { label: "اتصل بنا", href: "/ar/contact" },
    { label: "الشروط العامة", href: "/ar/conditions-generales" },
    { label: "السياسات القانونية", href: "/ar/mentions-legales" },
  ];

  const contactInfo = {
    phone: "+212 6 77 77 77 24",
    email: "contact@laundry.ma",
    address: "طنجة، المغرب",
    hours: "9.00 - 21.00 7J/7",
  };

  return (
    <footer className="bg-white shadow-sm border-t border-gray-200" dir="rtl">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info / Logo Section */}
          <div className="lg:col-span-1">
            <Link href="/ar" className="-m-1.5 p-1.5">
              <span className="sr-only">Laundry.ma</span>
              <Image src="/images/logo.jpg" alt="Logo" width={160} height={40} className="h-20 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed text-right">
              Laundry.ma يحول مهمة الغسيل إلى تجربة بسيطة وممتعة. خدمة احترافية في المنزل.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 text-right">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tertiary hover:text-primary transition block text-right"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {navLinks.slice(0, 2).map((navLink) => (
                <li key={navLink.href}>
                  <Link
                    href={navLink.href}
                    className="text-sm text-tertiary hover:text-primary transition block text-right"
                  >
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 text-right">
              خدماتنا
            </h3>
            <ul className="space-y-2">
              {navLinks
                .filter((link) => link.label !== "الرئيسية")
                .slice(0, 4)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-tertiary hover:text-primary transition block text-right"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 text-right">
                اتصل بنا
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2 justify-end">
                  <Phone className="h-4 w-4 text-secondary" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-secondary/80 transition">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Mail className="h-4 w-4 text-secondary" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-secondary/80 transition">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>{contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Timer className="h-4 w-4 text-secondary" />
                  <span>{contactInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 text-right">
                تابعنا
              </h3>
              <div className="flex space-x-4 justify-end">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400 transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-300 transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Laundry.ma. جميع الحقوق محفوظة.
            <span className="ml-2">
              <Link href="/ar/privacy" className="text-gray-600 hover:text-secondary/80 transition">
                سياسة الخصوصية
              </Link>
            </span>
            <span className="mr-2">
              <Link href="/ar/mentions-legales" className="text-gray-600 hover:text-secondary/80 transition">
                السياسات القانونية
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterAr;

