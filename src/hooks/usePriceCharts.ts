import { CreatePriceChartInput } from "@/types/priceCharts";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface UsePriceChartsOptions {
  page?: number;
  limit?: number;
  hospitalId?: string;
  id?: string;
}

export const usePriceCharts = (options: UsePriceChartsOptions = {}) => {
  const router = useRouter();
  const { id } = options;

  // Fetch single price chart
  const {
    data: priceChart,
    isLoading: isLoadingPriceChart,
    error: priceChartError,
  } = useQuery({
    queryKey: ["hospital-price-chart", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axios.get(
        `/api/hospitals/price-charts/get-single/${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

  // Fetch all price charts
  const {
    data: priceChartsData,
    isLoading: isLoadingPriceCharts,
    error: priceChartsError,
    refetch: refetchPriceCharts,
  } = useQuery({
    queryKey: ["hospital-price-charts"],
    queryFn: async () => {
      const response = await axios.get("/api/hospitals/price-charts/get-all");
      return response.data;
    },
    enabled: !id,
  });

  // Create price chart
  const {
    mutate: createPriceChart,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: async (data: CreatePriceChartInput) => {
      const response = await axios.post(
        "/api/hospitals/price-charts/create",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Price chart created successfully");
      refetchPriceCharts();
      router.push("/dashboard/hospitals/price-charts");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to create price chart",
      );
    },
  });

  // Update price chart
  const {
    mutate: updatePriceChart,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CreatePriceChartInput;
    }) => {
      const response = await axios.patch(
        `/api/hospitals/price-charts/update/${id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Price chart updated successfully");
      refetchPriceCharts();
      router.push("/dashboard/hospitals/price-charts");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update price chart",
      );
    },
  });

  // Delete price chart
  const {
    mutate: deletePriceChart,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `/api/hospitals/price-charts/delete/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Price chart deleted successfully");
      refetchPriceCharts();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete price chart",
      );
    },
  });

  return {
    priceChart,
    isLoadingPriceChart,
    priceChartError,
    priceCharts: priceChartsData?.priceCharts || [],
    meta: priceChartsData?.meta,
    isLoadingPriceCharts,
    priceChartsError,
    createPriceChart,
    isCreating,
    createError,
    updatePriceChart,
    isUpdating,
    updateError,
    deletePriceChart,
    isDeleting,
    deleteError,
  };
};
