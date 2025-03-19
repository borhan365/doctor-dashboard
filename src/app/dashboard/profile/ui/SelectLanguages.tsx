import { ApiUrl } from "@/app/Variables";
import { Degree } from "@/types/degrees";
import { useQuery } from "@tanstack/react-query";
import { Select, Spin } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";

interface SelectLanguagesProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

interface Language {
  id: string;
  title: string;
  bnTitle: string;
}

function SelectLanguages({
  value,
  onChange,
  placeholder = "Select languages",
  className,
}: SelectLanguagesProps) {
  // Fetch degrees
  const { data: languages, isLoading } = useQuery({
    queryKey: ["languages-list"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/doctors/languages/get-all`);
      return response.data.languages as Language[];
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Select Languages</label>
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
          options={languages?.map((language) => ({
            label: language.title,
            value: language.id,
          }))}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
    </div>
      
  );
}

export default SelectLanguages;
