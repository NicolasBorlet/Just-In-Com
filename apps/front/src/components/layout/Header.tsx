import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getPathWithLocale } from "@/lib/i18n";
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

  // `compact` = small horizontal bar (internal pages, or homepage once scrolled).
  // `solid` = white background + dark text (any page once scrolled).
  const compact = !isHomePage || hasScrolled;
  const solid = hasScrolled;

  // safe fallbacks when `global` isn't passed
  const logoExtImage = global?.logo_extensed?.image;
  const logoImage = global?.logo?.image;
  const logoUrl = (compact ? logoImage?.url : logoExtImage?.url) || logoImage?.url || '/favicon.ico';
  const logoAlt = (compact ? logoImage?.alternativeText : logoExtImage?.alternativeText) || global?.logo_extensed?.logoText || global?.logo?.logoText || 'Logo';

  return (
    <header className={`left-0 right-0 z-50 transition-all duration-300 ${isHomePage && !hasScrolled ? 'absolute top-20 md:top-10' : 'fixed top-0'} ${solid ? 'bg-white shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 py-4 relative">
        <div className={`flex items-center gap-8 ${compact ? 'flex-row justify-between' : 'flex-col justify-center'}`}>
          <Link href="/" className="flex items-center">
            <div className={`${compact ? "h-12 w-auto" : "h-40 md:h-48 w-auto"} relative`}>
              <Image
                src={`${logoUrl}`}
                alt={logoAlt}
                width={compact ? 100 : 300}
                height={compact ? 100 : 300}
                className={compact ? `h-12 w-auto ${solid ? 'invert' : ''}` : "h-40 md:h-48 w-auto"}
                priority={!compact}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                sizes={compact ? "100px" : "300px"}
              />
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden fixed top-6 right-6 z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 ${solid && !isMenuOpen ? 'bg-black' : 'bg-white'} transform transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`w-full h-0.5 ${solid && !isMenuOpen ? 'bg-black' : 'bg-white'} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 ${solid && !isMenuOpen ? 'bg-black' : 'bg-white'} transform transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>

          <nav className="hidden md:flex space-x-8">
            {global?.menu.find((menu: Menu) => menu.name === "main")?.item.map((item: MenuItem) => (
              <Link
                key={item.id}
                href={item.href.startsWith('/') ? item.href : `/${item.href}`}
                className={`text-xl uppercase transition-colors duration-300 ${solid ? 'text-black' : 'text-white'}`}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className={`hidden md:flex items-center space-x-2 ${!compact ? 'absolute right-0 top-0' : ''}`}>
            {availableLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`px-3 py-1 rounded transition-colors duration-300 ${currentLocale === locale ? 'bg-black text-white' : solid ? 'text-black' : 'text-white'} cursor-pointer`}
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
              <Link href={lang === 'fr' ? '/' : `/${lang}`} className="text-white text-2xl uppercase hover:text-gray-300 transition-colors" onClick={toggleMenu}>
                {lang === 'en' ? 'Home' : 'Accueil'}
              </Link>
              {global?.menu.find((menu: Menu) => menu.name === "main")?.item.map((item: MenuItem) => (
                <Link
                  key={item.id}
                  href={item.href.startsWith('/') ? item.href : `/${item.href}`}
                  onClick={toggleMenu}
                  className="text-white text-2xl uppercase hover:text-gray-300 transition-colors"
                >
                  {item.text}
                </Link>
              ))}
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                {availableLocales.map((locale) => (
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
