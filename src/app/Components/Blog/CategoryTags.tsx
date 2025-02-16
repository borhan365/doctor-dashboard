import Link from 'next/link'

export default function CategoryTags() {
  const categories = [
    { id: '357395734985', name: 'Health & Wellness' },
    { id: '357395734986', name: 'Lifestyle' },
    { id: '357395734987', name: 'Nutrition' },
    { id: '357395734988', name: 'Mental Health' },
    { id: '357395734989', name: 'Fitness' },
    { id: '357395734990', name: 'Medical Care' },
    { id: '357395734991', name: 'Prevention' },
    { id: '357395734992', name: 'Wellness Tips' }
  ]

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Related Categories</h2>
        <div className="mt-2 h-1 w-16 bg-blue-600"></div>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  )
}