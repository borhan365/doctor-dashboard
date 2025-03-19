import { CreateGalleryInput, GalleryItem } from "@/types/gallery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface GalleriesResponse {
  galleryItems: GalleryItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useGalleries = (page = 1, hospitalId?: string) => {
  const queryClient = useQueryClient();

  // Fetch galleries
  const {
    data: galleries,
    isLoading: isLoadingGalleries,
    error: galleriesError,
  } = useQuery<GalleriesResponse>({
    queryKey: ["galleries", page, hospitalId],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });

      if (hospitalId) {
        params.append("hospitalId", hospitalId);
      }

      const response = await fetch(`/api/hospitals/gallery/get-all?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch galleries");
      }
      return response.json();
    },
  });

  // Create gallery
  const { mutateAsync: createGallery, isPending: isCreating } = useMutation({
    mutationFn: async (data: CreateGalleryInput) => {
      const response = await fetch("/api/hospitals/gallery/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create gallery item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
      toast.success("Gallery item created successfully");
    },
    onError: (error) => {
      console.error("Error creating gallery:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create gallery item",
      );
    },
  });

  // Update gallery
  const { mutateAsync: updateGallery, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateGalleryInput>;
    }) => {
      const response = await fetch(`/api/hospitals/gallery/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update gallery item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
      toast.success("Gallery item updated successfully");
    },
    onError: (error) => {
      console.error("Error updating gallery:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update gallery item",
      );
    },
  });

  // Delete gallery
  const { mutateAsync: deleteGallery, isPending: isDeleting } = useMutation({
    mutationFn: async (galleryId: string) => {
      const response = await fetch(
        `/api/hospitals/gallery/delete/${galleryId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete gallery item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
      toast.success("Gallery item deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting gallery:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete gallery item",
      );
    },
  });

  return {
    galleries: galleries?.galleryItems || [],
    meta: galleries?.meta,
    isLoadingGalleries,
    galleriesError,
    createGallery,
    updateGallery,
    deleteGallery,
    isCreating,
    isUpdating,
    isDeleting,
  };
};
