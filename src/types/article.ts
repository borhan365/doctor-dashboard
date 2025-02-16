import { ArticleFormData } from "@/types/article";
import axios from "axios";
import { useCallback, useState } from "react";

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<ArticleFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`,
      );

      if (!response.data?.data) {
        throw new Error("Article not found");
      }

      const articleData = response.data.data;
      setArticle({
        ...articleData,
        thumbnail:
          articleData.thumbnail?.fileUrl || articleData.thumbnail || null,
        categoryIds: articleData.categories?.map((cat: any) => cat.id) || [],
        userId: articleData.user?.id || null,
        createdAt: new Date(articleData.createdAt),
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch article",
      );
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  return { article, isLoading, error, fetchArticle };
};
