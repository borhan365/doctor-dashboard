"use client";
import { useState } from "react";
import PrescriptionPreview from "./ui/PrescriptionPreview";
import PrescriptionSidebar from "./ui/PrescriptionSidebar";

export default function ManagePrescription() {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [formData, setFormData] = useState({
    diagnosis: "",
    complaints: "",
    notes: "",
    riskFactors: {
      oe: "",
      pulse: "",
      bp: "",
      heart: "",
      lung: "",
      others: "",
    },
    selectedInvestigations: [],
    customInvestigations: "",
    medications: [
      {
        medicine: "",
        schedule: "1-0-1",
        mealTime: "Before",
        duration: "1",
        durationType: "Days",
        remarks: "",
      },
    ],
  });

  return (
    <div className="flex gap-4">
      {/* Sidebar Form */}
      <PrescriptionSidebar
        patientInfo={patientInfo}
        setPatientInfo={setPatientInfo}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Preview Section */}
      <PrescriptionPreview patientInfo={patientInfo} formData={formData} />
    </div>
  );
}
