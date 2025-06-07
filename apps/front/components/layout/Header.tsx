'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { GlobalSettings } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ block, availableLocales }: { block: GlobalSettings, availableLocales: string[] }) {
  const strapiUrl = getStrapiURL();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { locale: currentLocale, setLocale } = useLocale();

  useEffect(() => {
    console.log("block", block);
    // Get browser locale on component mount
    const browserLocale = navigator.language.split('-')[0];
    setLocale(browserLocale === 'fr' ? 'fr' : 'en');

    // Add scroll event listener
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition >= window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={`left-0 right-0 z-50 transition-colors duration-300 ${isHomePage ? 'absolute' : 'fixed'} ${isHomePage ? 'top-20 md:top-10' : 'top-0'} ${hasScrolled ? 'bg-white shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 py-4 relative">
        <div className={`flex items-center gap-8 ${isHomePage ? 'flex-col' : 'flex-row'} ${isHomePage ? 'justify-center' : 'justify-between'}`}>
          <Link href="/" className="flex items-center">
            <Image
              src={`${strapiUrl}${isHomePage ? block.logo_extensed.image.url : block.logo.image.url}`}
              alt={isHomePage ? block.logo_extensed.image.alternativeText || block.logo_extensed.logoText : block.logo.image.alternativeText || block.logo.logoText}
              width={isHomePage ? 300 : 100}
              height={isHomePage ? 300 : 100}
              className={isHomePage ? "h-60 w-auto" : "h-12 w-auto"}
            />
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden fixed top-6 right-6 z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 ${hasScrolled ? 'bg-black' : 'bg-white'} transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 ${hasScrolled ? 'bg-black' : 'bg-white'} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 ${hasScrolled ? 'bg-black' : 'bg-white'} transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          <nav className="hidden md:flex space-x-8">
            {block.menu.find(menu => menu.name === "main")?.item.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-xl uppercase transition-colors duration-300 ${hasScrolled ? 'text-black' : 'text-white'}`}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className={`hidden md:flex items-center space-x-2 ${isHomePage ? 'absolute right-0 top-0' : ''}`}>
            {availableLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`px-3 py-1 rounded transition-colors duration-300 ${currentLocale === locale ? 'bg-black text-white' : hasScrolled ? 'text-black' : 'text-white'}`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>

          <div
            className={`fixed inset-0 bg-black bg-opacity-95 z-40 transition-transform duration-300 lg:hidden ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              {block.menu.find(menu => menu.name === "main")?.item.map((item) => (
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
