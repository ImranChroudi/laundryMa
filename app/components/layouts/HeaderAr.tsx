'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Timer,
  Package,
  ShoppingCart,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import CTAButton from "@/app/components/common/CTAButton";
import { useAuth } from "@/app/context/AdminProvider";

// Assets
const logo = "logo.png";

// Navigation links in Arabic
const navLinks = [
  { href: "/ar", label: "الرئيسية" },
  { href: "/ar/services/", label: "خدماتنا" },
  { href: "/ar/qui-sommes-nous/", label: "من نحن" },
  { href: "/ar/professionnels/", label: "المهنيين" },
  { href: "/ar/values/", label: "قيمنا" },
  { href: "/ar/tarifs/", label: "الأسعار" },
  { href: "/ar/blog/", label: "المدونة" },
];

export default function HeaderAr({ showNavLinksDark }: { showNavLinksDark: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useAuth();
  const currentPage = pathname.split("/").pop() || "home";

  const toggleLang = () => {
    // Convert Arabic path to French
    const frPath = pathname.replace("/ar", "") || "/";
    router.push(frPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`top-0 right-0 w-full z-[100] shadow-sm bg-white transition-colors duration-300 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      {/* 🔹 Top bar */}
      <div
        className={`hidden lg:flex justify-between items-center text-sm px-6 py-2 transition-colors duration-300 ${
          scrolled ? "bg-secondary text-white" : "bg-secondary text-white"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-200 rounded-full p-1">
            <button
              onClick={toggleLang}
              className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 bg-transparent text-gray-600 hover:text-gray-800"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">FR</span>
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 bg-secondary text-white shadow-md"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">AR</span>
            </button>
          </div>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-400"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-300"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center space-x-8 space-x-reverse">
          <div className="flex-row flex items-center gap-2 leading-tight">
            <Phone className="h-6 w-6" />
            <div>
              <p className="font-semibold">اطلب عبر الإنترنت</p>
              <a
                href="tel:+212677777724"
                className="hover:text-indigo-400 transition"
              >
                +212 6 77 77 77 24
              </a>
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex-row flex items-center gap-2">
              <Timer className="h-6 w-6" />
              <div>
                <p className="font-semibold">ساعات العمل</p>
                <p>9.00 - 21.00 7 أيام/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Main Navigation */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="lg:flex lg:relative absolute lg:right-0 right-1/2 transform lg:translate-x-0 translate-x-1/2">
          <Link href="/ar" className="-m-1.5 p-1.5">
            <span className="sr-only">Laundry.ma</span>
            <Image src={logo} alt="Logo" className="h-8 w-auto" width={32} height={32} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden mr-[10%] lg:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold hover:text-primary transition text-tertiary`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5"
          >
            <Menu
              className={`h-6 w-6 transition-colors duration-300 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

     

        {/* CTA Button */}
        <div className="hidden lg:flex items-end mr-4">
          <CTAButton 
            href="/ar/checkout"
          />
        </div>

      </nav>

      {/* 🔹 Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/ar" className="-m-1.5 p-1.5">
            <Image src={logo} alt="Logo" className="h-8 w-auto" width={32} height={32} />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-md p-2.5 text-gray-700"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </div>


        {/* CTA Button in Mobile Menu */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div onClick={() => setIsMobileMenuOpen(false)}>
            <CTAButton 
              href="/ar/checkout"
            />
          </div>
        </div>

        {/* Language Switcher in Mobile Menu */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex items-center bg-gray-200 rounded-full p-1">
            <button
              onClick={() => {
                toggleLang();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 flex-1 bg-transparent text-gray-600 hover:text-gray-800"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">FR</span>
            </button>
            <button
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 flex-1 bg-secondary text-white shadow-md"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">AR</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

