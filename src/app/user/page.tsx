"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Image from "next/image";
import HealthMetrics from "./ui/HealthMetrics";
import ShortSummeryList from "./ui/ShortSummeryList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Types
interface WelcomeHeaderProps {
  name: string;
  message: string;
}

// Components
function WelcomeHeader({ name, message }: WelcomeHeaderProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center gap-8">
          <div className="hidden md:block">
            <Image
              src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-02.jpg"
              alt="Medical staff illustration"
              width={300}
              height={200}
              className="h-28 w-28 rounded-full shadow-lg"
            />
          </div>
          <div>
            <h1 className="flex items-center justify-start gap-2 text-xl font-semibold text-gray-900">
              Welcome back
              <span className="block text-2xl text-blue-500">{name}!</span>
            </h1>
            <p className="mt-2 max-w-3xl text-base text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8">

        <div className="space-y-6">
          <WelcomeHeader
            name="Cara Stevens"
            message="We would like to take this opportunity to welcome you to our practice and to thank you for choosing our physicians to participate in your healthcare."
          />

          <HealthMetrics />

            <ShortSummeryList />
        </div>
      </div>
    </div>
  );
}
