"use client";

import Link from "next/link";
import { FC } from "react";

export const WelcomeIfNoProfileForDoctor: FC = () => {
  // Static data for demo purposes
  const user = { doctorId: "demo-doctor-id" };

  return (
    <section className="mb-8 overflow-hidden rounded-lg bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="m-auto mb-4 w-fit rounded-full bg-slate-50 p-2 px-4 text-base font-semibold text-blue-600 dark:text-slate-400">
            Welcome, {user?.doctorName}
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white lg:text-4xl">
            Build Your Hospital Profile
          </h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            Join our growing community of hospitals. Update your profile to
            showcase your expertise and connect with patients seeking quality
            care.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard/profile">
              <button className="inline-flex items-center justify-center rounded-full bg-slate-800 px-8 py-3 text-base font-medium text-white transition-all hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                Update Your Profile
              </button>
            </Link>
            <Link href="/dashboard/profile">
              <button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-base font-medium text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-900">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
