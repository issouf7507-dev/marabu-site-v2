import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  createdAt: string;
  categories: Array<{ id: number; name: string; slug: string }>;
};

export type ArticleDetail = Article & {
  content: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
};

function decodeHtmlEntities(text: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

const API_URL = import.meta.env.VITE_BACK_END_URL_API as string;

export function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

export function useArticles(page = 1) {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  return useQuery({
    queryKey: ["articles", locale, page],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/articles?lang=${locale}&page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      return {
        articles: (data.articles as Article[]).map((a) => ({
          ...a,
          title: decodeHtmlEntities(a.title),
        })),
        pagination: data.pagination as Pagination,
      };
    },
  });
}

export function useArticle(id: string) {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  return useQuery({
    queryKey: ["article", id, locale],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/articles/${id}?lang=${locale}`);
      if (!res.ok) throw new Error("Article not found");
      const data = await res.json() as ArticleDetail;
      return { ...data, title: decodeHtmlEntities(data.title) };
    },
    enabled: !!id,
  });
}
