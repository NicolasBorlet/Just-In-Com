import BlockRenderer from "@/components/blocks/BlockRenderer";
import { WeddingSectionBlock } from "@/components/blocks/WeddingSection/WeddingSection.type";
import LatestArticles from "@/components/blocks/LatestArticles/LatestArticles";
import ReviewsSection from "@/components/blocks/ReviewsSection/ReviewsSection";
import HomeWeddingVideos from "@/components/blocks/HomeWeddingVideos/HomeWeddingVideos";
import PageContent from "@/components/layout/PageContent";
import { getBuildLocales } from "@/config/language";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import { fetchHome } from "@/services/home/homeService";
import { fetchWeddings } from "@/services/weddings/weddingService";
import { fetchArticles } from "@/services/blog/articleService";
import { StrapiGlobal, StrapiPageData, StrapiArticle } from "@/types";
import { LocalBusinessJsonLd, NextSeo } from "next-seo";
import { buildSeo, SITE_URL } from "@/lib/seo";
import { getFullUrl } from "@/utils/get-strapi-url";

export const getStaticPaths = async () => {
  const langs = await getBuildLocales();
  return {
    paths: langs.map((lang) => ({ params: { lang } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [homeRes, globalRes, availableLocales, weddingRes, articlesRes] = await Promise.all([
    fetchHome({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
    fetchWeddings({ locale }),
    fetchArticles({ locale }),
  ]);
  if (!homeRes.data || !globalRes.data) {
    return { notFound: true };
  }

  const weddingBlocks: WeddingSectionBlock[] = (weddingRes.data?.blocks ?? [])
    .filter((b: WeddingSectionBlock) => b.__component === "blocks.wedding-block")
    .slice(-3);

  const articles: StrapiArticle[] = (articlesRes.data ?? [])
    .slice()
    .sort(
      (a: StrapiArticle, b: StrapiArticle) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    )
    .slice(0, 3);

  return {
    props: {
      home: homeRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
      weddingBlocks,
      articles,
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
  articles,
}: {
  home: StrapiPageData;
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
  weddingBlocks: WeddingSectionBlock[];
  articles: StrapiArticle[];
}) {
  // Prefer wedding film teasers for the Mariage section; drop duplicate mariage galleries from CMS.
  const homeBlocks = weddingBlocks.length
    ? home.blocks.filter((b) => {
        if (b.__component !== "blocks.content-section") return true;
        const title = ("title" in b && typeof b.title === "string" ? b.title : "").toLowerCase();
        return !/mariage|wedding/.test(title);
      })
    : home.blocks;

  const renderedBlocks = BlockRenderer({ blocks: homeBlocks, isHome: true });

  const businessName = global?.siteName || "Just in Com";
  const description =
    home.seo?.metaDescription ||
    "Organisation de mariages et d'événements professionnels";
  const logoUrl = global?.logo_extensed?.image?.url
    ? getFullUrl(global.logo_extensed.image.url)
    : global?.logo?.image?.url
    ? getFullUrl(global.logo.image.url)
    : undefined;
  const sameAs = (global?.social_links ?? [])
    .map((link) => link.href)
    .filter((href): href is string => Boolean(href && href.startsWith("http")));
  const h1Title = home.seo?.metaTitle || home.title || businessName;

  const mariageTitle = lang === "en" ? "Weddings" : "Mariage";

  return (
    <>
      <NextSeo
        {...buildSeo({
          seo: home.seo,
          lang,
          basePath: "",
          fallbackTitle: "Accueil",
          fallbackDescription: description,
        })}
      />
      {global?.streetAddress && (
        <LocalBusinessJsonLd
          type="EventPlanner"
          id={SITE_URL}
          name={businessName}
          description={description}
          url={SITE_URL}
          telephone={global?.phone || undefined}
          images={logoUrl ? [logoUrl] : []}
          sameAs={sameAs.length ? sameAs : undefined}
          address={{
            streetAddress: global.streetAddress,
            addressLocality: global?.addressLocality || "",
            addressRegion: global?.addressRegion || "",
            postalCode: global?.postalCode || "",
            addressCountry: global?.addressCountry || "FR",
          }}
        />
      )}
      <h1 className="sr-only">{h1Title}</h1>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {/* Order: Mariage / Professionnels / Qui suis-je (from Strapi, sorted) then blog / avis */}
        {weddingBlocks.length > 0 && (
          <HomeWeddingVideos blocks={weddingBlocks} title={mariageTitle} />
        )}
        {renderedBlocks.otherBlocks}
        <LatestArticles articles={articles} lang={lang} />
        <ReviewsSection lang={lang} />
      </PageContent>
    </>
  );
}
