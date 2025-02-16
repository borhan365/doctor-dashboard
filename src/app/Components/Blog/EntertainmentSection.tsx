import Link from 'next/link'
import Image from 'next/image'

export default function EntertainmentSection() {
  const articles = [
    {
      id: 1,
      category: 'Exclusive',
      title: 'The Latest Entertainment News and Updates',
      image: '/assets/images/news/entertainment/1.jpg',
      date: '26 June, 2024'
    },
    // Add more articles
  ]

  return (
    <section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="group">
            <div className="mb-4">
              <Link href="/category" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                {article.category}
              </Link>
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                <Link href="/single">{article.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-slate-600">{article.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}