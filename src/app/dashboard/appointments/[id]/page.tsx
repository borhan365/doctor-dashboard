import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AppointmentDetails from "../ui/AppointmentDetails";
import RecentAppointments from "../ui/RecentAppointment";

export default function AppointmentDetailsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2">
          <Link
            href="/doctor/appointments"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Appointment Details
          </Link>
        </div>

        <div className="space-y-6">
          <AppointmentDetails />
          <RecentAppointments />
        </div>
      </div>
    </main>
  );
}
