import { AppointmentsList } from "./ui/AppointmentsList";

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto px-4">
        <div className="mt-6 rounded-lg bg-white p-4 shadow-sm md:p-6">
          <AppointmentsList />
        </div>
      </div>
    </main>
  );
}
