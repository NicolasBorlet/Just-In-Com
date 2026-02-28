import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchHome } from "@/services/home/homeService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import { getLocalizedPath } from "@/lib/i18n";

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [homeRes, globalRes, availableLocales] = await Promise.all([
    fetchHome({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);
  return {
    props: {
      home: homeRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
  };
};

export default function Home({
  home,
  global,
  lang,
  availableLocales,
}: {
  home: any;
  global?: any;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({ blocks: home.blocks });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";

  return (
    <>
      <NextSeo
        title={home.seo?.metaTitle || "Accueil"}
        description={home.seo?.metaDescription || ""}
        canonical={`${siteUrl}${getLocalizedPath("", lang)}`}
      />
      <LocalBusinessJsonLd
        type="EventPlanner"
        id={siteUrl}
        name="Just in Com"
        description={home.seo?.metaDescription || "Organisation de mariages et d'événements professionnels"}
        url={siteUrl}
        images={[]}
        address={{ streetAddress: "", addressLocality: "", addressRegion: "", postalCode: "", addressCountry: "FR" }}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
