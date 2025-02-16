"use client";

import { useHospitals } from "@/app/hooks/useHospitals";
import DaySection from "@/components/Doctor-Dashboard/DaySection";
import { useChambers } from "@/hooks/doctor/chamber/useChambers";
import { useSessionStore } from "@/store/sessionStore";
import { CreateChamberInput, DaySchedule } from "@/types/chamber";
import { Select } from "antd";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SelectHospital from "../ui/SelectHospital";

export function CreateChamber() {
  const { createChamber } = useChambers();
  const { data: hospitals } = useHospitals();
  const { user } = useSessionStore();

  const doctorId = user?.doctorProfile?.id;

  console.log("doctorId", doctorId); // got: cm6rqbx4a000a3jwz9fjtik03

  const [formData, setFormData] = useState<Partial<CreateChamberInput>>({
    slotDuration: 30,
    breakTime: 0,
    maxPatients: 1,
    status: "draft",
    contactNumbers: [""],
    oldPatientFee: 0,
    followUpFee: 0,
    newPatientFee: 0,
    doctorId: doctorId, // This is correct, but we need to ensure doctorId exists
    shift: "morning",
    availableDays: [
      {
        day: "Saturday",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "Sunday",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "Monday",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "Tuesday",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "Wednesday",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "Thursday",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "Friday",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
    ],
  });

  const handleInputChange = (
    field: keyof CreateChamberInput,
    value: string | number | string[] | DaySchedule[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Add doctorId validation
      if (!doctorId) {
        toast.error("Doctor ID is required. Please complete your profile first.");
        return;
      }

      // Basic validation
      if (!formData.hospital) {
        toast.error("Please select a hospital");
        return;
      }
      if (!formData.floorNumber) {
        toast.error("Please enter floor number");
        return;
      }
      if (!formData.roomNumber) {
        toast.error("Please enter room number");
        return;
      }
      if (!formData.shift) {
        toast.error("Please select shift");
        return;
      }

      const chamberData: CreateChamberInput = {
        ...formData,
        newPatientFee: Number(formData.newPatientFee),
        oldPatientFee: Number(formData.oldPatientFee),
        followUpFee: Number(formData.followUpFee),
        slotDuration: Number(formData.slotDuration),
        breakTime: Number(formData.breakTime),
        maxPatients: Number(formData.maxPatients),
        doctorId: doctorId, // Use the actual doctorId from session
      } as CreateChamberInput;

      await createChamber.mutateAsync(chamberData);
      toast.success("Chamber created successfully");
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Failed to create chamber");
    }
  };

  const slotDurations = [
    { label: "5 Minutes", value: 5 },
    { label: "10 Minutes", value: 10 },
    { label: "15 Minutes", value: 15 },
    { label: "20 Minutes", value: 20 },
    { label: "30 Minutes", value: 30 },
  ];

  const handleDayScheduleChange = (days: DaySchedule[]) => {
    handleInputChange("availableDays", days);
  };

  console.log("formData", formData);

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl py-10 px-4">
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">
        Create Chamber
      </h2>

      <p className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-slate-600">
        Add details about your chambers where you see patients. This information
        helps patients locate you easily. You can add multiple chambers if
        needed.
      </p>

      <div className="space-y-4">
        <div className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 space-y-4">
            <div className="space-y-2">
              <SelectHospital
                hospitals={hospitals}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-slate-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter complete address"
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="city"
                className="text-sm font-medium text-slate-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city || ""}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter city name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="fees"
                className="text-sm font-medium text-slate-700"
              >
                Consultation Fee
              </label>
              <input
                type="number"
                id="fees"
                value={formData.newPatientFee || ""}
                onChange={(e) =>
                  handleInputChange("newPatientFee", e.target.value)
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter consultation fee"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="floor"
                className="text-sm font-medium text-slate-700"
              >
                Floor Number
              </label>
              <input
                type="text"
                id="floor"
                value={formData.floorNumber || ""}
                onChange={(e) =>
                  handleInputChange("floorNumber", e.target.value)
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., 3rd Floor"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="room"
                className="text-sm font-medium text-slate-700"
              >
                Room Number
              </label>
              <input
                type="text"
                id="room"
                value={formData.roomNumber || ""}
                onChange={(e) =>
                  handleInputChange("roomNumber", e.target.value)
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Room 301"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Shift
              </label>
              <select
                value={formData.shift || ""}
                onChange={(e) => handleInputChange("shift", e.target.value)}
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Old Patient Fee
              </label>
              <input
                type="number"
                value={formData.oldPatientFee || ""}
                onChange={(e) =>
                  handleInputChange("oldPatientFee", e.target.value)
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Follow Up Fee
              </label>
              <input
                type="number"
                value={formData.followUpFee || ""}
                onChange={(e) =>
                  handleInputChange("followUpFee", e.target.value)
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 text-lg font-medium text-slate-800">
              Slot Configuration
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Slot Duration
                </label>
                <Select
                  className="w-full"
                  options={slotDurations}
                  value={formData.slotDuration}
                  onChange={(value) => handleInputChange("slotDuration", value)}
                  suffixIcon={
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  }
                  placeholder="Select duration"
                  style={{
                    height: "42px",
                  }}
                  dropdownStyle={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Break Time
                </label>
                <Select
                  className="w-full"
                  options={slotDurations}
                  value={formData.breakTime}
                  onChange={(value) => handleInputChange("breakTime", value)}
                  suffixIcon={
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  }
                  placeholder="Select break time"
                  style={{
                    height: "42px",
                  }}
                  dropdownStyle={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Max Patients Per Slot
                </label>
                <Select
                  className="w-full"
                  options={[
                    { label: "1 Patient", value: 1 },
                    { label: "2 Patients", value: 2 },
                    { label: "3 Patients", value: 3 },
                    { label: "4 Patients", value: 4 },
                    { label: "5 Patients", value: 5 },
                  ]}
                  value={formData.maxPatients}
                  onChange={(value) => handleInputChange("maxPatients", value)}
                  suffixIcon={
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  }
                  placeholder="Select max patients"
                  style={{
                    height: "42px",
                  }}
                  dropdownStyle={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>
            </div>
          </div>

          <DaySection
            value={formData.availableDays || []}
            onChange={handleDayScheduleChange}
          />
        </div>

        <button
          type="submit"
          disabled={createChamber.isPending}
          className="inline-flex items-center rounded-lg border border-blue-500 bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {createChamber.isPending ? (
            <>
              <span className="mr-2">Creating...</span>
            </>
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5 text-white" />
              Add Chamber
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateChamber;
