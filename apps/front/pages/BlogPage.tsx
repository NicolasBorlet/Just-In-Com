import HeroSection from "@/components/blocks/HeroSection";
import PageContent from "@/components/globals/PageContent";
import { Article, BlogPageData } from "@/types";

interface BlogPageProps {
    data: BlogPageData;
    articles: {
        data: Article[];
        meta: {
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: number;
            };
        };
    };
}

export default function BlogPage({ data, articles }: BlogPageProps) {
    // Trouver le hero section
    const heroSection = data.data.blocks.find(block => block.__component === "blocks.hero-section");

    console.log("articles", articles);

    return (
        <div className="flex flex-col gap-24">
        {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
        <PageContent>
            <div className="flex flex-col gap-24">
                {articles?.data?.map((article) => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                    </div>
                ))}
            </div>
        </PageContent>
        </div>
    );
}
