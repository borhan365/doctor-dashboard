import Link from 'next/link'
import Image from 'next/image'

export default function CountrySection() {
  const trendingArticles = [
    {
      id: 1,
      category: 'Medicine',
      title: 'Latest Medical Breakthroughs in 2024',
      excerpt: 'Discover the most significant medical advances that are shaping healthcare.',
      image: '/assets/images/news/3.jpg'
    },
    // Add more articles as needed
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="mb-10 flex items-center gap-4">
        <div className="relative">
          <div className="animate-ping absolute h-8 w-8 rounded-full bg-blue-400 opacity-75"></div>
          <div className="relative h-8 w-8 rounded-full bg-blue-500"></div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Trending Now</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {trendingArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-sm font-medium text-blue-600">{article.category}</span>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                <Link href="/single" className="hover:text-blue-600 transition-colors">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-3 text-slate-600 line-clamp-2">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}