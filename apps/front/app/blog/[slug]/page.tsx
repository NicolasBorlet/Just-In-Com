import ArticlePageWrapper from "@/components/wrappers/ArticlePageWrapper"
import { getArticle, getArticles } from "@/data/loaders"

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const locale = 'fr';
  
  try {
    const articles = await getArticles(locale);
    
    return articles.data.map((article: any) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const locale = 'fr'; // Default locale for SSG

  try {
    const data = await getArticle(slug, locale)

    return (
      <ArticlePageWrapper
        initialData={data}
        initialLocale={locale}
        slug={slug}
      />
    )
  } catch (error) {
    console.error('Failed to load article data:', error)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p>The article you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </main>
    )
  }
}
