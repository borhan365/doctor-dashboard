"use client";

import IconLoading from "@/components/Loader/IconLoading";
import { DoctorFormData } from "@/types/doctors";
import { Menu, PanelRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ChamberTable from "../chambers/ui/ChamberTable";
import { ProfileForm } from "./ui/ProfileForm";

// Import components
import DoctorSidebar from "./ui/DoctorSidebar";

// Mock doctor data for static demo
const mockDoctorData: DoctorFormData = {
  // Basic Info
  prefixId: "1",
  doctorTypeId: "1",
  name: "Dr. John Doe",
  bnName: "ড. জন ডো",
  excerpt: "Experienced cardiologist with 15+ years of practice",
  bnExcerpt: "১৫+ বছরের অভিজ্ঞতা সহ হৃদরোগ বিশেষজ্ঞ",
  overview:
    "Dr. John Doe is a renowned cardiologist specializing in interventional cardiology and heart disease prevention. With over 15 years of experience, he has successfully treated thousands of patients and is known for his expertise in complex cardiac procedures.",
  bnOverview:
    "ড. জন ডো একজন খ্যাতিমান হৃদরোগ বিশেষজ্ঞ যিনি হস্তক্ষেপমূলক কার্ডিওলজি এবং হৃদরোগ প্রতিরোধে বিশেষজ্ঞ। ১৫ বছরেরও বেশি অভিজ্ঞতা সহ, তিনি হাজার হাজার রোগীকে সফলভাবে চিকিৎসা করেছেন এবং জটিল হৃদরোগ পদ্ধতিতে তার দক্ষতার জন্য পরিচিত।",
  description:
    "Comprehensive description of the doctor's expertise, experience, and achievements in the field of cardiology. Dr. John Doe has published numerous research papers and is a member of several prestigious medical associations.",
  bnDescription:
    "কার্ডিওলজি ক্ষেত্রে চিকিৎসকের দক্ষতা, অভিজ্ঞতা এবং অর্জনের বিস্তৃত বিবরণ। ড. জন ডো অসংখ্য গবেষণা পত্র প্রকাশ করেছেন এবং বেশ কয়েকটি মর্যাদাপূর্ণ মেডিকেল অ্যাসোসিয়েশনের সদস্য।",

  // Status and Features
  isFeatured: true,
  isVerified: true,
  isSponsored: false,
  status: "published",

  // Medical Information
  bmdcNumber: "12345",
  discountForHealthaUser: 10,
  discountForHealthaUserNote: "10% discount for Healtha users",
  discountForHealthaUserNoteBn: "হেলথা ব্যবহারকারীদের জন্য ১০% ছাড়",

  // Personal Info
  gender: "male",
  experience: 15,
  about:
    "Dr. John Doe is a highly experienced cardiologist with a passion for patient care and medical innovation.",
  emailAddresses: ["john.doe@example.com", "dr.john@cardiology.com"],
  phoneNumbers: ["+8801712345678", "+8801712345679"],
  website: "https://drjohndoe.com",
  videoUrl: "https://youtube.com/watch?v=demo",

  // Location Info
  locationId: "1",

  // Social Media
  facebookLink: "https://facebook.com/drjohndoe",
  twitterLink: "https://twitter.com/drjohndoe",
  instagramLink: "https://instagram.com/drjohndoe",
  youtubeLink: "https://youtube.com/drjohndoe",
  linkedinLink: "https://linkedin.com/in/drjohndoe",

  // Relations
  specialists: ["1", "2", "3"],
  treatments: ["1", "2", "3", "4"],
  degrees: ["1", "2", "3"],
  languages: ["1", "2"],
  adminId: "1",
  userId: "1",
  featuredImage: null,

  // FAQs
  faqs: [
    {
      question: "What are your consultation hours?",
      answer:
        "I am available for consultation from 9:00 AM to 6:00 PM, Monday to Friday.",
      bnQuestion: "আপনার পরামর্শের সময় কী?",
      bnAnswer:
        "আমি সোমবার থেকে শুক্রবার সকাল ৯টা থেকে বিকাল ৬টা পর্যন্ত পরামর্শের জন্য উপলব্ধ।",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "Yes, I accept most major insurance plans. Please contact our office for details.",
      bnQuestion: "আপনি কি বীমা গ্রহণ করেন?",
      bnAnswer:
        "হ্যাঁ, আমি বেশিরভাগ প্রধান বীমা পরিকল্পনা গ্রহণ করি। বিস্তারিত জানতে আমাদের অফিসে যোগাযোগ করুন।",
    },
  ],
};

export default function ManageDoctorProfile() {
  console.log("ManageDoctorProfile rendering");

  // Static data for demo purposes
  const user = { doctorSlug: "demo-doctor" };
  const status = "authenticated";
  const doctorSlug = user?.doctorSlug;
  const router = useRouter();
  const [contentSidebarOpen, setContentSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<DoctorFormData>(mockDoctorData);

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

  // Initialize form data with mock data
  useEffect(() => {
    setFormData(mockDoctorData);
  }, []);

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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Submitting doctor data:", formData);

      toast.dismiss(loadingToastId);
      toast.success("Doctor profile updated successfully! (Demo mode)");

      // Update form data to show changes
      setFormData({ ...formData });
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
      {isLoading && <IconLoading />}
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
            <DoctorSidebar
              formData={formData}
              onInputChange={handleInputChange}
              onAuthorChange={handleAuthorChange}
              onAdminChange={handleAdminChange}
              onImageChange={handleImageChange}
              isLoading={isLoading}
            />
          )}
        </div>
      </form>

      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          My Chambers
        </h2>
        <ChamberTable />
      </div>
    </div>
  );
}
