"use client";

import { MapPin } from "lucide-react";
import { Select } from "antd";
import { FC } from "react";

export const SelectBranch: FC = () => {

  const Branches = [
    { label: "Evercare Hospitals Dhaka", value: "42134hkh123k4h12jk34h" },
    { label: "Evercare Hospitals Chittagong", value: "42134hkh123k4h12jk34h" },
    { label: "Evercare Hospitals Khulna", value: "42134hkh123k4h12jk34h" },
    { label: "Evercare Hospitals Rajshahi", value: "42134hkh123k4h12jk34h" },
    { label: "Evercare Hospitals Sylhet", value: "42134hkh123k4h12jk34h" },
  ];

  return (
    <>
      <div className="mb-4 rounded-lg bg-white p-4 dark:bg-slate-800">
        <label htmlFor="branch" className="text-sm font-medium text-slate-600 dark:text-slate-400">Select Branch</label>
        <Select
          placeholder="Select Branch"
          options={Branches}
          className="w-full mt-2"
          size="large"
          suffixIcon={<MapPin className="text-slate-500 dark:text-slate-400 size-5" />}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
    </>
  );
};
