import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface Hospital {
  id: string;
  name: string;
  address: string;
}

interface HospitalsResponse {
  status: string;
  hospitals: Hospital[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface SelectHospitalProps {
  value?: string;
  formData?: {
    hospitalId?: string;
    [key: string]: any;
  };
  handleInputChange: (field: string, value: any) => void;
  defaultValue?: string;
  disabled?: boolean;
}

function SelectHospital({
  value,
  formData,
  handleInputChange,
  defaultValue,
  disabled = false,
}: SelectHospitalProps) {
  const { data, isLoading, error } = useQuery<HospitalsResponse>({
    queryKey: ["hospitals"],
    queryFn: async () => {
      const response = await fetch(`${ApiUrl}/hospitals/hospital/get-all`);
      if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      return response.json();
    },
  });

  // Auto-select first hospital if no value is selected
  useEffect(() => {
    if (
      data?.hospitals?.length > 0 &&
      !value &&
      !formData?.hospitalId &&
      !defaultValue
    ) {
      const firstHospital = data.hospitals[0];
      handleInputChange("hospitalId", firstHospital.id);
    }
  }, [data?.hospitals, value, formData?.hospitalId, defaultValue]);

  // Handle default value
  useEffect(() => {
    if (defaultValue && formData && !formData.hospitalId) {
      handleInputChange("hospitalId", defaultValue);
    }
  }, [defaultValue, formData]);

  // Handle both direct value and formData.hospitalId
  const selectedValue = value || formData?.hospitalId || defaultValue;
  const selectedHospital = data?.hospitals?.find(
    (hospital) => hospital.id === selectedValue,
  );

  if (error) {
    toast.error("Failed to load hospitals");
  }

  return (
    <div>
      <Select
        className="w-full"
        loading={isLoading}
        options={data?.hospitals?.map((hospital) => ({
          label: hospital.name,
          value: hospital.id,
        }))}
        showSearch
        value={selectedValue}
        onChange={(value) => handleInputChange("hospitalId", value)}
        suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
        placeholder="Select hospital"
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

      {selectedHospital && (
        <div className="mt-4 flex items-center justify-start gap-4 rounded-lg border border-slate-200 bg-blue-50 p-4">
          <div>
            <h3 className="text-base font-medium text-slate-700">
              {selectedHospital.name}
            </h3>
            <p className="text-sm text-slate-500">{selectedHospital.address}</p>
          </div>
        </div>
      )}

      {data?.hospitals?.length === 0 && (
        <div className="mt-4">
          <p className="mt-4 text-sm text-slate-500">
            {`If you can't find your hospital. Please `}
            <span className="cursor-pointer font-medium text-blue-500">
              Add a hospital manually
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SelectHospital;
