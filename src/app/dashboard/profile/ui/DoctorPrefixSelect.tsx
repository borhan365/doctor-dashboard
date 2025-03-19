"use client";

import { ApiUrl } from "@/app/Variables";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

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
  value: string | null;
  onChange: (value: string | null) => void;
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
  // Return early if no query client is available
  try {
    useQueryClient();
  } catch (error) {
    console.warn(
      "QueryClient not found. Make sure to wrap your app with QueryClientProvider.",
    );
    toast.error(
      "System not properly initialized. Please ensure QueryClientProvider is properly set up.",
    );
    return null;
  }

  const { data, isLoading } = useQuery<DoctorPrefixResponse>({
    queryKey: ["prefixes"],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/doctors/prefixes/get-all`, {
        params: {
          status: "published",
          limit: 100,
        },
      });
      return response.data;
    },
  });

  const options =
    data?.prefixes
      ?.filter((prefix) => prefix.status === "published")
      ?.map((prefix) => ({
        value: prefix.id,
        label: prefix.bnTitle
          ? `${prefix.title} / ${prefix.bnTitle}`
          : prefix.title,
      })) || [];

  return (
    <div className="space-y-1">
      <label htmlFor="prefix" className="text-sm font-medium text-slate-700">
        Doctor Prefix <span className="text-red-500">*</span>
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
