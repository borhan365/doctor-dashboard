import { GraduationCap } from 'lucide-react'
import React from 'react'

function EducationSection() {
  return (
    <>
      <div id="educations" className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Education
        </h2>
        <div className="space-y-6">
          {[1, 2].map((edu) => (
            <div
              key={edu}
              className="border-l-4 border-blue-500 pl-4"
            >
              <div className="flex items-start space-x-4">
                <GraduationCap className="mt-1 h-5 w-5 text-slate-400" />
                <div>
                  <h3 className="font-medium text-slate-900">
                    MBBS in Medicine
                  </h3>
                  <p className="text-slate-600">
                    Dhaka Medical College
                  </p>
                  <p className="text-sm text-slate-500">
                    2015 - 2020
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default EducationSection