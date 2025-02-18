"use client";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { PageSkeleton } from "@/components/Skeletons/PageSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageType } from "@/types/page";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

interface PageProps {
  params: {
    pages: string;
  };
}

const fetchPage = async (slug: string): Promise<PageType> => {
  try {
    const response = await fetch(`/api/pages/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(
      `Error fetching page: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export default function Pages({ params }: PageProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const {
    data: page,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["page", params.pages],
    queryFn: () => fetchPage(params.pages),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  // Handle metadata updates with useEffect
  useEffect(() => {
    if (page) {
      document.title = page.metaTitle || page.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", page.metaDescription || page.title);
      }
    }
  }, [page]);

  // Early return for loading state
  if (isLoading) {
    return <PageSkeleton />;
  }

  // Early return for error state
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50">
        <div className="space-y-6 text-center">
          <h2 className="from-blue-600 to-blue-800 bg-gradient-to-r bg-clip-text text-7xl font-bold text-transparent">
            404
          </h2>
          <h3 className="text-2xl font-medium text-slate-800">

            {error instanceof Error ? error.message : "An error occurred"}
          </h3>
          <p className="text-slate-600">
            {`We couldn't find the page you're looking for.`}
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (!page) {
    return null;
  }

  console.log("page", page);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PageSkeleton />}>
        <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <header className="mb-12 space-y-8" role="banner">
            {page.featuredImage && (
              <div className="relative aspect-[16/6] overflow-hidden rounded-2xl bg-slate-100">
                {imageLoading && (
                  <div className="absolute inset-0">
                    <Skeleton className="h-full w-full" />
                  </div>
                )}

                {imageError ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-sm text-slate-500">
                      Failed to load image
                    </span>
                  </div>
                ) : (
                  <Image
                    src={page.featuredImage}
                    alt={page.title}
                    fill
                    priority
                    className={`w-full object-cover transition-transform duration-300 hover:scale-105 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                  />
                )}
              </div>
            )}

            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {page.title || page.bnTitle}
              </h1>

              {(page.subTitle || page.bnSubTitle) && (
                <div className="space-y-2 text-xl text-slate-600">
                  {page.subTitle && <h3>{page.subTitle}</h3>}
                  {page.bnSubTitle && <h3>{page.bnSubTitle}</h3>}
                </div>
              )}

              {(page.excerpt || page.bnExcerpt) && (
                <div className="prose prose-lg max-w-none text-slate-600">
                  {page.excerpt && (
                    <p className="text-xl font-medium !leading-8">
                      {page.excerpt}
                    </p>
                  )}
                  {page.bnExcerpt && <p>{page.bnExcerpt}</p>}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-lg prose-primary descriptions max-w-none !bg-transparent"
            role="main"
          >
            {page.description && (
              <div
                dangerouslySetInnerHTML={{ __html: page.description }}
                className="mb-8 leading-relaxed text-slate-700"
              />
            )}
            {page.bnDescription && (
              <div
                dangerouslySetInnerHTML={{ __html: page.bnDescription }}
                className="leading-relaxed text-slate-700"
              />
            )}
          </div>

          <footer
            className="mt-12 border-t border-slate-100 pt-6"
            itemScope
            itemType="http://schema.org/Article"
          >
            <div className="flex items-center justify-between text-sm text-slate-500">
              {page.author && (
                <p className="flex items-center">
                  <span className="font-medium text-slate-700">
                    By {page.author.name}
                  </span>
                </p>
              )}
              <time
                dateTime={page.updatedAt.toString()}
                className="text-slate-500"
              >
                Last updated on{" "}
                {new Date(page.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </footer>
        </article>
      </Suspense>
    </ErrorBoundary>
  );
}
