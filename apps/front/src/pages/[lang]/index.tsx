import { Geist, Geist_Mono } from "next/font/google";
import { useGlobalQuery } from "@/services/globals/globalsQuery";
import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";
import PageContent from "@/components/layout/PageContent";

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

  const renderedBlocks = BlockRenderer({ blocks: home.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
