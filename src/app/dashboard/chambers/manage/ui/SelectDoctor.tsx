import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Doctor {
  id: string;
  name: string;
  address?: string;
  featuredImage?: {
    fileUrl?: string;
  };
}

interface DoctorsResponse {
  status: string;
  doctors: Doctor[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SelectDoctorProps {
  value?: string;
  formData?: {
    doctorId?: string;
  };
  handleInputChange: (field: string, value: any) => void;
  disabled?: boolean;
}

function SelectDoctor({
  value,
  formData,
  handleInputChange,
  disabled = false,
}: SelectDoctorProps) {
  const { data, isLoading, error } = useQuery<DoctorsResponse>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await fetch(`${ApiUrl}/doctors/doctor/get-all`);
      if (!response.ok) throw new Error("Failed to fetch doctors");
      return response.json();
    },
  });

  // Handle both direct value and formData.doctorId
  const selectedValue = value || formData?.doctorId;
  const selectedDoctor = data?.doctors?.find(
    (doctor) => doctor.id === selectedValue,
  );

  if (error) {
    toast.error("Failed to load doctors");
  }

  return (
    <div>
      <Select
        className="w-full"
        loading={isLoading}
        options={data?.doctors?.map((doctor) => ({
          label: doctor.name,
          value: doctor.id,
        }))}
        showSearch
        value={selectedValue}
        onChange={(value) => handleInputChange("doctorId", value)}
        suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
        placeholder="Select doctor"
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

      {selectedDoctor && (
        <div className="mt-4 flex items-center justify-start gap-4 rounded-lg border border-slate-200 bg-blue-50 p-4">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
            {selectedDoctor.featuredImage ? (
              <Image
                src={selectedDoctor.featuredImage}
                alt={`${selectedDoctor.name} photo`}
                width={50}
                height={50}
                className="h-full w-full rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-200">
                <span className="text-xs text-slate-500">No Image</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-base font-medium text-slate-700">
              {selectedDoctor.name}
            </h3>
            {selectedDoctor.address && (
              <p className="text-sm text-slate-500">{selectedDoctor.address}</p>
            )}
          </div>
        </div>
      )}

      {data?.doctors?.length === 0 && (
        <div className="mt-4">
          <p className="mt-4 text-sm text-slate-500">
            {`If you can't find your doctor. Please `}
            <span className="cursor-pointer font-medium text-blue-500">
              Add a doctor manually
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SelectDoctor;
