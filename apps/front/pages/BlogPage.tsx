import HeroSection from "@/components/blocks/HeroSection";
import PageContent from "@/components/globals/PageContent";
import { Article, BlogPageData } from "@/types";
import Link from "next/link";

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
                    <Link key={article.id} href={`/blog/${article.slug}`}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                    </Link>
                ))}
            </div>
        </PageContent>
        </div>
    );
}
