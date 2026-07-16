import { getFullUrl } from "@/utils/get-strapi-url";
import { getLocalizedPath } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { StrapiGlobal, Menu, MenuItem, StrapiSocialLink } from "@/types";
import InstagramFeed from "@/components/blocks/InstagramFeed/InstagramFeed";

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("facebook") || key === "fb") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12H17l-.4 3h-2.7v7A10 10 0 0022 12z" />
      </svg>
    );
  }
  if (key.includes("instagram") || key === "ig") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A4.5 4.5 0 1112 16.5 4.5 4.5 0 0112 7.5zm0 2A2.5 2.5 0 1014.5 12 2.5 2.5 0 0012 9.5zm5.25-3.25a1 1 0 11-1 1 1 1 0 011-1z" />
      </svg>
    );
  }
  if (key.includes("linkedin") || key === "in") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.75h4V21H3zM9.5 8.75h3.8v1.67h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.64 4.75 6.07V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
      </svg>
    );
  }
  if (key.includes("youtube") || key === "yt") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.5v-7l6.2 3.5-6.2 3.5z" />
      </svg>
    );
  }
  return <span className="text-sm uppercase">{label.slice(0, 2)}</span>;
}

export default function Footer({ global, lang }: { global?: StrapiGlobal; lang?: string; availableLocales: string[] }) {
    const currentLocale = lang || 'fr';
    const logoImage = global?.logo_extensed?.image ?? global?.logo?.image;
    const logoUrl = logoImage?.url ? getFullUrl(logoImage.url) : '/favicon.ico';
    const logoAlt =
      logoImage?.alternativeText ||
      global?.logo_extensed?.logoText ||
      global?.logo?.logoText ||
      'Logo';
    const socials =
      global?.social_links?.filter((l: StrapiSocialLink) => l.href)?.length
        ? global.social_links.filter((l: StrapiSocialLink) => l.href)
        : [
            { text: "Instagram", href: "https://www.instagram.com/justinfilm_/", isExternal: true },
          ];

    return (
        <footer className="flex flex-col gap-10">
            <InstagramFeed />
            <div className="py-16 md:py-20 bg-[#772D44] text-white">
                <div className="flex flex-col gap-10 items-center px-6">
                    <Link href={getLocalizedPath('', currentLocale)} className="flex items-center gap-4">
                        <Image src={logoUrl} alt={logoAlt} width={450} height={100} className="w-[200px] md:w-[320px] h-auto" />
                    </Link>

                    {socials.length > 0 && (
                      <ul className="flex flex-wrap gap-6 items-center justify-center">
                        {socials.map((link, i) => (
                          <li key={`${link.href}-${i}`}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-80 transition-opacity"
                              aria-label={link.text || "Social link"}
                            >
                              <SocialIcon label={link.text || link.href || ""} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    {global?.email && (
                      <a href={`mailto:${global.email}`} className="text-base md:text-lg hover:underline">
                        {global.email}
                      </a>
                    )}

                    <div className="divider w-full h-[1px] bg-white/40"></div>
                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
                            {global?.menu?.find((menu: Menu) => menu.name === "main")?.item.map((item: MenuItem) => (
                                <Link href={item.isExternal ? item.href : getLocalizedPath(item.href.toLowerCase(), currentLocale)} key={item.id} className="text-white text-base md:text-lg uppercase">
                                    {item.text}
                                </Link>
                            ))}
                        </ul>
                        <ul className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center">
                            {global?.menu?.find((menu: Menu) => menu.name === "legal")?.item.map((item: MenuItem) => (
                                <Link href={item.isExternal ? item.href : getLocalizedPath(item.href.toLowerCase(), currentLocale)} key={item.id} className="text-white/80 text-sm uppercase">
                                    {item.text}
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
