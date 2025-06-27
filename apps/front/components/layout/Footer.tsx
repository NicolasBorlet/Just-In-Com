'use client';

import { GlobalSettings } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import PageContent from "../globals/PageContent";
import { AnimatedText } from "../animations";

export default function Footer({ block }: { block: GlobalSettings }) {
    const strapiUrl = getStrapiURL();
  return <footer>
    <div className="py-24 bg-primary text-white mt-48">
        <PageContent>
                <div className="flex flex-col gap-12 items-center">
                    <Link href="/" className="flex items-center gap-4">
                        <Image src={`${strapiUrl}${block.logo_extensed.image.url}`} alt={block.logo_extensed.image.alternativeText || block.logo_extensed.logoText} width={450} height={100} />
                    </Link>
                    <div className="divider w-full h-[1px] bg-white"></div>
                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            {block.menu.find(menu => menu.name === "main")?.item.map((item, index) => (
                                <Link href={item.href.toLowerCase().startsWith('/') ? item.href.toLowerCase() : `/${item.href.toLowerCase()}`} key={item.id} className="text-white text-xl uppercase">
                                    <AnimatedText
                                        options={{
                                            splitType: 'chars',
                                            animationType: 'slideUp',
                                            delay: 0.1 + (index * 0.1),
                                            stagger: 0.03,
                                            start: 'top 85%'
                                        }}
                                    >
                                        {item.text}
                                    </AnimatedText>
                                </Link>
                            ))}
                        </ul>
                        <ul className="flex flex-col md:flex-row gap-2 items-center justify-center">
                            {block.menu.find(menu => menu.name === "legal")?.item.map((item, index) => (
                                <Link href={item.href.toLowerCase().startsWith('/') ? item.href.toLowerCase() : `/${item.href.toLowerCase()}`} key={item.id} className="text-white text-xl uppercase">
                                    <AnimatedText
                                        options={{
                                            splitType: 'chars',
                                            animationType: 'slideUp',
                                            delay: 0.5 + (index * 0.05),
                                            stagger: 0.02,
                                            start: 'top 85%'
                                        }}
                                    >
                                        {item.text}
                                    </AnimatedText>
                                </Link>
                            ))}
                        </ul>
                    </div>
            </div>
        </PageContent>
    </div>
  </footer>;
}
