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
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous ?", href: "/qui-sommes-nous" },
  { label: "services", href: "/services" },
  { label: "Professionnels", href: "/professionnels" },
  { label: "Nos Valeurs", href: "/values" },
  { label: "Tarifs", href: "/tarifs" },
];

const Footer = () => {
  const footerLinks = [
    { label: "Qui sommes-nous", href: "/qui-sommes-nous" }, 
    { label: "Services", href: "/services" },
    { label: "Blog & Conseils", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Termes et conditions", href: "/terms" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ];

  const contactInfo = {
    phone: "+212 6 77 77 77 24",
    email: "contact@laundry.ma",
    address: "Tanger, Maroc",
    hours: "9.00 - 21.00 7J/7",
  };

  return (
    <footer className="bg-white shadow-sm border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info / Logo Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Laundry.ma</span>
              <Image src="/images/logo.jpg" alt="Logo" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Laundry.ma transforme la corvée du linge en une expérience simple et agréable. Service professionnel à domicile.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tertiary hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {navLinks.slice(0, 2).map((navLink) => (
                <li key={navLink.href}>
                  <Link
                    href={navLink.href}
                    className="text-sm text-gray-600 hover:text-secondary/80 transition"
                  >
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              S
            </h3>
            <ul className="space-y-2">
              {navLinks
                .filter((link) => link.label !== "Accueil")
                .slice(0, 4)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-secondary/80 transition"
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
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Contactez-nous
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-secondary/80 transition">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-secondary" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-secondary/80 transition">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>{contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-secondary" />
                  <span>{contactInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Suivez-nous
              </h3>
              <div className="flex space-x-4">
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
            &copy; {new Date().getFullYear()} Laundry.ma. Tous droits réservés.
            <span className="ml-2">
              <Link href="/privacy" className="text-gray-600 hover:text-secondary/80 transition">
                Politique de confidentialité
              </Link>
            </span>
            <span className="ml-2">
              <Link href="/mentions-legales" className="text-gray-600 hover:text-secondary/80 transition">
                Mentions légales
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
