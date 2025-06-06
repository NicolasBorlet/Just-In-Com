'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { HeaderBlock } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ block, availableLocales }: { block: HeaderBlock, availableLocales: string[] }) {
  const strapiUrl = getStrapiURL();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale: currentLocale, setLocale } = useLocale();

  useEffect(() => {
    // Get browser locale on component mount
    const browserLocale = navigator.language.split('-')[0];
    setLocale(browserLocale === 'fr' ? 'fr' : 'en');
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const handleLanguageChange = (locale: string) => {
    setLocale(locale);
    // Dispatch a custom event that can be listened to by other components
    window.dispatchEvent(new CustomEvent('localeChange', { detail: { locale } }));
  };

  return (
    <header className={`left-0 right-0 z-50 ${isHomePage ? 'absolute' : 'fixed'} ${isHomePage ? 'top-20 md:top-10' : 'top-4'}`}>
      <div className="container mx-auto px-4 py-4 relative">
        <div className={`flex items-center gap-8 ${isHomePage ? 'flex-col' : 'flex-row'} ${isHomePage ? 'justify-center' : 'justify-between'}`}>
          <Link href="/" className="flex items-center">
            <Image
              src={`${strapiUrl}${isHomePage ? block.detailled_logo.image.url : block.logo.image.url}`}
              alt={isHomePage ? block.detailled_logo.image.alternativeText || block.detailled_logo.logoText : block.logo.image.alternativeText || block.logo.logoText}
              width={isHomePage ? 300 : 100}
              height={isHomePage ? 300 : 100}
              className={isHomePage ? "h-60 w-auto" : "h-12 w-auto"}
            />
          </Link>

          {/* Hamburger button for mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden fixed top-6 right-6 z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {block.navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-white text-xl uppercase"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className={`hidden md:flex items-center space-x-2 ${isHomePage ? 'absolute right-0 top-0' : ''}`}>
            {availableLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`px-3 py-1 rounded ${currentLocale === locale ? 'bg-white text-black' : 'text-white'}`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-95 z-40 transition-transform duration-300 lg:hidden ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              {block.navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-white text-2xl uppercase hover:text-gray-300 transition-colors"
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
