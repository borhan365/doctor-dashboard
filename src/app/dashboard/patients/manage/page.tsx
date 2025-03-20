"use client";

import { ApiUrl } from "@/app/Variables";
import { PatientProfile } from "@/types/patientProfile";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PatientBasicInfo from "./ui/PatientBasicInfo";
import PatientClinicalNotes from "./ui/PatientClinicalNotes";
import PatientDocuments from "./ui/PatientDocuments";
import PatientLifestyle from "./ui/PatientLifestyle";
import PatientMedicalDetails from "./ui/PatientMedicalDetails";
import PatientMedicalHistory from "./ui/PatientMedicalHistory";
import PatientVitalSigns from "./ui/PatientVitalSigns";

const ManagePatients = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("id");
  const currentTab = searchParams.get("tab") || "basic";
  const isEdit = !!patientId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PatientProfile>>({
    // Basic Information
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    emergencyContact: "",
    emergencyPhone: "",
    relationToEmergencyContact: "",

    // Address Information
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",

    // Patient Medical Details
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    maritalStatus: "",
    NIDNumber: "",
    passportNumber: "",
    anniversaryDate: "",
    refferalBy: "",

    // Medical History
    initialDiseases: [],
    currentDiseases: [],
    allergies: [],
    chronicConditions: [],
    previousSurgeries: [],
    familyHistory: "",
    lifestyle: "",
    occupation: "",

    // Vaccination History
    vaccinations: {},

    // Insurance Information
    insuranceProvider: "",
    insurancePolicyNumber: "",
    insuranceExpiryDate: "",

    // Clinical Notes
    chiefComplaint: "",
    observations: "",
    investigations: "",
    diagnosis: "",
    treatmentPlan: "",
    followUpPlan: "",
    notes: "",

    // Vital Signs
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    temperature: "",
    bloodSugar: "",
    medicalConditions: "",
    bloodCount: "",
    pulse: "",
    oxygenSaturation: "",

    // Lifestyle Factors
    dietaryRestrictions: "",
    exerciseRoutine: "",
    smokingStatus: "",
    alcoholConsumption: "",

    // Document Management
    medicalDocuments: {},
    consentForms: {},
    lastVisitDate: "",
    nextAppointmentDate: "",
  });

  console.log("formData", formData);
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    age: "", // Will be converted to null if empty
    gender: "",
    emergencyContact: "",
    emergencyPhone: "",
    relationToEmergencyContact: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    height: "", // Will be converted to null if empty
    weight: "", // Will be converted to null if empty
    bmi: "", // Will be converted to null if empty
    bloodGroup: "",
    maritalStatus: "",
    NIDNumber: "",
    passportNumber: "",
    anniversaryDate: "",
    refferalBy: "",
    initialDiseases: [],
    currentDiseases: [],
    allergies: [],
    chronicConditions: [],
    previousSurgeries: [],
    familyHistory: "",
    lifestyle: "",
    occupation: "",
    vaccinations: {},
    insuranceProvider: "",
    insurancePolicyNumber: "",
    insuranceExpiryDate: "",
    // ... rest of the fields
  };

  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        try {
          const response = await fetch(
            `${ApiUrl}/doctors/patients/get-single/${patientId}`,
            {
              credentials: "include",
            },
          );
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch patient data");
          }

          // Update form data with fetched patient data
          setFormData(data);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          setError(message);
          toast.error(message);
        }
      };

      fetchPatient();
    }
  }, [patientId]);

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    if (patientId) {
      params.set("id", patientId);
    }
    router.push(`/dashboard/patients/manage?${params.toString()}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format the data before sending
      const formattedData = {
        ...formData,
        // Handle enums - convert empty strings to null
        gender: formData.gender || null,
        bloodGroup: formData.bloodGroup || null,
        maritalStatus: formData.maritalStatus || null,

        // Handle dates - ensure they're in ISO format
        dateOfBirth: formData.dateOfBirth || null,
        anniversaryDate: formData.anniversaryDate || null,
        insuranceExpiryDate: formData.insuranceExpiryDate || null,
        lastVisitDate: formData.lastVisitDate || null,
        nextAppointmentDate: formData.nextAppointmentDate || null,

        // Ensure arrays are initialized
        initialDiseases: formData.initialDiseases || [],
        currentDiseases: formData.currentDiseases || [],
        allergies: formData.allergies || [],
        chronicConditions: formData.chronicConditions || [],
        previousSurgeries: formData.previousSurgeries || [],

        // Ensure JSON objects are initialized
        vaccinations: formData.vaccinations || {},
        medicalDocuments: formData.medicalDocuments || {},
        consentForms: formData.consentForms || {},
      };

      const url = isEdit
        ? `${ApiUrl}/doctors/patients/update/${patientId}`
        : `${ApiUrl}/doctors/patients/create`;

      const response = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        // Check for specific error messages
        if (data.message) {
          throw new Error(data.message);
        }
        throw new Error(data.details || data.error || "Something went wrong");
      }

      toast.success(
        isEdit
          ? "Patient updated successfully"
          : "Patient created successfully",
      );

      router.push("/dashboard/patients");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      console.error("Error:", error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInput = (name: string, values: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "medical", label: "Medical Details" },
    { id: "history", label: "Medical History" },
    { id: "clinical", label: "Clinical Notes" },
    { id: "vitals", label: "Vital Signs" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "documents", label: "Documents" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-slate-900">
      <h1 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        {isEdit ? "Update Patient Profile" : "Create Patient Profile"}
      </h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p className="whitespace-pre-wrap">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`rounded-md px-4 py-2 ${
                currentTab === tab.id
                  ? "bg-blue-600 text-white dark:bg-blue-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentTab === "basic" && (
            <PatientBasicInfo
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentTab === "medical" && (
            <PatientMedicalDetails
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentTab === "history" && (
            <PatientMedicalHistory
              formData={formData}
              handleInputChange={handleInputChange}
              handleArrayInput={handleArrayInput}
            />
          )}
          {currentTab === "clinical" && (
            <PatientClinicalNotes
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentTab === "vitals" && (
            <PatientVitalSigns
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentTab === "lifestyle" && (
            <PatientLifestyle
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentTab === "documents" && (
            <PatientDocuments
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/patients")}
              className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagePatients;
