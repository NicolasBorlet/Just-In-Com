import ArticleHeroSection from "@/components/blocks/ArticleHeroSection";
import PageContent from "@/components/globals/PageContent";
import { Article } from "@/types";

interface ArticlePageProps {
    data: Article;
}

export default function ArticlePage({ data }: ArticlePageProps) {
    console.log("data d'un article", data);

    return (
        <div className="flex flex-col gap-24">
        <ArticleHeroSection cover={data.data[0].cover} />
        <PageContent>
            <div className="flex flex-col gap-24">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </div>
        </PageContent>
        </div>
    );
}
