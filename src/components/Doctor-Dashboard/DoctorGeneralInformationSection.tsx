"use client";

import { DoctorFormData } from "@/types/doctor";
import { Calendar, Clipboard, User } from "lucide-react";
import DoctorPrefixSelect from "./DoctorPrefixSelect";
import DoctorTypeSelect from "./DoctorTypeSelect";

interface DoctorGeneralInformationSectionProps {
  formData: DoctorFormData;
  onInputChange: (field: keyof DoctorFormData, value: any) => void;
}

function DoctorGeneralInformationSection({
  formData,
  onInputChange,
}: DoctorGeneralInformationSectionProps) {
  const handlePrefixChange = (value: string) => {
    onInputChange("prefix", value);
  };

  const handleDoctorTypeChange = (value: string[]) => {
    onInputChange("doctorType", value);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <p className="mb-1 text-lg font-semibold text-slate-800">
          General Information
        </p>
        <p className="text-sm text-slate-500">
          Basic information about the doctor
        </p>
      </div>

      {/* Prefix and Name Fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DoctorPrefixSelect
          value={formData.prefix}
          onChange={handlePrefixChange}
          placeholder="Select prefix"
        />

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name (English) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 pr-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        {/* BMDC Number */}
        <div className="space-y-2">
          <label htmlFor="bmdc" className="text-sm font-medium text-slate-700">
            BMDC Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Clipboard className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="bmdc"
              id="bmdc"
              value={formData.bmdcNumber}
              onChange={(e) =>
                onInputChange("bmdcNumber", e.target.value.toUpperCase())
              }
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 pr-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="A-42309"
              required
            />
          </div>
        </div>
      </div>

      {/* Gender, Experience and Doctor Type */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label
            htmlFor="gender"
            className="text-sm font-medium text-slate-700"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={(e) => onInputChange("gender", e.target.value)}
            className="block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="experience"
            className="text-sm font-medium text-slate-700"
          >
            Years of Experience
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="number"
              name="experience"
              id="experience"
              value={formData.experience}
              onChange={(e) =>
                onInputChange("experience", Number(e.target.value))
              }
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 pr-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="10"
            />
          </div>
        </div>

        {/* Doctor Type Select */}
        <div className="space-y-2">
          <label
            htmlFor="doctorType"
            className="text-sm font-medium text-slate-700"
          >
            Doctor Type
          </label>
          <DoctorTypeSelect
            selectedTypes={formData.doctorType}
            onChange={handleDoctorTypeChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DoctorGeneralInformationSection;
