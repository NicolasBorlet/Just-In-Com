import { AnimationExamples } from "@/components/animations/AnimationExamples";
import HeroSection from "@/components/blocks/HeroSection";
import PageContent from "@/components/globals/PageContent";
import { Article, BlogPageData } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
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
    const strapiUrl = getStrapiURL();

    // Trouver le hero section
    const heroSection = data?.data?.blocks?.find(block => block.__component === "blocks.hero-section");

    console.log("article", articles)

    return (
        <div className="flex flex-col gap-24">
        {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
        <PageContent>
            <div className="flex flex-col gap-12 md:gap-24 grid-cols-1 md:grid-cols-2">
                {articles?.data?.map((article) => (
                    <Link key={article.id} href={`/blog/${article.slug}`} className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <Image src={`${strapiUrl}${article.cover.url}`} alt={article.title} className="w-full h-64 object-cover mb-4" width={700} height={256} />
                        <div className="flex flex-col gap-4 p-4">
                            <h3 className="text-2xl">{article.title}</h3>
                            <p>{article.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <AnimationExamples />
        </PageContent>
        </div>
    );
}
