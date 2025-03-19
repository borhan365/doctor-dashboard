
export interface PageType {
  id: string;
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  description?: string;
  excerpt?: string;
  bnTitle?: string;
  bnSubTitle?: string;
  bnDescription?: string;
  bnExcerpt?: string;
  subTitle?: string;
  author?: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  status: "draft" | "published" | "pending" | "archived";
}
