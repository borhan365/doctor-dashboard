"use client";

import {
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  Activity,
  Clipboard,
  Droplets,
  FileText,
  Heart,
  MoreVertical,
  Paperclip,
  Pill,
  Search,
  Syringe,
  TestTube,
} from "lucide-react";
import AppointmentsList from "./AppointmentsList";

interface Document {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface Medication {
  name: string;
  dosage: string;
  icon: React.ElementType;
  color: string;
}

interface Metric {
  name: string;
  value: string;
  change: string;
  increasing: boolean;
  icon: React.ElementType;
}

const documents: Document[] = [
  { name: "Blood Report", icon: FileText, color: "text-red-500" },
  { name: "Mediclaim Documents", icon: Clipboard, color: "text-blue-500" },
  { name: "Doctor Prescription", icon: FileText, color: "text-green-500" },
  { name: "X-Ray Files", icon: Search, color: "text-purple-500" },
  { name: "Urine Report", icon: TestTube, color: "text-yellow-500" },
  { name: "Scanned Documents", icon: Paperclip, color: "text-indigo-500" },
];

const medications: Medication[] = [
  {
    name: "Econochlor (chloramphenicol-oral)",
    dosage: "1 - 0 - 1",
    icon: Pill,
    color: "text-pink-500",
  },
  {
    name: "Desmopressin tabs",
    dosage: "1 - 1 - 1",
    icon: Pill,
    color: "text-blue-500",
  },
  {
    name: "Abciximab-injection",
    dosage: "1 Daily",
    icon: Syringe,
    color: "text-green-500",
  },
  {
    name: "Kexzara sarilumab",
    dosage: "0 - 0 - 1",
    icon: Pill,
    color: "text-purple-500",
  },
  {
    name: "Gentamicin-topical",
    dosage: "1 - 0 - 1",
    icon: Pill,
    color: "text-red-500",
  },
  {
    name: "Paliperidone palmitate",
    dosage: "1 - 1 - 1",
    icon: Pill,
    color: "text-indigo-500",
  },
  {
    name: "Sermomelin-injectable",
    dosage: "1 Daily",
    icon: Syringe,
    color: "text-yellow-500",
  },
];

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

export default function ShortSummeryList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Health Metrics Section */}
      <AppointmentsList />

      {/* Documents Section */}
      <div className="rounded-lg bg-white shadow">
        <div className="flex items-center justify-between p-6">
          <h3 className="text-lg font-medium text-slate-900">
            Reports/Documents
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-500">
            View All
          </button>
        </div>
        <div className="border-t border-slate-200">
          <div className="divide-y divide-slate-200">
            {documents.map((document) => {
              const Icon = document.icon;
              return (
                <div
                  key={document.name}
                  className="flex items-center justify-between p-4 hover:bg-slate-50"
                >
                  <div className="flex items-center">
                    <Icon className={`mr-3 h-5 w-5 ${document.color}`} />
                    <span className="text-sm font-medium text-slate-900">
                      {document.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-400 hover:text-slate-500">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Medications Section */}
      <div className="rounded-lg bg-white shadow">
        <div className="flex items-center justify-between p-6">
          <h3 className="text-lg font-medium text-slate-900">Medications</h3>
          <button className="text-sm text-blue-600 hover:text-blue-500">
            View All
          </button>
        </div>
        <div className="border-t border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Medicine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Dosage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {medications.map((medication) => {
                  const Icon = medication.icon;
                  return (
                    <tr key={medication.name}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <Icon
                            className={`mr-2 h-5 w-5 ${medication.color}`}
                          />
                          <div className="text-sm font-medium text-slate-900">
                            {medication.name}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {medication.dosage}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
