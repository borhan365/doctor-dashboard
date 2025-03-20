import { ApiUrl } from "@/app/Variables";
import { MedicineFormData, MedicineListResponse } from "@/types/medicines";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface UseGetMedicinesParams {
  page?: number;
  limit?: number;
  search?: string;
  genericId?: string;
  manufacturerId?: string;
  medicineTypeId?: string;
}

export function useGetMedicines({
  page = 1,
  limit = 10,
  search = "",
  genericId,
  manufacturerId,
  medicineTypeId,
}: UseGetMedicinesParams = {}) {
  return useQuery<MedicineListResponse, Error>({
    queryKey: [
      "medicines",
      { page, limit, search, genericId, manufacturerId, medicineTypeId },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(genericId && { genericId }),
        ...(manufacturerId && { manufacturerId }),
        ...(medicineTypeId && { medicineTypeId }),
      });

      try {
        const { data } = await axios.get(
          `${ApiUrl}/medicines/medicine/get-all?${params}`,
        );
        return data;
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch medicines");
        throw error;
      }
    },
  });
}

export function useCreateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MedicineFormData) => {
      const { data: response } = await axios.post(
        `${ApiUrl}/medicines/medicine/create`,
        data,
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Medicine created successfully");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    onError: (error: any) => {
      throw new Error(
        error.response?.data?.message || "Failed to create medicine",
      );
    },
  });
}

export function useUpdateMedicine(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MedicineFormData) => {
      const { data: response } = await axios.put(
        `${ApiUrl}/medicines/medicine/update/${slug}`,
        data,
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Medicine updated successfully");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      queryClient.invalidateQueries({ queryKey: ["medicine", slug] });
    },
    onError: (error: any) => {
      throw new Error(
        error.response?.data?.message || "Failed to update medicine",
      );
    },
  });
}

export function useGetMedicine(slug: string) {
  return useQuery({
    queryKey: ["medicine", slug],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${ApiUrl}/medicines/medicine/get-single/${slug}`,
        );
        return data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Failed to fetch medicine";
        toast.error(message);
        throw new Error(message);
      }
    },
    enabled: !!slug,
  });
}

export function useBulkDeleteMedicines() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      if (!ids.length) {
        throw new Error("No medicines selected");
      }

      const { data } = await axios.delete(
        `${ApiUrl}/medicines/medicine/bulk-delete`,
        {
          data: { ids },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    onError: (error: any) => {
      throw new Error(
        error.response?.data?.message || "Failed to delete medicines",
      );
    },
  });
}

export function useDropdownOptions() {
  const generics = useQuery({
    queryKey: ["generics"],
    queryFn: async () => {
      const { data } = await axios.get(`${ApiUrl}/medicines/generics/get-all`);
      return data.generics;
    },
  });

  const manufacturers = useQuery({
    queryKey: ["manufacturers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${ApiUrl}/medicines/pharmaceuticals/get-all`,
      );
      return data.manufacturers;
    },
  });

  const dosageForms = useQuery({
    queryKey: ["dosageForms"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${ApiUrl}/medicines/dosage-forms/get-all`,
      );
      return data.dosageForms;
    },
  });

  const diseases = useQuery({
    queryKey: ["diseases"],
    queryFn: async () => {
      const { data } = await axios.get(`${ApiUrl}/medicines/diseases/get-all`);
      return data.diseases;
    },
  });

  return {
    generics,
    manufacturers,
    dosageForms,
    diseases,
  };
}
