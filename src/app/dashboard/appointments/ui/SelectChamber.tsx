"use client";
import { ApiUrl } from "@/app/Variables";
import { useAuth } from "@/store/useAuth";
import { Chamber, FetchChambersResponse } from "@/types/chambers";
import { useQuery } from "@tanstack/react-query";
import { Select, Spin } from "antd";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface SelectChamberProps {
  value?: string;
  formData?: {
    chamberId?: string;
    [key: string]: any;
  };
  handleInputChange?: (field: string, value: any) => void;
  defaultValue?: string;
  disabled?: boolean;
}

function SelectChamber({
  value,
  formData,
  handleInputChange,
  defaultValue,
  disabled = false,
}: SelectChamberProps) {
  const { user } = useAuth();
  const doctorId = user?.doctorId || "";

  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState<string>("published");

  const { data, isLoading, error } = useQuery<FetchChambersResponse>({
    queryKey: ["chambers", doctorId, searchText, status],
    queryFn: async () => {
      const response = await axios.get(
        `${ApiUrl}/doctors/chambers/chambers-by-doctorid/${doctorId}`,
      );
      return response.data;
    },
    enabled: !!doctorId,
  });

  // Auto-select first chamber if no value is selected
  useEffect(() => {
    if (
      data?.data?.length > 0 &&
      !value &&
      !formData?.chamberId &&
      !defaultValue &&
      handleInputChange
    ) {
      const firstChamber = data.data[0];
      handleInputChange("chamberId", firstChamber.id);
      handleInputChange("chamberDetails", {
        hospitalName:
          firstChamber.customHospitalName || firstChamber.hospital.name,
        address: firstChamber.customAddress || firstChamber.hospital.address,
        newPatientFee: firstChamber.newPatientFee,
        followUpFee: firstChamber.followUpFee,
      });
    }
  }, [data?.data, value, formData?.chamberId, defaultValue, handleInputChange]);

  // Handle default value
  useEffect(() => {
    if (defaultValue && formData && !formData.chamberId && handleInputChange) {
      handleInputChange("chamberId", defaultValue);

      // Find and update chamber details for default value
      const defaultChamber = data?.data.find(
        (chamber: Chamber) => chamber.id === defaultValue,
      );
      if (defaultChamber) {
        handleInputChange("chamberDetails", {
          hospitalName:
            defaultChamber.customHospitalName || defaultChamber.hospital.name,
          address:
            defaultChamber.customAddress || defaultChamber.hospital.address,
          newPatientFee: defaultChamber.newPatientFee,
          followUpFee: defaultChamber.followUpFee,
        });
      }
    }
  }, [defaultValue, formData, data?.data, handleInputChange]);

  const handleChamberChange = (selectedId: string) => {
    if (!handleInputChange) return;

    const selectedChamber = data?.data.find(
      (chamber: Chamber) => chamber.id === selectedId,
    );

    if (selectedChamber) {
      handleInputChange("chamberId", selectedChamber.id);
      handleInputChange("chamberDetails", {
        hospitalName:
          selectedChamber.customHospitalName || selectedChamber.hospital.name,
        address:
          selectedChamber.customAddress || selectedChamber.hospital.address,
        newPatientFee: selectedChamber.newPatientFee,
        followUpFee: selectedChamber.followUpFee,
      });
    }
  };

  // Custom option rendering with hospital/chamber details
  const customOptionRender = (chamber: Chamber) => ({
    value: chamber.id,
    label: (
      <div className="flex items-center gap-2 py-1">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100">
            <span className="text-xs font-medium text-blue-600">
              {(chamber.customHospitalName || chamber.hospital?.name).charAt(0)}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">
            {chamber.customHospitalName || chamber.hospital?.name}
          </span>
          <span className="text-xs text-slate-500">
            Floor: {chamber.floorNumber}, Room: {chamber.roomNumber}
          </span>
        </div>
      </div>
    ),
  });

  // Handle both direct value and formData.chamberId
  const selectedValue = value || formData?.chamberId || defaultValue;
  const selectedChamber = data?.data.find(
    (chamber: Chamber) => chamber.id === selectedValue,
  );

  if (error) {
    toast.error("Failed to load chambers");
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
          Select Chamber
        </label>
        <Select
          className="w-full"
          loading={isLoading}
          options={data?.data.map((chamber: Chamber) =>
            customOptionRender(chamber),
          )}
          showSearch
          value={selectedValue}
          onChange={handleChamberChange}
          suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
          placeholder="Search and select chamber"
          style={{ height: "60px" }}
          disabled={disabled}
          filterOption={(input, option) =>
            (
              option?.label as any
            )?.props?.children[1]?.props?.children[0]?.props?.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          notFoundContent={
            isLoading ? (
              <div className="flex justify-center py-2">
                <Spin size="small" />
              </div>
            ) : (
              "No chambers found"
            )
          }
          dropdownStyle={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        />
      </div>

      {selectedChamber && (
        <div className="flex items-center justify-start gap-4 rounded-lg border border-slate-200 bg-blue-50 p-4 dark:border-strokedark dark:bg-meta-4">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100">
              <span className="text-lg font-medium text-blue-600">
                {(
                  selectedChamber.customHospitalName ||
                  selectedChamber.hospital.name
                ).charAt(0)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <h3 className="text-base font-medium text-slate-700 dark:text-white">
                {selectedChamber.customHospitalName ||
                  selectedChamber.hospital.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Floor: {selectedChamber.floorNumber}, Room:{" "}
                {selectedChamber.roomNumber}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {selectedChamber.customAddress ||
                  selectedChamber.hospital.address}
              </p>
            </div>
            <div className="flex gap-3">
              <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                New Patient: ৳{selectedChamber.newPatientFee}
              </span>
              <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Follow Up: ৳{selectedChamber.followUpFee}
              </span>
            </div>
          </div>
        </div>
      )}

      {data?.data.length === 0 && (
        <div className="mt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No chambers found. Please add a chamber first.
          </p>
        </div>
      )}
    </div>
  );
}

export default SelectChamber;
