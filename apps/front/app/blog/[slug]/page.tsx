import { getArticle } from "@/data/loaders";
import ArticleClient from "./ArticleClient";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getArticle(params.slug, "fr");

  return <ArticleClient initialData={data} slug={params.slug} />;
}
