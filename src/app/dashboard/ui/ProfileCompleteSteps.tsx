"use client";

import { Doctor } from "@/types/doctor";
import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  Languages,
  MapPin,
  Phone,
  Stethoscope,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface ProfileCompleteStepsProps {
  doctorProfile?: Doctor | null;
}

function ProfileCompleteSteps({
  doctorProfile: initialProfile,
}: ProfileCompleteStepsProps) {
  const doctorProfile = useMemo(
    () => ({
      id: "1",
      name: "John Doe",
      emailAddresses: ["john.doe@example.com"],
      phoneNumbers: ["+8801712345678"],
      division: "Dhaka",
      city: "Dhaka",
      languages: ["English", "Bengali"],
      degrees: ["MBBS", "MD"],
      bmdcNumber: "1234567890",
      gender: "Male",
      specialists: ["Cardiology", "Dermatology"],
      chambers: [
        {
          id: "1",
          name: "Chamber 1",
        },
      ],
      treatments: ["Treatment 1", "Treatment 2"],
      educations: [
        {
          id: "1",
          name: "Education 1",
        },
      ],
      experiences: [
        {
          id: "1",
          name: "Experience 1",
        },
      ],
      faqs: [
        {
          id: "1",
        },
      ],
    }),
    [],
  ); // Empty dependency array since this is static data

  const steps = useMemo(() => {
    return [
      {
        title: "Basic Information",
        description: "Name, BMDC, Gender",
        icon: User2,
        isComplete: !!(
          doctorProfile?.name &&
          doctorProfile?.bmdcNumber &&
          doctorProfile?.gender
        ),
        weight: 15,
        link: "/doctor/profile",
      },
      {
        title: "Contact Details",
        description: "Email & Phone",
        icon: Phone,
        isComplete: !!(
          doctorProfile?.emailAddresses?.length &&
          doctorProfile?.phoneNumbers?.length
        ),
        weight: 10,
        link: "/doctor/profile",
      },
      {
        title: "Location",
        description: "Practice Area",
        icon: MapPin,
        isComplete: !!(doctorProfile?.division && doctorProfile?.city),
        weight: 10,
        link: "/doctor/profile",
      },
      {
        title: "Languages",
        description: "Speaking Languages",
        icon: Languages,
        isComplete: !!(doctorProfile?.languages?.length > 0),
        weight: 10,
        link: "/doctor/profile",
      },
      {
        title: "Degrees",
        description: "Qualifications",
        icon: GraduationCap,
        isComplete: !!(doctorProfile?.degrees?.length > 0),
        weight: 10,
        link: "/doctor/profile",
      },
      {
        title: "Specialization",
        description: "Medical Expertise",
        icon: Stethoscope,
        isComplete: !!(doctorProfile?.specialists?.length > 0),
        weight: 15,
        link: "/doctor/profile",
      },
      {
        title: "Chambers",
        description: "Practice Locations",
        icon: Building2,
        isComplete: !!(doctorProfile?.chambers?.length > 0),
        weight: 10,
        link: "/doctor/chambers",
      },
      {
        title: "Experience",
        description: "Work History",
        icon: Briefcase,
        isComplete: !!(doctorProfile?.experiences?.length > 0),
        weight: 5,
        link: "/doctor/experiences",
      },
      {
        title: "Education",
        description: "Academic History",
        icon: BookOpen,
        isComplete: !!(doctorProfile?.educations?.length > 0),
        weight: 5,
        link: "/doctor/educations",
      },
      {
        title: "Symptoms",
        description: "Common Treatments",
        icon: BookOpen,
        isComplete: !!(doctorProfile?.treatments?.length > 0),
        weight: 10,
        link: "/doctor/profile",
      },
    ];
  }, [doctorProfile]);

  const completionPercentage = useMemo(() => {
    const completedWeight = steps.reduce(
      (acc, step) => (step.isComplete ? acc + step.weight : acc),
      0,
    );
    return Math.round(completedWeight);
  }, [steps]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-5 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Profile Completion
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Complete your profile to increase visibility
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {completionPercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`group relative flex flex-col rounded-xl border p-4 transition-all duration-200 ${
                  step.isComplete
                    ? "border-green-100 bg-green-50/50 dark:border-green-900/50 dark:bg-green-900/10"
                    : "border-slate-200 bg-white hover:border-blue-100 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-blue-900/50 dark:hover:bg-blue-900/10"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 transition-colors ${
                      step.isComplete
                        ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                        : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-700 dark:text-slate-400 dark:group-hover:bg-blue-900/50 dark:group-hover:text-blue-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <Link href={step.link}>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="mt-auto flex items-center gap-1.5">
                  {step.isComplete ? (
                    <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                      <BadgeCheck className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {completionPercentage < 100 && (
          <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Complete all sections to maximize your profile visibility and
              attract more patients. A complete profile helps build trust and
              credibility with potential patients.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCompleteSteps;
