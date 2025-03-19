"use client";

import { useLocations } from "@/hooks/useLocations";
import { Select } from "antd";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface LocationGroupProps {
  selectedParentLocation?: string;
  onParentLocationChange?: (value: string | null) => void;
  initialLocationId?: string;
  initialLocationTitle?: string;
}

function LocationGroup({
  selectedParentLocation,
  onParentLocationChange,
  initialLocationId,
  initialLocationTitle,
}: LocationGroupProps) {
  const [parentLocation, setParentLocation] = useState<string | null>(
    selectedParentLocation || null,
  );
  const [subLocation, setSubLocation] = useState<string | null>(null);
  const [childLocation, setChildLocation] = useState<string | null>(null);

  const [selectedLocationLabel, setSelectedLocationLabel] = useState<
    string | null
  >(initialLocationTitle || null);

  const parentLocationsQuery = useLocations();
  const parentLocationsData = parentLocationsQuery?.data;
  const isParentLocationsLoading = parentLocationsQuery?.isLoading ?? false;

  useEffect(() => {
    if (
      initialLocationId &&
      !parentLocation &&
      !subLocation &&
      !childLocation
    ) {
      setParentLocation(initialLocationId);

      if (initialLocationTitle) {
        setSelectedLocationLabel(initialLocationTitle);
      }
    }
  }, [
    initialLocationId,
    initialLocationTitle,
    parentLocation,
    subLocation,
    childLocation,
  ]);

  const subLocations = useMemo(() => {
    if (!parentLocation || !parentLocationsData?.locations) return [];
    const selectedParent = parentLocationsData.locations.find(
      (loc) => loc.id === parentLocation,
    );
    return selectedParent?.subLocations || [];
  }, [parentLocation, parentLocationsData]);

  const childLocations = useMemo(() => {
    if (!subLocation || !subLocations) return [];
    const selectedSub = subLocations.find((loc) => loc.id === subLocation);
    return selectedSub?.subLocations || [];
  }, [subLocation, subLocations]);

  const handleParentLocationChange = (value: string | null) => {
    setParentLocation(value);
    setSubLocation(null);
    setChildLocation(null);
    onParentLocationChange?.(value);

    if (value && parentLocationsData?.locations) {
      const selectedLoc = parentLocationsData.locations.find(
        (loc) => loc.id === value,
      );
      if (selectedLoc) {
        setSelectedLocationLabel(
          selectedLoc.bnTitle
            ? `${selectedLoc.title} / ${selectedLoc.bnTitle}`
            : selectedLoc.title,
        );
      } else {
        setSelectedLocationLabel(null);
      }
    } else {
      setSelectedLocationLabel(null);
    }
  };

  const handleSubLocationChange = (value: string | null) => {
    setSubLocation(value);
    setChildLocation(null);
    onParentLocationChange?.(value);

    if (value && subLocations) {
      const selectedLoc = subLocations.find((loc) => loc.id === value);
      if (selectedLoc) {
        setSelectedLocationLabel(
          selectedLoc.bnTitle
            ? `${selectedLoc.title} / ${selectedLoc.bnTitle}`
            : selectedLoc.title,
        );
      } else {
        setSelectedLocationLabel(null);
      }
    } else if (!value) {
      if (parentLocation && parentLocationsData?.locations) {
        const selectedParent = parentLocationsData.locations.find(
          (loc) => loc.id === parentLocation,
        );
        if (selectedParent) {
          setSelectedLocationLabel(
            selectedParent.bnTitle
              ? `${selectedParent.title} / ${selectedParent.bnTitle}`
              : selectedParent.title,
          );
        }
      }
    }
  };

  const handleChildLocationChange = (value: string | null) => {
    setChildLocation(value);
    onParentLocationChange?.(value);

    if (value && childLocations) {
      const selectedLoc = childLocations.find((loc) => loc.id === value);
      if (selectedLoc) {
        setSelectedLocationLabel(
          selectedLoc.bnTitle
            ? `${selectedLoc.title} / ${selectedLoc.bnTitle}`
            : selectedLoc.title,
        );
      } else {
        setSelectedLocationLabel(null);
      }
    } else if (!value) {
      if (subLocation && subLocations) {
        const selectedSub = subLocations.find((loc) => loc.id === subLocation);
        if (selectedSub) {
          setSelectedLocationLabel(
            selectedSub.bnTitle
              ? `${selectedSub.title} / ${selectedSub.bnTitle}`
              : selectedSub.title,
          );
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      {selectedLocationLabel && (
        <div className="text-sm font-medium text-blue-600">
          Selected: {selectedLocationLabel}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Parent Location
        </label>
        <Select
          value={parentLocation}
          onChange={handleParentLocationChange}
          loading={isParentLocationsLoading}
          placeholder="Select Parent Location"
          className="w-full"
          allowClear
          suffixIcon={<ChevronDown className="size-5" />}
          options={parentLocationsData?.locations?.map((loc) => ({
            value: loc.id,
            label: loc.bnTitle ? `${loc.title} / ${loc.bnTitle}` : loc.title,
          }))}
        />
      </div>

      {parentLocation && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Sub Location
          </label>
          <Select
            value={subLocation}
            onChange={handleSubLocationChange}
            placeholder="Select Sub Location"
            className="w-full"
            allowClear
            suffixIcon={<ChevronDown className="size-5" />}
            options={subLocations.map((loc) => ({
              value: loc.id,
              label: loc.bnTitle ? `${loc.title} / ${loc.bnTitle}` : loc.title,
            }))}
          />
        </div>
      )}

      {subLocation && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Child Location
          </label>
          <Select
            value={childLocation}
            onChange={handleChildLocationChange}
            placeholder="Select Child Location"
            className="w-full"
            allowClear
            suffixIcon={<ChevronDown className="size-5" />}
            options={childLocations.map((loc) => ({
              value: loc.id,
              label: loc.bnTitle ? `${loc.title} / ${loc.bnTitle}` : loc.title,
            }))}
          />
        </div>
      )}

      <p className="text-xs text-slate-500">
        Select any location level as your practice location
      </p>
    </div>
  );
}

export default LocationGroup;
