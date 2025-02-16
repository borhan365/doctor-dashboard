import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useBranchDetails(branchId: string) {
  return useQuery({
    queryKey: ["branch", branchId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/hospitals/branches/${branchId}`);
      return data;
    },
    enabled: !!branchId,
  });
} 