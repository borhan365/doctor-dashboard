"use client";

import IconLoading from "@/components/Loader/IconLoading";
import { useDoctorProfile } from "@/hooks/useDoctors";
import { useAuth } from "@/store/useAuth";
import { DoctorFormData } from "@/types/doctors";
import { Menu, PanelRight, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ChamberTable from "../chambers/ui/ChamberTable";
import { ProfileForm } from "./ui/ProfileForm";

// Dynamically import components
const DynamicDoctorSidebar = dynamic(() => import("./ui/DoctorSidebar"), {
  ssr: false,
});

export default function ManageDoctorProfile() {
  console.log("ManageDoctorProfile rendering");

  const { user, status } = useAuth();
  const doctorSlug = user?.doctorSlug;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [contentSidebarOpen, setContentSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Import the doctor profile hook
  const {
    loadDoctor,
    saveDoctor,
    isLoading: isLoadingDoctor,
    error: doctorError,
  } = useDoctorProfile();

  const [formData, setFormData] = useState<DoctorFormData>({
    // Basic Info
    prefixId: null,
    doctorTypeId: null,
    name: "",
    bnName: "",
    excerpt: "",
    bnExcerpt: "",
    overview: "",
    bnOverview: "",
    description: "",
    bnDescription: "",

    // Status and Features
    isFeatured: false,
    isVerified: false,
    isSponsored: false,
    status: "published",

    // Medical Information
    bmdcNumber: "",
    discountForHealthaUser: 0,
    discountForHealthaUserNote: "",
    discountForHealthaUserNoteBn: "",

    // Personal Info
    gender: "",
    experience: 0,
    about: "",
    emailAddresses: [""],
    phoneNumbers: [""],
    website: "",
    videoUrl: "",

    // Location Info
    locationId: null,

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
    languages: [],
    adminId: null,
    userId: null,
    featuredImage: null,

    // FAQs
    faqs: [
      {
        question: "",
        answer: "",
        bnQuestion: "",
        bnAnswer: "",
      },
    ],
  });

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setContentSidebarOpen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      categoryIds: selectedCategories,
    }));
  }, [selectedCategories]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Fetch doctor data when slug is available
  useEffect(() => {
    const fetchDoctorData = async () => {
      if (doctorSlug) {
        try {
          const data = await loadDoctor(doctorSlug);
          console.log("Loaded doctor data:", data);
          if (data) {
            setFormData(data);
          }
        } catch (error) {
          console.error("Error loading doctor:", error);
          setError("Failed to load doctor profile");
        }
      }
    };

    fetchDoctorData();
  }, [doctorSlug, loadDoctor]);

  // Use useCallback for handlers
  const handleInputChange = useCallback(
    (field: keyof DoctorFormData, value: any) => {
      setFormData((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleAuthorChange = useCallback(
    (value: string | null) => {
      handleInputChange("userId" as keyof DoctorFormData, value);
    },
    [handleInputChange],
  );

  const handleAdminChange = useCallback(
    (value: string | null) => {
      handleInputChange("adminId", value);
    },
    [handleInputChange],
  );

  const handleImageChange = useCallback(
    (file: File | null) => {
      setFeaturedImage(file);
      handleInputChange("featuredImage", file);
    },
    [handleInputChange],
  );

  const handleFormChange = useCallback((newData: DoctorFormData) => {
    setFormData(newData);
  }, []);

  const handleSubmit = async () => {
    const loadingToastId = toast.loading("Updating doctor profile...");
    setError(null);

    try {
      // Create a copy of the form data to manipulate
      const submissionData = { ...formData };

      // Transform specialists to extract IDs
      if (
        submissionData.specialists &&
        Array.isArray(submissionData.specialists)
      ) {
        submissionData.specialists = submissionData.specialists.map(
          (spec: any) =>
            typeof spec === "string" ? spec : spec.id ? spec.id : spec,
        );
      }

      // Transform treatments to extract IDs
      if (
        submissionData.treatments &&
        Array.isArray(submissionData.treatments)
      ) {
        submissionData.treatments = submissionData.treatments.map(
          (treat: any) =>
            typeof treat === "string" ? treat : treat.id ? treat.id : treat,
        );
      }

      // Transform degrees to extract IDs
      if (submissionData.degrees && Array.isArray(submissionData.degrees)) {
        submissionData.degrees = submissionData.degrees.map((deg: any) =>
          typeof deg === "string" ? deg : deg.id ? deg.id : deg,
        );
      }

      // Transform languages to extract IDs
      if (submissionData.languages && Array.isArray(submissionData.languages)) {
        submissionData.languages = submissionData.languages.map((lang: any) =>
          typeof lang === "string" ? lang : lang.id ? lang.id : lang,
        );
      }

      const form = new FormData();

      // Remove the featuredImage from the JSON data if it's a File object
      // We'll append it separately to the FormData
      const { featuredImage, ...restData } = submissionData;

      const preparedData = {
        ...restData,
        discountForHealthaUser: Number(restData.discountForHealthaUser) || 0,
        experience: Number(restData.experience) || 0,
        emailAddresses: restData.emailAddresses.filter(Boolean),
        phoneNumbers: restData.phoneNumbers.filter(Boolean),
      };

      form.append("data", JSON.stringify(preparedData));

      // Check if featuredImage is a File object before appending
      if (featuredImage instanceof File) {
        form.append("featuredImage", featuredImage);
      }

      console.log("Submitting doctor data:", preparedData);
      await saveDoctor(form, doctorSlug);

      toast.dismiss(loadingToastId);
      toast.success("Doctor profile updated successfully!");
      router.push("/dashboard/profile");
    } catch (error: any) {
      toast.dismiss(loadingToastId);
      setError(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    console.log("formData changed:", formData);
  }, [formData]);

  return (
    <div className="min-h-screen">
      {(isLoading || isLoadingDoctor || status === "loading") && (
        <IconLoading />
      )}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white p-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4 block lg:hidden">
                {isSidebarOpen ? (
                  <X className="h-6 w-6 text-slate-600" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-600" />
                )}
              </button>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-slate-800 md:text-xl">
                  Edit Doctor Profile
                </h1>
                {formData?.name && (
                  <p className="text-base font-medium text-slate-700">
                    {formData.name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700"
              >
                <span>Update Profile</span>
              </button>
            </div>
          </div>

          {/* Sidebar toggle button */}
          <div className="flex items-center justify-end gap-3">
            <PanelRight
              onClick={() => setContentSidebarOpen(!contentSidebarOpen)}
              size={25}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Main content wrapper */}
        <div className="!m-0 flex">
          {/* Main Content */}
          <div className="h-screen w-full overflow-y-auto bg-white shadow-sm">
            <ProfileForm formData={formData} onFormChange={handleFormChange} />
          </div>

          {/* Sidebar Content */}
          {contentSidebarOpen && (
            <DynamicDoctorSidebar
              formData={formData}
              onInputChange={handleInputChange}
              onAuthorChange={handleAuthorChange}
              onAdminChange={handleAdminChange}
              onImageChange={handleImageChange}
              isLoading={isLoading || isLoadingDoctor}
            />
          )}
        </div>
      </form>

      <div>
        <h2>My Chambers</h2>
        <ChamberTable doctorId={doctorSlug} />
      </div>
    </div>
  );
}
