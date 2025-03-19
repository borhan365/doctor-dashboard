"use client";

import { useState } from 'react'
import { Briefcase, Plus, X } from 'lucide-react'

export function Experience() {
  const [experiences, setExperiences] = useState([{ id: 1 }])

  const addExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1
    setExperiences([...experiences, { id: newId }])
  }

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(e => e.id !== id))
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-8">
        Experience Information
      </h2>

      <p className="text-sm text-slate-600 mb-8 bg-blue-50 p-4 rounded-lg">
        Add your professional experience to help patients understand your expertise and background. You can add multiple experiences to showcase your career progression.
      </p>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="border border-slate-200 rounded-lg p-6 relative bg-white shadow-sm">
            <button
              onClick={() => removeExperience(experience.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Remove experience"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor={`hospital-${experience.id}`} className="text-sm font-medium text-slate-700">
                  Hospital Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Briefcase className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name={`hospital-${experience.id}`}
                    id={`hospital-${experience.id}`}
                    className="block w-full border rounded-lg border-slate-200 focus:outline-none pl-10 py-3 pr-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    placeholder="Enter hospital name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor={`designation-${experience.id}`} className="text-sm font-medium text-slate-700">
                  Job Designation
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name={`designation-${experience.id}`}
                    id={`designation-${experience.id}`}
                    className="block w-full border rounded-lg border-slate-200 focus:outline-none py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Senior Consultant"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor={`department-${experience.id}`} className="text-sm font-medium text-slate-700">
                  Department
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name={`department-${experience.id}`}
                    id={`department-${experience.id}`}
                    className="block w-full border rounded-lg border-slate-200 focus:outline-none py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Cardiology"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor={`job-start-${experience.id}`} className="text-sm font-medium text-slate-700">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name={`job-start-${experience.id}`}
                    id={`job-start-${experience.id}`}
                    className="block w-full border rounded-lg border-slate-200 focus:outline-none py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor={`job-end-${experience.id}`} className="text-sm font-medium text-slate-700">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name={`job-end-${experience.id}`}
                    id={`job-end-${experience.id}`}
                    className="block w-full border rounded-lg border-slate-200 focus:outline-none py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Experience
        </button>
      </div>
    </div>
  )
}
