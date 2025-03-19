"use client";

import { useDoctorCreate, useDoctorForm } from "@/hooks/doctor/useDoctorCreate";
import { DoctorFormData } from "@/types/doctors";
import { AlertCircle, ArrowRight, FileText, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import TextEditor from "../Globals/TextEditor";
import DegreeSection from "./DegreeSection";
import DoctorGeneralInformationSection from "./DoctorGeneralInformationSection";
import DynamicEmails from "./DynamicEmails";
import DynamicPhones from "./DynamicPhones";
import LanguageSection from "./LanguageSection";
import { SocialMedia } from "./SocialMedia";
import SpecialistSection from "./SpecialistSection";
import TempClosed from "./TempClosed";
import TreatmentSection from "./TreatmentSection";

interface Props {
  formData: DoctorFormData;
  onFormChange: (data: DoctorFormData) => void;
  onNext: () => void;
}

export function DoctorFormScreen({ formData, onFormChange, onNext }: Props) {
  const { mutate: createDoctor } = useDoctorCreate();
  const { initialState, validateForm } = useDoctorForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof DoctorFormData, value: any) => {
    onFormChange({
      ...formData,
      [field]: value,
    });
    setError(null);
  };

  console.log("doctor create form data", formData);

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

      <div className="mb-4 border-b border-slate-100 pb-3">
        <h2 className="text-xl font-medium text-slate-900">
          Basic Information
        </h2>
        <p className="text-sm text-slate-500">
          Provide basic information about yourself to help us create your
          profile.
        </p>
      </div>

      {/* show this message for the doctor */}
      <p className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-slate-600">
        Your contact details (phone number and email) are strictly private and
        will never be shared. Healtha will only use them to provide you with
        essential updates. Feel confident knowing your privacy is always our top
        priority!
      </p>

      <div className="space-y-4">
        {/* General information section */}
        <DoctorGeneralInformationSection
          formData={formData}
          onInputChange={handleInputChange}
        />

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

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="about" className="text-sm font-medium text-slate-700">
            Description
          </label>
          <TextEditor
            height="min-h-[100px]"
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
          />
        </div>

        {/* Contact Information */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 border-b border-slate-200 pb-3">
            <p className="mb-1 text-lg font-semibold text-slate-800">
              Doctor Personal Information
            </p>
            <p className="mb-4 text-sm text-slate-500">
              Note: Don&apos;t worry! your personal information will not be
              shared with anyone, it will only be used for internal purposes like
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
            value={formData.degrees || []}
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

        {/* Temporary Closed */}
        <TempClosed
          formData={formData}
          onChange={(field, value) => handleInputChange(field, value)}
        />

        {/* Required Fields Note */}
        <div className="mb-6 text-sm text-red-500">
          <p>* Required fields: Name, BMDC Number, Email, Phone Number</p>
        </div>

        <div className="flex justify-end">
          <button className="mt-4 flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ">
            <span>Save & Next Step</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
