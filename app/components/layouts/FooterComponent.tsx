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
  { label: "Tarifs", href: "/tarifs" },
];

const Footer = () => {
  const footerLinks = [
    { label: "Qui sommes-nous", href: "/qui-sommes-nous" }, 
    { label: "Services", href: "/services" },
    { label: "Blog & Conseils", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Conditions générales", href: "/conditions-generales" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ];

  const contactInfo = {
    phone: "+212 6 77 77 77 24",
    email: "contact@laundry.ma",
    address: "Tanger, Maroc",
    hours: "9.00 - 21.00 7J/7",
  };

  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info / Logo Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Laundry.ma</span>
              <Image src="/images/logo.jpg" alt="Logo" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Laundry.ma transforme la corvée du linge en une expérience simple et agréable. Service professionnel à domicile.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {navLinks.slice(0, 2).map((navLink) => (
                <li key={navLink.href}>
                  <Link
                    href={navLink.href}
                    className="text-sm text-gray-500 hover:text-primary transition"
                  >
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {navLinks
                .filter((link) => link.label !== "Accueil")
                .slice(0, 4)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition"
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
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Contactez-nous
              </h3>
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-secondary" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition">
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
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Suivez-nous
              </h3>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 group"
                >
                  <Facebook className="h-4 w-4 text-gray-600 group-hover:text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-200 hover:bg-pink-500 flex items-center justify-center transition-colors duration-200 group"
                >
                  <Instagram className="h-4 w-4 text-gray-600 group-hover:text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-200 hover:bg-sky-500 flex items-center justify-center transition-colors duration-200 group"
                >
                  <Twitter className="h-4 w-4 text-gray-600 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Laundry.ma. Tous droits réservés.
            <span className="ml-2">
              <Link href="/privacy" className="hover:text-primary transition">
                Politique de confidentialité
              </Link>
            </span>
            <span className="ml-2">
              <Link href="/mentions-legales" className="hover:text-primary transition">
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
