"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { Activity, Droplets, Heart } from "lucide-react";

interface Metric {
  name: string;
  value: string;
  change: string;
  increasing: boolean;
  icon: React.ElementType;
}

const metrics: Metric[] = [
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
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="rounded-lg bg-white shadow"
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
          <div className={`mt-3 text-sm flex items-center justify-start gap-1 ${metric.increasing ? "text-green-600" : "text-red-600"}`}>
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
  );
}
