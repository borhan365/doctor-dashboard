import LocationGroup from "@/app/dashboard/profile/ui/LocationGroup";
import ThumbnailBox from "@/components/Globals/ThumbnailBox";
import { DoctorFormData } from "@/types/doctors";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import SelectDegrees from "./SelectDegrees";
import SelectDoctorTypes from "./SelectDoctorTypes";
import SelectGender from "./SelectGender";
import SelectLanguages from "./SelectLanguages";
import SelectSpecialists from "./SelectSpecialists";

// Dynamically import components that might cause hydration issues
const DynamicSelectBox = dynamic(
  () => import("@/components/Inputs/SelectBox"),
  {
    ssr: false,
  },
);

interface LocationGroupProps {
  selectedParentLocation: string | undefined;
  onParentLocationChange: (value: string) => void;
}

interface Props {
  formData: DoctorFormData;
  onInputChange: (field: keyof DoctorFormData, value: any) => void;
  onAuthorChange: (value: string | null) => void;
  onAdminChange: (value: string | null) => void;
  onImageChange: (file: File | null) => void;
  isLoading?: boolean;
}

// Create the component first, then wrap it with React.memo
const DoctorSidebarComponent = ({
  formData,
  onInputChange,
  onAuthorChange,
  onAdminChange,
  onImageChange,
  isLoading,
}: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Use useCallback for handlers to prevent recreation on each render
  const handleInputChange = useCallback(
    (field: keyof DoctorFormData, value: any) => {
      onInputChange(field, value);
    },
    [onInputChange],
  );

  // Determine the image URL based on the type of featuredImage
  const imageUrl =
    typeof formData.featuredImage === "string"
      ? formData.featuredImage
      : formData.featuredImage &&
          typeof formData.featuredImage === "object" &&
          "fileUrl" in formData.featuredImage
        ? formData.featuredImage.fileUrl
        : "";

  return (
    <div className="sticky right-0 top-17 flex h-screen min-w-[400px] max-w-100 flex-col gap-5 overflow-y-auto border-l border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-boxdark">
      <SelectGender formData={formData} onInputChange={handleInputChange} />

      <SelectDoctorTypes
        value={formData.doctorTypeId}
        onChange={(value) => onInputChange("doctorTypeId", value)}
      />

      <ThumbnailBox
        label="Featured Image"
        value={
          formData.featuredImage instanceof File ? formData.featuredImage : null
        }
        onChange={(file) => {
          onImageChange(file);
          onInputChange("featuredImage", file);
        }}
        currentImageUrl={imageUrl}
      />

      <SelectSpecialists
        value={formData.specialists}
        onChange={(value) => onInputChange("specialists", value)}
      />

      <SelectDegrees
        value={formData.degrees}
        onChange={(value) => onInputChange("degrees", value)}
      />

      <SelectLanguages
        value={formData.languages}
        onChange={(value) => onInputChange("languages", value)}
      />

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <LocationGroup
          selectedParentLocation={formData.locationId || undefined}
          onParentLocationChange={(value) =>
            handleInputChange("locationId", value)
          }
        />
      </div>
    </div>
  );
};

// Add display name to the component
DoctorSidebarComponent.displayName = "DoctorSidebar";

// Use React.memo to prevent unnecessary re-renders
const DoctorSidebar = React.memo(DoctorSidebarComponent);

export default DoctorSidebar;
