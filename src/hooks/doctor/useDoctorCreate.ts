import { DoctorFormData } from "@/types/doctors";
import { useMutation } from "@tanstack/react-query";

export const useDoctorCreate = () => {
  const createDoctor = async (formData: FormData) => {
    const response = await fetch("/api/doctors", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create doctor");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: createDoctor,
  });
};

export const useDoctorForm = () => {
  const initialState: DoctorFormData = {
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
  };

  const validateForm = (data: DoctorFormData) => {
    if (!data.name) return "Name is required";
    if (!data.bmdcNumber) return "BMDC Number is required";
    if (
      !data.emailAddresses ||
      data.emailAddresses.length === 0 ||
      !data.emailAddresses[0]
    )
      return "Email is required";
    if (
      !data.phoneNumbers ||
      data.phoneNumbers.length === 0 ||
      !data.phoneNumbers[0]
    )
      return "Phone number is required";
    return null;
  };

  return { initialState, validateForm };
};
