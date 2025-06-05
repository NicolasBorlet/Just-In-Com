'use client'

import { HeaderBlock } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ block }: { block: HeaderBlock }) {
  const strapiUrl = getStrapiURL();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className={`left-0 right-0 z-50 ${isHomePage ? 'absolute' : 'fixed'} ${isHomePage ? 'top-10' : 'top-4'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center gap-8 ${isHomePage ? 'flex-col' : 'flex-row'} ${isHomePage ? 'justify-center' : 'justify-between'}`}>
          <Link href="/" className="flex items-center mb-4">
            <Image
              src={`${strapiUrl}${isHomePage ? block.detailled_logo.image.url : block.logo.image.url}`}
              alt={isHomePage ? block.detailled_logo.image.alternativeText || block.detailled_logo.logoText : block.logo.image.alternativeText || block.logo.logoText}
              width={isHomePage ? 300 : 100}
              height={isHomePage ? 300 : 100}
              className={isHomePage ? "h-60 w-auto" : "h-12 w-auto"}
            />
          </Link>

          <nav className="flex space-x-8">
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
        </div>
      </div>
    </header>
  );
}
