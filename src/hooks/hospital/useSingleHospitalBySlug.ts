import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Hospital } from "@/types/hospital";

export const useSingleHospitalBySlug = (slug: string) => {
  return useQuery<Hospital>({
    queryKey: ["hospital", slug],
    queryFn: async () => {
      const response = await axios.get(`/api/hospitals/${slug}`);
      const data = response.data;

      // Parse gallery JSON string if it exists
      if (data.gallery) {
        try {
          const parsedGallery = JSON.parse(data.gallery);
          data.gallery = parsedGallery.map((item: any) => ({
            preview: item.fileUrl,
            fileUrl: item.fileUrl,
            file: undefined
          }));
        } catch (e) {
          console.error('Error parsing gallery:', e);
          data.gallery = [];
        }
      } else {
        data.gallery = [];
      }

      return data;
    },
    enabled: !!slug,
  });
};
