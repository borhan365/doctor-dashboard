import { DoctorExperience, Experience } from "@/types/experiences";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Static dummy data for experiences
const mockExperiences: DoctorExperience[] = [
  {
    id: "1",
    doctorId: "demo-doctor-id",
    experience: {
      id: "1",
      name: "Senior Cardiologist",
      bnName: "সিনিয়র কার্ডিওলজিস্ট",
      description:
        "Leading cardiology department and performing complex procedures",
      bnDescription: "কার্ডিওলজি বিভাগ পরিচালনা এবং জটিল পদ্ধতি সম্পাদন",
      status: "published",
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2020-01-01"),
    },
    organization: "Dhaka Medical College Hospital",
    bnOrganization: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    startDate: "2020-01-01",
    endDate: "2023-12-31",
    isCurrent: false,
    status: "published",
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2020-01-01"),
  },
  {
    id: "2",
    doctorId: "demo-doctor-id",
    experience: {
      id: "2",
      name: "Interventional Cardiologist",
      bnName: "হস্তক্ষেপমূলক কার্ডিওলজিস্ট",
      description:
        "Specialized in cardiac catheterization and angioplasty procedures",
      bnDescription:
        "কার্ডিয়াক ক্যাথেটারাইজেশন এবং অ্যানজিওপ্লাস্টি পদ্ধতিতে বিশেষজ্ঞ",
      status: "published",
      createdAt: new Date("2018-06-01"),
      updatedAt: new Date("2018-06-01"),
    },
    organization: "Square Hospitals Ltd",
    bnOrganization: "স্কয়ার হাসপাতাল লিমিটেড",
    startDate: "2018-06-01",
    endDate: "2019-12-31",
    isCurrent: false,
    status: "published",
    createdAt: new Date("2018-06-01"),
    updatedAt: new Date("2018-06-01"),
  },
  {
    id: "3",
    doctorId: "demo-doctor-id",
    experience: {
      id: "3",
      name: "Consultant Cardiologist",
      bnName: "কনসালট্যান্ট কার্ডিওলজিস্ট",
      description:
        "Providing expert consultation and treatment for heart diseases",
      bnDescription: "হৃদরোগের জন্য বিশেষজ্ঞ পরামর্শ এবং চিকিৎসা প্রদান",
      status: "published",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    organization: "Apollo Hospitals Dhaka",
    bnOrganization: "অ্যাপোলো হাসপাতাল ঢাকা",
    startDate: "2024-01-01",
    endDate: null,
    isCurrent: true,
    status: "published",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const useExperiences = (doctorId?: string) => {
  const queryClient = useQueryClient();

  // Return static data instead of API calls
  const experiences = mockExperiences.filter(
    (exp) => exp.doctorId === doctorId,
  );
  const isLoadingExperiences = false;
  const error = null;

  // Create experience
  const { mutateAsync: createExperience, isPending: isCreating } = useMutation({
    mutationFn: async (data: Partial<Experience> & { doctorId: string }) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id: Date.now().toString(), ...data } };
    },
    onSuccess: () => {
      toast.success("Experience created successfully (demo mode)");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create experience",
      );
    },
  });

  // Update experience
  const { mutateAsync: updateExperience, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Experience> & { doctorId: string };
    }) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id, ...data } };
    },
    onSuccess: () => {
      toast.success("Experience updated successfully (demo mode)");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update experience",
      );
    },
  });

  // Delete experience
  const { mutateAsync: deleteExperience, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id } };
    },
    onSuccess: () => {
      toast.success("Experience deleted successfully (demo mode)");
    },
  });

  return {
    experiences: experiences || [],
    meta: { total: experiences.length, page: 1, limit: 10 },
    isLoadingExperiences,
    error,
    createExperience,
    isCreating,
    updateExperience,
    isUpdating,
    deleteExperience,
    isDeleting,
  };
};
