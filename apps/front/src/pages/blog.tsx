import React, { useEffect } from 'react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchBlog } from '@/services/blog/blogService';
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import { fetchArticles } from '@/services/blog/articleService';
import Link from 'next/link';
import Image from 'next/image';
import { getFullUrl } from '@/utils/get-strapi-url';

export const getStaticProps = async () => {
  const [blogRes, articlesRes, globalRes, availableLocales] = await Promise.all([fetchBlog({ locale: 'fr' }), fetchArticles({ locale: 'fr' }), fetchGlobal({ locale: 'fr' }), fetchAvailableLocales()]);


  console.log("blogRes", blogRes.blocks);

  return {
    props: {
      blog: blogRes.data,
      global: globalRes.data,
      articles: articlesRes.data,
      availableLocales,
      lang: 'fr',
    },
  };
};

export default function Blog({ blog, articles, global, lang, availableLocales }: { global: any, blog: any, articles: any, lang: string, availableLocales: string[] }) {

  const renderedBlocks = BlockRenderer({ blocks: blog.blocks });

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article: any, index: number) => {
            const isEven = (index + 1) % 2 === 0;
            const imageHeight = isEven ? 600 : 400;

            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
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
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
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
