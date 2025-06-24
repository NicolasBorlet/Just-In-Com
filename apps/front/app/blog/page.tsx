import { getArticles, getBlog } from "@/data/loaders";
import BlogPageWrapper from "@/components/wrappers/BlogPageWrapper";
import { headers } from "next/headers";

export default async function Blog() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  
  const preferredLanguage = acceptLanguage
    .split(",")[0]
    .split("-")[0]
    .toLowerCase();

  const locale = preferredLanguage === 'fr' ? 'fr' : 'en';
  
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
