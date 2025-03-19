"use client";

import { DoctorFormData } from "@/types/doctors";
import DoctorPrefixSelect from "./DoctorPrefixSelect";

interface DoctorGeneralInformationSectionProps {
  formData: DoctorFormData;
  onInputChange: (field: keyof DoctorFormData, value: any) => void;
}

function DoctorGeneralInformationSection({
  formData,
  onInputChange,
}: DoctorGeneralInformationSectionProps) {
  // Ensure all form values are defined with default values
  const safeFormData = {
    name: formData.name || "",
    bnName: formData.bnName || "",
    bmdcNumber: formData.bmdcNumber || "",
    experience: formData.experience || 0,
    website: formData.website || "",
    videoUrl: formData.videoUrl || "",
    discountForHealthaUser: formData.discountForHealthaUser || 0,
    discountForHealthaUserNote: formData.discountForHealthaUserNote || "",
    discountForHealthaUserNoteBn: formData.discountForHealthaUserNoteBn || "",
    prefixId: formData.prefixId || null,
    doctorTypeId: formData.doctorTypeId || null,
  };

  const handlePrefixChange = (value: string | null) => {
    onInputChange("prefixId", value);
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Prefix */}
        <div>
          <DoctorPrefixSelect
            value={safeFormData.prefixId}
            onChange={handlePrefixChange}
            placeholder="Select Prefix"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={safeFormData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Dr. John Doe"
          />
        </div>

        {/* Bengali Name */}
        <div>
          <label
            htmlFor="bnName"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Bengali Name
          </label>
          <input
            type="text"
            id="bnName"
            value={safeFormData.bnName}
            onChange={(e) => onInputChange("bnName", e.target.value)}
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="ডাঃ জন ডো"
          />
        </div>

        {/* BMDC Number */}
        <div>
          <label
            htmlFor="bmdcNumber"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            BMDC Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bmdcNumber"
            value={safeFormData.bmdcNumber}
            onChange={(e) => onInputChange("bmdcNumber", e.target.value)}
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="A-12345"
          />
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="experience"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Experience (years)
          </label>
          <input
            type="number"
            id="experience"
            value={safeFormData.experience}
            onChange={(e) =>
              onInputChange("experience", parseInt(e.target.value) || 0)
            }
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="10"
          />
        </div>

        {/* Website */}
        <div>
          <label
            htmlFor="website"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Website
          </label>
          <input
            type="url"
            id="website"
            value={safeFormData.website}
            onChange={(e) => onInputChange("website", e.target.value)}
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>

        {/* Video URL */}
        <div>
          <label
            htmlFor="videoUrl"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            value={safeFormData.videoUrl}
            onChange={(e) => onInputChange("videoUrl", e.target.value)}
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        {/* Discount for Healtha User */}
        <div>
          <label
            htmlFor="discountForHealthaUser"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Discount for Healtha User (%)
          </label>
          <input
            type="number"
            id="discountForHealthaUser"
            value={safeFormData.discountForHealthaUser}
            onChange={(e) =>
              onInputChange(
                "discountForHealthaUser",
                parseInt(e.target.value) || 0,
              )
            }
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="10"
          />
        </div>

        {/* Discount Note */}
        <div>
          <label
            htmlFor="discountForHealthaUserNote"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Discount Note
          </label>
          <input
            type="text"
            id="discountForHealthaUserNote"
            value={safeFormData.discountForHealthaUserNote}
            onChange={(e) =>
              onInputChange("discountForHealthaUserNote", e.target.value)
            }
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="10% discount for Healtha users"
          />
        </div>

        {/* Bengali Discount Note */}
        <div>
          <label
            htmlFor="discountForHealthaUserNoteBn"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Bengali Discount Note
          </label>
          <input
            type="text"
            id="discountForHealthaUserNoteBn"
            value={safeFormData.discountForHealthaUserNoteBn}
            onChange={(e) =>
              onInputChange("discountForHealthaUserNoteBn", e.target.value)
            }
            className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="হেলথা ব্যবহারকারীদের জন্য ১০% ছাড়"
          />
        </div>
      </div>
    </div>
  );
}

export default DoctorGeneralInformationSection;
