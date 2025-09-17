"use client";

import ConfirmModal from "@/components/Modals/ConfirmModal";
import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
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
  createdAt: string;
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

  // Static dummy data for patients
  const mockPatients: Patient[] = [
    {
      id: "1",
      patientId: "P001",
      name: "Ahmed Rahman",
      email: "ahmed.rahman@email.com",
      phone: "+8801712345678",
      age: 45,
      gender: "male",
      bloodGroup: "A+",
      address: "Dhanmondi, Dhaka",
      lastVisitDate: "2024-01-15",
      medicalConditions: "Hypertension, Diabetes",
      user: {
        id: "1",
        image: "/images/user/user-01.png",
      },
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      patientId: "P002",
      name: "Fatima Begum",
      email: "fatima.begum@email.com",
      phone: "+8801712345679",
      age: 38,
      gender: "female",
      bloodGroup: "B+",
      address: "Gulshan, Dhaka",
      lastVisitDate: "2024-01-10",
      medicalConditions: "Heart Disease",
      user: {
        id: "2",
        image: "/images/user/user-02.png",
      },
      createdAt: "2023-07-20T14:45:00Z",
    },
    {
      id: "3",
      patientId: "P003",
      name: "Karim Uddin",
      email: "karim.uddin@email.com",
      phone: "+8801712345680",
      age: 52,
      gender: "male",
      bloodGroup: "O+",
      address: "Mirpur, Dhaka",
      lastVisitDate: "2024-01-08",
      medicalConditions: "Arthritis, High Cholesterol",
      user: {
        id: "3",
        image: "/images/user/user-03.png",
      },
      createdAt: "2023-08-10T09:15:00Z",
    },
    {
      id: "4",
      patientId: "P004",
      name: "Rashida Khan",
      email: "rashida.khan@email.com",
      phone: "+8801712345681",
      age: 41,
      gender: "female",
      bloodGroup: "AB+",
      address: "Uttara, Dhaka",
      lastVisitDate: "2024-01-05",
      medicalConditions: "Migraine, Anxiety",
      user: {
        id: "4",
        image: "/images/user/user-04.png",
      },
      createdAt: "2023-09-05T16:20:00Z",
    },
    {
      id: "5",
      patientId: "P005",
      name: "Mohammad Ali",
      email: "mohammad.ali@email.com",
      phone: "+8801712345682",
      age: 29,
      gender: "male",
      bloodGroup: "A-",
      address: "Banani, Dhaka",
      lastVisitDate: "2024-01-12",
      medicalConditions: "Allergies",
      user: {
        id: "5",
        image: "/images/user/user-05.png",
      },
      createdAt: "2023-10-12T11:30:00Z",
    },
  ];

  // Filter patients based on search and filter criteria
  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      !searchQuery ||
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.includes(searchQuery);

    const matchesFilter = filterBy === "all" || patient.gender === filterBy;

    return matchesSearch && matchesFilter;
  });

  // Paginate results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  const data: PatientsResponse = {
    patients: paginatedPatients,
    meta: {
      total: filteredPatients.length,
      page: currentPage,
      limit: itemsPerPage,
      totalPages: Math.ceil(filteredPatients.length / itemsPerPage),
    },
  };

  const isLoading = false;
  const isError = false;
  const error = null;
  const refetch = () => {};

  const handleDelete = async (id: string) => {
    try {
      // Static demo - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Patient deleted successfully (demo mode)");
      setDeleteModal({ isOpen: false, patientId: "", patientName: "" });
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
              <p>Error: Unknown error</p>
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
                              {patient.name || "Unknown Patient"}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {patient.address || "No address"}
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
                        {patient.bloodGroup || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 dark:text-slate-100">
                        {patient.lastVisitDate
                          ? new Date(patient.lastVisitDate).toLocaleDateString()
                          : "N/A"}
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
                          href={`/dashboard/patients/manage?id=${patient.id || ""}`}
                          className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                        >
                          <Pencil className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              patientId: patient.id,
                              patientName: patient.name || "Unknown Patient",
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
