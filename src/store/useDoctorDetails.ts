import { Doctor } from "@/types/doctors";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Mock doctor data for static demo
const mockDoctor: Doctor = {
  id: "1",
  slug: "demo-doctor",
  name: "Dr. John Doe",
  bnName: "ড. জন ডো",
  excerpt: "Experienced cardiologist with 15+ years of practice",
  bnExcerpt: "১৫+ বছরের অভিজ্ঞতা সহ হৃদরোগ বিশেষজ্ঞ",
  overview:
    "Dr. John Doe is a renowned cardiologist specializing in interventional cardiology and heart disease prevention.",
  bnOverview:
    "ড. জন ডো একজন খ্যাতিমান হৃদরোগ বিশেষজ্ঞ যিনি হস্তক্ষেপমূলক কার্ডিওলজি এবং হৃদরোগ প্রতিরোধে বিশেষজ্ঞ।",
  description:
    "Comprehensive description of the doctor's expertise and experience.",
  bnDescription: "চিকিৎসকের দক্ষতা এবং অভিজ্ঞতার বিস্তৃত বিবরণ।",
  status: "published",
  featured: true,
  featuredImage: "/images/doctor/demo-doctor.webp",
  bmdcNumber: "12345",
  phone: "+8801234567890",
  email: "demo@example.com",
  website: "https://demo-doctor.com",
  facebook: "https://facebook.com/demo-doctor",
  twitter: "https://twitter.com/demo-doctor",
  linkedin: "https://linkedin.com/in/demo-doctor",
  instagram: "https://instagram.com/demo-doctor",
  youtube: "https://youtube.com/demo-doctor",
  scheduleDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  prefixId: "1",
  doctorTypeId: "1",
  prefix: { id: "1", name: "Dr.", bnName: "ড." },
  doctorType: { id: "1", name: "Cardiologist", bnName: "হৃদরোগ বিশেষজ্ঞ" },
  chambers: [],
  educations: [],
  experiences: [],
  awards: [],
  publications: [],
  affiliations: [],
  treatments: [],
  degrees: [],
};

// Hook to get doctor details (now returns mock data)
export function useDoctorDetails() {
  return useQuery({
    queryKey: ["doctor", "demo-doctor"],
    queryFn: () => Promise.resolve(mockDoctor),
    enabled: true,
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
