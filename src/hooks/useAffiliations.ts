import { AffiliationFormData, DoctorAffiliation } from "@/types/affiliations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Static dummy data for affiliations
const mockAffiliations: DoctorAffiliation[] = [
  {
    id: "1",
    doctorId: "demo-doctor-id",
    affiliation: {
      id: "1",
      name: "Bangladesh Medical Association",
      bnName: "বাংলাদেশ মেডিকেল অ্যাসোসিয়েশন",
      description: "Professional medical association for doctors in Bangladesh",
      bnDescription: "বাংলাদেশের চিকিৎসকদের জন্য পেশাদার মেডিকেল অ্যাসোসিয়েশন",
      status: "published",
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2020-01-01"),
    },
    position: "Member",
    bnPosition: "সদস্য",
    startDate: "2020-01-01",
    endDate: null,
    isCurrent: true,
    status: "published",
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2020-01-01"),
  },
  {
    id: "2",
    doctorId: "demo-doctor-id",
    affiliation: {
      id: "2",
      name: "Cardiology Society of Bangladesh",
      bnName: "বাংলাদেশ কার্ডিওলজি সোসাইটি",
      description: "Specialized society for cardiologists in Bangladesh",
      bnDescription: "বাংলাদেশের কার্ডিওলজিস্টদের জন্য বিশেষায়িত সোসাইটি",
      status: "published",
      createdAt: new Date("2018-06-01"),
      updatedAt: new Date("2018-06-01"),
    },
    position: "Executive Member",
    bnPosition: "কার্যনির্বাহী সদস্য",
    startDate: "2018-06-01",
    endDate: null,
    isCurrent: true,
    status: "published",
    createdAt: new Date("2018-06-01"),
    updatedAt: new Date("2018-06-01"),
  },
  {
    id: "3",
    doctorId: "demo-doctor-id",
    affiliation: {
      id: "3",
      name: "International Society of Cardiology",
      bnName: "আন্তর্জাতিক কার্ডিওলজি সোসাইটি",
      description: "Global organization for cardiology professionals",
      bnDescription: "কার্ডিওলজি পেশাদারদের জন্য বৈশ্বিক সংস্থা",
      status: "published",
      createdAt: new Date("2019-03-01"),
      updatedAt: new Date("2019-03-01"),
    },
    position: "Fellow",
    bnPosition: "ফেলো",
    startDate: "2019-03-01",
    endDate: null,
    isCurrent: true,
    status: "published",
    createdAt: new Date("2019-03-01"),
    updatedAt: new Date("2019-03-01"),
  },
];

export const useAffiliations = (doctorId?: string) => {
  const queryClient = useQueryClient();

  // Return static data instead of API calls
  const affiliations = mockAffiliations.filter(
    (aff) => aff.doctorId === doctorId,
  );
  const isLoadingAffiliations = false;
  const error = null;

  const { mutateAsync: createAffiliation, isPending: isCreating } = useMutation(
    {
      mutationFn: async (data: AffiliationFormData) => {
        // Static demo - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: { id: Date.now().toString(), ...data } };
      },
      onSuccess: () => {
        toast.success("Affiliation created successfully (demo mode)");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to create affiliation",
        );
      },
    },
  );

  const { mutateAsync: updateAffiliation, isPending: isUpdating } = useMutation(
    {
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: AffiliationFormData;
      }) => {
        // Static demo - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: { id, ...data } };
      },
      onSuccess: () => {
        toast.success("Affiliation updated successfully (demo mode)");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update affiliation",
        );
      },
    },
  );

  const { mutateAsync: deleteAffiliation, isPending: isDeleting } = useMutation(
    {
      mutationFn: async (id: string) => {
        // Static demo - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: { id } };
      },
      onSuccess: () => {
        toast.success("Affiliation deleted successfully (demo mode)");
      },
    },
  );

  return {
    affiliations: affiliations || [],
    meta: { total: affiliations.length, page: 1, limit: 10 },
    isLoadingAffiliations,
    error,
    createAffiliation,
    isCreating,
    updateAffiliation,
    isUpdating,
    deleteAffiliation,
    isDeleting,
  };
};
