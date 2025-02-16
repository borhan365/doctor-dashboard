import {
  Bed,
  Building2,
  MapPin,
  Star,
  Stethoscope,
  Verified,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function HospitalListCard({ hospital }: { hospital: any }) {
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Image Section */}
        <div className="flex-shrink-0">
          {hospital.featuredImage ? (
            <Image
              src={hospital.featuredImage}
              alt={hospital.name}
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-lg bg-slate-100">
              <span className="text-xs text-slate-500">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="mb-2">
            <Link
              href={`/hospitals/${hospital.slug}`}
              className="group inline-flex items-center gap-2"
            >
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                {hospital.name}
              </h3>
              {hospital?.isVerified && (
                <Verified className="h-5 w-5 flex-shrink-0 fill-blue-500 text-white group-hover:fill-blue-600" />
              )}
            </Link>
            {hospital.type && (
              <p className="mt-1 text-sm text-slate-600">{hospital.type}</p>
            )}
            {hospital.address && (
              <p className="mt-1 text-sm text-slate-500">{hospital.address}</p>
            )}
          </div>

          {/* Specialties */}
          {hospital.specialists && hospital.specialists.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {hospital.specialists.map((specialty: any, index: number) => (
                <Link
                  href={`/hospitals/specialists/${specialty.slug}`}
                  key={index}
                  className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
                >
                  {specialty.title}
                </Link>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {hospital.beds && (
              <div className="flex items-center">
                <Bed className="mr-1 h-4 w-4 text-blue-600" />
                <span>{hospital.beds} Beds</span>
              </div>
            )}
            {hospital.doctors && (
              <div className="flex items-center">
                <Stethoscope className="mr-1 h-4 w-4 text-blue-600" />
                <span>{hospital.doctors} Doctors</span>
              </div>
            )}
            {hospital.departments && (
              <div className="flex items-center">
                <Building2 className="mr-1 h-4 w-4 text-blue-600" />
                <span>{hospital.departments} Dpt</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
            {/* Location */}
            {hospital.locations && hospital.locations.length > 0 ? (
              <Link
                href={`/hospitals/location/${hospital?.locations[0].slug}`}
                className="flex items-center text-sm text-slate-600 hover:text-blue-600"
              >
                <MapPin className="mr-1 h-4 w-4" />
                {hospital.locations[0].title}
              </Link>
            ) : (
              <div className="flex items-center text-sm text-slate-400">
                <MapPin className="mr-1 h-4 w-4" />
                Location not set
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center text-sm">
              {hospital.reviews && hospital.reviews.count > 0 ? (
                <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
              ) : (
                <Star className="mr-1 h-4 w-4 text-slate-400" />
              )}
              <span className="font-medium text-slate-900">
                {hospital.reviews && hospital.reviews.rating}
              </span>
              <span className="ml-1 text-slate-500">
                {hospital.reviews && `(${hospital.reviews.count})`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalListCard;
