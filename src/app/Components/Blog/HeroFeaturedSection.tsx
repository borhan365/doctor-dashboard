import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

interface Article {
  id: string
  title: string
  subTitle?: string
  excerpt?: string
  thumbnail: string
  slug: string
  createdAt: string
  category?: {
    name: string
    slug: string
  }
}

interface HeroFeaturedSectionProps {
  articles: Article[]
}

export default function HeroFeaturedSection({ articles }: HeroFeaturedSectionProps) {
  return (
    <div className="space-y-8">
      {articles?.slice(0, 1)?.map((article) => (
        <section 
          key={article.id} 
          className="relative h-[600px] w-full overflow-hidden rounded-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            {article.thumbnail ? (
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-slate-200 flex items-center justify-center">
                <span className="text-slate-500 text-lg">No Image Available</span>
              </div>
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full">
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <Link 
                href={`/blog/${article.slug}`}
                className="group block space-y-4"
              >
                {article.category && (
                  <span className="inline-block text-blue-400 text-sm font-medium mb-2">
                    {article.category.name}
                  </span>
                )}
                
                <h2 className="text-4xl font-bold leading-tight group-hover:text-blue-400 transition-colors">
                  {article.subTitle && (
                    <span className="text-blue-400">{article.subTitle} </span>
                  )}
                  {article.title}
                </h2>
                
                {article.excerpt && (
                  <p className="text-lg text-slate-200 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
                
                <p className="text-sm text-slate-300">
                  {moment(article.createdAt).format('LL')}
                </p>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}