import { ApiUrl } from "@/app/Variables";
import { useAuth } from "@/store/useAuth";
import { Doctor } from "@/types/doctors";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Function to fetch a single doctor
async function fetchDoctor(slug: string): Promise<Doctor> {
  const response = await fetch(`${ApiUrl}/doctors/doctor/get-single/${slug}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch doctor");
  }

  const data = await response.json();
  return data.data; // Extract the doctor data from the response
}

// Hook to get doctor details
export function useDoctorDetails() {
  const { user, doctor } = useAuth();
  // Try to get slug from either user or doctor object
  const doctorSlug = user?.doctorSlug || doctor?.slug;

  return useQuery({
    queryKey: ["doctor", doctorSlug],
    queryFn: () => fetchDoctor(doctorSlug as string),
    enabled: !!doctorSlug,
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : String(error));
    },
    select: (data) => ({
      ...data,
      scheduleDate: data.scheduleDate ? new Date(data.scheduleDate) : undefined,
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once to avoid excessive requests on failure
  });
}
