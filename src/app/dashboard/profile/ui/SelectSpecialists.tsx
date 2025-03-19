import { ApiUrl } from "@/app/Variables";
import { Specialist } from "@/types/doctorSpecialists";
import { useQuery } from "@tanstack/react-query";
import { Select, Spin } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";

interface SelectSpecialistsProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

function SelectSpecialists({
  value,
  onChange,
  placeholder = "Select specialists",
  className,
}: SelectSpecialistsProps) {
  // Fetch specialists
  const { data: specialists, isLoading } = useQuery({
    queryKey: ["specialists-list"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/doctors/specialists/get-all`);
      return response.data.specialists as Specialist[];
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Select Specialists
      </label>
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
        options={specialists?.map((specialist) => ({
          label: specialist.title,
          value: specialist.id,
        }))}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    </div>
  );
}

export default SelectSpecialists;
