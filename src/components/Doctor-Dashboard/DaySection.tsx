"use client";
import { DaySchedule, TimeSlot } from "@/types/chamber";
import { Clock } from "lucide-react";
import { useState } from "react";

interface DaySectionProps {
  value: DaySchedule[];
  onChange: (days: DaySchedule[]) => void;
}

function DaySection({ value, onChange }: DaySectionProps) {
  const [days, setDays] = useState<DaySchedule[]>(value || [
    { day: "Saturday", fromTime: "", toTime: "", isAvailable: false, timeSlots: [] },
    { day: "Sunday", fromTime: "", toTime: "", isAvailable: false, timeSlots: [] },
    { day: "Monday", fromTime: "", toTime: "", isAvailable: false, timeSlots: [] },
    { day: "Tuesday", fromTime: "", toTime: "", isAvailable: false, timeSlots: [] },
    { day: "Wednesday", fromTime: "", toTime: "", isAvailable: false, timeSlots: [] },
    { day: "Thursday", fromTime: "", toTime: "", isAvailable: false, timeSlots: [] },
    { day: "Friday", fromTime: "", toTime: "", isAvailable: false, timeSlots: [] },
  ]);

  const handleToggleSelect = (day: string) => {
    const updatedDays = days.map((d) =>
      d.day === day ? { ...d, isAvailable: !d.isAvailable } : d
    );
    setDays(updatedDays);
    onChange(updatedDays);
  };

  const handleTimeChange = (day: string, field: 'fromTime' | 'toTime', value: string) => {
    const updatedDays = days.map((d) => {
      if (d.day === day) {
        return { ...d, [field]: value };
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
        const updatedTimeSlots = d.timeSlots.filter((_, index) => index !== slotIndex);
        return { ...d, timeSlots: updatedTimeSlots };
      }
      return d;
    });
    setDays(updatedDays);
    onChange(updatedDays);
  };

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
      <p className="mb-4 border-b border-slate-100 pb-3 text-sm font-medium text-slate-700">
        Select Available Days & Time Slots
      </p>
      
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
                <span className={`ml-2 text-sm font-medium ${
                  day.isAvailable ? "text-blue-700" : "text-slate-700"
                }`}>
                  {day.day}
                </span>
              </div>
            </div>

            {day.isAvailable && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="time"
                          value={day.fromTime}
                          onChange={(e) => handleTimeChange(day.day, 'fromTime', e.target.value)}
                          className="block w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="time"
                          value={day.toTime}
                          onChange={(e) => handleTimeChange(day.day, 'toTime', e.target.value)}
                          className="block w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>
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

export default DaySection;
