"use client";

import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";

interface DoctorPrefix {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
}

interface DoctorPrefixResponse {
  status: string;
  prefixes: DoctorPrefix[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

interface DoctorPrefixSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DoctorPrefixSelect({
  value,
  onChange,
  placeholder = "Select Doctor Prefix",
  className = "",
  disabled = false,
}: DoctorPrefixSelectProps) {
  const { data, isLoading } = useQuery<DoctorPrefixResponse>({
    queryKey: ["prefixes"],
    queryFn: async () => {
      const response = await axios.get("/api/doctors/prefixes", {
        params: {
          status: "published",
          limit: 100,
        },
      });
      return response.data;
    },
  });

  const options = data?.prefixes
    ?.filter((prefix) => prefix.status === "published")
    ?.map((prefix) => ({
      value: prefix.id,
      label: prefix.bnTitle ? `${prefix.title} / ${prefix.bnTitle}` : prefix.title,
    })) || [];

  return (
    <div className="space-y-2">
      <label htmlFor="prefix" className="text-sm font-medium text-slate-700">
        Doctor Prefix
      </label>
      <Select
        id="prefix"
        value={value}
        onChange={onChange}
        loading={isLoading}
        placeholder={placeholder}
        className={`w-full ${className}`}
        disabled={disabled}
        allowClear
        suffixIcon={<ChevronDown className="size-5" />}
        options={options}
      />
    </div>
  );
}

export default DoctorPrefixSelect;
