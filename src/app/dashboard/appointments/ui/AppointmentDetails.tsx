import { MessageSquare, X } from "lucide-react";
import Image from "next/image";
import ModelOne from "/public/images/doctor/model-1.webp";

export default function AppointmentDetails() {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        {/* Patient Information */}
        <div className="flex items-start gap-6">
          <div className="relative h-28 w-28 flex-shrink-0">
            <Image
              src={ModelOne}
              alt="Patient profile"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-blue-600">
                #Apt0001
              </span>
              <div className="flex gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  New Patient
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  Upcoming
                </span>
              </div>
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">
              Kelly Joseph
            </h1>
            <div className="mt-3 space-y-1.5 text-sm text-slate-600">
              <p className="flex items-center">
                <span className="block">Kelly@Example.Com</span>
              </p>
              <p className="flex items-center">
                <span className="block">+1 504 368 6874</span>
              </p>
            </div>
          </div>
        </div>

        {/* Appointment Type & Fee */}
        <div className="flex justify-end items-start gap-6 lg:items-end">
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <span className="text-sm font-medium text-slate-600">
              Type of Appointment
            </span>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
                Direct Visit
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <span className="text-sm font-medium text-slate-600">
              Consultation Fees
            </span>
            <span className="text-3xl font-semibold text-slate-900">$200</span>
          </div>
        </div>
      </div>

      {/* Appointment Details Grid */}
      <div className="mt-6 grid gap-8 border-t border-slate-1 00 p-4 sm:grid-cols-2 lg:grid-cols-5 items-center !pb-0">
        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Appointment Date & Time
          </h3>
          <p className="mt-2 text-base font-medium text-slate-900">
            22 Jul 2023 - 12:00 pm
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Clinic Location
          </h3>
          <p className="mt-2 text-base font-medium text-slate-900">
            Adrian's Dentistry
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500">Location</h3>
          <p className="mt-2 text-base font-medium text-slate-900">
            Newyork, United States
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500">Visit Type</h3>
          <p className="mt-2 text-base font-medium text-slate-900">General</p>
        </div>
         {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <button className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
