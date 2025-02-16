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

function HospitalGridCard({ hospital }: { hospital: any }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header with Image and Title */}
      <div className="mb-4 flex flex-col items-start">
        {/* Image */}
        {hospital.featuredImage ? (
          <div className="mb-4">
            <Image
              src={hospital.featuredImage}
              alt={hospital.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-md bg-slate-200">
            <span className="text-xs text-slate-500">No Image</span>
          </div>
        )}

        {/* Title and Type */}
        <div className="w-full">
          <Link
            href={`/hospitals/${hospital.slug}`}
            className="text-lg text-slate-900 hover:text-blue-600"
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold leading-6 text-slate-900 hover:text-blue-600">
              {hospital.name}
              {hospital?.isVerified && (
                <Verified className="h-5 w-5 fill-blue-500 text-white hover:fill-blue-600" />
              )}
            </h3>
          </Link>
          {hospital.address && (
            <p className="mt-1 text-sm text-slate-600">{hospital.address}</p>
          )}
          {hospital.type && (
            <p className="mt-1 text-sm text-slate-600">{hospital.type}</p>
          )}
        </div>
      </div>

      {/* Specialties */}
      {hospital.specialists && hospital.specialists.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {hospital.specialists &&
            hospital.specialists.map((specialty: any, index: number) => (
              <Link
                href={`/hospitals/specialists/${specialty.slug}`}
                key={index}
                className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                {specialty.title}
              </Link>
            ))}
        </div>
      )}

      {/* Stats */}
      <div className="mb-4 flex items-center gap-4 text-sm text-slate-600">
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
      <div className="flex items-center justify-between border-t border-slate-100 pt-2">
        {/* Location */}
        {hospital.locations && hospital.locations.length > 0 ? (
          <Link
            href={`/hospitals/location/${hospital?.locations[0].slug}`}
            className="flex items-center text-sm text-slate-400"
          >
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="mr-1 h-4 w-4 text-slate-400" />
              {hospital.locations[0].title}
            </div>
          </Link>
        ) : (
          <div className="flex items-center text-sm text-slate-400">
            <MapPin className="mr-1 h-4 w-4 text-slate-400" />
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
  );
}

export default HospitalGridCard;
