"use client";

import { useDoctorProfileByUser } from "@/hooks/doctor/getDoctorProfileByUser";
import { Building2, Calendar, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Experiences() {
  const user = {
    id: "1",
  };
  const { data, isLoading, error } = useDoctorProfileByUser(user?.id);
  const [isDeleting, setIsDeleting] = useState(false);
  const [experiences, setExperiences] = useState([
    {
      id: "1",
      position: "Senior Consultant",
      institution: "City Medical Center",
      location: "Dhaka, Bangladesh",
      period: "2020 - Present",
      description:
        "Leading the cardiology department and performing complex cardiac procedures. Specializing in interventional cardiology and cardiac imaging.",
      current: true,
    },
    {
      id: "2",
      position: "Consultant Cardiologist",
      institution: "Health Plus Hospital",
      location: "Dhaka, Bangladesh",
      period: "2015 - 2020",
      description:
        "Managed outpatient clinic, performed diagnostic procedures, and participated in research studies.",
      current: false,
    },
    {
      id: "3",
      position: "Associate Consultant",
      institution: "Modern Care Hospital",
      location: "Chittagong, Bangladesh",
      period: "2012 - 2015",
      description:
        "Provided comprehensive cardiac care and emergency services. Conducted regular health camps and awareness programs.",
      current: false,
    },
  ]);

  // Loading State
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 space-y-4">
          <div className="h-8 w-1/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[280px] animate-pulse rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            Error loading chambers. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const selectedExperiences = data?.doctorProfile?.experiences || experiences;

  // Empty State
  if (selectedExperiences?.length === 0) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Experiences
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage your experiences
            </p>
          </div>
          <Link href="/doctor/experiences/create" className="mt-4 sm:mt-0">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-600 sm:w-auto">
              <Plus className="h-4 w-4" />
              Add Experience
            </button>
          </Link>
        </div>
        <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600" />
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-200">
              No experiences added
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add your first experience to start managing your experiences
            </p>
            <Link href="/doctor/experiences/create">
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-600">
                <Plus className="h-4 w-4" />
                Add Experience
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Experiences ({selectedExperiences.length})
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your experiences
          </p>
        </div>
        <Link href="/doctor/experiences/create" className="mt-4 sm:mt-0">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-600 sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Chamber
          </button>
        </Link>
      </div>

      <div className="lg:col-span-2">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200 md:left-1/2" />

          {selectedExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`mb-4 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative ml-8 flex-1 rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:ml-0 md:mr-0 md:w-5/12">
                {/* Content */}
                <div className="space-y-4">
                  {experience.current && (
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                      Current Position
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-slate-900">
                    {experience.position}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700">
                        {experience.institution}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700">
                        {experience.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700">
                        {experience.period}
                      </span>
                    </div>
                  </div>

                  {experience.description && (
                    <p className="text-slate-600">{experience.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experiences;
