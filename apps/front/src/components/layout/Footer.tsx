import { getFullUrl } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import { StrapiGlobal, Menu, MenuItem } from "@/types";
import InstagramFeed from "@/components/blocks/InstagramFeed/InstagramFeed";

// Contact + social links. Update these with the real accounts when available.
const CONTACT_EMAIL = "contact@justincom.fr";

const SOCIAL_LINKS = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/justinfilm",
        path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/justinfilm_/",
        path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.24A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.89A4.29 4.29 0 1 1 16.29 12 4.29 4.29 0 0 1 12 16.29Zm6.86-11.15a1.54 1.54 0 1 1-1.54-1.54 1.54 1.54 0 0 1 1.54 1.54Z",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/justinfilm",
        path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/@justinfilm",
        path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81ZM9.6 15.6V8.4l6.26 3.6L9.6 15.6Z",
    },
];

export default function Footer({ global }: { global?: StrapiGlobal; lang?: string; availableLocales: string[] }) {
    const strapiUrl = getFullUrl();
    const year = new Date().getFullYear();
    return (
        <footer className="flex flex-col gap-16">
            <InstagramFeed />
            <div className="py-24 bg-[#772D44] text-white">
                <div className="flex flex-col gap-10 items-center px-6">
                    <Link href="/" className="flex items-center gap-4">
                        <Image src={`${strapiUrl}${global?.logo_extensed.image.url}`} alt={global?.logo_extensed.image.alternativeText || global?.logo_extensed.logoText || "Logo"} width={450} height={100} className="w-[200px] md:w-[360px] h-auto" />
                    </Link>

                    {/* Social networks */}
                    <ul className="flex gap-5 items-center justify-center">
                        {SOCIAL_LINKS.map((social) => (
                            <li key={social.name}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-300 hover:bg-white hover:text-[#772D44]"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Email */}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg md:text-xl text-white/90 hover:text-white transition-colors">
                        {CONTACT_EMAIL}
                    </a>

                    <div className="divider w-full h-[1px] bg-white/40"></div>

                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            {global?.menu.find((menu: Menu) => menu.name === "main")?.item.map((item: MenuItem) => (
                                <Link href={item.href.toLowerCase().startsWith('/') ? item.href.toLowerCase() : `/${item.href.toLowerCase()}`} key={item.id} className="text-white text-xl uppercase hover:text-white/80 transition-colors">
                                    {item.text}
                                </Link>
                            ))}
                        </ul>
                        <ul className="flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-center">
                            {global?.menu.find((menu: Menu) => menu.name === "legal")?.item.map((item: MenuItem) => (
                                <Link href={item.href.toLowerCase().startsWith('/') ? item.href.toLowerCase() : `/${item.href.toLowerCase()}`} key={item.id} className="text-white/80 text-sm md:text-base hover:text-white transition-colors">
                                    {item.text}
                                </Link>
                            ))}
                        </ul>
                    </div>

                    <p className="text-white/60 text-sm">© {year} Just&apos;in Com. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
