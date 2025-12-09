import { useEffect } from "react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { supportedLanguages } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchBlog } from "@/services/blog/blogService";
import { fetchArticles } from "@/services/blog/articleService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import Link from "next/link";
import Image from "next/image";
import { getFullUrl } from "@/utils/get-strapi-url";

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const [blogRes, articlesRes, globalRes, availableLocales] = await Promise.all([
    fetchBlog({ locale: params.lang }),
    fetchArticles({ locale: params.lang }),
    fetchGlobal({ locale: params.lang }),
    fetchAvailableLocales()
  ]);

  return {
    props: {
      blog: blogRes.data,
      articles: articlesRes.data,
      global: globalRes.data,
      lang: params.lang,
      availableLocales,
    },
  };
};

export default function Blog({
  blog,
  articles,
  global,
  lang,
  availableLocales,
}: {
  blog: any;
  articles: any;
  global?: any;
  lang: string;
  availableLocales: string[];
}) {
  useEffect(() => {
    if (blog) {
      console.log("Blog data:", blog);
    }

    if (articles) {
      console.log("Articles data:", articles);
    }

    if (global) {
      console.log("Global data:", global);
    }
  }, [blog, articles, global]);

  const renderedBlocks = BlockRenderer({ blocks: blog.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {articles?.map((article: any, index: number) => {
            const isEven = (index + 1) % 2 === 0;
            const imageHeight = isEven ? 600 : 400;

            return (
              <Link
                key={article.id}
                href={`/${lang}/blog/${article.slug}`}
                className="flex flex-col gap-8 hover:opacity-90 transition-opacity duration-300 items-center"
              >
                <Image
                  src={getFullUrl(article.cover.url)}
                  alt={article.title}
                  className="w-full object-cover"
                  width={700}
                  height={imageHeight}
                  style={{ height: `${imageHeight}px` }}
                />
                <div className="flex flex-col gap-8">
                  <p className="text-sm font-medium text-gray-600">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString(lang, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="text-xl font-medium self-center">{article.title}</h3>
                  <span className="text-lg font-normal self-center">Lire plus</span>
                </div>
              </Link>
            );
          })}
        </div>
      </PageContent>
    </>
  );
}
