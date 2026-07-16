import BlockRenderer from "@/components/blocks/BlockRenderer";
import ContactCTA from "@/components/atoms/ContactCTA";
import { getBuildLocales } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchBlog } from "@/services/blog/blogService";
import { fetchArticles } from "@/services/blog/articleService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import Link from "next/link";
import Image from "next/image";
import { getFullUrl } from "@/utils/get-strapi-url";
import { getLocalizedPath } from "@/lib/i18n";
import { NextSeo } from "next-seo";
import { buildSeo } from "@/lib/seo";
import { StrapiPageData, StrapiGlobal, StrapiArticle } from "@/types";

export const getStaticPaths = async () => {
  const langs = await getBuildLocales();
  return {
    paths: langs.map((lang) => ({ params: { lang } })),
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

  if (!blogRes.data || !globalRes.data) {
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

  return (
    <>
      <NextSeo
        {...buildSeo({
          seo: blog.seo,
          lang,
          basePath: "blog",
          fallbackTitle: "Blog",
          fallbackDescription: blog.description,
        })}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {articles?.map((article: StrapiArticle, index: number) => {
            const isPortrait = index % 3 !== 1;
            const coverUrl = article.cover ? getFullUrl(article.cover.url) : null;

            return (
              <Link
                key={article.id}
                href={getLocalizedPath(`blog/${article.slug}`, lang)}
                className="group flex flex-col gap-4"
              >
                {coverUrl && (
                  <div className={`relative w-full overflow-hidden ${isPortrait ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <Image
                      src={coverUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <p className="text-xs uppercase tracking-[0.2em] text-[#A33E5E]">
                  {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                    lang === "fr" ? "fr-FR" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </p>
                <h3 className="text-xl md:text-2xl font-special leading-snug text-center group-hover:text-[#A33E5E] transition-colors">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-sm text-center text-[#3B1621]/70 line-clamp-3">
                    {article.description}
                  </p>
                )}
                <span className="text-sm uppercase tracking-wide text-center text-[#772D44]">
                  {lang === "fr" ? "Lire plus" : "Read more"} →
                </span>
              </Link>
            );
          })}
        </div>
        <ContactCTA lang={lang} />
      </PageContent>
    </>
  );
}
