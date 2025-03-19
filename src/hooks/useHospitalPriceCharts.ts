import { ApiUrl } from "@/app/Variables";
import { FormData, PriceChart } from "@/types/hospitalPriceCharts";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useHospitalPriceCharts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load single price chart
  const loadPriceChart = async (chartId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/price-charts/get-single/${chartId}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Price chart not found");
        }
        throw new Error("Failed to load price chart");
      }

      const chartData = await response.json();

      if (!chartData.charts) {
        throw new Error("Invalid price chart data received");
      }

      return {
        hospitalId: chartData.hospitalId,
        charts: chartData.charts.map((chart: PriceChart) => ({
          ...chart,
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

  // Check existing charts
  const checkExistingCharts = async (hospitalId: string) => {
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/price-charts/check?hospitalId=${hospitalId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to check price chart");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error checking price chart";
      toast.error(message);
      throw error;
    }
  };

  // Save or update price chart
  const savePriceChart = async (formData: FormData, chartId?: string) => {
    try {
      if (!formData.hospitalId) {
        throw new Error("Please select a hospital");
      }

      // Validate charts
      validateCharts(formData.charts);

      // Remove unnecessary fields
      const chartsData = formData.charts.map(
        ({ id, isExpanded, ...rest }) => rest,
      );

      // First check if a chart exists for this hospital
      const response = await fetch(
        `${ApiUrl}/hospitals/price-charts/check?hospitalId=${formData.hospitalId}`,
      );
      const existingData = await response.json();

      // Determine the endpoint and method based on existing data
      let endpoint;
      let method;

      if (existingData.exists) {
        // If chart exists, always update the existing one
        endpoint = `${ApiUrl}/hospitals/price-charts/update/${existingData.chartId}`;
        method = "PATCH";
      } else {
        // Only create if no chart exists
        endpoint = `${ApiUrl}/hospitals/price-charts/create`;
        method = "POST";
      }

      const saveResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalId: formData.hospitalId,
          charts: chartsData,
        }),
      });

      const data = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(data.error || "Failed to save price chart");
      }

      return data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save price chart";
      toast.error(message);
      throw error;
    }
  };

  // Validation helper
  const validateCharts = (charts: PriceChart[]) => {
    for (const chart of charts) {
      if (!chart.title.trim()) {
        throw new Error("Chart title is required for all charts");
      }

      if (!chart.items.length || !chart.items[0].title.trim()) {
        throw new Error("At least one item is required per chart");
      }
    }
  };

  // Add this new function to fetch charts by hospitalId
  const loadHospitalCharts = async (hospitalId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/price-charts/check?hospitalId=${hospitalId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load price charts");
      }

      const data = await response.json();

      // If chart exists, fetch its details
      if (data.exists && data.chartId) {
        const chartDetails = await loadPriceChart(data.chartId);
        return [chartDetails]; // Return as array to maintain consistency
      }

      return []; // Return empty array if no charts exist
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get all price charts with pagination and filtering
  const getAllPriceCharts = async ({
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
      let url = `${ApiUrl}/hospitals/price-charts/get-all?page=${page}&limit=${limit}`;

      if (hospitalId) {
        url += `&hospitalId=${hospitalId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to load price charts");
      }

      const data = await response.json();
      return {
        charts: data.charts,
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
    loadPriceChart,
    loadHospitalCharts,
    savePriceChart,
    getAllPriceCharts,
  };
};
