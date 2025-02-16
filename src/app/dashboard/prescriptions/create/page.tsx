"use client";
import { useState } from "react";

export default function CreatePrescription() {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    date: new Date().toISOString().split("T")[0],
  });

  const commonInvestigations = [
    "ECG",
    "CXR (P/A)",
    "RBS",
    "Echo 2D/Doppler",
    "S. TSH",
    "S. creatine",
    "CBC",
    "FBS",
    "2HABF",
    "HbA1C"
  ];

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
    medications: [{
      medicine: "",
      schedule: "1-0-1",
      mealTime: "Before",
      duration: "1",
      durationType: "Days",
      remarks: "",
    }],
  });

  const scheduleOptions = ["1-0-0", "0-1-0", "0-0-1", "1-0-1", "1-1-0", "0-1-1", "1-1-1"];
  const mealTimeOptions = ["Before", "After"];
  const durationTypeOptions = ["Days", "Months", "Years"];

  const handleInvestigationSelect = (investigation: string) => {
    if (!formData.selectedInvestigations.includes(investigation)) {
      setFormData({
        ...formData,
        selectedInvestigations: [...formData.selectedInvestigations, investigation]
      });
    }
  };

  const removeInvestigation = (investigation: string) => {
    setFormData({
      ...formData,
      selectedInvestigations: formData.selectedInvestigations.filter(i => i !== investigation)
    });
  };

  const addCustomInvestigation = () => {
    if (formData.customInvestigations.trim()) {
      setFormData({
        ...formData,
        selectedInvestigations: [...formData.selectedInvestigations, formData.customInvestigations.trim()],
        customInvestigations: ""
      });
    }
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const newMedications = [...formData.medications];
    newMedications[index] = {
      ...newMedications[index],
      [field]: value,
    };
    setFormData({ ...formData, medications: newMedications });
  };

  const addNewMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, {
        medicine: "",
        schedule: "1-0-1",
        mealTime: "Before",
        duration: "1",
        durationType: "Days",
        remarks: "",
      }]
    });
  };

  const removeMedication = (index: number) => {
    const newMedications = formData.medications.filter((_, i) => i !== index);
    setFormData({ ...formData, medications: newMedications });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex gap-4">
      {/* Sidebar Form */}
      <div className="w-1/3 space-y-4 bg-white p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-purple-600">
          Prescription Details
        </h2>

        {/* Patient Info */}
        <div className="space-y-3">
          <div>
            <label className="block font-medium text-slate-700">Name:</label>
            <input
              type="text"
              value={patientInfo.name}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, name: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Patient Name"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700">Age:</label>
            <input
              type="text"
              value={patientInfo.age}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, age: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Age"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700">Date:</label>
            <input
              type="date"
              value={patientInfo.date}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, date: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block font-medium text-slate-700">Diagnosis:</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={2}
            placeholder="Enter diagnosis"
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
          />
        </div>

        {/* Clinical Complaints */}
        <div>
          <label className="block font-medium text-slate-700">
            Clinical Complaints:
          </label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={4}
            placeholder="Enter clinical complaints"
            value={formData.complaints}
            onChange={(e) =>
              setFormData({ ...formData, complaints: e.target.value })
            }
          />
        </div>

        {/* Risk Factors */}
        <div className="space-y-2">
          <label className="block font-medium text-slate-700">
            Risk Factors:
          </label>
          {["O/E", "Pulse", "BP", "Heart", "Lung", "Others"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-16 text-slate-600">{label}:</span>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={
                  formData.riskFactors[
                    label.toLowerCase() as keyof typeof formData.riskFactors
                  ]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    riskFactors: {
                      ...formData.riskFactors,
                      [label.toLowerCase()]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>

        {/* Investigations */}
        <div className="space-y-4">
          <label className="block font-medium text-slate-700">
            Investigations:
          </label>
          <div className="flex gap-2 flex-wrap">
            <select
              className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              onChange={(e) => handleInvestigationSelect(e.target.value)}
              value=""
            >
              <option value="">Select Investigation</option>
              {commonInvestigations.map(inv => (
                <option key={inv} value={inv}>{inv}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom investigation"
                className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={formData.customInvestigations}
                onChange={(e) => setFormData({...formData, customInvestigations: e.target.value})}
              />
              <button
                onClick={addCustomInvestigation}
                className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.selectedInvestigations.map((inv, index) => (
              <div key={index} className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
                <span>{inv}</span>
                <button
                  onClick={() => removeInvestigation(inv)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block font-medium text-slate-700">Medications:</label>
            <button
              onClick={addNewMedication}
              className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Add Medicine
            </button>
          </div>
          <div className="max-h-[300px] space-y-4 overflow-y-auto">
            {formData.medications.map((med, index) => (
              <div key={index} className="rounded-lg border border-slate-200 p-3 relative">
                <button
                  onClick={() => removeMedication(index)}
                  className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Medicine name"
                    className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={med.medicine}
                    onChange={(e) =>
                      handleMedicationChange(index, "medicine", e.target.value)
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={med.schedule}
                      onChange={(e) =>
                        handleMedicationChange(index, "schedule", e.target.value)
                      }
                    >
                      {scheduleOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <select
                      className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={med.mealTime}
                      onChange={(e) =>
                        handleMedicationChange(index, "mealTime", e.target.value)
                      }
                    >
                      {mealTimeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="Duration"
                      className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={med.duration}
                      onChange={(e) =>
                        handleMedicationChange(index, "duration", e.target.value)
                      }
                    />
                    <select
                      className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={med.durationType}
                      onChange={(e) =>
                        handleMedicationChange(index, "durationType", e.target.value)
                      }
                    >
                      {durationTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Remarks"
                    className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={med.remarks}
                    onChange={(e) =>
                      handleMedicationChange(index, "remarks", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor's Notes */}
        <div>
          <label className="block font-medium text-slate-700">
            Doctor's Notes:
          </label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={4}
            placeholder="Add any additional notes here..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Download
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Print
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-2/3 bg-white p-6 rounded-lg m-4 ml-0 shadow-lg">
        {/* Header Section */}
        <header className="mb-6 border-b pb-4">
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
        <div className="mb-6 grid grid-cols-4 gap-4 text-sm">
          <div className="col-span-2">
            <span className="font-medium text-slate-700">Name: </span>
            <span>{patientInfo.name}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Age: </span>
            <span>{patientInfo.age}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Date: </span>
            <span>{patientInfo.date}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Diagnosis */}
          <div>
            <h2 className="font-medium text-slate-700">Dx-</h2>
            <div className="whitespace-pre-wrap">{formData.diagnosis}</div>
          </div>

          {/* Clinical Complaints */}
          <div>
            <h2 className="font-medium text-slate-700">Clinical Complaints:</h2>
            <div className="whitespace-pre-wrap">{formData.complaints}</div>
          </div>

          {/* Risk Factors */}
          <div>
            <h2 className="font-medium text-slate-700">Risk Factors:</h2>
            {Object.entries(formData.riskFactors).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="font-medium">{key.toUpperCase()}-</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          {/* Investigations */}
          <div>
            <h2 className="font-medium text-slate-700">Investigations:</h2>
            <div className="flex flex-wrap gap-2">
              {formData.selectedInvestigations.map((inv, index) => (
                <span key={index} className="bg-slate-50 px-2 py-1 rounded">
                  {inv}
                </span>
              ))}
            </div>
          </div>

          {/* Medication Grid */}
          <div>
            <h2 className="font-medium text-slate-700">Rx</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border-r border-slate-300 p-2 text-center">Medicine</th>
                    <th className="border-r border-slate-300 p-2 text-center">Schedule</th>
                    <th className="border-r border-slate-300 p-2 text-center">Meal Time</th>
                    <th className="border-r border-slate-300 p-2 text-center">Duration</th>
                    <th className="p-2 text-center">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.medications.map((med, index) => (
                    <tr key={index}>
                      <td className="border-r border-t border-slate-300 p-2">{med.medicine}</td>
                      <td className="border-r border-t border-slate-300 p-2 text-center">{med.schedule}</td>
                      <td className="border-r border-t border-slate-300 p-2 text-center">{med.mealTime}</td>
                      <td className="border-r border-t border-slate-300 p-2 text-center">
                        {med.duration} {med.durationType}
                      </td>
                      <td className="border-t border-slate-300 p-2">{med.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor's Notes */}
          {formData.notes && (
            <div>
              <h2 className="font-medium text-slate-700">Doctor's Notes:</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {formData.notes}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t pt-4 text-sm text-slate-600">
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
