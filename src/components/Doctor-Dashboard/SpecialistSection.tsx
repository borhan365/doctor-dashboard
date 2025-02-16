"use client";
import { useSpecialists } from "@/hooks/doctor/specialist/useDoctorSpecialists";
import { Specialist, SpecialistsProps } from "@/types/doctor.specialist.type";
import { Checkbox } from "antd";
import { Search, X } from "lucide-react";
import { useCallback, useState } from "react";

interface SpecialistSectionProps {
  selectedSpecialists: string[];
  onChange: (specialists: string[]) => void;
}

function SpecialistSection({ selectedSpecialists = [], onChange }: SpecialistSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Use the separated API hook
  const { data, isLoading, error } = useSpecialists({
    page,
    limit,
    search: searchTerm,
    status: "published",
  });

  const specialists = data?.specialists || [];

  // Debounced search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // Prevent default behavior
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
  }, []);

  const filteredSpecialists = specialists.filter((specialist: Specialist) =>
    specialist?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Separate selected and unselected specialists
  const selectedItems = filteredSpecialists.filter((specialist) =>
    selectedSpecialists.includes(specialist.id),
  );
  const unselectedItems = filteredSpecialists.filter(
    (specialist) => !selectedSpecialists.includes(specialist.id),
  );

  // Combine the lists with selected items at the top
  const sortedSpecialists = [...selectedItems, ...unselectedItems];

  const handleToggleSelect = (id: string) => {
    const newSelection = selectedSpecialists.includes(id)
      ? selectedSpecialists.filter((specialistId) => specialistId !== id)
      : [...selectedSpecialists, id];
    onChange(newSelection);
  };

  // Selected specialists badges section
  const renderSelectedBadges = () => {
    if (selectedSpecialists.length === 0) return null;

    return (
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-slate-700">
          Selected Specialists
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((specialist) => (
            <span
              key={specialist.id}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
            >
              {specialist.title}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double triggering
                  handleToggleSelect(specialist.id);
                }}
                className="ml-1 rounded-full p-0.5 hover:bg-blue-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <div className="text-sm text-slate-600">
          Loading doctor specialists...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <div className="text-sm text-red-500">
          Error loading doctor specialists. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <p className="mb-4 border-b border-slate-200 pb-3 text-lg font-semibold text-slate-800">
          Doctor Specialists
        </p>
      </div>

      {/* Search and Count */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="specialist-search"
            className="text-sm font-medium text-slate-700"
          >
            Search doctor specialists
          </label>
          <div>
            <p className="text-sm text-slate-600">
              <span className="font-medium text-blue-600">
                {selectedSpecialists.length}
              </span>{" "}
              specialists selected
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            id="specialist-search"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={(e) => e.target.select()} // Select all text when focused
            className="block w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type to search doctor specialists..."
          />
        </div>
      </div>

      {/* Selected Specialists Badges */}
      {renderSelectedBadges()}

      {/* Specialists Grid */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-slate-700">
          Available Doctor Specialists
        </p>
        <div className="grid max-h-[400px] grid-cols-1 gap-3 overflow-y-auto pr-2 md:grid-cols-2 lg:grid-cols-2">
          {sortedSpecialists.length > 0 ? (
            sortedSpecialists.map((specialist: Specialist) => {
              const isSelected = selectedSpecialists.includes(specialist.id);
              return (
                <div
                  key={specialist.id}
                  onClick={() => handleToggleSelect(specialist.id)}
                  className={`flex cursor-pointer items-center rounded-lg p-2 hover:bg-slate-100 ${
                    isSelected ? "bg-blue-50" : "bg-slate-50"
                  }`}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation(); // Prevent double triggering
                      handleToggleSelect(specialist.id);
                    }}
                  >
                    <span className="ml-2 text-sm font-medium text-slate-700">
                      {specialist.title}
                      {specialist.bnTitle && (
                        <span className="ml-2 text-sm text-slate-500">
                          ({specialist.bnTitle})
                        </span>
                      )}
                    </span>
                  </Checkbox>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 flex h-20 items-center justify-center text-sm text-slate-500">
              No doctor specialists found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecialistSection;
