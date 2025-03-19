import { ApiUrl } from "@/app/Variables";
import { GalleryFormData } from "@/types/hospitalGallery";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useHospitalGallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load single gallery
  const loadGallery = async (galleryId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/gallery/get-single/${galleryId}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Gallery not found");
        }
        throw new Error("Failed to load gallery");
      }

      const data = await response.json();
      return {
        hospitalId: data.hospitalId,
        images: data.images,
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

  // Load hospital gallery
  const loadHospitalGallery = async (hospitalId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/gallery/check?hospitalId=${hospitalId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load gallery");
      }

      const data = await response.json();

      if (data.exists && data.galleryId) {
        const galleryDetails = await loadGallery(data.galleryId);
        return [galleryDetails];
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

  // Save or update gallery
  const saveGallery = async (formData: GalleryFormData) => {
    try {
      if (!formData.hospitalId) {
        throw new Error("Please select a hospital");
      }

      if (formData.images.length === 0) {
        throw new Error("Please add at least one image");
      }

      // Check if gallery exists for this hospital
      const response = await fetch(
        `${ApiUrl}/hospitals/gallery/check?hospitalId=${formData.hospitalId}`,
      );
      const existingData = await response.json();

      // Determine endpoint and method
      let endpoint;
      let method;

      if (existingData.exists) {
        endpoint = `${ApiUrl}/hospitals/gallery/update/${existingData.galleryId}`;
        method = "PATCH";
      } else {
        endpoint = `${ApiUrl}/hospitals/gallery/create`;
        method = "POST";
      }

      const saveResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(data.error || "Failed to save gallery");
      }

      return data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save gallery";
      toast.error(message);
      throw error;
    }
  };

  // Get all galleries with pagination and filtering
  const getAllGalleries = async ({
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
      let url = `${ApiUrl}/hospitals/gallery/get-all?page=${page}&limit=${limit}`;

      if (hospitalId) {
        url += `&hospitalId=${hospitalId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to load galleries");
      }

      const data = await response.json();
      return {
        galleries: data.galleries,
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
    loadGallery,
    loadHospitalGallery,
    saveGallery,
    getAllGalleries,
  };
};
