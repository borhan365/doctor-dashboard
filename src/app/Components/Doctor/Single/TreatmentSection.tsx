"use client";

import { Check } from "lucide-react";

function TreatmentSection() {
  const treatments = [
    { id: 1, name: "Pain Management and Relief" },
    { id: 2, name: "Stress Management" },
    { id: 3, name: "Mental Health" },
    { id: 4, name: "Sleep Disorders" },
    { id: 5, name: "Weight Loss" },
    { id: 6, name: "Gynecologist" },
    { id: 7, name: "Urologist" },
    { id: 8, name: "Endocrinologist" },
  ];

  return (
    <div id="treatments" className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
        Doctor's Expertise in Treatments & Services
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((treatment) => (
          <div
            key={treatment.id}
            className="flex items-center space-x-3"
          >
            <Check className="h-4 w-4 text-blue-600" />
            <span className={`text-sm font-medium text-slate-900`}>
              {treatment.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TreatmentSection;
