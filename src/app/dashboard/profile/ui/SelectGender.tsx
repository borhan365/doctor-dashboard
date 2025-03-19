import { DoctorFormData } from "@/types/doctors";
import { Select } from "antd";
import { ChevronDown } from "lucide-react";

interface SelectGenderProps {
  formData: DoctorFormData;
  onInputChange: (field: keyof DoctorFormData, value: any) => void;
}

function SelectGender({ formData, onInputChange }: SelectGenderProps) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="gender" className="text-sm font-medium text-slate-700">
          Gender
        </label>
        <Select
          value={formData.gender}
          placeholder="Select Gender"
          suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
          onChange={(value) => onInputChange("gender", value)}
          className="block w-full rounded-lg border border-slate-200 px-3 py-3 text-base font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <Select.Option selected value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </div>
    </>
  );
}

export default SelectGender;
