import Link from 'next/link';
import Image from 'next/image';

export default function BigBoxSection() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Main blog post */}
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/images/blog/featured.jpg"
              alt="Featured blog post"
              width={800}
              height={600}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6 bg-white">
              <span className="text-blue-600 text-sm font-medium">Medicine</span>
              <Link href="/single" className="block mt-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="text-blue-600">Coronavirus:</span> What Are They and Should I See a Doctor?
                </h2>
              </Link>
              <p className="mt-3 text-gray-600">
                Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health.
              </p>
              <p className="mt-2 text-gray-500 text-sm">26, June, 2022</p>
            </div>
          </div>

          {/* Small blog posts */}
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-sm">
                <span className="text-blue-600 text-sm font-medium">Medicine</span>
                <Link href="/single" className="block mt-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    <span className="text-blue-600">Coronavirus Symptoms:</span> What Are They and Should I See a Doctor?
                  </h3>
                </Link>
                <p className="mt-3 text-gray-600">
                  Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health.
                </p>
                <p className="mt-2 text-gray-500 text-sm">26, June, 2022</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}