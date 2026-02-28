import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchAbout } from "@/services/about/aboutService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import { NextSeo } from "next-seo";
import { getLocalizedPath } from "@/lib/i18n";

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [aboutRes, globalRes, availableLocales] = await Promise.all([
    fetchAbout({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);
  return {
    props: {
      about: aboutRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
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
  const renderedBlocks = BlockRenderer({ blocks: about.blocks });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";

  return (
    <>
      <NextSeo
        title={about.seo?.metaTitle || "A propos"}
        description={about.seo?.metaDescription || ""}
        canonical={`${siteUrl}${getLocalizedPath("a-propos", lang)}`}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
