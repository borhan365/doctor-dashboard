import { ApiUrl } from "@/app/Variables";
import { FormData } from "@/types/hospitalFloors";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Floor {
  name: string;
  bnName?: string;
  description?: string;
  bnDescription?: string;
  services: string[];
  bnServices?: string[];
}

interface FloorInformation {
  id: string;
  floors: Floor[];
  hospitalId: string;
  hospital?: {
    name: string;
    featuredImage?: {
      fileUrl?: string;
    };
    address?: string;
  };
  createdAt: string;
}

interface CreateFloorsPayload {
  hospitalId: string;
  floors: Floor[];
}

export const useFloors = (id?: string) => {
  const router = useRouter();

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
    data: floors,
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
    mutate: createFloors,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: async (data: CreateFloorsPayload) => {
      const response = await axios.post("/api/hospitals/floors/create", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Floors created successfully");
      refetchFloors();
      router.push("/dashboard/hospitals/floors");
    },
    onError: (error: any) => {
      console.error("Error creating floors:", error);
      toast.error(error.response?.data?.message || "Failed to create floors");
    },
  });

  // Update floors
  const {
    mutate: updateFloors,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CreateFloorsPayload;
    }) => {
      const response = await axios.patch(
        `/api/hospitals/floors/update/${id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Floors updated successfully");
      refetchFloors();
      router.push("/dashboard/hospitals/floors");
    },
    onError: (error: any) => {
      console.error("Error updating floors:", error);
      toast.error(error.response?.data?.message || "Failed to update floors");
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
      toast.success("Floor deleted successfully");
      refetchFloors();
    },
    onError: (error: any) => {
      console.error("Error deleting floor:", error);
      toast.error(error.response?.data?.message || "Failed to delete floor");
    },
  });

  return {
    floor,
    isLoadingFloor,
    floorError,
    floors,
    isLoadingFloors,
    floorsError,
    createFloors,
    isCreating,
    createError,
    updateFloors,
    isUpdating,
    updateError,
    deleteFloor,
    isDeleting,
    deleteError,
  };
};

export const useHospitalFloors = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load single floor information
  const loadFloor = async (floorId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/floors/get-single/${floorId}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Floor information not found");
        }
        throw new Error("Failed to load floor information");
      }

      const data = await response.json();
      return {
        hospitalId: data.hospitalId,
        floors: data.floors.map((floor: any) => ({
          ...floor,
          id: crypto.randomUUID(),
          isExpanded: false,
        })),
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Load hospital floors
  const loadHospitalFloors = async (hospitalId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/floors/check?hospitalId=${hospitalId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load floor information");
      }

      const data = await response.json();

      if (data.exists && data.floorId) {
        const floorDetails = await loadFloor(data.floorId);
        return [floorDetails];
      }

      return [];
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Save or update floor information
  const saveFloor = async (formData: FormData) => {
    try {
      if (!formData.hospitalId) {
        throw new Error("Please select a hospital");
      }

      // Validate floors
      for (const floor of formData.floors) {
        if (!floor.name.trim()) {
          throw new Error("Floor name is required for all floors");
        }

        if (!floor.services.length || !floor.services[0].trim()) {
          throw new Error("At least one service is required per floor");
        }
      }

      // Remove unnecessary fields
      const floorsData = formData.floors.map(
        ({ id, isExpanded, ...rest }) => rest,
      );

      // Check if floor information exists for this hospital
      const response = await fetch(
        `${ApiUrl}/hospitals/floors/check?hospitalId=${formData.hospitalId}`,
      );
      const existingData = await response.json();

      // Determine endpoint and method
      let endpoint;
      let method;

      if (existingData.exists) {
        endpoint = `${ApiUrl}/hospitals/floors/update/${existingData.floorId}`;
        method = "PATCH";
      } else {
        endpoint = `${ApiUrl}/hospitals/floors/create`;
        method = "POST";
      }

      const saveResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalId: formData.hospitalId,
          floors: floorsData,
        }),
      });

      const data = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(data.error || "Failed to save floor information");
      }

      return data;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to save floor information";
      toast.error(message);
      throw error;
    }
  };

  // Get all floors with pagination and filtering
  const getAllFloors = async ({
    page = 1,
    limit = 10,
    hospitalId = null,
  }: {
    page?: number;
    limit?: number;
    hospitalId?: string | null;
  } = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      let url = `${ApiUrl}/hospitals/floors/get-all?page=${page}&limit=${limit}`;

      if (hospitalId) {
        url += `&hospitalId=${hospitalId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to load floors");
      }

      const data = await response.json();
      return {
        floors: data.floors,
        meta: data.meta,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    loadFloor,
    loadHospitalFloors,
    saveFloor,
    getAllFloors,
  };
};
