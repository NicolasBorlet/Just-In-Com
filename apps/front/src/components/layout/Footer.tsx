import { getFullUrl } from "@/utils/get-strapi-url";
import { getLocalizedPath } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { StrapiGlobal, Menu, MenuItem } from "@/types";
import InstagramFeed from "@/components/blocks/InstagramFeed/InstagramFeed";

export default function Footer({ global, lang }: { global?: StrapiGlobal; lang?: string; availableLocales: string[] }) {
    const strapiUrl = getFullUrl();
    const currentLocale = lang || 'fr';
    return (
        <footer className="flex flex-col gap-16">
            <InstagramFeed />
            <div className="py-24 bg-[#772D44] text-white">
                <div className="flex flex-col gap-12 items-center">
                    <Link href={getLocalizedPath('', currentLocale)} className="flex items-center gap-4">
                        <Image src={`${strapiUrl}${global?.logo_extensed.image.url}`} alt={global?.logo_extensed.image.alternativeText || global?.logo_extensed.logoText || "Logo"} width={450} height={100} className="w-[250px] md:w-[450px] h-auto" />
                    </Link>
                    <div className="divider w-full h-[1px] bg-white"></div>
                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            {global?.menu.find((menu: Menu) => menu.name === "main")?.item.map((item: MenuItem) => (
                                <Link href={item.isExternal ? item.href : getLocalizedPath(item.href.toLowerCase(), currentLocale)} key={item.id} className="text-white text-xl uppercase">
                                    {item.text}
                                </Link>
                            ))}
                        </ul>
                        <ul className="flex flex-col md:flex-row gap-2 items-center justify-center">
                            {global?.menu.find((menu: Menu) => menu.name === "legal")?.item.map((item: MenuItem) => (
                                <Link href={item.isExternal ? item.href : getLocalizedPath(item.href.toLowerCase(), currentLocale)} key={item.id} className="text-white text-xl uppercase">
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
