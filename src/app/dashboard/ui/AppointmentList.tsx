import { Check, X } from "lucide-react";
import Image from "next/image";

interface Appointment {
  id: string;
  name: string;
  avatar: string;
  date: string;
  time: string;
  type: "General" | "Clinic Consulting";
}

export function AppointmentList({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Upcoming Appointments
        </h2>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="flex flex-col gap-4 rounded-lg border border-slate-100 p-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              {apt.avatar ? (
                <Image
                  src={apt.avatar}
                  alt={apt.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                  {apt.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-blue-500 dark:text-blue-400">
                  #{apt.id}
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {apt.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {apt.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {apt.date}
                </p>
                <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  {apt.type}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="rounded-md p-1 text-green-500 transition bg-green-50 hover:bg-green-100 dark:hover:bg-green-900/20">
                  <Check className="h-5 w-5" />
                </button>
                <button className="rounded-md p-1 text-red-300 transition bg-red-50 hover:bg-red-100 dark:hover:bg-red-900/20">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
