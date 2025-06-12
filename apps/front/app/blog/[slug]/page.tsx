// app/blog/[slug]/page.tsx
"use client"

import { useLocale } from "@/contexts/LocaleContext"
import { getArticle } from "@/data/loaders"
import ArticlePage from "@/pages/ArticlePage"
import type { Article } from "@/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const { slug } = useParams()!
  const { locale } = useLocale()
  const [data, setData] = useState<Article|null>(null)

  useEffect(() => {
    getArticle(slug as string, locale).then(setData)
  }, [slug, locale])

  if (!data) return null
  return <ArticlePage data={data}/>
}
