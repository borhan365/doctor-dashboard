import { Chamber, CreateChamberInput } from "@/types/chamber";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Create a chamber
export function useChambers() {
  const router = useRouter();

  const {
    data: chambers,
    isLoading,
    error,
    refetch,
  } = useQuery<Chamber[]>({
    queryKey: ["chambers"],
    queryFn: async () => {
      const { data } = await axios.get("/api/doctors/chambers");
      return data.chambers;
    },
  });

  const createChamber = useMutation({
    mutationFn: async (chamberData: CreateChamberInput) => {
      const formData = new FormData();

      // Append all chamber data to formData
      Object.entries(chamberData).forEach(([key, value]) => {
        if (key === "contactNumbers" || key === "availableDays") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      const { data } = await axios.post("/api/doctors/chambers", formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Chamber created successfully");
      refetch();
      router.push("/doctor/chambers");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create chamber");
    },
  });

  return {
    chambers,
    isLoading,
    error,
    createChamber,
  };
}
