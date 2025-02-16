import Link from 'next/link'
import React from 'react'

function DoctorBannerSection() {
  return (
    <>
      <div className="h-[120px] p-6 sm:p-8 bg-gradient-to-b from-white to-blue-100">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-8 text-slate-600 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/doctors" className="hover:text-blue-600 transition-colors">
            Doctors
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Dr. Tapas Chowdhury</span>
        </nav>
      </div>
    </>
  )
}

export default DoctorBannerSection