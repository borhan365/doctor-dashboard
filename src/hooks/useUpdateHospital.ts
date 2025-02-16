import { Hospital } from "@/types/hospital";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// Helper function to prepare form data for update
export function prepareHospitalUpdateData(formData: Hospital): FormData {
  const formDataToSend = new FormData();

  // Handle file uploads
  if (formData.featuredImage instanceof File) {
    formDataToSend.append("featuredImage", formData.featuredImage);
  }

  if (formData.banner instanceof File) {
    formDataToSend.append("banner", formData.banner);
  }

  // Handle gallery files
  if (Array.isArray(formData.gallery)) {
    formData.gallery.forEach((item) => {
      if (item.file instanceof File) {
        formDataToSend.append("gallery", item.file);
      }
    });
  }

  // Clean up the form data
  const dataToSubmit = {
    ...formData,
    // Ensure gallery is properly formatted before stringifying
    gallery: Array.isArray(formData.gallery)
      ? formData.gallery.map((item) => ({
          preview: item.preview || "",
          fileUrl: item.fileUrl || "",
        }))
      : [],

    // Remove file objects
    featuredImage: undefined,
    banner: undefined,
  };

  // Append the stringified data to FormData
  formDataToSend.append("data", JSON.stringify(dataToSubmit));

  return formDataToSend;
}

export function useUpdateHospital(slug: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
      onSuccess,
    }: {
      formData: FormData;
      onSuccess?: () => void;
    }) => {
      const response = await fetch(`/api/hospitals/update/${slug}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update hospital");
      }

      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["hospital", slug] });
      toast.success("Hospital updated successfully");
      router.push("/dashboard/hospitals");
      variables.onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Update error:", error);
      toast.error(`Failed to update hospital: ${error.message}`);
    },
  });
}
