import Image from "next/image";
import Link from "next/link";
import { StrapiArticle } from "@/types";
import { getFullUrl } from "@/utils/get-strapi-url";
import { getLocalizedPath } from "@/lib/i18n";
import Button, { ButtonWidth } from "@/components/atoms/Button";

const copy = {
  fr: { title: "Derniers articles", more: "Voir le blog", read: "Lire" },
  en: { title: "Latest articles", more: "View the blog", read: "Read" },
  de: { title: "Neueste Artikel", more: "Zum Blog", read: "Lesen" },
};

export default function LatestArticles({
  articles,
  lang = "fr",
}: {
  articles: StrapiArticle[];
  lang?: string;
}) {
  if (!articles?.length) return null;

  const t = copy[lang as keyof typeof copy] || copy.fr;

  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-4xl md:text-6xl text-center font-special">{t.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {articles.slice(0, 3).map((article) => {
          const coverUrl = article.cover ? getFullUrl(article.cover.url) : null;
          return (
            <Link
              key={article.id}
              href={getLocalizedPath(`blog/${article.slug}`, lang)}
              className="group flex flex-col gap-4"
            >
              {coverUrl && (
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={coverUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <p className="text-xs uppercase tracking-widest text-[#A33E5E]">
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                  lang === "fr" ? "fr-FR" : lang === "de" ? "de-DE" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </p>
              <h3 className="text-xl md:text-2xl font-special leading-snug group-hover:text-[#A33E5E] transition-colors">
                {article.title}
              </h3>
              <span className="text-sm uppercase tracking-wide text-[#772D44]">{t.read} →</span>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button href={getLocalizedPath("blog", lang)} isExternal={false} width={ButtonWidth.FIT} ariaLabel={t.more}>
          {t.more}
        </Button>
      </div>
    </section>
  );
}
