import { DoctorFormData } from "@/types/doctor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDoctorCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createDoctor = async (data: { formData: FormData }) => {
    const response = await fetch("/api/doctors/doctor/create", {
      method: "POST",
      body: data.formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || error.error || "Failed to create doctor",
      );
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createDoctor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Doctor profile created successfully!");
      router.push(`/doctor`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create doctor profile");
    },
  });

  return mutation;
};

// Helper hook for form state management
export function useDoctorForm() {
  const initialState: DoctorFormData = {
    name: "",
    prefix: "",
    bmdcNumber: "",
    emailAddresses: [""],
    phoneNumbers: [""],
    status: "draft",
    languages: [],
    degrees: [],
    specialists: [],
    treatments: [],
    doctorType: "",
    discountForHealthaUser: 0,
    isFeatured: false,
    isVerified: false,
    experience: 0,
    about: "",
    educations: [],
    isSponsored: false,
    hospitals: [],
    locations: [],
    chambers: [], // Added missing field
    experiences: [], // Added missing field
    faqs: [] // Added missing field
  };

  const validateForm = (data: DoctorFormData) => {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = "Name is required";
    }

    if (!data.bmdcNumber?.trim()) {
      errors.bmdcNumber = "BMDC number is required";
    }

    if (!data.emailAddresses?.length || !data.emailAddresses[0]?.trim()) {
      errors.emailAddresses = "At least one email is required";
    }

    if (!data.phoneNumbers?.length || !data.phoneNumbers[0]?.trim()) {
      errors.phoneNumbers = "At least one phone number is required";
    }

    // Validate email format
    if (data.emailAddresses?.length) {
      const invalidEmail = data.emailAddresses.some((email) => {
        return email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      });
      if (invalidEmail) {
        errors.emailAddresses = "Invalid email format";
      }
    }

    // Validate phone format
    if (data.phoneNumbers?.length) {
      const invalidPhone = data.phoneNumbers.some((phone) => {
        return phone.trim() && !/^\d{10,}$/.test(phone.replace(/\D/g, ""));
      });
      if (invalidPhone) {
        errors.phoneNumbers = "Invalid phone number format";
      }
    }

    return errors;
  };

  return {
    initialState,
    validateForm,
  };
}
