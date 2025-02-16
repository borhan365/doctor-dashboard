import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LocationResponse } from "@/types/location.types";

// Get all locations with their subLocations
export function useParentLocations() {
  return useQuery<LocationResponse>({
    queryKey: ["parent-locations"],
    queryFn: async () => {
      const response = await axios.get("/api/locations", {
        params: {
          status: "published",
          limit: 100,
          parentId: null, // Get only top-level locations
        },
      });
      return response.data;
    },
  });
}

// Get sub locations (locations with parent and sublocations)
export function useSubLocations(parentId?: string) {
  return useQuery<LocationResponse>({
    queryKey: ["sub-locations", parentId],
    queryFn: async () => {
      const response = await axios.get("/api/locations", {
        params: {
          status: "published",
          limit: 100,
          parentId: parentId,
          hasSubLocations: true, // Get locations that have sublocations
        },
      });
      return response.data;
    },
    enabled: !!parentId,
  });
}

// Get child locations (locations with parent but no sublocations)
export function useChildLocations(subLocationId?: string) {
  return useQuery<LocationResponse>({
    queryKey: ["child-locations", subLocationId],
    queryFn: async () => {
      const response = await axios.get("/api/locations", {
        params: {
          status: "published",
          limit: 100,
          parentId: subLocationId,
          hasSubLocations: false, // Get locations that don't have sublocations
        },
      });
      return response.data;
    },
    enabled: !!subLocationId,
  });
}
