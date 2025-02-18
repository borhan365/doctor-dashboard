"use client";

import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";

interface DoctorType {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
}

interface DoctorTypeResponse {
  status: string;
  types: DoctorType[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

interface DoctorTypeSelectProps {
  selectedTypes: string | string[];
  onChange: (types: string[]) => void;
}

function DoctorTypeSelect({
  selectedTypes = [],
  onChange,
}: DoctorTypeSelectProps) {
  const { data, isLoading } = useQuery<DoctorTypeResponse>({
    queryKey: ["doctor-types"],
    queryFn: async () => {
      const response = await axios.get("/api/doctors/types", {
        params: {
          status: "published",
          limit: 100,
        },
      });
      return response.data;
    },
  });

  const options = data?.types
    ?.filter((type) => type.status === "published")
    .map((type) => ({
      value: type.id,
      label: type.bnTitle ? `${type.title} / ${type.bnTitle}` : type.title,
    }));

  // Convert single string to array if needed
  const selectedValues = Array.isArray(selectedTypes)
    ? selectedTypes
    : [selectedTypes];

  return (
    <Select
      mode="multiple"
      allowClear
      suffixIcon={<ChevronDown className="size-5" />}
      style={{ width: "100%" }}
      placeholder="Select doctor types"
      value={selectedValues}
      onChange={onChange}
      options={options}
      loading={isLoading}
      className="w-full"
    />
  );
}

export default DoctorTypeSelect;
