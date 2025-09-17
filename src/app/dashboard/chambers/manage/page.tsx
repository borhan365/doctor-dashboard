"use client";

import HealthaLoader from "@/components/Loader/HealthaLoader";
import { prepareChamberFormData, useChambers } from "@/hooks/useChambers";
import { CreateChamberInput } from "@/types/chambers";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SelectHospital from "./ui/SelectHospital";
import SlotConfiguration from "./ui/SlotConfiguration";

const slotDurations = [
  { label: "5 Minutes", value: 5 },
  { label: "10 Minutes", value: 10 },
  { label: "15 Minutes", value: 15 },
  { label: "20 Minutes", value: 20 },
  { label: "25 Minutes", value: 25 },
  { label: "30 Minutes", value: 30 },
  { label: "35 Minutes", value: 35 },
  { label: "40 Minutes", value: 40 },
  { label: "45 Minutes", value: 45 },
  { label: "50 Minutes", value: 50 },
  { label: "55 Minutes", value: 55 },
  { label: "60 Minutes", value: 60 },
];

export function ManageChamber() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chamberId = searchParams.get("id");
  const isEditMode = !!chamberId;

  // Static data for demo purposes
  const user = { doctorSlug: "demo-doctor" };
  const doctorSlug = user?.doctorSlug;

  const initialFormData: Partial<CreateChamberInput> = {
    slotDuration: 30,
    doctorId: user?.doctorId || null,
    hospitalId: null,
    maxPatients: 1,
    contactNumbers: [""],
    followUpFee: 0,
    newPatientFee: 0,
    shift: "morning",
    availableDays: [
      {
        day: "SATURDAY",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "SUNDAY",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "MONDAY",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "TUESDAY",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "WEDNESDAY",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "THURSDAY",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
      {
        day: "FRIDAY",
        fromTime: "",
        toTime: "",
        isAvailable: false,
        timeSlots: [],
      },
    ],
  };

  const [formData, setFormData] =
    useState<Partial<CreateChamberInput>>(initialFormData);
  const { useGetChamber, useCreateChamber, useUpdateChamber } = useChambers();

  const { data: chamberData, isLoading: isLoadingChamber } = useGetChamber(
    chamberId || "",
  );
  const createChamberMutation = useCreateChamber();
  const updateChamberMutation = useUpdateChamber(chamberId || "");

  useEffect(() => {
    if (isEditMode && chamberData) {
      // Transform the availableDays data to match the expected format
      const transformedData = {
        ...chamberData,
        availableDays: chamberData.availableDays.map((day: any) => ({
          day: day.day,
          fromTime: day.fromTime || "",
          toTime: day.toTime || "",
          isAvailable: day.isAvailable,
          timeSlots: day.timeSlots.map((slot: any) => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
            maxPatients: 1,
          })),
        })),
      };
      setFormData(transformedData);
    }
  }, [isEditMode, chamberData]);

  const handleInputChange = (field: keyof CreateChamberInput, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactNumberChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedNumbers = [...(prev.contactNumbers || [])];
      updatedNumbers[index] = value;
      const filteredNumbers = updatedNumbers.filter((num) => num);
      return {
        ...prev,
        contactNumbers: filteredNumbers,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!formData.doctorId) {
        toast.error("Please select a doctor");
        return;
      }
      if (!formData.hospitalId) {
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

      // Validate at least one day is available
      const hasAvailableDay = formData.availableDays?.some(
        (day) => day.isAvailable,
      );
      if (!hasAvailableDay) {
        toast.error("Please select at least one available day");
        return;
      }

      const formDataToSend = prepareChamberFormData(formData);

      if (isEditMode) {
        await updateChamberMutation.mutateAsync(formDataToSend);
      } else {
        await createChamberMutation.mutateAsync(formDataToSend);
      }

      router.push("/dashboard/chambers");
    } catch (error: any) {
      toast.error(error.message || "Failed to save chamber");
    }
  };

  const isLoading =
    createChamberMutation.isPending || updateChamberMutation.isPending;

  if (isEditMode && isLoadingChamber) {
    return <HealthaLoader />;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl pb-16 pt-10">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              className="font-medium text-primary"
              href="/dashboard/doctors"
            >
              Doctors /
            </Link>
          </li>
          <li className="font-medium text-primary">
            <Link href="/dashboard/doctors/chambers">Chambers / </Link>
          </li>
          <li className="font-medium text-slate-500"> Manage Chamber</li>
        </ol>
      </nav>

      <h2 className="mb-4 text-2xl font-semibold text-slate-800">
        Chamber Information
      </h2>

      <p className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-slate-600">
        Add details about your chambers where you see patients. This information
        helps patients locate you easily. You can add multiple chambers if
        needed.
      </p>

      <div className="space-y-6">
        <div className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 space-y-4">
            {/* Hospital Name */}
            <div>
              <p className="pb-2 text-sm font-medium text-slate-700">
                Hospital Name
              </p>
              <SelectHospital
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg border border-slate-200 p-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label
                htmlFor="newPatientFee"
                className="text-sm font-medium text-slate-700"
              >
                New Patient Fee
              </label>
              <input
                type="number"
                id="newPatientFee"
                value={formData.newPatientFee}
                onChange={(e) =>
                  handleInputChange("newPatientFee", Number(e.target.value))
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Ex. 1000"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="followUpFee"
                className="text-sm font-medium text-slate-700"
              >
                Follow-Up Fee
              </label>
              <input
                type="number"
                id="followUpFee"
                value={formData.followUpFee}
                onChange={(e) =>
                  handleInputChange("followUpFee", Number(e.target.value))
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Ex. 500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="followUpPeriod"
                className="text-sm font-medium text-slate-700"
              >
                Follow-Up Period (days)
              </label>
              <input
                type="number"
                id="followUpPeriod"
                value={formData.followUpPeriod}
                onChange={(e) =>
                  handleInputChange("followUpPeriod", Number(e.target.value))
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Ex. 15"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="floorNumber"
                className="text-sm font-medium text-slate-700"
              >
                Floor Number
              </label>
              <input
                type="text"
                id="floorNumber"
                value={formData.floorNumber}
                onChange={(e) =>
                  handleInputChange("floorNumber", e.target.value)
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., 3rd Floor"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="roomNumber"
                className="text-sm font-medium text-slate-700"
              >
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) =>
                  handleInputChange("roomNumber", e.target.value)
                }
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Room 301"
              />
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <label
                  htmlFor={`contactNumber${index}`}
                  className="text-sm font-medium text-slate-700"
                >
                  Contact Number {index + 1}
                  {index === 0 && " (Required)"}
                </label>
                <input
                  type="text"
                  id={`contactNumber${index}`}
                  value={formData.contactNumbers?.[index] || ""}
                  onChange={(e) =>
                    handleContactNumberChange(index, e.target.value)
                  }
                  required={index === 0}
                  className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="e.g., +8801712345678"
                />
              </div>
            ))}
          </div>

          <SlotConfiguration
            slotDurations={slotDurations}
            handleInputChange={handleInputChange}
            value={formData.availableDays || []}
            onChange={(days) => handleInputChange("availableDays", days)}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading
          ? isEditMode
            ? "Updating Chamber..."
            : "Creating Chamber..."
          : isEditMode
            ? "Update Chamber"
            : "Create Chamber"}
      </button>
    </form>
  );
}

export default ManageChamber;
