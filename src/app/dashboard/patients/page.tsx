"use client";

import { ApiUrl } from "@/app/Variables";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

// Dropdown Menu Components
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      className={cn(
        "animate-in fade-in-80 z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

interface Patient {
  id: string;
  patientId: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
  gender: string | null;
  bloodGroup: string | null;
  address: string | null;
  lastVisitDate: string | null;
  medicalConditions: string | null;
  user: {
    id: string;
    image: string | null;
  } | null;
}

interface PatientsResponse {
  patients: Patient[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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

function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    patientId: "",
    patientName: "",
  });

  // Fetch patients data
  const { data, isLoading, isError, error, refetch } =
    useQuery<PatientsResponse>({
      queryKey: ["patients", currentPage, searchQuery, filterBy],
      queryFn: async () => {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          search: searchQuery,
          gender: filterBy,
        });

        const response = await fetch(
          `${ApiUrl}/doctors/patients/get-all?${params}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch patients");
        }

        return response.json();
      },
    });

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${ApiUrl}/doctors/patients/single-delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete patient");
      }

      toast.success(data.message || "Patient deleted successfully");
      setDeleteModal({ isOpen: false, patientId: "", patientName: "" });
      refetch();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section - Make it stack on mobile */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            All Patients
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage and view all your patient records
          </p>
        </div>
        <Link
          href="/dashboard/patients/manage"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          Add Patient
        </Link>
      </div>

      {/* Actions Row - Already responsive with flex-col */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search patients..."
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 pl-10 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="all">All Patients</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Table Section with Responsive Scroll */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {isLoading ? (
          <div className="p-4 text-center text-slate-500 dark:text-slate-400">
            Loading...
          </div>
        ) : isError ? (
          <div className="p-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
              <p>
                Error:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
              <button
                className="mt-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                onClick={() => refetch()}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : !data?.patients.length ? (
          <div className="p-4 text-center text-slate-500 dark:text-slate-400">
            No patients found
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full min-w-[900px] table-auto">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Age/Gender
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Medical History
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {patient?.user?.image ? (
                          <Image
                            src={patient.user.image}
                            alt={patient.name || ""}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {patient?.name?.charAt(0)}
                            </span>
                          </div>
                        )}
                        <Link
                          href={`/dashboard/patients/${patient.id}/appointments`}
                        >
                          <div className="ml-4">
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {patient.name}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {patient.address}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 dark:text-slate-100">
                        {patient.email}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {patient.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {patient?.age && (
                        <div className="text-sm text-slate-900 dark:text-slate-100">
                          {patient.age} years
                        </div>
                      )}
                      {patient?.gender && (
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {patient.gender}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                        {patient.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 dark:text-slate-100">
                        {new Date(patient.lastVisitDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 dark:text-slate-100">
                        {patient.medicalConditions}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 dark:text-slate-100">
                        {moment(patient.createdAt).format("DD/MM/YYYY")}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {moment(patient.createdAt).format("hh:mm A")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/dashboard/patients/manage?id=${patient.id}`}
                          className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                        >
                          <Pencil className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              patientId: patient.id,
                              patientName: patient.name,
                            })
                          }
                          className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination with dark mode */}
      {data?.meta.totalPages && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-end gap-4 px-2 py-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 text-sm text-slate-600 transition-colors disabled:opacity-50 dark:text-slate-400"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Page {currentPage} of {data.meta.totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === data.meta.totalPages}
            className="flex items-center gap-1 text-sm text-slate-600 transition-colors disabled:opacity-50 dark:text-slate-400"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add the ConfirmModal component */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, patientId: "", patientName: "" })
        }
        onConfirm={() => handleDelete(deleteModal.patientId)}
        title="Delete Patient"
        message={`Are you sure you want to delete ${deleteModal.patientName}? This action cannot be undone.`}
      />
    </div>
  );
}

export default Patients;
