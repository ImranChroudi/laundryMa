'use client'
import Link from "next/link";
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
import Image from "next/image";

// Assets - you'll need to update these paths
const logo = "/images/logo.jpg";


// Navigation links
const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services/", label: "services" },
  { href: "/qui-sommes-nous/", label: "Qui sommes-nous" },
  { href: "/professionnels/", label: "Professionnels" },
  { href: "/tarifs/", label: "Tarifs" },
  { href: "/blog/", label: "Blog" },
];



export default function Header({ showNavLinksDark }: { showNavLinksDark: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Determine current language from pathname
  const currentLang = pathname.startsWith("/ar") ? "ar" : "fr";
  
  // Simple state management - you can replace with your auth context later
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cartCount } = useAuth();
  const currentPage = pathname.split("/").pop() || "home";

  const toggleLang = () => {
    const newLang = currentLang === "fr" ? "ar" : "fr";
    // Redirect to appropriate language version
    if (newLang === "ar") {
      // Convert current path to Arabic version
      const arPath = pathname === "/" ? "/ar" : `/ar${pathname}`;
      router.push(arPath);
    } else {
      // Convert current path to French version
      const frPath = pathname.replace("/ar", "") || "/";
      router.push(frPath);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push("/");
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
      className={` top-0 left-0 w-full z-[100] shadow-sm bg-white transition-colors duration-300 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      {/* 🔹 Top bar */}
      <div
        className={`hidden lg:flex justify-between items-center text-sm px-6 py-2 transition-colors duration-300 ${
          scrolled ? "bg-secondary text-white" : "bg-secondary text-white"
        }`}
      >
        <div className="flex items-center space-x-8">
          <div className="flex flex-col leading-tight">
            <div className="flex-row flex items-center gap-2">
              <Timer className="h-6 w-6" />
              <div>
                <p className="font-semibold">Heures d'ouverture</p>
                <p>9.00 - 21.00 7J/7</p>
              </div>
            </div>
          </div>
          <div className="flex-row flex items-center gap-2 leading-tight">
            <Phone className="h-6 w-6" />
            <div>
              <p className="font-semibold">Commandez en ligne</p>
              <a
                href="tel:+212677777724"
                className="hover:text-indigo-400 transition"
              >
                +212 6 77 77 77 24
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
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

          <div className="flex items-center bg-gray-200 rounded-full p-1">
            <button
              onClick={() => {
                if (currentLang !== "fr") toggleLang();
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                currentLang === "fr"
                  ? "bg-secondary text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">FR</span>
            </button>
          <button
              onClick={() => {
                if (currentLang !== "ar") toggleLang();
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                currentLang === "ar"
                  ? "bg-secondary text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">AR</span>
          </button>
          </div>
        </div>
      </div>

      {/* 🔹 Main Navigation */}
      <nav
        className="mx-auto  flex max-w-[1300px] items-center justify-between  p-6 lg:px-3"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="lg:flex  lg:relative absolute lg:left-0 left-1/2 transform lg:translate-x-0 -translate-x-1/2">
          <Link href={currentLang === "ar" ? "/ar" : "/"} className="-m-1.5 p-1.5">
            <span className="sr-only">Laundry.ma</span>
            <Image src={"/images/logo.jpg"} alt="Logo" width={160} height={40}  className="h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden ml-[10%] lg:flex lg:gap-x-8">
          {navLinks.map((link) => {
            const href = currentLang === "ar" ? `/ar${link.href === "/" ? "" : link.href}` : link.href;
            return (
            <Link
              key={link.href}
                href={href}
                className={`text-sm font-semibold hover:text-primary transition text-tertiary" 
              }`}
            >
                {link.label}
            </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Cart Icon Mobile */}
          <Link
            href={currentLang === "ar" ? "/ar/checkout" : "/checkout"}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ShoppingCart className="w-5 h-5 text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5"
          >
            <Menu
              className={`h-6 w-6 transition-colors duration-300 ${
                scrolled ? "text-gray-900" : "text-primary"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3 ml-4">
          {/* Cart Icon */}
          <Link
            href={currentLang === "ar" ? "/ar/checkout" : "/checkout"}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ShoppingCart className="w-5 h-5 text-tertiary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <CTAButton 
            text="Demander une ramassage" 
            href={currentLang === "ar" ? "/ar/checkout" : "/checkout"}
          />
        </div>

      </nav>

      {/* 🔹 Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href={currentLang === "ar" ? "/ar" : "/"} className="-m-1.5 p-1.5">
            <Image src={"/images/logo.jpg"} alt="Logo" width={160} height={40}  className="h-[120px] w-auto" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-md p-2.5 text-gray-700"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {navLinks?.map((link) => {
            const href = currentLang === "ar" ? `/ar${link.href === "/" ? "" : link.href}` : link.href;
            return (
            <Link
              key={link.href}
                href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
            >
                {link.label}
            </Link>
            );
          })}
        </div>

       
        {/* CTA Button in Mobile Menu */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div onClick={() => setIsMobileMenuOpen(false)}>
            <CTAButton 
              text="Demander une ramassage" 
              href={currentLang === "ar" ? "/ar/checkout" : "/checkout"}
            />
          </div>
        </div>

        {/* Language Switcher in Mobile Menu */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex items-center bg-gray-200 rounded-full p-1">
            <button
              onClick={() => {
                if (currentLang !== "fr") {
                  toggleLang();
                  setIsMobileMenuOpen(false);
                }
              }}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 flex-1 ${
                currentLang === "fr"
                  ? "bg-secondary text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">FR</span>
            </button>
            <button
              onClick={() => {
                if (currentLang !== "ar") {
                  toggleLang();
                  setIsMobileMenuOpen(false);
                }
              }}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 flex-1 ${
                currentLang === "ar"
                  ? "bg-secondary text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:text-gray-800"
              }`}
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
