import type { User } from "@/types/user"; // Updated import using absolute path

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
  author?: User;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  status: "draft" | "published" | "pending" | "archived";
}
