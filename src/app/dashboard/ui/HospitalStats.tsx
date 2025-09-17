import { useDiagnostics } from "@/hooks/useDiagnostics";
import { useHospitalFloors } from "@/hooks/useHospitalFloors";
import { useHospitalGallery } from "@/hooks/useHospitalGallery";
import { useHospitalHealthPackages } from "@/hooks/useHospitalHealthPackages";
import { useHospitalPriceCharts } from "@/hooks/useHospitalPriceCharts";
import { useQuery } from "@tanstack/react-query";
import { Activity, Building2, FileText, Image, Package } from "lucide-react";
import Link from "next/link";
import React from "react";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  link: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  icon,
  bgColor,
  textColor,
  link,
  trend,
  trendValue,
}) => (
  <Link href={link} className="block">
    <div
      className="group relative overflow-hidden rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Background pattern for visual interest */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white bg-opacity-10 transition-transform duration-300 group-hover:scale-110"></div>

      <div className="flex items-center justify-between gap-2">
        <div className="mt-4 flex flex-col">
          <h3 className="text-3xl font-bold tracking-tight">{count}</h3>
          <p className="mt-1 text-sm font-medium opacity-90">{title}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative z-10 rounded-full bg-white bg-opacity-20 p-3 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

function HospitalStats() {
  // Static data for demo purposes
  const user = { hospitalId: "demo-hospital-id" };
  // Get the hospital ID (you might need to get this from context or another source)
  const hospitalId = user?.hospitalId;

  // Fetch diagnostics
  const { data: diagnostics } = useDiagnostics();

  // Initialize hooks
  const { getAllHealthPackages } = useHospitalHealthPackages();
  const { getAllPriceCharts } = useHospitalPriceCharts();
  const { getAllFloors } = useHospitalFloors();
  const { loadHospitalGallery } = useHospitalGallery();

  // Use React Query to fetch health packages
  const { data: healthPackagesData } = useQuery({
    queryKey: ["healthPackages"],
    queryFn: () => getAllHealthPackages(),
  });

  // Use React Query to fetch price charts
  const { data: priceChartsData } = useQuery({
    queryKey: ["priceCharts"],
    queryFn: () => getAllPriceCharts(),
  });

  // Use React Query to fetch floors
  const { data: floorsData } = useQuery({
    queryKey: ["floors"],
    queryFn: () => getAllFloors(),
  });

  // Use React Query to fetch gallery images
  const { data: galleryData } = useQuery({
    queryKey: ["gallery", hospitalId],
    queryFn: () => loadHospitalGallery(hospitalId || ""),
  });

  // Calculate total number of price charts
  const priceChartsCount = priceChartsData?.charts?.[0]?.charts?.length ?? 0;

  // Calculate total number of floors
  const floorsCount = floorsData?.floors?.[0]?.floors?.length ?? 0;

  // Calculate total number of gallery images
  const galleryImagesCount = galleryData?.[0]?.images?.length ?? 0;

  // Calculate total number of health packages - FIXED based on the provided data structure
  // The packages array contains hospital package groups, and each group has a 'packages' array with the actual packages
  const healthPackagesCount =
    healthPackagesData?.packages?.reduce((total: number, packageGroup: any) => {
      return total + (packageGroup.packages?.length || 0);
    }, 0) ?? 0;

  // Stats data with actual counts
  const stats = {
    diagnostics: diagnostics?.diagnostics.length ?? 0,
    priceCharts: priceChartsCount,
    healthPackages: healthPackagesCount,
    floors: floorsCount,
    galleryImages: galleryImagesCount,
  };

  // Dummy trend data
  const trends = {
    diagnostics: { trend: "up" as const, value: 12 },
    priceCharts: { trend: "neutral" as const, value: 0 },
    healthPackages: { trend: "up" as const, value: 8 },
    floors: { trend: "down" as const, value: 3 },
    galleryImages: { trend: "up" as const, value: 15 },
  };

  return (
    <div className="mb-8 w-full">
      <h2 className="mb-5 flex items-center text-xl font-semibold text-gray-800">
        <span className="mr-3 inline-block h-6 w-1.5 rounded-full bg-indigo-600"></span>
        Hospital Statistics
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Diagnostic Tests"
          count={stats.diagnostics}
          icon={<Activity size={24} />}
          bgColor="#4F46E5"
          textColor="#FFFFFF"
          link="/dashboard/diagnostics"
          trend={trends.diagnostics.trend}
          trendValue={trends.diagnostics.value}
        />

        <StatCard
          title="Price Charts"
          count={stats.priceCharts}
          icon={<FileText size={24} />}
          bgColor="#0EA5E9"
          textColor="#FFFFFF"
          link="/dashboard/price-charts"
          trend={trends.priceCharts.trend}
          trendValue={trends.priceCharts.value}
        />

        <StatCard
          title="Health Packages"
          count={stats.healthPackages}
          icon={<Package size={24} />}
          bgColor="#10B981"
          textColor="#FFFFFF"
          link="/dashboard/health-packages"
          trend={trends.healthPackages.trend}
          trendValue={trends.healthPackages.value}
        />

        <StatCard
          title="Floor Details"
          count={stats.floors}
          icon={<Building2 size={24} />}
          bgColor="#F59E0B"
          textColor="#FFFFFF"
          link="/dashboard/floors"
          trend={trends.floors.trend}
          trendValue={trends.floors.value}
        />

        <StatCard
          title="Gallery Images"
          count={stats.galleryImages}
          icon={<Image size={24} />}
          bgColor="#EC4899"
          textColor="#FFFFFF"
          link="/dashboard/gallery"
          trend={trends.galleryImages.trend}
          trendValue={trends.galleryImages.value}
        />
      </div>
    </div>
  );
}

export default HospitalStats;
