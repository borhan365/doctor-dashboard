"use client";

import { useState } from 'react'
import { GraduationCap, Plus, X } from 'lucide-react'

interface Props {
  onNext: () => void;
}

export function Education({ onNext }: Props) {
  const [educations, setEducations] = useState([{ id: 1 }])

  const addEducation = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1
    setEducations([...educations, { id: newId }])
  }

  const removeEducation = (id: number) => {
    setEducations(educations.filter(e => e.id !== id))
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-8">
        Education Information
      </h2>

      <p className="text-sm text-slate-600 mb-8 bg-blue-50 p-4 rounded-lg">
        Please provide your educational background starting with your most recent degree. This helps establish your credentials and expertise in your field.
      </p>

      <div className="space-y-8">
        {educations.map((education) => (
          <div key={education.id} className="border border-slate-200 rounded-lg p-6 relative bg-white shadow-sm">
            <button
              onClick={() => removeEducation(education.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2 mb-4">
              <label htmlFor={`institute-${education.id}`} className="text-sm font-medium text-slate-700">
                Institute Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <GraduationCap className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name={`institute-${education.id}`}
                  id={`institute-${education.id}`}
                  className="block w-full border rounded-lg border-slate-200 focus:outline-none pl-10 py-3 pr-2 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholder="University Name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <label htmlFor={`passing-year-${education.id}`} className="text-sm font-medium text-slate-700">
                  Passing Year
                </label>
                <input
                  type="text"
                  name={`passing-year-${education.id}`}
                  id={`passing-year-${education.id}`}
                  className="block w-full border rounded-lg border-slate-200 focus:outline-none py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholder="YYYY"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`degree-type-${education.id}`} className="text-sm font-medium text-slate-700">
                  Degree Type
                </label>
                <input
                  type="text"
                  name={`degree-type-${education.id}`}
                  id={`degree-type-${education.id}`}
                  className="block w-full border rounded-lg border-slate-200 focus:outline-none py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholder="e.g., MBBS, MD, PhD"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`subject-${education.id}`} className="text-sm font-medium text-slate-700">
                  Subject/Specialization
                </label>
                <input
                  type="text"
                  name={`subject-${education.id}`}
                  id={`subject-${education.id}`}
                  className="block w-full border rounded-lg border-slate-200 focus:outline-none py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholder="e.g., Medicine, Surgery"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2 text-slate-400" />
          Add Education
        </button>
      </div>
    </div>
  )
}
