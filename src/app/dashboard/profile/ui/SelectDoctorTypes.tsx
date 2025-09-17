"use client";

import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import React, { useMemo } from "react";

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

interface SelectDoctorTypesProps {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

// Create the component first, then wrap it with React.memo
const SelectDoctorTypesComponent = ({
  value = null,
  onChange,
  placeholder = "Select Doctor Type",
}: SelectDoctorTypesProps) => {
  // Static data for demo purposes
  const user = { doctorId: "demo-doctor-id" };

  // Fetch prefixes with proper error handling
  const { data, isLoading, error, isError } = useQuery<DoctorTypeResponse>({
    queryKey: ["types"],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        limit: "100",
      });

      const response = await axios.get(
        `${ApiUrl}/doctors/types/get-all?${params}`,
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnMount: false, // Change to false to prevent refetching on mount
    refetchOnWindowFocus: false,
  });

  // Use useMemo to prevent recalculation on each render
  const options = useMemo(
    () =>
      data?.types
        ?.filter((type) => type.status === "published")
        ?.map((type) => ({
          value: type.id,
          label: type.bnTitle ? `${type.title} / ${type.bnTitle}` : type.title,
        })) || [],
    [data],
  );

  return (
    <Select
      value={value}
      onChange={onChange}
      loading={isLoading}
      placeholder={placeholder}
      className="w-full"
      allowClear
      suffixIcon={<ChevronDown className="size-5" />}
      options={options}
    />
  );
};

// Add display name to the component
SelectDoctorTypesComponent.displayName = "SelectDoctorTypes";

// Use React.memo to prevent unnecessary re-renders
const SelectDoctorTypes = React.memo(SelectDoctorTypesComponent);

export default SelectDoctorTypes;
