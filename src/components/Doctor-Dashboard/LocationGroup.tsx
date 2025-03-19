"use client";

import { useParentLocations } from "@/hooks/useLocations";
import { Select } from "antd";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

interface LocationGroupProps {
  onParentLocationChange?: (value: string) => void;
  onSubLocationChange?: (value: string) => void;
  onChildLocationChange?: (value: string) => void;
  selectedParentLocation?: string;
  selectedSubLocation?: string;
  selectedChildLocation?: string;
}

function LocationGroup({
  onParentLocationChange,
  onSubLocationChange,
  onChildLocationChange,
  selectedParentLocation,
  selectedSubLocation,
  selectedChildLocation,
}: LocationGroupProps) {
  const [parentLocation, setParentLocation] = useState<string | null>(
    selectedParentLocation || null,
  );
  const [subLocation, setSubLocation] = useState<string | null>(
    selectedSubLocation || null,
  );
  const [childLocation, setChildLocation] = useState<string | null>(
    selectedChildLocation || null,
  );

  const { data: parentLocationsData, isLoading: isParentLocationsLoading } =
    useParentLocations();

  // Get the selected parent location's subLocations
  const subLocations = useMemo(() => {
    if (!parentLocation || !parentLocationsData?.locations) return [];
    const selectedParent = parentLocationsData.locations.find(
      (loc) => loc.id === parentLocation,
    );
    return selectedParent?.subLocations || [];
  }, [parentLocation, parentLocationsData]);

  // Get the selected sub location's subLocations
  const childLocations = useMemo(() => {
    if (!subLocation || !subLocations) return [];
    const selectedSub = subLocations.find((loc) => loc.id === subLocation);
    return selectedSub?.subLocations || [];
  }, [subLocation, subLocations]);

  const handleParentLocationChange = (value: string) => {
    setParentLocation(value);
    setSubLocation(null);
    setChildLocation(null);
    onParentLocationChange?.(value);
  };

  const handleSubLocationChange = (value: string) => {
    setSubLocation(value);
    setChildLocation(null);
    onSubLocationChange?.(value);
  };

  const handleChildLocationChange = (value: string) => {
    setChildLocation(value);
    onChildLocationChange?.(value);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Parent Location Select */}
      <div className="space-y-2">
        <label
          htmlFor="parent-location"
          className="text-sm font-medium text-slate-700"
        >
          Parent Location
        </label>
        <Select
          id="parent-location"
          value={parentLocation}
          onChange={handleParentLocationChange}
          loading={isParentLocationsLoading}
          placeholder="Select Parent Location"
          className="w-full"
          allowClear
          suffixIcon={<ChevronDown className="size-5" />}
          options={parentLocationsData?.locations.map((loc) => ({
            value: loc.id,
            label: loc.bnTitle ? `${loc.title} / ${loc.bnTitle}` : loc.title,
          }))}
        />
      </div>

      {/* Sub Location Select */}
      <div className="space-y-2">
        <label
          htmlFor="sub-location"
          className="text-sm font-medium text-slate-700"
        >
          Sub Location
        </label>
        <Select
          id="sub-location"
          value={subLocation}
          onChange={handleSubLocationChange}
          placeholder="Select Sub Location"
          className="w-full"
          disabled={!parentLocation || subLocations.length === 0}
          allowClear
          suffixIcon={<ChevronDown className="size-5" />}
          options={subLocations.map((loc) => ({
            value: loc.id,
            label: loc.bnTitle ? `${loc.title} / ${loc.bnTitle}` : loc.title,
          }))}
        />
      </div>

      {/* Child Location Select */}
      <div className="space-y-2">
        <label
          htmlFor="child-location"
          className="text-sm font-medium text-slate-700"
        >
          Child Location
        </label>
        <Select
          id="child-location"
          value={childLocation}
          onChange={handleChildLocationChange}
          placeholder="Select Child Location"
          className="w-full"
          disabled={!subLocation || childLocations.length === 0}
          allowClear
          suffixIcon={<ChevronDown className="size-5" />}
          options={childLocations.map((loc) => ({
            value: loc.id,
            label: loc.bnTitle ? `${loc.title} / ${loc.bnTitle}` : loc.title,
          }))}
        />
      </div>
    </div>
  );
}

export default LocationGroup;
