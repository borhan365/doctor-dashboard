import { Select } from "antd";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface Hospital {
  id: string;
  name: string;
  address: string;
  featuredImage: string | null;
}

interface SelectHospitalProps {
  hospitals: {
    hospitals: Hospital[];
  } | undefined;
  formData: {
    hospital: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

function SelectHospital({
  hospitals,
  formData,
  handleInputChange,
}: SelectHospitalProps) {
  // Find selected hospital
  const selectedHospital = hospitals?.hospitals?.find(
    (hospital) => hospital.id === formData.hospital
  );

  return (
    <div>
      <Select
        className="w-full"
        options={hospitals?.hospitals?.map((hospital) => ({
          label: hospital.name,
          value: hospital.id,
        }))}
        showSearch
        value={formData.hospital}
        onChange={(value) => handleInputChange("hospital", value)}
        suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
        placeholder="Select hospital"
        style={{ height: "42px" }}
        dropdownStyle={{
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      />

      {/* Hospital Preview */}
      {selectedHospital && (
        <div className="mt-4 flex items-center justify-start gap-4 rounded-lg border border-slate-200 bg-blue-50 p-4">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
            {selectedHospital.featuredImage ? (
              <Image
                src={selectedHospital.featuredImage}
                alt={`${selectedHospital.name} logo`}
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
              {selectedHospital.name}
            </h3>
            <p className="text-sm text-slate-500">
              {selectedHospital.address}
            </p>
          </div>
        </div>
      )}

      {/* if hospital is not found from in the dropdown, show this message */}
      {hospitals?.hospitals?.length && (
        <div className="mt-4">
        <p className="mt-4 text-sm text-slate-500">
          If you can't find your hospital. Please{" "}
          <span className="font-medium text-blue-500 cursor-pointer">
            Add a hospital manually
          </span>
          .
          </p>

          {/* if user click on add a hospital manually, show this form */}
          <div className="mt-4 flex items-center justify-start gap-4 rounded-lg border border-slate-200 bg-blue-50 p-4">
            <input className="w-full rounded-md border border-slate-200 p-2" type="text" placeholder="Hospital Name" />
            <input className="w-full rounded-md border border-slate-200 p-2" type="text" placeholder="Hospital Address" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectHospital;
