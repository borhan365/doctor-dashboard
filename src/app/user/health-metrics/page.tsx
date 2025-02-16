"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { Activity, Droplets, Heart } from "lucide-react";
import Image from "next/image";

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

export default function HealthMetrics() {
  const patientId = "923749812374";
  return (
    <div className="m-6 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900">Health Metrics</h1>
          <p className="text-base text-slate-600">
            This is a list of your health metrics. You can add more metrics by
            clicking the button below.
          </p>
        </div>

        {/* Update Health Metrics Button */}
        <div className="flex justify-end">
          <PrimaryButton
            text="Update Health Metrics"
            href="/user/health-metrics/edit"
          />
        </div>
      </div>

      {/* Note */}
      <div className="shadow-xs mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-base text-slate-600">
          <span className="font-semibold">Note:</span> Health metrics are
          automatically updated using data from your health records. Your
          information will also be securely shared with your doctor when you
          book an appointment, ensuring they have the necessary details to
          provide you with accurate and efficient care. This means you won’t
          need to provide your information repeatedly.{" "}
          {/* <Link href="/learn-more" className="font-medium text-blue-600 underline">
            Learn more
          </Link> */}
        </p>
      </div>

      {/* Health Metrics */}
      <div className="rounded-lg bg-white p-4 shadow-sm md:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Basic Information */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 lg:col-span-1">
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
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-600">
                  Blood Group
                </span>
                <p className="mt-1 text-base font-medium text-slate-900">O+</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-600">
                  Height
                </span>
                <p className="mt-1 text-base font-medium text-slate-900">
                  5 Feet 10 Inches
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-600">
                  Weight
                </span>
                <p className="mt-1 text-base font-medium text-slate-900">
                  70 kg
                </p>
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
            <div
              key={metric.name}
              className="shadow-xs rounded-lg border border-slate-100 bg-white"
            >
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
                <div
                  className={`mt-3 flex items-center justify-start gap-1 text-sm ${metric.increasing ? "text-green-600" : "text-red-600"}`}
                >
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
            <h3 className="text-sm font-medium text-slate-600">
              Identification
            </h3>
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
      </div>
    </div>
  );
}
