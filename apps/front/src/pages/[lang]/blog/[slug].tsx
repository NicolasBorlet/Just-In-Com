import { supportedLanguages } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchArticle, fetchArticles } from '@/services/blog/articleService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import ArticleHeroSection from '@/components/elements/ArticleHeroSection/ArticleHeroSection';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { getLocalizedPath } from '@/lib/i18n';
import { getFullUrl } from '@/utils/get-strapi-url';
import { StrapiGlobal, StrapiArticle } from '@/types';

export const getStaticPaths = async () => {
  const paths = [];
  for (const lang of supportedLanguages) {
    const articlesRes = await fetchArticles({ locale: lang });
    for (const article of articlesRes.data) {
      paths.push({ params: { lang, slug: (article as unknown as StrapiArticle).slug } });
    }
  }
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }: { params: { lang: string; slug: string } }) => {
  const locale = params.lang;
  const [articleRes, globalRes, availableLocales] = await Promise.all([
    fetchArticle({ locale, slug: params.slug }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

  if (!articleRes.data || (Array.isArray(articleRes.data) && articleRes.data.length === 0)) {
    return { notFound: true };
  }

  return {
    props: {
      article: articleRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
  };
};

export default function Article({
  article,
  global,
  lang,
  availableLocales,
}: {
  article: StrapiArticle | StrapiArticle[];
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
}) {
  const articleData = Array.isArray(article) ? article[0] : article;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";
  const canonicalUrl = `${siteUrl}${getLocalizedPath(`blog/${articleData.slug}`, lang)}`;
  const coverUrl = articleData.cover ? getFullUrl(articleData.cover.url) : undefined;

  return (
    <>
      <NextSeo
        title={articleData.seo?.metaTitle || articleData.title}
        description={articleData.seo?.metaDescription || articleData.description || ""}
        canonical={canonicalUrl}
        openGraph={{
          type: "article",
          url: canonicalUrl,
          title: articleData.title,
          description: articleData.description,
          ...(coverUrl ? { images: [{ url: coverUrl, alt: articleData.title }] } : {}),
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={canonicalUrl}
        title={articleData.title}
        images={coverUrl ? [coverUrl] : []}
        datePublished={articleData.publishedAt || articleData.createdAt}
        dateModified={articleData.updatedAt || articleData.publishedAt}
        authorName="Just in Com"
        description={articleData.description || ""}
      />
      {articleData.cover && <ArticleHeroSection cover={articleData.cover as unknown as import("@/types").Media} />}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        <div className="flex flex-col gap-12 md:gap-24">
          <h1 className="text-6xl md:text-8xl/tight font-special">{articleData.title}</h1>
          <p className="text-lg md:text-xl">{articleData.description}</p>
        </div>
      </PageContent>
    </>
  );
}
