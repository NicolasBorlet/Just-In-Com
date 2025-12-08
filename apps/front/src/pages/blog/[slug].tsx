import React, { useEffect } from 'react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchArticle, fetchArticles } from '@/services/blog/articleService';
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import ArticleHeroSection from '@/components/elements/ArticleHeroSection/ArticleHeroSection';

export const getStaticPaths = async () => {
    const articlesRes = await fetchArticles({ locale: 'fr' });

    const paths = articlesRes.data.map((article: any) => ({
        params: { slug: article.slug },
    }));

    return {
        paths,
        fallback: false, // false = 404 pour les slugs non trouvés, 'blocking' = SSR à la demande
    };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
    const [articleRes, globalRes, availableLocales] = await Promise.all([fetchArticle({ locale: 'fr', slug: params.slug }), fetchGlobal({ locale: 'fr' }), fetchAvailableLocales()]);

    return {
        props: {
            article: articleRes.data,
            global: globalRes.data,
            availableLocales,
            lang: 'fr',
        },
    };
};

export default function Article({ article, global, lang, availableLocales }: { global: any, article: any, lang: string, availableLocales: string[] }) {
    useEffect(() => {
        console.log(article);
    }, [article]);
    return (
        <>
            <ArticleHeroSection cover={article[0].cover} />
            <PageContent global={global} lang={lang} availableLocales={availableLocales}>
                <div className="flex flex-col gap-12 md:gap-24">
                    <h1 className="text-6xl md:text-8xl/tight font-special">{article[0].title}</h1>
                    <p className="text-lg md:text-xl">{article[0].description}</p>
                </div>
            </PageContent>
        </>
    );
}
