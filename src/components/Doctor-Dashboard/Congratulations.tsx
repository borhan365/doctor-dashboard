"use client";

import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export function Congratulations() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Congratulations Message */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            Profile Created Successfully!
          </h1>
          <p className="text-slate-600">
            Thank you for joining Healtha as a healthcare provider.
          </p>
        </div>

        {/* Review Notice */}
        <div className="mb-8 rounded-lg bg-blue-50 p-4">
          <div className="flex items-start">
            <Clock className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="font-medium text-blue-900">Under Review</h3>
              <p className="mt-1 text-sm text-blue-700">
                Your profile is currently under review by our admin team. Once approved, 
                it will be automatically published and visible to the public. This usually 
                takes 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Meanwhile, you can:</h3>
          <ul className="ml-5 list-disc space-y-2 text-slate-600">
            <li>Complete any additional profile information</li>
            <li>Review your chamber and schedule settings</li>
            <li>Explore the doctor&apos;s dashboard</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/doctor/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/doctor/profile"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-8 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
