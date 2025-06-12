import ArticleHeroSection from "@/components/blocks/ArticleHeroSection";
import PageContent from "@/components/globals/PageContent";
import { Article } from "@/types";

interface ArticlePageProps {
    data: Article & {
        data: Article[];
    };
}

export default function ArticlePage({ data }: ArticlePageProps) {
    console.log("data d'un article", data);

    if (!data?.data?.[0]) return null;

    return (
        <div className="flex flex-col gap-24">
        <ArticleHeroSection cover={data.data[0].cover} />
        <PageContent>
            <div className="flex flex-col gap-24">
                <h1 className="text-6xl md:text-8xl font-special">{data.data[0].title}</h1>
                <p className="text-lg md:text-xl">{data.data[0].description}</p>
            </div>
        </PageContent>
        </div>
    );
}
