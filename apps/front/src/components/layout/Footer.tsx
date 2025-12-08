import { getFullUrl } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import PageContent from "./PageContent";

export default function Footer({ global, lang, availableLocales }: { global?: any; lang?: string; availableLocales: string[] }) {
    const strapiUrl = getFullUrl();
    return (
        <footer>
            <div className="py-24 bg-[#772D44] text-white mt-48">
                <div className="flex flex-col gap-12 items-center">
                    <Link href="/" className="flex items-center gap-4">
                        <Image src={`${strapiUrl}${global.logo_extensed.image.url}`} alt={global.logo_extensed.image.alternativeText || global.logo_extensed.logoText} width={450} height={100} />
                    </Link>
                    <div className="divider w-full h-[1px] bg-white"></div>
                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            {global.menu.find((menu: any) => menu.name === "main")?.item.map((item: any, index: number) => (
                                <Link href={item.href.toLowerCase().startsWith('/') ? item.href.toLowerCase() : `/${item.href.toLowerCase()}`} key={item.id} className="text-white text-xl uppercase">
                                    {item.text}
                                </Link>
                            ))}
                        </ul>
                        <ul className="flex flex-col md:flex-row gap-2 items-center justify-center">
                            {global.menu.find((menu: any) => menu.name === "legal")?.item.map((item: any, index: number) => (
                                <Link href={item.href.toLowerCase().startsWith('/') ? item.href.toLowerCase() : `/${item.href.toLowerCase()}`} key={item.id} className="text-white text-xl uppercase">
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
