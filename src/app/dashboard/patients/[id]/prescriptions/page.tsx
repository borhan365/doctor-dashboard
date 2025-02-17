"use client";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Download, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Prescription {
  id: string;
  patientName: string;
  date: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    duration: string;
  }[];
  nextVisit?: string;
  status: "completed" | "pending";
}

// Mock Data
const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: "1",
    patientName: "John Doe",
    date: "2024-03-15",
    diagnosis: "Common Cold",
    medications: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        duration: "3 days",
      },
      {
        name: "Vitamin C",
        dosage: "1000mg",
        duration: "5 days",
      },
    ],
    nextVisit: "2024-03-22",
    status: "completed",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: "2024-03-14",
    diagnosis: "Hypertension",
    medications: [
      {
        name: "Amlodipine",
        dosage: "5mg",
        duration: "30 days",
      },
    ],
    nextVisit: "2024-04-14",
    status: "pending",
  },
];

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-end gap-4 px-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 text-sm text-slate-600 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </button>
      <span className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 text-sm text-slate-600 disabled:opacity-50"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

function Prescriptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: prescriptions,
    isLoading,
    isError,
    error,
  } = useQuery<Prescription[], Error>({
    queryKey: ["prescriptions"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return MOCK_PRESCRIPTIONS;
    },
  });

  // Filter and search functionality
  const filteredPrescriptions = prescriptions?.filter((prescription) => {
    const matchesSearch = prescription.diagnosis
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterBy === "all" || prescription.status === filterBy;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(
    (filteredPrescriptions?.length || 0) / itemsPerPage,
  );
  const paginatedPrescriptions = filteredPrescriptions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-700">Prescriptions</h2>
        {/* count of records */}
        <p className="text-sm text-slate-500">
          We found{" "}
          <span className="font-semibold text-violet-500">
            {filteredPrescriptions?.length}
          </span>{" "}
          prescriptions
        </p>
      </div>

      {/* Actions Row */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            className="shadow-xs flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 pl-10 text-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        {isLoading ? (
          // Loading state
          <div className="p-4">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </div>
          </div>
        ) : isError ? (
          // Error state
          <div className="p-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-600">
              <p>Error: {error.message}</p>
              <button
                className="mt-2 inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : paginatedPrescriptions?.length === 0 ? (
          // Empty state
          <div className="p-4 text-center text-slate-500">
            No prescriptions found
          </div>
        ) : (
          // Table with data
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Diagnosis
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Medications
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Next Visit
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPrescriptions?.map((prescription) => (
                <tr
                  key={prescription.id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {new Date(prescription.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {prescription.diagnosis}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="text-sm text-slate-900">
                          {med.name} - {med.dosage} ({med.duration})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {prescription.nextVisit
                        ? new Date(prescription.nextVisit).toLocaleDateString()
                        : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                        prescription.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700",
                      )}
                    >
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/profile/prescriptions/${prescription.id}`}>
                        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filteredPrescriptions && filteredPrescriptions.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Prescriptions;
