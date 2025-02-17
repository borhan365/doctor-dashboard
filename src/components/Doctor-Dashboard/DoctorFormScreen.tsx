"use client";

import { useDoctorCreate, useDoctorForm } from "@/hooks/doctor/useDoctorCreate";
import { DoctorFormData, Specialist, Treatment } from "@/types/doctor";
import { AlertCircle, FileText, XCircle } from "lucide-react";
import { useRef, useState } from "react";
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

interface Props {
  onNext: () => void;
}

export function DoctorFormScreen({ onNext }: Props) {
  const { mutate: createDoctor, isPending: isLoading } = useDoctorCreate();
  const { initialState, validateForm } = useDoctorForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<DoctorFormData>({
    // Basic Info
    prefix: "",
    name: "",
    bnName: "",
    excerpt: "",
    bnExcerpt: "",
    overview: "",
    bnOverview: "",
    description: "",
    bnDescription: "",

    // Medical Information
    bmdcNumber: "",
    discountForHealthaUser: 0,
    discountForHealthaUserNote: "",
    discountForHealthaUserNoteBn: "",

    // Status and Features
    isFeatured: false,
    isVerified: false,
    isSponsored: false,
    status: "draft",

    // Personal Info
    gender: "",
    experience: 0,
    division: "",
    city: "",
    area: "",
    about: "",
    emailAddresses: [""],
    phoneNumbers: [""],
    website: "",
    videoUrl: "",
    languages: [],

    // Social Media
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
    youtubeLink: "",
    linkedinLink: "",

    // Relations
    specialists: [],
    treatments: [],
    degrees: [],
    hospitals: [],
    locations: [],

    // Related Records
    chambers: [],
    educations: [],
    experiences: [],
    faqs: [],

    // New fields
    doctorType: "",
  });
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleDoctorTypeChange = (selectedType: string) => {
    handleInputChange("doctorType", selectedType);
  };

  const handlePrefixChange = (selectedPrefix: string) => {
    handleInputChange("prefix", selectedPrefix);
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();

      const preparedData = {
        ...formData,
        // Wrap IDs in objects with id property
        specialists: formData.specialists?.map((id) => ({ id })) || [],
        treatments: formData.treatments?.map((id) => ({ id })) || [],
        degrees: formData.degrees?.map((id) => ({ id })) || [],
        languages: formData.languages?.map((id) => ({ id })) || [],
        doctorType: formData.doctorType || [],

        // Fix hospitals and locations format
        hospitals: formData.hospitals?.map((id) => ({ id })) || [],
        locations: formData.locations?.map((id) => ({ id })) || [],

        // Ensure numeric fields
        discountForHealthaUser: Number(formData.discountForHealthaUser) || 0,
        experience: Number(formData.experience) || 0,

        // Clean up strings
        name: formData.name?.trim(),
        bmdcNumber: formData.bmdcNumber?.trim(),
        emailAddresses: formData.emailAddresses?.filter(Boolean) || [],
        phoneNumbers: formData.phoneNumbers?.filter(Boolean) || [],

        // Initialize empty arrays for optional relationships
        chambers: [],
        educations: [],
        experiences: [],
        faqs: [],
      } as const;

      // Remove any undefined or null values
      const cleanedData = Object.fromEntries(
        Object.entries(preparedData).filter(
          ([_, value]) => value !== undefined && value !== null,
        ),
      );

      // Append the stringified data
      form.append("data", JSON.stringify(cleanedData));

      // Append featured image if exists
      if (featuredImage) {
        form.append("featuredImage", featuredImage);
      }

      await createDoctor(
        { formData: form },
        {
          onSuccess: () => {
            toast.success("Doctor profile created successfully!");
            onNext();
          },
          onError: (error: any) => {
            const message =
              error.response?.data?.message ||
              "Failed to create doctor profile";
            setError(message);
            toast.error(message);
          },
        },
      );
    } catch (error: any) {
      setError(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
    }
  };

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

      <h2 className="mb-4 text-2xl font-semibold text-slate-800">
        Basic Information
      </h2>

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
            selectedLanguages={formData.languages}
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
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Save and Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
