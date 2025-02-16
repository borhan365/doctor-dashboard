"use client";

import { BookOpen, Edit2, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Article {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  views: number;
  status: "published" | "pending" | "draft";
  thumbnail: string | null;
  slug: string;
}

export default function UserArticles() {
  const { data: session } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetchArticles(activeTab);
    }
  }, [session, activeTab]);

  const fetchArticles = async (status: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles?userId=${session?.user?.id}`);
      const data = await response.json();

      if (data.status === "success") {
        setArticles(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch articles");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      setDeleting(slug);
      const response = await fetch(`/api/articles/${slug}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.status === "success") {
        toast.success("Article deleted successfully");
        // Refresh the page after successful deletion
        router.refresh();
        // Refetch articles to update the list
        await fetchArticles(activeTab);
      } else {
        throw new Error(data.message || "Failed to delete article");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      draft: "bg-slate-100 text-slate-800",
    };
    return (
      colors[status as keyof typeof colors] || "bg-slate-100 text-slate-800"
    );
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 text-xl font-semibold">
            Please sign in to view your articles
          </h2>
          <p className="text-gray-600 mt-2">
            You need to be authenticated to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-b-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-8">
              {["all", "published", "pending", "draft"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-1 py-4 ${
                    activeTab === status
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <Link
              href="/profile/articles/create"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span>Create Article</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-slate-600">No articles found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-6">
                  {article.thumbnail && article.thumbnail.startsWith("http") ? (
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      width={200}
                      height={134}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-[134px] w-[200px] items-center justify-center rounded-lg bg-slate-200">
                      <span className="text-sm text-slate-500">No Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-slate-600">{article.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                      <span>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4" />
                        {article.views || 0}
                      </span>
                      <span
                        className={`rounded px-2 py-1 capitalize ${getStatusColor(article.status)}`}
                      >
                        {article.status}
                      </span>
                      <div className="ml-auto flex gap-2">
                        <Link
                          href={`/profile/articles/${article.slug}`}
                          className="rounded-full p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        >
                          <Edit2 className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.slug)}
                          disabled={deleting === article.slug}
                          className="rounded-full p-2 text-orange-700 transition-colors hover:bg-orange-50 disabled:opacity-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
