import { CreateFloorInput } from "@/types/floors";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface UseFloorsOptions {
  page?: number;
  limit?: number;
  hospitalId?: string;
  id?: string;
}

export const useFloors = (options: UseFloorsOptions = {}) => {
  const router = useRouter();
  const { id } = options;

  // Fetch single floor
  const {
    data: floor,
    isLoading: isLoadingFloor,
    error: floorError,
  } = useQuery({
    queryKey: ["hospital-floor", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axios.get(
        `/api/hospitals/floors/get-single/${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

  // Fetch all floors
  const {
    data: floorsData,
    isLoading: isLoadingFloors,
    error: floorsError,
    refetch: refetchFloors,
  } = useQuery({
    queryKey: ["hospital-floors"],
    queryFn: async () => {
      const response = await axios.get("/api/hospitals/floors/get-all");
      return response.data;
    },
    enabled: !id,
  });

  // Create floors
  const {
    mutate: createFloor,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: async (data: CreateFloorInput) => {
      const response = await axios.post("/api/hospitals/floors/create", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Floor information created successfully");
      refetchFloors();
      router.push("/dashboard/hospitals/floors");
    },
    onError: (error: any) => {
      console.error("Error creating floor:", error);
      toast.error(
        error.response?.data?.message || "Failed to create floor information",
      );
    },
  });

  // Update floors
  const {
    mutate: updateFloor,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CreateFloorInput;
    }) => {
      const response = await axios.patch(
        `/api/hospitals/floors/update/${id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Floor information updated successfully");
      refetchFloors();
      router.push("/dashboard/hospitals/floors");
    },
    onError: (error: any) => {
      console.error("Error updating floor:", error);
      toast.error(
        error.response?.data?.message || "Failed to update floor information",
      );
    },
  });

  // Delete floor
  const {
    mutate: deleteFloor,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/hospitals/floors/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Floor information deleted successfully");
      refetchFloors();
    },
    onError: (error: any) => {
      console.error("Error deleting floor:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete floor information",
      );
    },
  });

  return {
    floor,
    isLoadingFloor,
    floorError,
    floors: floorsData?.floors || [],
    meta: floorsData?.meta,
    isLoadingFloors,
    floorsError,
    createFloor,
    isCreating,
    createError,
    updateFloor,
    isUpdating,
    updateError,
    deleteFloor,
    isDeleting,
    deleteError,
  };
};
