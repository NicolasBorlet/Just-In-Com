import { Geist, Geist_Mono } from "next/font/google";
import { useGlobalQuery } from "@/services/globals/globalsQuery";
import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const homeRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/accueil?populate[blocks][populate]=*`);
  const homeJson = await homeRes.json();
  return {
    props: {
      home: homeJson.data,
      lang: params.lang,
    },
  };
};

export default function Home({
  home, lang,
}: {
  home: any;
  lang: string;
}) {
  useEffect(() => {
    if (home) {
      console.log("Home data:", home);

    }
  }, [home]);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <BlockRenderer blocks={home.blocks} />
    </div>
  );
}
