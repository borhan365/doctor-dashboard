"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import ChamberTable from "./ui/ChamberTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function DoctorChambers() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Chamber Locations
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Manage your practice locations and schedules
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/dashboard/chambers/manage"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <Plus className="h-4 w-4" />
                Add Chamber
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <ChamberTable />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
