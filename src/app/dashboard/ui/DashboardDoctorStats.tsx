import { FC } from "react";
import { Calendar, DollarSign, Pill, Users } from "lucide-react";
interface DashboardDoctorStatsProps {
  title: string;
  value: string;
}

const stats = [
  {
    title: "Total Appointments",
    value: "28",
    icon: Calendar,
    trend: "+12.5%",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    title: "Total Patients",
    value: "548",
    icon: Users,
    trend: "+8.2%",
    color:
      "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    title: "Prescriptions",
    value: "192",
    icon: Pill,
    trend: "+5.4%",
    color:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  },
  {
    title: "Revenue",
    value: "$12,548",
    icon: DollarSign,
    trend: "+15.8%",
    color:
      "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
];


export const DashboardDoctorStats: FC<DashboardDoctorStatsProps> = ({ title, value }) => {
  return (
<div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
                <span className="mt-1 text-sm font-medium text-green-600 dark:text-green-400">
                  {stat.trend}
                </span>
              </div>
              <div className={`rounded-full p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>  
  );
};
