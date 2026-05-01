import BlockRenderer from "@/components/blocks/BlockRenderer";
import { WeddingSectionBlock } from "@/components/blocks/WeddingSection/WeddingSection.type";
import PageContent from "@/components/layout/PageContent";
import { supportedLanguages } from "@/config/language";
import { getLocalizedPath } from "@/lib/i18n";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import { fetchHome } from "@/services/home/homeService";
import { fetchWeddings } from "@/services/weddings/weddingService";
import { StrapiGlobal, StrapiPageData } from "@/types";
import { LocalBusinessJsonLd, NextSeo } from "next-seo";

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [homeRes, globalRes, availableLocales, weddingRes] = await Promise.all([
    fetchHome({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
    fetchWeddings({ locale }),
  ]);
  if (!homeRes.data || !globalRes.data || !globalRes.data.logo_extensed) {
    return { notFound: true };
  }

  const weddingBlocks: WeddingSectionBlock[] = (weddingRes.data?.blocks ?? [])
    .filter((b: WeddingSectionBlock) => b.__component === "blocks.wedding-block")
    .slice(-3);

  return {
    props: {
      home: homeRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
      weddingBlocks,
    },
    revalidate: 3600,
  };
};

export default function Home({
  home,
  global,
  lang,
  availableLocales,
  weddingBlocks,
}: {
  home: StrapiPageData;
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
  weddingBlocks: WeddingSectionBlock[];
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
