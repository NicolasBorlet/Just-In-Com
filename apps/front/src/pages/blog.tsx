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
        <div className="flex flex-col gap-12 md:gap-24 grid-cols-1 md:grid-cols-2">
          {articles?.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Image src={getFullUrl(article.cover.url)} alt={article.title} className="w-full h-64 object-cover mb-4" width={700} height={256} />
              <div className="flex flex-col gap-4 p-4">
                <h3 className="text-2xl">{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </PageContent>
    </>
  );
}
