import { ApiUrl } from "@/app/Variables";
import { FormData, Package } from "@/types/hospitalHealthPackages";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useHospitalHealthPackages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load single health package
  const loadHealthPackage = async (packageId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/health-packages/get-single/${packageId}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Health package not found");
        }
        throw new Error("Failed to load health package");
      }

      const data = await response.json();
      return {
        hospitalId: data.hospitalId,
        packages: data.packages.map((pkg: Package) => ({
          ...pkg,
          id: crypto.randomUUID(),
          isExpanded: false,
        })),
        discount: data.discount,
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

  // Load hospital packages
  const loadHospitalPackages = async (hospitalId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiUrl}/hospitals/health-packages/check?hospitalId=${hospitalId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load health packages");
      }

      const data = await response.json();

      if (data.exists && data.packageId) {
        const packageDetails = await loadHealthPackage(data.packageId);
        return [packageDetails];
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

  // Get all health packages with pagination and filtering
  const getAllHealthPackages = async ({
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
      let url = `${ApiUrl}/hospitals/health-packages/get-all?page=${page}&limit=${limit}`;

      if (hospitalId) {
        url += `&hospitalId=${hospitalId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to load health packages");
      }

      const data = await response.json();
      return {
        packages: data.packages,
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

  // Save or update health package
  const saveHealthPackage = async (formData: FormData) => {
    try {
      if (!formData.hospitalId) {
        throw new Error("Please select a hospital");
      }

      // Validate packages
      validatePackages(formData.packages);

      // Remove unnecessary fields
      const packagesData = formData.packages.map(
        ({ id, isExpanded, ...rest }) => rest,
      );

      // Check if package exists for this hospital
      const response = await fetch(
        `${ApiUrl}/hospitals/health-packages/check?hospitalId=${formData.hospitalId}`,
      );
      const existingData = await response.json();

      // Determine endpoint and method
      let endpoint;
      let method;

      if (existingData.exists) {
        endpoint = `${ApiUrl}/hospitals/health-packages/update/${existingData.packageId}`;
        method = "PATCH";
      } else {
        endpoint = `${ApiUrl}/hospitals/health-packages/create`;
        method = "POST";
      }

      const saveResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalId: formData.hospitalId,
          packages: packagesData,
          discount: formData.discount,
        }),
      });

      const data = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(data.error || "Failed to save health package");
      }

      return data;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to save health package";
      toast.error(message);
      throw error;
    }
  };

  // Validation helper
  const validatePackages = (packages: Package[]) => {
    for (const pkg of packages) {
      if (!pkg.title.trim()) {
        throw new Error("Package title is required for all packages");
      }

      if (pkg.price <= 0) {
        throw new Error("Price must be greater than 0");
      }

      if (!pkg.services.length || !pkg.services[0].trim()) {
        throw new Error("At least one service is required per package");
      }
    }
  };

  return {
    isLoading,
    error,
    loadHealthPackage,
    loadHospitalPackages,
    getAllHealthPackages,
    saveHealthPackage,
  };
};
