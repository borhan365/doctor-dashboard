"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// Mock data for demonstration
const MOCK_PRESCRIPTIONS = [
  {
    id: "1",
    patientName: "John Doe",
    age: "45",
    weight: "75kg",
    date: "2024-01-15",
    clinicalComplaints: ["Fever for 3 days", "Cough and cold", "Body ache"],
    riskFactors: {
      bp: "120/80",
      pulse: "72",
      heart: "Normal",
      lungs: "Clear",
      others: "None",
    },
    investigations: ["CBC", "ESR", "CRP"],
    medications: [
      {
        name: "Acetaminophen",
        dosage: "500mg twice daily",
        duration: "5 days",
      },
      {
        name: "Pseudoephedrine",
        dosage: "60mg every 6 hours",
        duration: "3 days",
      },
      {
        name: "Paracetamol",
        dosage: "500mg every 6 hours",
        duration: "3 days",
      },
      {
        name: "Ibuprofen",
        dosage: "200mg every 6 hours",
        duration: "3 days",
      },
      {
        name: "Cetirizine",
        dosage: "10mg every 12 hours",
        duration: "3 days",
      },
      {
        name: "Dextromethorphan",
        dosage: "10mg every 12 hours",
        duration: "3 days",
      },
      {
        name: "Acetaminophen",
        dosage: "500mg twice daily",
        duration: "5 days",
      },
      {
        name: "Pseudoephedrine",
        dosage: "60mg every 6 hours",
        duration: "3 days",
      },
      {
        name: "Acetaminophen",
        dosage: "500mg twice daily",
        duration: "5 days",
      },
      {
        name: "Acetaminophen",
        dosage: "500mg twice daily",
        duration: "5 days",
      },
    ],
    diagnosis: "Seasonal allergies with rhinitis and mild cough",
    complaints:
      "Fever for 3 days, Cough and cold, Body ache as well as headache and nausea since 2 days",
    notes:
      "Patient is allergic to penicillin and aspirin. Please avoid these medications.",
  },
  // ... other mock data
];

function PrescriptionDetails() {
  const { id } = useParams();

  const { data: prescription, isLoading } = useQuery({
    queryKey: ["prescription", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return MOCK_PRESCRIPTIONS.find((p) => p.id === id);
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="space-y-4">
            <div className="h-8 w-1/4 animate-pulse rounded bg-slate-100" />
            <div className="h-24 animate-pulse rounded bg-slate-100" />
            <div className="h-48 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
          Prescription not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="bg-white p-8 shadow-lg">
        {/* Header Section */}
        <header className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Left side - Bengali */}
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-purple-600">
                ডাঃ সোহেল সিদ্দিকী
              </h1>
              <div className="space-y-0.5 text-sm text-slate-600">
                <p>এমবিবিএস, বিসিএস (স্বাস্থ্য),</p>
                <p>এম ডি (কার্ডিওলজি), নি সি ভি ডি (ডায়াবেটিস)</p>
                <p>জাতীয় হৃদরোগ ইনস্টিটিউট, ঢাকা</p>
              </div>
            </div>

            {/* Right side - English */}
            <div className="space-y-1 text-right">
              <h1 className="text-xl font-semibold text-purple-600">
                Dr. Sohel Siddike
              </h1>
              <div className="space-y-0.5 text-sm text-slate-600">
                <p>MBBS, BCS (Health)</p>
                <p>MD (Cardiology) NICVD, CCD (Diabetes)</p>
                <p className="text-red-500">Intervention Cardiologist</p>
                <p className="text-blue-500">
                  Chittagong Medical College Hospital
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Patient Info */}
        <div className="mb-6 grid grid-cols-4 gap-4 border-b border-t py-4">
          <div>
            <span className="text-slate-600">Name:</span>
            <span className="ml-2">{prescription.patientName}</span>
          </div>
          <div>
            <span className="text-slate-600">Age:</span>
            <span className="ml-2">{prescription.age}</span>
          </div>
          <div>
            <span className="text-slate-600">Weight:</span>
            <span className="ml-2">{prescription.weight}</span>
          </div>
          <div>
            <span className="text-slate-600">Date:</span>
            <span className="ml-2">
              {new Date(prescription.date).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mb-6">
          <h2 className="mb-2 font-semibold text-slate-900">Diagnosis:</h2>
          <p className="text-slate-600">{prescription.diagnosis}</p>
        </div>

        {/* Complaints */}
        <div className="mb-6">
          <h2 className="mb-2 font-semibold text-slate-900">Complaints:</h2>
          <p className="text-slate-600">{prescription.complaints}</p>
        </div>

        {/* Clinical Info */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h2 className="mb-2 font-semibold text-slate-900">
              Clinical Complaints:
            </h2>
            <ul className="list-disc space-y-1 pl-4">
              {prescription.clinicalComplaints.map((complaint, i) => (
                <li key={i} className="text-slate-600">
                  {complaint}
                </li>
              ))}
            </ul>

            <h2 className="mb-2 mt-4 font-semibold text-slate-900">
              Risk Factors:
            </h2>
            <div className="space-y-1">
              <p>
                <span className="text-slate-600">BP:</span>{" "}
                {prescription.riskFactors.bp}
              </p>
              <p>
                <span className="text-slate-600">Pulse:</span>{" "}
                {prescription.riskFactors.pulse}
              </p>
              <p>
                <span className="text-slate-600">Heart:</span>{" "}
                {prescription.riskFactors.heart}
              </p>
              <p>
                <span className="text-slate-600">Lungs:</span>{" "}
                {prescription.riskFactors.lungs}
              </p>
            </div>

            <h2 className="mb-2 mt-4 font-semibold text-slate-900">
              Investigations:
            </h2>
            <ul className="list-disc space-y-1 pl-4">
              {prescription.investigations.map((investigation, i) => (
                <li key={i} className="text-slate-600">
                  {investigation}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h2 className="mb-4 font-semibold text-slate-900">Rx</h2>
            <div className="grid grid-cols-2">
              {prescription.medications.map((med, i) => (
                <div key={i} className="border-b border-slate-100 pb-1 mb-1">
                  <p className="font-medium text-slate-800">
                    {i + 1}. {med.name}
                  </p>
                  <p className="ml-4 text-slate-600">{med.dosage}</p>
                  <p className="ml-4 text-slate-600">
                    Duration: {med.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h2 className="mb-2 font-semibold text-slate-900">Notes:</h2>
          <p className="text-slate-600">{prescription.notes}</p>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t pt-6 text-sm text-slate-600">
          <div className="flex justify-between">
            <div>
              <p>প্রতি কনসাল্ট ভিজিট ৫ টা থেকে - রাত ৮ টা</p>
              <p>Contact: 01940-233638, 01940-233639</p>
            </div>
            <div className="text-right">
              <p>প্রতিদিন বিকাল ৫টা থেকে রাত ১০টা</p>
              <p>Room No. - 519</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PrescriptionDetails;
