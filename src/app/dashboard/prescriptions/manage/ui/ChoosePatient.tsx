"use client";
import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface Patient {
  id: string;
  patientId: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  lastVisitDate: string;
  medicalConditions: string[];
  user: {
    id: string;
    image: string;
  };
}

interface PatientsResponse {
  patients: Patient[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ChoosePatientProps {
  value?: string;
  formData?: {
    patientId?: string;
    [key: string]: any;
  };
  handleInputChange?: (field: string, value: any) => void;
  defaultValue?: string;
  disabled?: boolean;
}

function ChoosePatient({
  value,
  formData,
  handleInputChange,
  defaultValue,
  disabled = false,
}: ChoosePatientProps) {
  const { data, isLoading, error } = useQuery<PatientsResponse>({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await fetch(`${ApiUrl}/doctors/patients/get-all`);
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      return response.json();
    },
  });

  // Auto-select first patient if no value is selected
  useEffect(() => {
    if (
      data?.patients?.length &&
      data?.patients?.length > 0 &&
      !value &&
      !formData?.patientId &&
      !defaultValue &&
      handleInputChange
    ) {
      const firstPatient = data.patients[0];
      handleInputChange("patientId", firstPatient.id);

      // Update other patient fields
      handleInputChange("patientName", firstPatient?.name);
      handleInputChange("patientPhone", firstPatient?.phone);
      handleInputChange("patientAge", firstPatient?.age?.toString());
      handleInputChange("patientGender", firstPatient?.gender?.toLowerCase());
    }
  }, [
    data?.patients,
    value,
    formData?.patientId,
    defaultValue,
    handleInputChange,
  ]);

  // Handle default value
  useEffect(() => {
    if (defaultValue && formData && !formData.patientId && handleInputChange) {
      handleInputChange("patientId", defaultValue);

      // Find and update patient details for default value
      const defaultPatient = data?.patients?.find(
        (patient) => patient.id === defaultValue,
      );
      if (defaultPatient) {
        handleInputChange("patientName", defaultPatient.name);
        handleInputChange("patientPhone", defaultPatient.phone);
        handleInputChange("patientAge", defaultPatient.age.toString());
        handleInputChange("patientGender", defaultPatient.gender.toLowerCase());
      }
    }
  }, [defaultValue, formData, data?.patients, handleInputChange]);

  const handlePatientChange = (selectedId: string) => {
    if (!handleInputChange) return;

    const selectedPatient = data?.patients?.find(
      (patient) => patient.id === selectedId,
    );

    if (selectedPatient) {
      handleInputChange("patientId", selectedPatient.id);
      handleInputChange("patientName", selectedPatient.name);
      handleInputChange("patientPhone", selectedPatient.phone);
      handleInputChange("patientAge", selectedPatient.age.toString());
      handleInputChange("patientGender", selectedPatient.gender.toLowerCase());
    }
  };

  // Handle both direct value and formData.patientId
  const selectedValue = value || formData?.patientId || defaultValue;
  const selectedPatient = data?.patients?.find(
    (patient) => patient.id === selectedValue,
  );

  if (error) {
    toast.error("Failed to load patients");
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Select Patient
        </label>
        <Select
          className="w-full"
          loading={isLoading}
          options={data?.patients?.map((patient) => ({
            label: `${patient.name} (${patient.phone})`,
            value: patient.id,
          }))}
          showSearch
          value={selectedValue}
          onChange={handlePatientChange}
          suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
          placeholder="Search and select patient"
          style={{ height: "42px" }}
          disabled={disabled}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          dropdownStyle={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        />
      </div>

      {selectedPatient && (
        <div className="flex items-center justify-start gap-4 rounded-lg border border-slate-200 bg-blue-50 p-4">
          <div className="space-y-1">
            <h3 className="text-base font-medium text-slate-700">
              {selectedPatient.name}
            </h3>
            <p className="text-sm text-slate-500">
              {selectedPatient.phone} • {selectedPatient.age} years •{" "}
              {selectedPatient.gender}
            </p>
            {selectedPatient.address && (
              <p className="text-sm text-slate-500">
                {selectedPatient.address}
              </p>
            )}
          </div>
        </div>
      )}

      {data?.patients?.length === 0 && (
        <div className="mt-4">
          <p className="text-sm text-slate-500">
            {`If you can't find your patient, please `}
            <button
              type="button"
              className="font-medium text-blue-500 hover:text-blue-600"
              onClick={() => {
                /* Add your add patient handler here */
              }}
            >
              add a new patient
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default ChoosePatient;
