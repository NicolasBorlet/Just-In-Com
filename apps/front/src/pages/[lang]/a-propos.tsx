import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchAbout } from "@/services/about/aboutService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const [aboutRes, globalRes, availableLocales] = await Promise.all([
    fetchAbout({ locale: params.lang }),
    fetchGlobal({ locale: params.lang }),
    fetchAvailableLocales()
  ]);
  return {
    props: {
      about: aboutRes.data,
      global: globalRes.data,
      lang: params.lang,
      availableLocales,
    },
  };
};

export default function About({
  about,
  global,
  lang,
  availableLocales,
}: {
  about: any;
  global?: any;
  lang: string;
  availableLocales: string[];
}) {
  useEffect(() => {
    if (about) {
      console.log("About data:", about);
    }

    if (global) {
      console.log("Global data:", global);
    }
  }, [about, global]);

  const renderedBlocks = BlockRenderer({ blocks: about.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
