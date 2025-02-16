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
  selectedType?: string;
  onChange: (value: string) => void;
}

export function DoctorTypeSelect({
  selectedType,
  onChange,
}: DoctorTypeSelectProps) {
  const { data, isLoading } = useQuery<DoctorTypeResponse>({
    queryKey: ["types"],
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

  const options =
    data?.types
      ?.filter((type: DoctorType) => type.status === "published")
      ?.map((type: DoctorType) => ({
        value: type.id,
        label: type.bnTitle ? `${type.title} / ${type.bnTitle}` : type.title,
      })) || [];

  return (
    <Select
      id="doctorType"
      value={selectedType}
      onChange={onChange}
      loading={isLoading}
      placeholder="Select Doctor Type"
      className="w-full"
      allowClear
      suffixIcon={<ChevronDown className="size-5" />}
      options={options}
    />
  );
}

export default DoctorTypeSelect;
