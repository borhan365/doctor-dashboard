import Link from 'next/link'
import Image from 'next/image'

export default function OpinionSection() {
  const mainArticles = [
    {
      id: 1,
      category: 'Special',
      title: '9 Tips to Navigate Social Media During the Holidays',
      excerpt: 'Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health. We have reported on numerous studies associating sugar.',
      author: {
        name: 'Josim uddin',
        image: '/assets/images/author.png'
      }
    },
    {
      id: 2,
      category: 'Special',
      title: 'How to Be Kind to Yourself During the Holiday Hustle',
      excerpt: 'Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health. We have reported on numerous studies associating sugar.',
      author: {
        name: 'Shariar hosen',
        image: '/assets/images/author.jpg'
      }
    }
  ]

  const sideArticles = [
    {
      id: 1,
      category: 'Special',
      title: 'What Are the Stages of a Migraine Episode?',
      highlight: 'Coronavirus',
      author: 'Plip Jhon',
      image: '/assets/images/author.png'
    },
    // Add more side articles as needed
  ]

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Articles */}
        <div className="lg:col-span-2 space-y-8">
          {mainArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl p-8 shadow-sm">
              <span className="text-sm font-medium text-blue-600">{article.category}</span>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                <Link href="/single">{article.title}</Link>
              </h2>
              <p className="mt-4 text-slate-600">{article.excerpt}</p>
              
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12">
                  <Image
                    src={article.author.image}
                    alt={article.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium text-slate-900">{article.author.name}</h5>
                  <div className="mt-1 h-0.5 w-8 bg-blue-600"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Articles */}
        <div className="space-y-6">
          {sideArticles.map((article) => (
            <div key={article.id} className="flex gap-4 items-start">
              <div className="relative h-20 w-20 flex-shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <Link href="/author" className="text-sm font-medium text-blue-600">
                  {article.category}
                </Link>
                <h2 className="mt-2 font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                  <Link href="/single">
                    {article.highlight && (
                      <span className="text-blue-600">{article.highlight} / </span>
                    )}
                    {article.title}
                  </Link>
                </h2>
                <div className="mt-2 h-0.5 w-8 bg-blue-600"></div>
                <span className="mt-2 block text-sm text-slate-600">{article.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}