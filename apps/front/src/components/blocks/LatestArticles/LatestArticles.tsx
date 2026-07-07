import Image from "next/image";
import Link from "next/link";
import { getFullUrl } from "@/utils/get-strapi-url";
import { getLocalizedPath } from "@/lib/i18n";
import { StrapiArticle } from "@/types";

const translations: Record<string, { heading: string; readMore: string; seeAll: string; locale: string }> = {
  fr: { heading: "Derniers articles du blog", readMore: "Lire plus", seeAll: "Voir tous les articles", locale: "fr-FR" },
  en: { heading: "Latest blog articles", readMore: "Read more", seeAll: "See all articles", locale: "en-US" },
  de: { heading: "Neueste Blogartikel", readMore: "Mehr lesen", seeAll: "Alle Artikel ansehen", locale: "de-DE" },
};

export default function LatestArticles({ articles, lang }: { articles: StrapiArticle[]; lang: string }) {
  const t = translations[lang] ?? translations.fr;
  const latest = (articles ?? []).slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="flex flex-col gap-12">
      <h2 className="text-4xl md:text-5xl font-special text-center text-[#772D44]">{t.heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latest.map((article) => {
          const coverUrl = article.cover ? getFullUrl(article.cover.url) : null;
          return (
            <Link
              key={article.id}
              href={getLocalizedPath(`blog/${article.slug}`, lang)}
              className="group flex flex-col gap-4 hover:opacity-95 transition-opacity duration-300"
            >
              {coverUrl && (
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={coverUrl}
                    alt={article.title}
                    className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
                    width={700}
                    height={280}
                  />
                </div>
              )}
              <p className="text-sm font-medium text-gray-500">
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString(t.locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="text-xl font-semibold text-[#431927]">{article.title}</h3>
              <span className="text-[#A33E5E] font-semibold group-hover:underline">{t.readMore}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Link
          href={getLocalizedPath("blog", lang)}
          className="inline-flex items-center justify-center border-2 border-[#A33E5E] bg-[#A33E5E] px-8 py-3 rounded-full text-white font-sans font-semibold tracking-wide text-lg transition-all duration-300 ease-out hover:bg-white hover:text-[#A33E5E] hover:shadow-lg hover:-translate-y-0.5"
        >
          {t.seeAll}
        </Link>
      </div>
    </section>
  );
}
