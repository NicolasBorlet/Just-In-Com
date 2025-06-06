import { FooterBlock } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import PageContent from "../globals/PageContent";

export default function Footer({ block }: { block: FooterBlock }) {
    const strapiUrl = getStrapiURL();
  return <footer>
    <div className="py-24 bg-primary text-white mt-48">
        <PageContent>
                <div className="flex flex-col gap-12 items-center">
                    <Link href="/" className="flex items-center gap-4">
                        <Image src={`${strapiUrl}${block.detailled_logo.image.url}`} alt={block.detailled_logo.image.alternativeText || block.detailled_logo.logoText} width={450} height={100} />
                    </Link>
                    <div className="divider w-full h-[1px] bg-white"></div>
                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            {block.navigation.map((item) => (
                                <Link href={item.href} key={item.id} className="text-white text-xl uppercase">{item.text}</Link>
                            ))}
                        </ul>
                        <ul className="flex flex-col md:flex-row gap-2 items-center justify-center">
                            {block.secondary_navigation.map((item) => (
                                <Link href={item.href} key={item.id} className="text-white text-xl">{item.text}</Link>
                            ))}
                        </ul>
                    </div>
            </div>
        </PageContent>
    </div>
  </footer>;
}
