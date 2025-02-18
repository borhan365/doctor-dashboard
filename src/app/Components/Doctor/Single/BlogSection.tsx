"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample blog data
const blogs = [
  {
    id: 1,
    title:
      "Understanding Heart Health: Tips for a Healthy Cardiovascular System",
    excerpt:
      "Learn about the essential practices and lifestyle changes that can help maintain a healthy heart and prevent cardiovascular diseases.",
    thumbnail:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    slug: "understanding-heart-health",
  },
  {
    id: 2,
    title: "The Importance of Regular Health Check-ups",
    excerpt:
      "Regular health screenings can detect potential health issues early. Find out which check-ups you need based on your age and health status.",
    thumbnail:
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=2071&auto=format&fit=crop",
    publishedAt: "2024-01-10",
    readTime: "4 min read",
    slug: "importance-regular-checkups",
  },
  {
    id: 3,
    title: "Managing Stress in Modern Life",
    excerpt:
      "Discover effective strategies to cope with daily stress and maintain your mental well-being in today's fast-paced world.",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2099&auto=format&fit=crop",
    publishedAt: "2024-01-05",
    readTime: "6 min read",
    slug: "managing-stress-modern-life",
  },
];

function BlogSection() {
  return (
    <div id="blogs" className="bg-white p-6">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {`Doctor's Blog`}
            </h2>
            <p className="mt-2 text-slate-600">
              Latest insights and medical advice from{" "}
              <span className="font-semibold text-blue-500">
                Dr. Arif Hossain
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative h-[150px] w-full">
                {blog.thumbnail && blog.thumbnail.startsWith("http") ? (
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200">
                    <span className="text-sm text-slate-500">No Image</span>
                  </div>
                )}
              </div>

              <div className="flex flex-grow flex-col p-5">
                {/* <div className="flex items-center text-sm text-slate-500 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{blog.publishedAt}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{blog.readTime}</span>
                </div> */}

                <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-slate-900">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="transition-colors hover:text-blue-600"
                  >
                    {blog.title}
                  </Link>
                </h3>

                <p className="mb-4 line-clamp-2 text-slate-600">
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="mt-auto inline-flex items-center text-blue-600 transition-colors hover:text-blue-700"
                >
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* see all blogs */}
        <div className="flex justify-end mt-6">
          <Link href={`/doctors/dr-tapas-chowdhury/blogs`} className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            See All Blogs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
