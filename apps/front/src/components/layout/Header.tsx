import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getPathWithLocale, getLocalizedPath } from "@/lib/i18n";
import { supportedLanguages } from "@/config/language";
import { StrapiGlobal, Menu, MenuItem } from "@/types";

export default function Header({ global, lang, availableLocales }: { global?: StrapiGlobal; lang?: string; availableLocales: string[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/' || pathname === `/${lang}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const currentLocale = lang || 'fr';
  const locales = availableLocales.filter((l) => supportedLanguages.includes(l));

  const handleLanguageChange = useCallback((locale: string) => {
    if (!pathname) return;

    const normalize = (p: string) => (p === '' ? '/' : p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);

    const newPath = getPathWithLocale(pathname, locale);

    if (normalize(newPath) === normalize(pathname)) return;

    router.push(newPath);
  }, [pathname, router]);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoExtImage = global?.logo_extensed?.image;
  const logoImage = global?.logo?.image;
  const useCompactLogo = !isHomePage || hasScrolled;
  const logoUrl = (useCompactLogo ? logoImage?.url : logoExtImage?.url) || logoImage?.url || logoExtImage?.url || '/favicon.ico';
  const logoAlt = (useCompactLogo ? logoImage?.alternativeText : logoExtImage?.alternativeText) || global?.logo_extensed?.logoText || global?.logo?.logoText || 'Logo';

  const solidNav = hasScrolled;
  const navTextClass = solidNav ? 'text-black' : 'text-white';
  const burgerClass = solidNav && !isMenuOpen ? 'bg-black' : 'bg-white';

  return (
    <header className={`left-0 right-0 z-50 transition-all duration-300 ${isHomePage && !hasScrolled ? 'absolute' : 'fixed'} ${isHomePage && !hasScrolled ? 'top-20 md:top-10' : 'top-0'} ${solidNav ? 'bg-white shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 py-4 relative">
        <div className={`flex items-center gap-8 ${isHomePage && !hasScrolled ? 'flex-col' : 'flex-row'} ${isHomePage && !hasScrolled ? 'justify-center' : 'justify-between'}`}>
          <Link href={getLocalizedPath('', currentLocale)} className="flex items-center">
            <div className={`${isHomePage && !hasScrolled ? "h-40 md:h-44 w-auto" : "h-12 w-auto"} relative`}>
              <Image
                src={`${logoUrl}`}
                alt={logoAlt}
                width={isHomePage && !hasScrolled ? 220 : 100}
                height={isHomePage && !hasScrolled ? 220 : 100}
                className={isHomePage && !hasScrolled ? "h-40 md:h-44 w-auto" : `h-12 w-auto ${solidNav ? 'invert' : ''}`}
                priority={isHomePage}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                sizes={isHomePage && !hasScrolled ? "220px" : "100px"}
              />
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden fixed top-6 right-6 z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 ${burgerClass} transform transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`w-full h-0.5 ${burgerClass} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 ${burgerClass} transform transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>

          <nav className="hidden md:flex space-x-8">
            {global?.menu.find((menu: Menu) => menu.name === "main")?.item.map((item: MenuItem) => (
              <Link
                key={item.id}
                href={item.isExternal ? item.href : getLocalizedPath(item.href, currentLocale)}
                className={`text-xl uppercase transition-colors duration-300 ${navTextClass}`}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className={`hidden md:flex items-center space-x-2 ${isHomePage && !hasScrolled ? 'absolute right-0 top-0' : ''}`}>
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`px-3 py-1 rounded transition-colors duration-300 ${currentLocale === locale ? 'bg-black text-white' : solidNav ? 'text-black' : 'text-white'} cursor-pointer`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>

          <div
            className={`fixed inset-0 bg-black bg-opacity-85 z-40 transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              <Link href={getLocalizedPath('', currentLocale)} className="text-white text-2xl uppercase hover:text-gray-300 transition-colors" onClick={toggleMenu}>
                {lang === 'en' ? 'Home' : 'Accueil'}
              </Link>
              {global?.menu.find((menu: Menu) => menu.name === "main")?.item.map((item: MenuItem) => (
                <Link
                  key={item.id}
                  href={item.isExternal ? item.href : getLocalizedPath(item.href, currentLocale)}
                  onClick={toggleMenu}
                  className="text-white text-2xl uppercase hover:text-gray-300 transition-colors"
                >
                  {item.text}
                </Link>
              ))}
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                {locales.map((locale) => (
                  <Link
                    key={locale}
                    href={getPathWithLocale(pathname, locale)}
                    onClick={toggleMenu}
                    className={`px-3 py-1 rounded transition-colors duration-300 ${lang === locale ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
                    aria-label={`Switch to ${locale.toUpperCase()} language`}
                  >
                    {locale.toUpperCase()}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
