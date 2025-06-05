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

  if (!isHomePage) return null;

  return (
    <header className={`left-0 right-0 z-50 ${isHomePage ? 'absolute' : 'fixed'} ${isHomePage ? 'top-10' : 'top-4'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-8">
          <Link href={pathname} className="flex items-center mb-4">
            <Image
              src={`${strapiUrl}${block.detailled_logo.image.url}`}
              alt={block.detailled_logo.image.alternativeText || block.detailled_logo.logoText}
              width={300}
              height={300}
              className="h-60 w-auto"
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
