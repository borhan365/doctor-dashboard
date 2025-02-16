import { cn } from "@/lib/utils";
import { HeartHandshake, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DoctorReviews {
  rating: number;
  count: number;
}

interface Doctor {
  id: string;
  name: string;
  image?: string;
  qualifications: string;
  specialties: string[];
  chamber: string;
  experience: string;
  location: string;
  country: string;
  reviews?: DoctorReviews;
}

interface DoctorGridCardProps {
  doctor: Doctor;
  profileType: "row" | "column";
}

function DoctorGridCard({ doctor, profileType }: DoctorGridCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:bg-slate-800",
        profileType === "column" &&
          "border border-slate-100 dark:border-slate-700",
        "group", // Added for hover effects
      )}
    >
      <div className="p-4 sm:p-6">
        {/* Profile Section */}
        <div
          className={cn(
            "mb-4 flex",
            profileType === "column"
              ? "sm:items-left flex-col items-center text-center sm:text-left"
              : "items-center",
          )}
        >
          {/* Image/Avatar */}
          <div className="relative w-20 h-20 mr-2">
            {doctor.image && doctor.image.startsWith("http") ? (
              <Image
                src={doctor.image}
                alt={`Profile picture of Dr. ${doctor.name}`}
                width={80}
                height={80}
                className={cn(
                  "rounded-full object-cover",
                  profileType === "column"
                    ? "mb-3 h-20 w-20 sm:h-24 sm:w-24"
                    : "mr-4 h-20 w-20",
                )}
              />
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700",
                  profileType === "column"
                    ? "mb-3 h-20 w-20 sm:h-24 sm:w-24"
                    : "mr-4 h-20 w-20",
                )}
              >
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Name and Qualifications */}
          <div className={cn(profileType === "column" && "w-full") || "w-full"}>
            <Link
              href={`/doctors/${doctor.id}`}
              className="inline-block text-lg font-semibold text-slate-900 transition-colors hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
            >
              <h2>Dr. {doctor.name}</h2>
            </Link>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {doctor.qualifications}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-3">
          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {doctor?.specialties?.map((specialty: string, index: number) => (
              <span
                key={index}
                className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 sm:text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Chamber Info */}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium dark:text-slate-300">Chamber:</span>{" "}
            {doctor.chamber}
          </p>

          {/* Experience */}
          <div className="flex items-center text-sm">
            <HeartHandshake className="mr-1.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-600 dark:text-slate-400">
              {doctor.experience} of experience
            </span>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            {/* Location */}
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="mr-1.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>
                {doctor.location}, {doctor.country}
              </span>
            </div>

            {/* Reviews */}
            {doctor.reviews && (
              <div className="flex items-center text-sm">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {doctor.reviews.rating}
                </span>
                <span className="ml-1 text-slate-500 dark:text-slate-400">
                  ({doctor.reviews.count})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default DoctorGridCard;
