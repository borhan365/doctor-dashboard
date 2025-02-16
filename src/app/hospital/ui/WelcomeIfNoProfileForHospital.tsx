"use client";

import { useSessionStore } from "@/store/sessionStore";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const WelcomeIfNoProfileForHospital: FC = () => {
  const { user } = useSessionStore();
  return (
    <section className="mb-8 overflow-hidden rounded-lg bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="m-auto mb-4 w-fit rounded-full bg-slate-50 p-2 px-4 text-base font-semibold text-blue-600 dark:text-slate-400">
            Welcome, {user?.name}
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white lg:text-4xl">
            Build Your Hospital Profile
          </h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            Join our growing community of hospitals. Create your profile to
            showcase your expertise and connect with patients seeking quality
            care.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/hospital/new-hospital">
              <button className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                Create Your Profile
              </button>
            </Link>
            <Link href="/hospital/new-hospital">
              <button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-base font-medium text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-900">
                Learn More
              </button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 border-t border-slate-100 pt-8 dark:border-slate-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                1,000+
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Registered Hospitals
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                5,000+
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Doctors Registered
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                5,00,000+
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Patients Monthly
              </p>
            </div>
          </div>
          <p className="mx-auto mt-8 flex w-fit items-center justify-center gap-2 rounded-full bg-blue-50 p-2 px-4 text-base font-medium text-blue-600 dark:text-slate-400">
            <Sparkles className="h-4 w-4" /> Don't miss your online potential to
            attract patients to your hospital or services.
          </p>
        </div>
      </div>
    </section>
  );
};
