"use client";

import Loading from "@/app/Components/Loading/page";
import { useDoctorCreate, useDoctorForm } from "@/hooks/doctor/useDoctorCreate";
import { Doctor, DoctorFormData } from "@/types/doctor";
import { AlertCircle, FileText, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import DegreeSection from "./DegreeSection";
import DoctorGeneralInformationSection from "./DoctorGeneralInformationSection";
import DoctorProfilePhoto from "./DoctorProfilePhoto";
import DynamicEmails from "./DynamicEmails";
import DynamicPhones from "./DynamicPhones";
import LanguageSection from "./LanguageSection";
import LocationGroup from "./LocationGroup";
import { SocialMedia } from "./SocialMedia";
import SpecialistSection from "./SpecialistSection";
import TreatmentSection from "./TreatmentSection";

interface ProfileIndexProps {
  initialData?: Doctor | null;
}

export function ProfileIndex({ initialData }: ProfileIndexProps) {
  const router = useRouter();
  const user = {
    id: "1234567890",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    doctorProfile: {
      id: "1234567890",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://via.placeholder.com/150",
    },
  };
  const { mutate: createDoctor, isPending: isCreating } = useDoctorCreate();
  const { initialState, validateForm } = useDoctorForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<DoctorFormData>(() => ({
    ...initialState,
    ...initialData,
    // Ensure arrays are properly initialized
    specialists: initialData?.specialists || [],
    treatments: initialData?.treatments || [],
    degrees: initialData?.degrees || [],
    languages: initialData?.languages || [],
    emailAddresses: initialData?.emailAddresses || [""],
    phoneNumbers: initialData?.phoneNumbers || [""],
  }));

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctor profile when component mounts
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/users/${user.id}`);
        const data = await response.json();

        if (data.doctorProfile) {
          setFormData((prev) => ({
            ...prev,
            ...data.doctorProfile,
            // Handle arrays and nested objects appropriately
            specialists: data.doctorProfile.specialists || [],
            treatments: data.doctorProfile.treatments || [],
            degrees: data.doctorProfile.degrees || [],
            languages: data.doctorProfile.languages || [],
            emailAddresses: data.doctorProfile.emailAddresses || [""],
            phoneNumbers: data.doctorProfile.phoneNumbers || [""],
          }));
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        toast.error("Failed to load doctor profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [user?.id]);

  const handleInputChange = (field: keyof DoctorFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  console.log("doctor create form data", formData);

  const handleProfilePhotoChange = (file: File) => {
    setFeaturedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLanguagesChange = (selectedLanguages: string[]) => {
    handleInputChange("languages", selectedLanguages);
  };

  const handleDegreesChange = (selectedDegrees: string[]) => {
    handleInputChange("degrees", selectedDegrees);
  };

  const handleSpecialistsChange = (specialists: string[]) => {
    handleInputChange("specialists", specialists);
  };

  const handleTreatmentsChange = (treatments: string[]) => {
    handleInputChange("treatments", treatments);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("User ID not found");
      return;
    }

    try {
      setIsLoading(true);
      const form = new FormData();

      // Ensure arrays are properly formatted
      const preparedData = {
        userId: user.id,
        ...formData,
        // Ensure arrays are properly formatted
        languages: formData.languages || [],
        degrees: formData.degrees || [],
        specialists: formData.specialists || [],
        treatments: formData.treatments || [],
        emailAddresses: formData.emailAddresses?.filter(Boolean) || [],
        phoneNumbers: formData.phoneNumbers?.filter(Boolean) || [],
      };

      // Remove undefined/null values
      const cleanedData = Object.fromEntries(
        Object.entries(preparedData).filter(
          ([_, value]) => value !== undefined && value !== null,
        ),
      );

      form.append("data", JSON.stringify(cleanedData));

      if (featuredImage) {
        form.append("featuredImage", featuredImage);
      }

      const endpoint = initialData
        ? `/api/doctors/doctor/update`
        : `/api/doctors/doctor/create`;

      const response = await fetch(endpoint, {
        method: initialData ? "PUT" : "POST",
        body: form,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save doctor profile");
      }

      const result = await response.json();
      console.log("Save result:", result);

      toast.success(
        initialData
          ? "Doctor profile updated successfully!"
          : "Doctor profile created successfully!",
      );

      router.refresh();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setError(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-red-700">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="rounded-lg p-1 hover:bg-red-100"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* show this message for the doctor */}
      <p className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-slate-600">
        Your contact details (phone number and email) are strictly private and
        will never be shared. Healtha will only use them to provide you with
        essential updates. Feel confident knowing your privacy is always our top
        priority!
      </p>

      <div className="space-y-4">
        {/* Profile Photo */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <p className="mb-1 text-lg font-semibold text-slate-800">
              Profile Photo
            </p>
            <p className="text-sm text-slate-500">
              Upload a professional photo for your profile
            </p>
          </div>
          <DoctorProfilePhoto
            previewUrl={previewUrl}
            existingImageUrl={initialData?.featuredImage}
            onChange={handleProfilePhotoChange}
          />
        </div>

        {/* General information section */}
        <DoctorGeneralInformationSection
          formData={formData}
          onInputChange={handleInputChange}
        />

        <div className="space-y-2">
          <LocationGroup
            selectedParentLocation={formData.division}
            selectedSubLocation={formData.city}
            selectedChildLocation={formData.area}
            onParentLocationChange={(value) =>
              handleInputChange("division", value)
            }
            onSubLocationChange={(value) => handleInputChange("city", value)}
            onChildLocationChange={(value) => handleInputChange("area", value)}
          />
        </div>

        {/* About Doctor */}
        <div className="space-y-2">
          <label htmlFor="about" className="text-sm font-medium text-slate-700">
            About the Doctor
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3">
              <FileText className="h-5 w-5 text-slate-400" />
            </div>
            <textarea
              name="about"
              id="about"
              rows={4}
              value={formData.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              className="block w-full rounded-lg border border-slate-200 py-3 pl-10 pr-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Write a brief description about yourself, your specialties, and your approach to patient care..."
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 border-b border-slate-200 pb-3">
            <p className="mb-1 text-lg font-semibold text-slate-800">
              Doctor Personal Information
            </p>
            <p className="mb-4 text-sm text-slate-500">
              Note: Don't worry! your personal information will not be shared
              with anyone, it will only be used for internal purposes like
              sending you updates, verfication, any account related
              communication.
            </p>
          </div>
          <div>
            <DynamicEmails
              emails={formData.emailAddresses}
              onChange={(emails) => handleInputChange("emailAddresses", emails)}
            />

            <DynamicPhones
              phones={formData.phoneNumbers}
              onChange={(phones) => handleInputChange("phoneNumbers", phones)}
            />
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <LanguageSection
            selectedLanguages={formData.languages || []}
            onChange={handleLanguagesChange}
          />
        </div>

        {/* Medical Informations */}

        {/* Degree Section */}
        <div className="space-y-2">
          <DegreeSection
            selectedDegrees={formData.degrees || []}
            onChange={handleDegreesChange}
          />
        </div>

        {/* Specialist */}
        <SpecialistSection
          selectedSpecialists={formData.specialists || []}
          onChange={handleSpecialistsChange}
        />

        {/* Treatments */}
        <TreatmentSection
          selectedTreatments={formData.treatments || []}
          onChange={handleTreatmentsChange}
        />

        {/* Social Media */}
        <SocialMedia formData={formData} onChange={handleInputChange} />

        {/* Required Fields Note */}
        <div className="mb-6 text-sm text-slate-500">
          <p>* Required fields: Name, BMDC Number, Email, Phone Number</p>
        </div>

        {/* Add submit button */}
        <div className="relative mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isCreating || isLoading}
            className="fixed bottom-20 right-20 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isCreating || isLoading ? "Creating..." : "Create Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
