import {
  Clipboard,
  HeartHandshake,
  MapPin,
  Star,
  Verified,
} from "lucide-react";
import Image from "next/image";
import DoctorMenu from "./DoctorMenu";

function DoctorProfileCardSection({ label }: { label: string }) {
  return (
    <>
      <div className="rounded-xl bg-white p-6 !pb-0 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Image Section */}
          <div className="w-full flex-shrink-0 md:w-[180px]">
            <div className="relative">
              <Image
                src="https://healtha.io/wp-content/uploads/2024/10/Dr.-Chowdhury-Maimuna-Raisa.webp"
                alt="Dr. Tapas Chowdhury"
                width={200}
                height={200}
                className="w-full rounded-xl object-cover shadow-sm"
                priority
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-md">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-900">
                    4.8
                  </span>
                  <span className="text-xs text-slate-500">(124)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-900">
                  Dr. Tapas Chowdhury {label}
                </h1>
                <Verified className="h-6 w-6 text-blue-600" />
              </div>
              <p className="mt-1 text-lg text-slate-600">
                MBBS, BCS (Health), DCH (BSMMU)
              </p>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2">
              {["Medicine", "Diabetes"].map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* Info Grid */}
            <div className="grid gap-2 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-slate-700">Chattogram, Bangladesh</span>
              </div>

              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-blue-600" />
                <span className="text-slate-700">10 years of experience</span>
              </div>

              <div className="flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-blue-600" />
                <span className="text-slate-700">BMDC Number: BMDC-12345</span>
              </div>
            </div>

            {/* Reviews Summary */}
            <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 pt-4">
              <div>
                <div className="flex items-center gap-2">
                  <Star
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                  />
                  <span className="text-lg font-semibold text-slate-900">
                    4.8
                  </span>
                </div>
                <p className="text-sm text-slate-500">Overall Rating</p>
              </div>

              <div>
                <div className="text-lg font-semibold text-slate-900">124</div>
                <p className="text-sm text-slate-500">Patient Reviews</p>
              </div>

              <div>
                <div className="text-lg font-semibold text-green-600">98%</div>
                <p className="text-sm text-slate-500">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Menu */}
        <DoctorMenu />
      </div>
    </>
  );
}

export default DoctorProfileCardSection;
