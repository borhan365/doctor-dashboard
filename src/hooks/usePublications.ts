import { DoctorPublication, PublicationFormData } from "@/types/publications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Static dummy data for publications
const mockPublications: DoctorPublication[] = [
  {
    id: "1",
    doctorId: "demo-doctor-id",
    publication: {
      id: "1",
      title: "Advanced Interventional Cardiology Techniques",
      bnTitle: "উন্নত হস্তক্ষেপমূলক কার্ডিওলজি কৌশল",
      description:
        "Comprehensive guide to modern interventional cardiology procedures",
      bnDescription:
        "আধুনিক হস্তক্ষেপমূলক কার্ডিওলজি পদ্ধতির ব্যাপক নির্দেশিকা",
      status: "published",
      createdAt: new Date("2023-06-01"),
      updatedAt: new Date("2023-06-01"),
    },
    journal: "Journal of Cardiovascular Medicine",
    bnJournal: "কার্ডিওভাসকুলার মেডিসিন জার্নাল",
    year: "2023",
    volume: "15",
    issue: "3",
    pages: "245-260",
    doi: "10.1234/jcm.2023.15.3.245",
    status: "published",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-01"),
  },
  {
    id: "2",
    doctorId: "demo-doctor-id",
    publication: {
      id: "2",
      title: "Cardiac Catheterization in Bangladesh: A 10-Year Review",
      bnTitle: "বাংলাদেশে কার্ডিয়াক ক্যাথেটারাইজেশন: ১০ বছরের পর্যালোচনা",
      description:
        "Retrospective analysis of cardiac catheterization procedures in Bangladesh",
      bnDescription:
        "বাংলাদেশে কার্ডিয়াক ক্যাথেটারাইজেশন পদ্ধতির পশ্চাদপদ বিশ্লেষণ",
      status: "published",
      createdAt: new Date("2022-12-01"),
      updatedAt: new Date("2022-12-01"),
    },
    journal: "Bangladesh Heart Journal",
    bnJournal: "বাংলাদেশ হার্ট জার্নাল",
    year: "2022",
    volume: "37",
    issue: "2",
    pages: "78-92",
    doi: "10.5678/bhj.2022.37.2.78",
    status: "published",
    createdAt: new Date("2022-12-01"),
    updatedAt: new Date("2022-12-01"),
  },
  {
    id: "3",
    doctorId: "demo-doctor-id",
    publication: {
      id: "3",
      title: "Preventive Cardiology: Evidence-Based Approaches",
      bnTitle: "প্রতিরোধমূলক কার্ডিওলজি: প্রমাণ-ভিত্তিক পদ্ধতি",
      description:
        "Evidence-based strategies for preventing cardiovascular diseases",
      bnDescription: "কার্ডিওভাসকুলার রোগ প্রতিরোধের প্রমাণ-ভিত্তিক কৌশল",
      status: "published",
      createdAt: new Date("2021-09-01"),
      updatedAt: new Date("2021-09-01"),
    },
    journal: "International Journal of Preventive Medicine",
    bnJournal: "আন্তর্জাতিক প্রতিরোধমূলক মেডিসিন জার্নাল",
    year: "2021",
    volume: "12",
    issue: "4",
    pages: "156-170",
    doi: "10.7890/ijpm.2021.12.4.156",
    status: "published",
    createdAt: new Date("2021-09-01"),
    updatedAt: new Date("2021-09-01"),
  },
];

export const usePublications = (doctorId?: string) => {
  const queryClient = useQueryClient();

  // Return static data instead of API calls
  const publications = mockPublications.filter(
    (pub) => pub.doctorId === doctorId,
  );
  const isLoadingPublications = false;
  const error = null;

  const { mutateAsync: createPublication, isPending: isCreating } = useMutation(
    {
      mutationFn: async (data: PublicationFormData) => {
        // Static demo - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: { id: Date.now().toString(), ...data } };
      },
      onSuccess: () => {
        toast.success("Publication created successfully (demo mode)");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to create publication",
        );
      },
    },
  );

  const { mutateAsync: updatePublication, isPending: isUpdating } = useMutation(
    {
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: PublicationFormData;
      }) => {
        // Static demo - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: { id, ...data } };
      },
      onSuccess: () => {
        toast.success("Publication updated successfully (demo mode)");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update publication",
        );
      },
    },
  );

  const { mutateAsync: deletePublication, isPending: isDeleting } = useMutation(
    {
      mutationFn: async (id: string) => {
        // Static demo - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: { id } };
      },
      onSuccess: () => {
        toast.success("Publication deleted successfully (demo mode)");
      },
    },
  );

  return {
    publications: publications || [],
    meta: { total: publications.length, page: 1, limit: 10 },
    isLoadingPublications,
    error,
    createPublication,
    isCreating,
    updatePublication,
    isUpdating,
    deletePublication,
    isDeleting,
  };
};
