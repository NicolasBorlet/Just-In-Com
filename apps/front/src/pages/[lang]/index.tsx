import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchHome } from "@/services/home/homeService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const [homeRes, globalRes, availableLocales] = await Promise.all([fetchHome({ locale: params.lang }), fetchGlobal({ locale: params.lang }), fetchAvailableLocales()]);
  return {
    props: {
      home: homeRes.data,
      global: globalRes.data,
      lang: params.lang,
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
  }, [home, global]);

  const renderedBlocks = BlockRenderer({ blocks: home.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
