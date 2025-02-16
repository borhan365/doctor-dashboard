
import {
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Pill,
  Plus,
  Stethoscope,
  Users,
} from "lucide-react";

interface Notification {
  id: string
  type: 'booking' | 'review' | 'appointment' | 'payment'
  message: string
  time: string
}

const recentActivities = [
  {
    title: "New Appointment",
    description: "Sarah Johnson scheduled for checkup",
    time: "2 hours ago",
    icon: Calendar,
    iconColor: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Prescription Updated",
    description: "Updated medication for James Wilson",
    time: "4 hours ago",
    icon: FileText,
    iconColor: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "New Message",
    description: "Message from Dr. Emily regarding patient",
    time: "6 hours ago",
    icon: MessageSquare,
    iconColor: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Diagnosis Complete",
    description: "Completed diagnosis for Michael Brown",
    time: "8 hours ago",
    icon: Stethoscope,
    iconColor: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
];

export function Notifications() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Recent Activities
      </h2>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border border-slate-100 p-4 dark:border-slate-700"
          >
            <div className={`rounded-full p-2 ${activity.bgColor}`}>
              <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900 dark:text-white">
                {activity.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {activity.description}
              </p>
              <span className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

