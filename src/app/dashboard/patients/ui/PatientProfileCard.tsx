import Image from "next/image";
import PatientMenu from "./PatientMenu";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { Activity, Droplets, Heart } from "lucide-react";

const metrics = [
  {
    name: "Blood Pressure",
    value: "110/70",
    change: "10% Higher Than Last Month",
    increasing: true,
    icon: Activity,
  },
  {
    name: "Heart Rate", 
    value: "650",
    change: "07% Less Than Last Month",
    increasing: false,
    icon: Heart,
  },
  {
    name: "Glucose Level",
    value: "88-75",
    change: "12% Higher Than Last Month",
    increasing: true,
    icon: Activity,
  },
  {
    name: "Blood Count",
    value: "9,456/mL",
    change: "22% Less Than Last Month",
    increasing: false,
    icon: Droplets,
  },
];

export default function PatientProfileCard({
  patientId,
}: {
  patientId: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4 !pb-0 shadow-sm md:p-6 lg:p-8">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Basic Information */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="relative mx-auto h-24 w-24 sm:mx-0 sm:h-28 sm:w-28">
            <Image
              src={
                "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/doctor-profile-img.jpg"
              }
              alt="Patient profile"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="text-sm font-medium text-blue-600">
                #{patientId}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                Regular Patient
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
                Active
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold text-slate-900 lg:text-2xl">
              John Smith
            </h1>
            <div className="mt-3 space-y-1.5 text-sm text-slate-600">
              <p className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="font-medium">DOB:</span>
                <span>15 Jan 1990</span>
              </p>
              <p className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="font-medium">Gender:</span>
                <span>Male</span>
              </p>
              <p className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="font-medium">Mobile:</span>
                <span>+1 234 567 8900</span>
              </p>
              <p className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="font-medium">Email:</span>
                <span className="break-all">john.smith@example.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-600">
                Blood Group
              </span>
              <p className="mt-1 text-base font-medium text-slate-900">O+</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-600">
                Nationality
              </span>
              <p className="mt-1 text-base font-medium text-slate-900">
                American
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-600">
                Marital Status
              </span>
              <p className="mt-1 text-base font-medium text-slate-900">
                Married
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-600">
                Occupation
              </span>
              <p className="mt-1 text-base font-medium text-slate-900">
                Engineer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="rounded-lg bg-white border border-slate-100 shadow-xs">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-50 p-2">
                    <metric.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      {metric.name}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {metric.value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`mt-3 flex items-center justify-start gap-1 text-sm ${metric.increasing ? "text-green-600" : "text-red-600"}`}>
                {metric.increasing ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                <span className="ml-1">{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Information Grid */}
      <div className="mt-4 grid gap-6 border-t border-slate-100 pt-4 lg:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-sm font-medium text-slate-600">
            Physical Details
          </h3>
          <div className="mt-2 space-y-2">
            <p className="flex justify-between text-sm">
              <span className="text-slate-600">Height:</span>
              <span className="font-medium text-slate-900">175 cm</span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-slate-600">Weight:</span>
              <span className="font-medium text-slate-900">70 kg</span>
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-sm font-medium text-slate-600">Identification</h3>
          <div className="mt-2 space-y-2">
            <p className="flex justify-between text-sm">
              <span className="text-slate-600">NID:</span>
              <span className="font-medium text-slate-900">123456789</span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-slate-600">Passport:</span>
              <span className="font-medium text-slate-900">AB1234567</span>
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-sm font-medium text-slate-600">Patient Type</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
              Insurance
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600">
              Corporate
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600">
              VIP
            </span>
          </div>
        </div>
      </div>

      {/* Patient Menus */}
      <PatientMenu patientId={patientId} />
    </div>
  );
}
