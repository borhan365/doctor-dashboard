import { Briefcase, Building2, Calendar } from 'lucide-react'
import React from 'react'

// Sample experience data
const experiences = [
  {
    id: 1,
    title: "Senior Consultant",
    institution: "Dhaka Medical College Hospital",
    department: "Department of Medicine",
    period: "2020 - Present",
    isCurrent: true
  },
  {
    id: 2, 
    title: "Associate Professor",
    institution: "Bangabandhu Sheikh Mujib Medical University",
    department: "Department of Medicine",
    period: "2015 - 2020",
    isCurrent: false
  },
  {
    id: 3,
    title: "Assistant Professor",
    institution: "Sir Salimullah Medical College",
    department: "Department of Medicine", 
    period: "2010 - 2015",
    isCurrent: false
  }
]

function ExperienceSection() {
  return (
    <div id="experiences" className="w-full bg-white px-4 py-8 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
          Professional Experience
        </h2>

        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-slate-200 md:left-[7.5rem]" />

          {experiences.map((exp) => (
            <div key={exp.id} className="relative flex flex-col md:flex-row">
              {/* Timeline dot */}
              <div className="absolute left-8 -ml-3 h-6 w-6 rounded-full border-4 border-white bg-blue-500 md:left-[7.5rem]" />

              {/* Experience period */}
              <div className="mb-4 ml-16 flex-none md:ml-0 md:w-32">
                <div className="flex items-center text-sm font-medium text-slate-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  {exp.period}
                </div>
              </div>

              {/* Experience details */}
              <div className="ml-4 md:ml-8 w-full">
                <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold text-slate-900">
                        {exp.title}
                        {exp.isCurrent && (
                          <span className="ml-3 inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                            Current
                          </span>
                        )}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 w-full">
                      <Building2 className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-slate-700">{exp.institution}</p>
                        <p className="text-sm text-slate-500">{exp.department}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceSection