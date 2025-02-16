import { Star } from "lucide-react";
import Image from "next/image";
import HospitalMenu from "../HospitalMenu";

function HospitalDoctorProfileCard() {
  return (
    <>
      <div className="rounded-xl bg-white p-6 !pb-0 shadow-sm sm:p-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Image Section */}
          <div className="w-full flex-shrink-0 md:w-[180px]">
            <div className="relative">
              <Image
                src="https://healtha.io/wp-content/uploads/2024/09/Ibn-Sina-Diagnostic-Consultation-Center.webp"
                alt="Dhaka Medical College Hospital"
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
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-900">
                  Dhaka Medical College Hospital Doctors
                </h1>
              </div>
              <p className="mt-1 text-lg text-slate-600">
                Government Medical College & Hospital
              </p>
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

        {/* Package Menu */}
        <HospitalMenu />
      </div>
    </>
  );
}

export default HospitalDoctorProfileCard;
