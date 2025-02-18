"use client";

import { Building, Phone, Shield, Users } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export function Payment({ onNext }: { onNext: () => void }) {
  const handleCopyNumber = () => {
    navigator.clipboard
      .writeText("01851590081")
      .then(() => {
        toast.success("Number copied to clipboard!", {
          position: "bottom-center",
          duration: 2000,
          style: {
            background: "#F9FAFB",
            color: "#1E293B",
            border: "1px solid #E2E8F0",
          },
        });
      })
      .catch(() => {
        toast.error("Failed to copy number", {
          position: "bottom-center",
        });
      });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">
        Complete Registration
      </h2>

      {/* Payment Notice */}
      <div className="mb-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-medium text-blue-900">
          One-time Registration Fee
        </h3>
        <p className="text-sm text-blue-700">
          To join Healtha as a specialist doctor, a one-time fee of{" "}
          <span className="font-semibold">1,020 BDT</span> is applicable. After
          payment verification, your profile will be reviewed and activated
          within 24 hours.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mb-2 font-medium text-slate-800">
            Targeted Patient Reach
          </h3>
          <p className="text-sm text-slate-600">
            90%+ of our visitors are actively seeking specialist doctors,
            ensuring your profile reaches the right audience.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <Building className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mb-2 font-medium text-slate-800">
            Enhanced Visibility
          </h3>
          <p className="text-sm text-slate-600">
            {`Join Bangladesh's largest healthcare platform and receive thousands
            of profile views monthly.`}
          </p>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="rounded-md border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-medium text-slate-800">
          Payment Instructions
        </h3>

        <div className="mb-6 flex items-center gap-4">
          <Image
            src="/images/logo/bkash.webp"
            alt="bKash"
            width={80}
            height={30}
            className="!rounded-2xl border border-slate-200 bg-white p-2"
          />
          <div>
            <p className="font-medium text-slate-800">bKash Payment</p>
            <p className="text-sm text-slate-600">
              Send <span className="font-semibold">1,020 BDT</span> to the
              following number
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-slate-400" />
              <span className="text-lg font-medium text-slate-800">
                01851590081
              </span>
            </div>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              onClick={handleCopyNumber}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
          <p>
            At Healtha, we only charge a one-time registration fee. There are no
            hidden charges or recurring fees for future updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
