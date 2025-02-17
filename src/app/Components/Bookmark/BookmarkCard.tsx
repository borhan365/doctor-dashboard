import { Hospital } from "@/types/hospital";
import { MapPin, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface BookmarkCardProps {
  hospital: Hospital;
  onRemove: () => void;
}

export default function BookmarkCard({
  hospital,
  onRemove,
}: BookmarkCardProps) {
  const handleRemove = async () => {
    try {
      const response = await fetch("/api/bookmarks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hospitalId: hospital.id }),
      });

      if (!response.ok) throw new Error("Failed to remove bookmark");

      toast.success("Bookmark removed successfully");
      onRemove();
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  return (
    <div className="flex items-start space-x-4 rounded-lg bg-slate-50 p-4">
      {/* Hospital Image */}
      <Link href={`/hospitals/${hospital.slug}`} className="flex-shrink-0">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg flex items-center justify-center">
          {hospital.featuredImage ? (
            <Image
              src={hospital.featuredImage.url}
              alt={hospital.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-[100px] w-[100px] items-center justify-center bg-slate-100">
              <span className="text-xs text-slate-500 text-center">No Image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1">
        <Link href={`/hospitals/${hospital.slug}`}>
          <h2 className="text-lg font-semibold text-slate-800 hover:text-blue-600">
            {hospital.name}
          </h2>
        </Link>

        {/* Address */}
        {hospital.address && (
          <div className="mt-1 flex items-start gap-2 text-slate-600">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{hospital.address}</span>
          </div>
        )}

        {/* Rating and Specialists */}
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm font-medium text-slate-700">4.8</span>
            <span className="text-xs text-slate-500">
              ({hospital.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Specialists */}
          <div className="flex flex-wrap gap-2">
            {hospital.specialists?.slice(0, 2).map((specialist) => (
              <span
                key={specialist.id}
                className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600"
              >
                {specialist.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="text-slate-400 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
