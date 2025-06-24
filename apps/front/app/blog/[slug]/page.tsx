import { getArticle } from "@/data/loaders"
import ArticlePageWrapper from "@/components/wrappers/ArticlePageWrapper"
import { headers } from "next/headers"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language") || ""
  
  const preferredLanguage = acceptLanguage
    .split(",")[0]
    .split("-")[0]
    .toLowerCase()

  const locale = preferredLanguage === 'fr' ? 'fr' : 'en'

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
          <p>The article you're looking for doesn't exist.</p>
        </div>
      </main>
    )
  }
}
