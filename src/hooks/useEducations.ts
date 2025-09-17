import { DoctorEducation, Education } from "@/types/educations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Static dummy data for educations
const mockEducations: DoctorEducation[] = [
  {
    id: "1",
    doctorId: "demo-doctor-id",
    education: {
      id: "1",
      name: "MBBS",
      bnName: "এমবিবিএস",
      description: "Bachelor of Medicine, Bachelor of Surgery",
      bnDescription: "মেডিসিনের স্নাতক, সার্জারির স্নাতক",
      status: "published",
      createdAt: new Date("2010-06-01"),
      updatedAt: new Date("2010-06-01"),
    },
    institution: "Dhaka Medical College",
    bnInstitution: "ঢাকা মেডিকেল কলেজ",
    year: "2010",
    grade: "First Class",
    bnGrade: "প্রথম শ্রেণী",
    status: "published",
    createdAt: new Date("2010-06-01"),
    updatedAt: new Date("2010-06-01"),
  },
  {
    id: "2",
    doctorId: "demo-doctor-id",
    education: {
      id: "2",
      name: "MD in Cardiology",
      bnName: "কার্ডিওলজিতে এমডি",
      description: "Doctor of Medicine in Cardiology",
      bnDescription: "কার্ডিওলজিতে মেডিসিনের ডক্টর",
      status: "published",
      createdAt: new Date("2015-06-01"),
      updatedAt: new Date("2015-06-01"),
    },
    institution: "Bangabandhu Sheikh Mujib Medical University",
    bnInstitution: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়",
    year: "2015",
    grade: "Distinction",
    bnGrade: "সর্বোচ্চ নম্বর",
    status: "published",
    createdAt: new Date("2015-06-01"),
    updatedAt: new Date("2015-06-01"),
  },
  {
    id: "3",
    doctorId: "demo-doctor-id",
    education: {
      id: "3",
      name: "Fellowship in Interventional Cardiology",
      bnName: "হস্তক্ষেপমূলক কার্ডিওলজিতে ফেলোশিপ",
      description: "Advanced training in interventional cardiology procedures",
      bnDescription: "হস্তক্ষেপমূলক কার্ডিওলজি পদ্ধতিতে উন্নত প্রশিক্ষণ",
      status: "published",
      createdAt: new Date("2018-06-01"),
      updatedAt: new Date("2018-06-01"),
    },
    institution: "Cleveland Clinic, USA",
    bnInstitution: "ক্লিভল্যান্ড ক্লিনিক, যুক্তরাষ্ট্র",
    year: "2018",
    grade: "Passed with Excellence",
    bnGrade: "সর্বোচ্চ নম্বর সহ উত্তীর্ণ",
    status: "published",
    createdAt: new Date("2018-06-01"),
    updatedAt: new Date("2018-06-01"),
  },
  {
    id: "4",
    doctorId: "demo-doctor-id",
    education: {
      id: "4",
      name: "Diploma in Echocardiography",
      bnName: "ইকোকার্ডিওগ্রাফিতে ডিপ্লোমা",
      description: "Specialized training in cardiac imaging",
      bnDescription: "কার্ডিয়াক ইমেজিংয়ে বিশেষায়িত প্রশিক্ষণ",
      status: "published",
      createdAt: new Date("2019-03-01"),
      updatedAt: new Date("2019-03-01"),
    },
    institution: "National Heart Foundation",
    bnInstitution: "জাতীয় হৃদয় ফাউন্ডেশন",
    year: "2019",
    grade: "First Class",
    bnGrade: "প্রথম শ্রেণী",
    status: "published",
    createdAt: new Date("2019-03-01"),
    updatedAt: new Date("2019-03-01"),
  },
];

export const useEducations = (doctorId?: string) => {
  const queryClient = useQueryClient();

  // Return static data instead of API calls
  const educations = mockEducations.filter((edu) => edu.doctorId === doctorId);
  const isLoadingEducations = false;
  const error = null;

  // Create education
  const { mutateAsync: createEducation, isPending: isCreating } = useMutation({
    mutationFn: async (data: { doctorId: string; education: Education }) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id: Date.now().toString(), ...data } };
    },
    onSuccess: () => {
      toast.success("Education record created successfully (demo mode)");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create education record",
      );
    },
  });

  // Update education
  const { mutateAsync: updateEducation, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Education }) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id, ...data } };
    },
    onSuccess: () => {
      toast.success("Education updated successfully (demo mode)");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update education",
      );
    },
  });

  // Delete education
  const { mutateAsync: deleteEducation, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data: { id } };
    },
    onSuccess: () => {
      toast.success("Education deleted successfully (demo mode)");
    },
  });

  return {
    educations: educations || [],
    meta: { total: educations.length, page: 1, limit: 10 },
    isLoadingEducations,
    error,
    createEducation,
    isCreating,
    updateEducation,
    isUpdating,
    deleteEducation,
    isDeleting,
  };
};
