import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchBlog } from "@/services/blog/blogService";
import { fetchArticles } from "@/services/blog/articleService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import Link from "next/link";
import Image from "next/image";
import { getFullUrl } from "@/utils/get-strapi-url";
import { getLocalizedPath } from "@/lib/i18n";
import ContactCta from "@/components/elements/ContactCta/ContactCta";
import { NextSeo } from "next-seo";
import { StrapiPageData, StrapiGlobal, StrapiArticle } from "@/types";

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [blogRes, articlesRes, globalRes, availableLocales] = await Promise.all([
    fetchBlog({ locale }),
    fetchArticles({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

  if (!blogRes.data || !globalRes.data || !globalRes.data.logo_extensed) {
    return { notFound: true };
  }

  return {
    props: {
      blog: blogRes.data,
      articles: articlesRes.data ?? [],
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
  };
};

export default function Blog({
  blog,
  articles,
  global,
  lang,
  availableLocales,
}: {
  blog: StrapiPageData;
  articles: StrapiArticle[];
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({ blocks: blog.blocks });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";

  return (
    <>
      <NextSeo
        title={blog.seo?.metaTitle || "Blog"}
        description={blog.seo?.metaDescription || ""}
        canonical={`${siteUrl}${getLocalizedPath("blog", lang)}`}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {articles?.map((article: StrapiArticle) => {
              const coverUrl = article.cover ? getFullUrl(article.cover.url) : null;

              return (
                <Link
                  key={article.id}
                  href={getLocalizedPath(`blog/${article.slug}`, lang)}
                  className="group flex flex-col gap-5"
                >
                  {coverUrl && (
                    <div className="overflow-hidden rounded-2xl aspect-[4/5]">
                      <Image
                        src={coverUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        width={700}
                        height={875}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A33E5E]">
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <h3 className="text-2xl font-special text-[#431927] leading-tight group-hover:text-[#A33E5E] transition-colors duration-300">
                      {article.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-[#A33E5E] font-semibold">
                      {lang === 'fr' ? 'Lire l’article' : 'Read the article'}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <ContactCta lang={lang} />
        </div>
      </PageContent>
    </>
  );
}
