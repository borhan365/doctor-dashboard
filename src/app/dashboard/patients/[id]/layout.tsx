import React from 'react'
import PatientProfileCard from '../ui/PatientProfileCard'
import { ArrowLeft } from 'lucide-react'
import Link from "next/link";

function layout({ children }: { children: React.ReactNode }) {
  const patientId = "923749812374";
  return (
    <>
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2">
          <Link
            href="/doctor/appointments"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Patient Details
          </Link>
        </div>

        <div className="space-y-6">
          <PatientProfileCard patientId={patientId} />
          
          {children}
        </div>
      </div>
    </main>
    </>
  )
}

export default layout