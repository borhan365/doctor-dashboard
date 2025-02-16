"use client";

import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  id: number;
  title: string;
}

interface FormData {
  title: string;
  description: string;
  excerpt: string;
  categoryIds: number[];
  thumbnail: File | null;
  slug: string;
  status: "published" | "pending" | "draft";
}

export default function UpdateUserArticleScreen() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    excerpt: "",
    categoryIds: [],
    thumbnail: null,
    slug: "",
    status: "draft",
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch article data and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/articles/${params.slug}`),
          fetch("/api/articles/categories"),
        ]);

        const articleData = await articleResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (articleData.status === "success") {
          const {
            title,
            description,
            excerpt,
            categories,
            thumbnail,
            slug,
            status,
          } = articleData.data;
          setFormData({
            title,
            description,
            excerpt,
            categoryIds: categories ? categories.map((cat: any) => cat.id) : [],
            thumbnail: null,
            slug,
            status: status || "draft",
          });
          if (thumbnail) {
            setThumbnailPreview(thumbnail);
          }
        }

        if (categoriesData.status === "success") {
          setCategories(categoriesData || []);
        }
      } catch (error: any) {
        toast.error("Failed to load article data");
        router.push("/profile/articles");
      } finally {
        setInitialLoad(false);
      }
    };

    if (session && params.slug) {
      fetchData();
    }
  }, [session, params.slug, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        toast.error("File size should be less than 10MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.title.trim()) {
      errors.push("Title is required");
    } else if (formData.title.length < 5) {
      errors.push("Title must be at least 5 characters long");
    }

    if (!formData.description.trim()) {
      errors.push("Description is required");
    } else if (formData.description.length < 20) {
      errors.push("Description must be at least 20 characters long");
    }

    if (!formData.excerpt.trim()) {
      errors.push("Excerpt is required");
    }

    if (formData.categoryIds.length === 0) {
      errors.push("Please select at least one category");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please sign in to update the article");
      return;
    }

    if (!validateForm()) return;

    const submitToast = toast.loading("Updating article...");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "categoryIds") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (key === "thumbnail" && value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== null) {
          formDataToSend.append(key, String(value));
        }
      });

      const response = await fetch(`/api/articles/${params.slug}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Article updated successfully", { id: submitToast });
        router.push("/profile/articles");
        router.refresh();
      } else {
        throw new Error(data.message || "Failed to update article");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update article", {
        id: submitToast,
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  console.log("categories", categories);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-md">
        <div className="px-6 py-8">
          <h1 className="mb-6 text-2xl font-bold text-slate-900">
            Update your article
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                required
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-slate-700"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                required
                value={formData.categoryIds[0] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryIds: e.target.value
                      ? [parseInt(e.target.value)]
                      : [],
                  }))
                }
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    selected={formData.categoryIds.includes(category.id)}
                  >
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Thumbnail
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pb-6 pt-5">
                <div className="space-y-1 text-center">
                  {thumbnailPreview ? (
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      width={200}
                      height={200}
                      className="mx-auto rounded-md object-cover"
                    />
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  )}
                  <div className="flex text-sm text-slate-600">
                    <label
                      htmlFor="thumbnail"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
