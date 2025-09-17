import { AwardFormData, DoctorAward } from "@/types/awards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Static dummy data for awards
const mockAwards: DoctorAward[] = [
  {
    id: "1",
    title: "Best Cardiologist Award 2023",
    bnTitle: "সেরা হৃদরোগ বিশেষজ্ঞ পুরস্কার ২০২৩",
    organization: "Bangladesh Medical Association",
    bnOrganization: "বাংলাদেশ মেডিকেল অ্যাসোসিয়েশন",
    year: "2023",
    description:
      "Awarded for outstanding contribution to cardiology in Bangladesh",
    bnDescription: "বাংলাদেশে কার্ডিওলজিতে অসামান্য অবদানের জন্য পুরস্কৃত",
    doctorId: "demo-doctor-id",
    status: "published",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-01"),
  },
  {
    id: "2",
    title: "Excellence in Medical Research",
    bnTitle: "চিকিৎসা গবেষণায় শ্রেষ্ঠত্ব",
    organization: "International Medical Society",
    bnOrganization: "আন্তর্জাতিক মেডিকেল সোসাইটি",
    year: "2022",
    description:
      "Recognized for groundbreaking research in interventional cardiology",
    bnDescription:
      "হস্তক্ষেপমূলক কার্ডিওলজিতে যুগান্তকারী গবেষণার জন্য স্বীকৃত",
    doctorId: "demo-doctor-id",
    status: "published",
    createdAt: new Date("2022-11-15"),
    updatedAt: new Date("2022-11-15"),
  },
  {
    id: "3",
    title: "Patient Care Excellence Award",
    bnTitle: "রোগী সেবা শ্রেষ্ঠত্ব পুরস্কার",
    organization: "Healthcare Excellence Foundation",
    bnOrganization: "স্বাস্থ্যসেবা শ্রেষ্ঠত্ব ফাউন্ডেশন",
    year: "2021",
    description: "Awarded for exceptional patient care and satisfaction",
    bnDescription: "অসাধারণ রোগী সেবা এবং সন্তুষ্টির জন্য পুরস্কৃত",
    doctorId: "demo-doctor-id",
    status: "published",
    createdAt: new Date("2021-10-20"),
    updatedAt: new Date("2021-10-20"),
  },
  {
    id: "4",
    title: "Young Researcher Award",
    bnTitle: "তরুণ গবেষক পুরস্কার",
    organization: "Bangladesh Heart Foundation",
    bnOrganization: "বাংলাদেশ হার্ট ফাউন্ডেশন",
    year: "2020",
    description: "Recognized as emerging talent in cardiovascular medicine",
    bnDescription: "কার্ডিওভাসকুলার মেডিসিনে উদীয়মান প্রতিভা হিসেবে স্বীকৃত",
    doctorId: "demo-doctor-id",
    status: "published",
    createdAt: new Date("2020-09-10"),
    updatedAt: new Date("2020-09-10"),
  },
  {
    id: "5",
    title: "Community Service Award",
    bnTitle: "সমাজসেবা পুরস্কার",
    organization: "Dhaka Medical College Alumni",
    bnOrganization: "ঢাকা মেডিকেল কলেজ অ্যালামনাই",
    year: "2019",
    description: "Awarded for outstanding community health initiatives",
    bnDescription: "অসামান্য সম্প্রদায় স্বাস্থ্য উদ্যোগের জন্য পুরস্কৃত",
    doctorId: "demo-doctor-id",
    status: "published",
    createdAt: new Date("2019-08-05"),
    updatedAt: new Date("2019-08-05"),
  },
];

export const useAwards = (doctorId?: string) => {
  const queryClient = useQueryClient();

  // Return static data instead of API calls
  const awards = mockAwards.filter((award) => award.doctorId === doctorId);
  const isLoadingAwards = false;
  const error = null;

  const { mutateAsync: createAward, isPending: isCreating } = useMutation({
    mutationFn: async (data: AwardFormData) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newAward: DoctorAward = {
        id: Date.now().toString(),
        ...data,
        doctorId: doctorId || "demo-doctor-id",
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { data: newAward };
    },
    onSuccess: () => {
      toast.success("Award created successfully (demo mode)");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create award",
      );
    },
  });

  const { mutateAsync: updateAward, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: AwardFormData }) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id, ...data } };
    },
    onSuccess: () => {
      toast.success("Award updated successfully (demo mode)");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update award",
      );
    },
  });

  const { mutateAsync: deleteAward, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id } };
    },
    onSuccess: () => {
      toast.success("Award deleted successfully (demo mode)");
    },
  });

  return {
    awards: awards || [],
    meta: { total: awards.length, page: 1, limit: 10 },
    isLoadingAwards,
    error,
    createAward,
    isCreating,
    updateAward,
    isUpdating,
    deleteAward,
    isDeleting,
  };
};
