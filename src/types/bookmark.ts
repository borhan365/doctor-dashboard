export interface BookmarkedArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  publishDate: string;
  readTime?: string;
  category: string;
} 