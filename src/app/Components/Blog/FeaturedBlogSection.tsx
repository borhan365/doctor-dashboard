"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface Article {
  id: number
  title: string
  subTitle: string | null
  excerpt: string | null
  description: string
  thumbnail: string | null
  slug: string
  status: string
  isFeatured: boolean
  createdAt: string
  user: {
    id: number
    name: string
    image: string | null
  } | null
  categories: {
    id: number
    title: string
    slug: string
  }[]
}

export default function FeaturedBlogSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get<{ status: string; data: Article[] }>("/api/articles", {
        params: {
          limit: 4,
          isFeatured: true
        }
      })
      if (response.data.status === "success") {
        setArticles(response.data.data)
      }
    } catch (err) {
      console.error("Error fetching articles:", err)
      setError("An error occurred while fetching articles")
      toast.error("Failed to load articles")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div className="min-h-screen bg-purple-100 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {articles.length > 0 && (
          <>
            {/* Featured Post */}
            <div className="mb-16 bg-purple-800 rounded-3xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {articles[0].thumbnail ? (
                    <Image
                      src={articles[0].thumbnail}
                      alt={articles[0].title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-500 text-lg">No Image Available</span>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="text-pink-500 text-sm mb-2">
                    {new Date(articles[0].createdAt).toLocaleDateString()} • 
                    {articles[0].categories.map(cat => cat.title).join(", ")}
                  </div>
                  <Link href={`/blog/${articles[0].slug}`}>
                    <h2 className="text-4xl font-bold mb-4 leading-tight">{articles[0].title}</h2>
                  </Link>
                  <p className="text-slate-300 mb-6">
                    {articles[0].excerpt || articles[0].description.substring(0, 150)}...
                  </p>
                  {articles[0].user && (
                    <div className="flex items-center mb-6">
                      {articles[0].user.image ? (
                        <Image
                          src={articles[0].user.image}
                          alt={articles[0].user.name}
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-slate-300 rounded-full mr-3" />
                      )}
                      <span className="text-sm text-slate-300">{articles[0].user.name}</span>
                    </div>
                  )}
                  <Link 
                    href={`/blog/${articles[0].slug}`} 
                    className="inline-block bg-pink-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-pink-700 transition duration-300 w-fit"
                  >
                    Continue Reading →
                  </Link>
                </div>
              </div>
            </div>

            {/* Smaller Post Previews */}
            <div className="grid md:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <div key={article.id} className="bg-purple-800 rounded-3xl overflow-hidden">
                  {article.thumbnail ? (
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-500 text-sm">No Image Available</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-pink-500 text-sm mb-2">
                      {new Date(article.createdAt).toLocaleDateString()} • 
                      {article.categories.map(cat => cat.title).join(", ")}
                    </div>
                    <Link href={`/blog/${article.slug}`}>
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    </Link>
                    {article.user && (
                      <div className="flex items-center mt-4">
                        {article.user.image ? (
                          <Image
                            src={article.user.image}
                            alt={article.user.name}
                            width={30}
                            height={30}
                            className="rounded-full mr-2"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-slate-300 rounded-full mr-2" />
                        )}
                        <span className="text-sm text-slate-300">{article.user.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}