import { ApiUrl } from "@/app/Variables";
import { CreateChamberInput } from "@/types/chambers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useChambers = () => {
  const queryClient = useQueryClient();

  // Get single chamber
  const useGetChamber = (id: string) => {
    return useQuery({
      queryKey: ["chamber", id],
      queryFn: async () => {
        const response = await fetch(
          `${ApiUrl}/doctors/chambers/get-single/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chamber");
        }
        const data = await response.json();
        return data.data;
      },
      enabled: !!id,
    });
  };

  // Create chamber
  const useCreateChamber = () => {
    return useMutation({
      mutationFn: async (data: FormData) => {
        const response = await fetch(`${ApiUrl}/doctors/chambers/create`, {
          method: "POST",
          body: data,
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create chamber");
        }
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chambers"] });
        toast.success("Chamber created successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  // Update chamber
  const useUpdateChamber = (id: string) => {
    return useMutation({
      mutationFn: async (data: FormData) => {
        const response = await fetch(
          `${ApiUrl}/doctors/chambers/update/${id}`,
          {
            method: "PATCH",
            body: data,
          },
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update chamber");
        }
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chambers"] });
        queryClient.invalidateQueries({ queryKey: ["chamber", id] });
        toast.success("Chamber updated successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  // Delete chamber
  const useDeleteChamber = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(
          `${ApiUrl}/doctors/chambers/delete-single/${id}`,
          {
            method: "DELETE",
          },
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to delete chamber");
        }
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chambers"] });
        toast.success("Chamber deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return {
    useGetChamber,
    useCreateChamber,
    useUpdateChamber,
    useDeleteChamber,
  };
};

// Helper function to prepare form data
export const prepareChamberFormData = (data: Partial<CreateChamberInput>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "availableDays" || key === "contactNumbers") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  return formData;
};
