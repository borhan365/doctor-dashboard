"use client";
import {
  formatTimeForDisplay,
  generateTimeSlots,
} from "@/app/dashboard/chambers/manage/ui/timeUtils";
import { DaySchedule, TimeSlot } from "@/types/chambers";
import { Select } from "antd";
import { ChevronDown, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface SlotConfigurationProps {
  value: DaySchedule[];
  onChange: (days: DaySchedule[]) => void;
  slotDurations: { label: string; value: number }[];
  handleInputChange: (field: string, value: any) => void;
}

function SlotConfiguration({
  value,
  onChange,
  slotDurations,
  handleInputChange,
}: SlotConfigurationProps) {
  const [days, setDays] = useState<DaySchedule[]>(value);

  const [selectedDuration, setSelectedDuration] = useState(30);
  const [defaultStartTime, setDefaultStartTime] = useState("");
  const [defaultEndTime, setDefaultEndTime] = useState("");

  useEffect(() => {
    setDays(value);
  }, [value]);

  const handleToggleSelect = (day: string) => {
    const updatedDays = days.map((d) =>
      d.day === day ? { ...d, isAvailable: !d.isAvailable } : d,
    );
    setDays(updatedDays);
    onChange(updatedDays);
  };

  const handleTimeChange = (
    day: string,
    field: "fromTime" | "toTime",
    value: string,
  ) => {
    const updatedDays = days.map((d) => {
      if (d.day === day) {
        const updatedDay = {
          ...d,
          [field]: value, // Time input now returns 24-hour format
        };

        // Generate time slots when both start and end time are set
        if (updatedDay.fromTime && updatedDay.toTime) {
          const slots = generateTimeSlots(
            updatedDay.fromTime,
            updatedDay.toTime,
            selectedDuration,
          );
          updatedDay.timeSlots = slots;
        }

        return updatedDay;
      }
      return d;
    });
    setDays(updatedDays);
    onChange(updatedDays);
  };

  const addTimeSlot = (day: string) => {
    const updatedDays = days.map((d) => {
      if (d.day === day) {
        const newTimeSlot: TimeSlot = {
          startTime: "",
          endTime: "",
          isAvailable: true,
          maxPatients: 1,
        };
        return {
          ...d,
          timeSlots: [...d.timeSlots, newTimeSlot],
        };
      }
      return d;
    });
    setDays(updatedDays);
    onChange(updatedDays);
  };

  const removeTimeSlot = (day: string, slotIndex: number) => {
    const updatedDays = days.map((d) => {
      if (d.day === day && d.timeSlots.length > 1) {
        const updatedTimeSlots = d.timeSlots.filter(
          (_, index) => index !== slotIndex,
        );
        return { ...d, timeSlots: updatedTimeSlots };
      }
      return d;
    });
    setDays(updatedDays);
    onChange(updatedDays);
  };

  // Function to apply default time to all available days
  const applyDefaultTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    if (!defaultStartTime || !defaultEndTime) return;

    const updatedDays = days.map((day) => {
      if (day.isAvailable) {
        const slots = generateTimeSlots(
          defaultStartTime,
          defaultEndTime,
          selectedDuration,
        );
        return {
          ...day,
          fromTime: defaultStartTime,
          toTime: defaultEndTime,
          timeSlots: slots,
        };
      }
      return day;
    });
    setDays(updatedDays);
    onChange(updatedDays);
  };

  return (
    <div className="mt-4 rounded-lg border border-slate-100 bg-white p-4">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h3 className="mb-4 text-lg font-medium text-slate-800">
          Default Slot Configuration
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Slot Duration
            </label>
            <Select
              className="w-full"
              options={slotDurations}
              value={selectedDuration}
              onChange={(value) => {
                setSelectedDuration(value);
                handleInputChange("slotDuration", value);

                // Regenerate slots for all days with the new duration
                const updatedDays = days.map((day) => {
                  if (day.isAvailable && day.fromTime && day.toTime) {
                    const slots = generateTimeSlots(
                      day.fromTime,
                      day.toTime,
                      value,
                    );
                    return { ...day, timeSlots: slots };
                  }
                  return day;
                });
                setDays(updatedDays);
                onChange(updatedDays);
              }}
              suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
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

          <div className="relative">
            <label className="text-sm font-medium text-slate-700">
              Default Start Time
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
              <Clock className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="time"
              value={defaultStartTime}
              onChange={(e) => setDefaultStartTime(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-700">
              Default End Time
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
              <Clock className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="time"
              value={defaultEndTime}
              onChange={(e) => setDefaultEndTime(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={applyDefaultTime}
          disabled={!defaultStartTime || !defaultEndTime}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
        >
          Apply Default Time to All Days
        </button>
      </div>

      <h3 className="mb-4 text-lg font-medium text-slate-800">
        Available Days & Time Slots
      </h3>

      <div className="space-y-4">
        {days.map((day) => (
          <div key={day.day} className="rounded-lg border border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={day.isAvailable}
                  onChange={() => handleToggleSelect(day.day)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`ml-2 text-sm font-medium ${
                    day.isAvailable ? "text-blue-700" : "text-slate-700"
                  }`}
                >
                  {day.day}
                </span>
              </div>
            </div>

            {day.isAvailable && (
              <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <p className="mb-2 text-sm font-medium text-slate-700">
                          Custom Start Time
                        </p>
                        <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                          <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="time"
                          value={day.fromTime}
                          onChange={(e) =>
                            handleTimeChange(
                              day.day,
                              "fromTime",
                              e.target.value,
                            )
                          }
                          className="block w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>

                      <div className="relative">
                        <p className="mb-2 text-sm font-medium text-slate-700">
                          Custom End Time
                        </p>
                        <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
                          <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="time"
                          value={day.toTime}
                          onChange={(e) =>
                            handleTimeChange(day.day, "toTime", e.target.value)
                          }
                          className="block w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>

                      {/* Display generated time slots */}
                      {day.fromTime && day.toTime && (
                        <div className="col-span-2">
                          <p className="mb-2 text-sm font-medium text-slate-700">
                            Available Time Slots (
                            {day.timeSlots.length > 0
                              ? day.timeSlots.length
                              : 0}
                            )
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {day.timeSlots.map((slot, index) => (
                              <div
                                key={index}
                                className="wrap flex items-center justify-start gap-1 rounded-lg border border-blue-200 bg-blue-50 p-2 text-sm font-medium text-blue-700"
                              >
                                <p>
                                  {formatTimeForDisplay(slot.startTime)} -{" "}
                                  {formatTimeForDisplay(slot.endTime)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlotConfiguration;
