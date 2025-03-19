import { ApiUrl } from "@/app/Variables";
import { Doctor, DoctorResponse } from "@/types/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface FetchDoctorsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  locationId?: string;
  specialistId?: string;
  language?: string;
  isFeatured?: boolean;
}

async function fetchDoctors(
  params: FetchDoctorsParams,
): Promise<DoctorResponse> {
  const queryParams = new URLSearchParams();

  // Add all params to query string
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${ApiUrl}/doctors/doctor/get-all?${queryParams}`,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch doctors");
  }

  return response.json();
}

export function useAllDoctors(excludeId?: string) {
  return useQuery({
    queryKey: ["all-doctors", excludeId],
    queryFn: async () => {
      const response = await fetch(
        `${ApiUrl}/doctors/doctor/get-all?limit=100`,
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch doctors");
      }

      const data = await response.json();
      return excludeId
        ? data.doctors.filter((doctor: any) => doctor.id !== excludeId)
        : data.doctors;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function useDoctors(params: FetchDoctorsParams = {}) {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => fetchDoctors(params),
    select: (data: any) => ({
      doctors:
        data.doctors?.map((doctor: any) => ({
          ...doctor,
          scheduleDate: doctor.scheduleDate
            ? new Date(doctor.scheduleDate)
            : undefined,
          features: doctor.features?.map((feature: any) => {
            const { id, ...rest } = feature;
            return { id: id || crypto.randomUUID(), ...rest };
          }),
          doctorType: doctor.doctorType
            ? (() => {
                const { id, ...rest } = doctor.doctorType;
                return { id: id || crypto.randomUUID(), ...rest };
              })()
            : null,
          specialists: doctor.specialists?.map((specialist: any) => {
            const { id, ...rest } = specialist;
            return { id: id || crypto.randomUUID(), ...rest };
          }),
        })) || [],
      meta: data.meta || {},
    }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSingleDoctor(slug: string) {
  return useQuery({
    queryKey: ["doctor", slug],
    queryFn: async () => {
      const response = await fetch(
        `${ApiUrl}/doctors/doctor/get-single/${slug}`,
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch doctor");
      }
      return response.json();
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

interface CreateDoctorResponse {
  status: string;
  message: string;
  data: Doctor;
}

interface UpdateDoctorResponse {
  status: string;
  message: string;
  data: Doctor;
}

// Create doctor mutation
export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${ApiUrl}/doctors/doctor/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.details || error.error || "Failed to create doctor",
        );
      }

      return response.json() as Promise<CreateDoctorResponse>;
    },
    onSuccess: (data) => {
      // Invalidate and refetch doctors list
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success(data.message || "Doctor created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Update doctor mutation
export function useUpdateDoctor(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Add _method to formData to indicate this is a PATCH request
      formData.append("_method", "PATCH");

      const response = await fetch(`${ApiUrl}/doctors/doctor/update/${slug}`, {
        method: "POST", // Change to POST method
        headers: {
          // Remove Content-Type header for FormData
          // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
        credentials: "include", // This is important
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.details || error.error || "Failed to update doctor",
        );
      }

      return response.json() as Promise<UpdateDoctorResponse>;
    },
    onSuccess: (data) => {
      // Invalidate and refetch both lists and single doctor
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", slug] });
      toast.success(data.message || "Doctor updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Delete doctor mutation
export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      const response = await fetch(
        `${ApiUrl}/doctors/doctor/single-delete/${slug}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.details || error.error || "Failed to delete doctor",
        );
      }

      return response.status === 204;
    },
    onSuccess: () => {
      // Invalidate and refetch doctors list
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Doctor deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export const useDoctorProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Load single doctor - use useCallback to prevent recreation on each render
  const loadDoctor = useCallback(async (slug: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/doctors/doctor/get-single/${slug}`,
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to load doctor");
      }

      const responseData = await response.json();

      // Extract the doctor data from the response
      const data = responseData.data;

      // Transform the data to match our form structure
      const formattedData = {
        // Basic Info
        prefixId: data.prefixId || null,
        doctorTypeId: data.doctorTypeId || null,
        name: data.name || "",
        bnName: data.bnName || "",
        excerpt: data.excerpt || "",
        bnExcerpt: data.bnExcerpt || "",
        overview: data.overview || "",
        bnOverview: data.bnOverview || "",
        description: data.description || "",
        bnDescription: data.bnDescription || "",

        // Status and Features
        isFeatured: data.isFeatured || false,
        isVerified: data.isVerified || false,
        isSponsored: data.isSponsored || false,
        status: data.status || "published",

        // Medical Information
        bmdcNumber: data.bmdcNumber || "",
        discountForHealthaUser: data.discountForHealthaUser || 0,
        discountForHealthaUserNote: data.discountForHealthaUserNote || "",
        discountForHealthaUserNoteBn: data.discountForHealthaUserNoteBn || "",

        // Personal Info
        gender: data.gender || "",
        experience: data.experience || 0,
        about: data.about || "",
        emailAddresses: data.emailAddresses?.length
          ? data.emailAddresses
          : [""],
        phoneNumbers: data.phoneNumbers?.length ? data.phoneNumbers : [""],
        website: data.website || "",
        videoUrl: data.videoUrl || "",

        // Location Info
        locationId: data.locationId || null,

        // Social Media
        facebookLink: data.facebookLink || "",
        twitterLink: data.twitterLink || "",
        instagramLink: data.instagramLink || "",
        youtubeLink: data.youtubeLink || "",
        linkedinLink: data.linkedinLink || "",

        // Relations
        specialists: data.specialists || [],
        treatments: data.treatments || [],
        degrees: data.degrees || [],
        languages: data.languages || [],
        adminId: data.adminId || null,
        userId: data.userId || null,
        featuredImage: data.featuredImage || null,

        // FAQs
        faqs: data.faqs?.length
          ? data.faqs
          : [
              {
                question: "",
                answer: "",
                bnQuestion: "",
                bnAnswer: "",
              },
            ],
      };

      return formattedData;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load doctor";
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save or update doctor - use useCallback to prevent recreation on each render
  const saveDoctor = useCallback(
    async (formData: FormData, slug?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        let endpoint;
        let method;

        if (slug) {
          endpoint = `${ApiUrl}/doctors/doctor/update/${slug}`;
          method = "PUT"; // Change from POST to PUT to match the API route
        } else {
          endpoint = `${ApiUrl}/doctors/doctor/create`;
          method = "POST";
        }

        const response = await fetch(endpoint, {
          method,
          credentials: "include", // This is important
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.text();
          let errorMessage;
          try {
            const parsedError = JSON.parse(errorData);
            if (parsedError.code === "VALIDATION_ERROR") {
              // Handle validation errors
              const validationErrors = parsedError.details
                .map((err: any) => `${err.field}: ${err.message}`)
                .join("\n");
              toast.error(`Validation Errors:\n${validationErrors}`, {
                duration: 5000,
              });
              throw new Error(validationErrors);
            } else {
              errorMessage =
                parsedError.details ||
                parsedError.error ||
                "Failed to save doctor";
              toast.error(errorMessage);
              throw new Error(errorMessage);
            }
          } catch (parseError) {
            errorMessage = "Failed to save doctor";
            toast.error(errorMessage);
            throw new Error(errorMessage);
          }
        }

        const data = await response.json();

        if (data.status === "success") {
          toast.success(data.message || "Doctor saved successfully");
          await queryClient.invalidateQueries({ queryKey: ["doctor"] });
          await queryClient.invalidateQueries({ queryKey: ["doctors"] });
          return data.data;
        } else {
          throw new Error(data.error || "Failed to save doctor");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to save doctor";
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [queryClient],
  );

  return {
    isLoading,
    error,
    loadDoctor,
    saveDoctor,
  };
};
