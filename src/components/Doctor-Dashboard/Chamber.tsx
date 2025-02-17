"use client";

import { Building, ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";
import DaySection from "./DaySection";
import { Select } from "antd";

type Chamber = {
  id: number;
  hospital: string;
  floorNumber: string;
  roomNumber: string;
  shift: string;
  address: string;
  city: string;
  fees: string;
  contactNumbers: string[];
  slotDuration: number;
  breakTime: number;
  maxPatients: number;
};

export function Chamber( {onNext}: {onNext: () => void} ) {
  const [chambers, setChambers] = useState<Chamber[]>([
    {
      id: 1,
      hospital: "",
      floorNumber: "",
      roomNumber: "",
      shift: "",
      address: "",
      city: "",
      fees: "",
      contactNumbers: [""],
      slotDuration: 30,
      breakTime: 0,
      maxPatients: 1,
    },
  ]);

  const addChamber = () => {
    const newId =
      chambers.length > 0 ? Math.max(...chambers.map((c) => c.id)) + 1 : 1;
    setChambers([
      ...chambers,
      {
        id: newId,
        hospital: "",
        floorNumber: "",
        roomNumber: "",
        shift: "",
        address: "",
        city: "",
        fees: "",
        contactNumbers: [""],
        slotDuration: 30,
        breakTime: 0,
        maxPatients: 1,
      },
    ]);
  };

  const removeChamber = (id: number) => {
    setChambers(chambers.filter((c) => c.id !== id));
  };

  const slotDurations = [
    { label: "5 Minutes", value: 5 },
    { label: "10 Minutes", value: 10 },
    { label: "15 Minutes", value: 15 },
    { label: "20 Minutes", value: 20 },
    { label: "30 Minutes", value: 30 },
  ];

  const handleInputChange = (
    chamberId: number,
    field: keyof Chamber,
    value: string | number | string[]
  ) => {
    setChambers(chambers.map((chamber) => {
      if (chamber.id === chamberId) {
        return {
          ...chamber,
          [field]: value,
        };
      }
      return chamber;
    }));
  };

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-8 text-2xl font-semibold text-slate-800">
        Chamber Information
      </h2>

      <p className="mb-8 rounded-lg bg-blue-50 p-4 text-sm text-slate-600">
        Add details about your chambers where you see patients. This information
        helps patients locate you easily. You can add multiple chambers if
        needed.
      </p>

      <div className="space-y-6">
        {chambers.map((chamber) => (
          <div key={chamber.id} className="space-y-6">
            {/* <ChamberPreview chamber={chamber} /> */}
            
            <div className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <button
                onClick={() => removeChamber(chamber.id)}
                className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-slate-600"
                aria-label="Remove chamber"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor={`hospital-${chamber.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Hospital Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Building className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name={`hospital-${chamber.id}`}
                      id={`hospital-${chamber.id}`}
                      className="block w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="Enter hospital name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`address-${chamber.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name={`address-${chamber.id}`}
                    id={`address-${chamber.id}`}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor={`city-${chamber.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name={`city-${chamber.id}`}
                    id={`city-${chamber.id}`}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter city name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`fees-${chamber.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Consultation Fee
                  </label>
                  <input
                    type="number"
                    name={`fees-${chamber.id}`}
                    id={`fees-${chamber.id}`}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter consultation fee"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`floor-${chamber.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Floor Number
                  </label>
                  <input
                    type="text"
                    name={`floor-${chamber.id}`}
                    id={`floor-${chamber.id}`}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="e.g., 3rd Floor"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`room-${chamber.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Room Number
                  </label>
                  <input
                    type="text"
                    name={`room-${chamber.id}`}
                    id={`room-${chamber.id}`}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="e.g., Room 301"
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
                      value={chamber.slotDuration}
                      onChange={(value) => handleInputChange(chamber.id, 'slotDuration', value)}
                      suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
                      placeholder="Select duration"
                      style={{ 
                        height: '42px'
                      }}
                      dropdownStyle={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
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
                      value={chamber.breakTime}
                      onChange={(value) => handleInputChange(chamber.id, 'breakTime', value)}
                      suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
                      placeholder="Select break time"
                      style={{ 
                        height: '42px'
                      }}
                      dropdownStyle={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
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
                      value={chamber.maxPatients}
                      onChange={(value) => handleInputChange(chamber.id, 'maxPatients', value)}
                      suffixIcon={<ChevronDown className="h-5 w-5 text-slate-400" />}
                      placeholder="Select max patients"
                      style={{ 
                        height: '42px'
                      }}
                      dropdownStyle={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}
                    />
                  </div>
                </div>
              </div>

              <DaySection value={[]} onChange={() => {}} />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addChamber}
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-5 w-5 text-slate-400" />
          Add Another Chamber
        </button>
      </div>
    </div>
  );
}
