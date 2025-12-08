import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import PageContent from "@/components/layout/PageContent";
import { fetchHome } from "@/services/home/homeService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import Head from "next/head";



export const getStaticProps = async () => {
  const [homeRes, globalRes, availableLocales] = await Promise.all([fetchHome({ locale: 'fr' }), fetchGlobal({ locale: 'fr' }), fetchAvailableLocales()]);
  return {
    props: {
      home: homeRes.data,
      global: globalRes.data,
      lang: 'fr',
      availableLocales,
    },
  };
};

export default function Home({
  home, global, lang, availableLocales,
}: {
  home: any;
  global?: any;
  lang: string;
  availableLocales: string[];
}) {
  useEffect(() => {
    if (home) {
      console.log("Home data:", home);
    }

    if (global) {
      console.log("Global data:", global);
    }

    if (availableLocales) {
      console.log("Available locales:", availableLocales);
    } else {
      console.log("Available locales not found");
    }
  }, [home, global, availableLocales]);

  const renderedBlocks = BlockRenderer({ blocks: home.blocks });

  return (
    <>
      <Head>
        <title>Home Page - {lang}</title>
      </Head>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
