import { Hospital } from "@/types/hospital";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

interface CheckBoxesProps {
  formData: Hospital;
  setFormData: (data: Hospital) => void;
}

interface CheckboxOption {
  key: keyof Pick<Hospital, "isVerified" | "isFeatured" | "isSponsored">;
  label: string;
}

const checkboxOptions: CheckboxOption[] = [
  { key: "isVerified", label: "Is Verified?" },
  { key: "isFeatured", label: "Is Featured?" },
  { key: "isSponsored", label: "Is Sponsored?" },
];

function CheckBoxes({ formData, setFormData }: CheckBoxesProps) {
  const handleChange =
    (key: CheckboxOption["key"]) => (e: CheckboxChangeEvent) => {
      setFormData({
        ...formData,
        [key]: e.target.checked,
      });
    };

  return (
    <div className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-3">
        <h3 className="mb-1 font-medium text-slate-700">Quick Settings</h3>
      </div>

      <div className="bg-white">
        <div className="flex flex-col gap-4 p-4">
          {checkboxOptions.map(({ key, label }) => (
            <Checkbox
              key={key}
              checked={formData[key]}
              onChange={handleChange(key)}
            >
              {label}
            </Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckBoxes;
