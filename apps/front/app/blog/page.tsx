import { getArticles, getBlog } from "@/data/loaders";
import BlogPageWrapper from "@/components/wrappers/BlogPageWrapper";

export const revalidate = 1800; // Revalidate every 30 minutes

export default async function Blog() {
  const locale = 'fr'; // Default locale for SSG
  
  try {
    const [data, articles] = await Promise.all([
      getBlog(locale),
      getArticles(locale)
    ]);
    
    return (
      <BlogPageWrapper
        initialData={data}
        initialArticles={articles}
        initialLocale={locale}
      />
    );
  } catch (error) {
    console.error('Failed to load blog data:', error);
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unable to load content</h1>
          <p>Please try refreshing the page.</p>
        </div>
      </main>
    );
  }
}
