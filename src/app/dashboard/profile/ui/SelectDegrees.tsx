import { ApiUrl } from "@/app/Variables";
import { Degree } from "@/types/degrees";
import { useQuery } from "@tanstack/react-query";
import { Select, Spin } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";

interface SelectDegreesProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

function SelectDegrees({
  value,
  onChange,
  placeholder = "Select degrees",
  className,
}: SelectDegreesProps) {
  // Fetch degrees
  const { data: degrees, isLoading } = useQuery({
    queryKey: ["degrees-list"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/doctors/degrees/get-all`);
      return response.data.degrees as Degree[];
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Select Degrees</label>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder={placeholder}
        value={value}
          onChange={onChange}
          className={className}
          loading={isLoading}
          suffixIcon={<ChevronDown className="h-4 w-4" />}
          notFoundContent={isLoading ? <Spin size="small" /> : null}
          options={degrees?.map((degree) => ({
            label: degree.title,
            value: degree.id,
          }))}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
    </div>
      
  );
}

export default SelectDegrees;
