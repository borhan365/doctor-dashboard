"use client";

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
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  lastVisit: string;
  image?: string;
  bloodGroup?: string;
  address?: string;
  medicalHistory?: string;
}

// Mock Data
const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    age: 35,
    gender: "male",
    lastVisit: "2024-03-15",
    image:
      "https://media.nngroup.com/media/people/photos/2022-portrait-page-3.jpg.600x600_q75_autocrop_crop-smart_upscale.jpg",
    bloodGroup: "A+",
    address: "123 Main St, City",
    medicalHistory: "Hypertension",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    age: 28,
    gender: "female",
    lastVisit: "2024-03-14",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEcId9_iMpD9Q/profile-displayphoto-shrink_400_400/B56ZNunOu4GoAg-/0/1732727598444?e=2147483647&v=beta&t=oQrqOi-qkq2U4bOwHaxlGBbG6oRCy8fv88gTmcyC8nw",
    bloodGroup: "B-",
    address: "456 Oak St, Town",
    medicalHistory: "Diabetes",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1234567892",
    age: 45,
    gender: "male",
    lastVisit: "2024-03-13",
    bloodGroup: "O+",
    address: "789 Pine St, Village",
    medicalHistory: "Asthma",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1234567893",
    age: 32,
    gender: "female",
    lastVisit: "2024-03-12",
    image: "https://avatars.sched.co/8/90/1938608/avatar.jpg.320x320px.jpg?e62",
    bloodGroup: "AB+",
    address: "321 Elm St, County",
    medicalHistory: "None",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1234567894",
    age: 41,
    gender: "male",
    lastVisit: "2024-03-11",
    bloodGroup: "A-",
    address: "654 Maple St, State",
    medicalHistory: "Arthritis",
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

function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Fetch patients data with mock implementation
  const {
    data: patients,
    isLoading,
    isError,
    error,
  } = useQuery<Patient[], Error>({
    queryKey: ["patients"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return MOCK_PATIENTS;
    },
  });

  // Filter and search functionality
  const filteredPatients = patients?.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterBy === "all" || patient.gender.toLowerCase() === filterBy;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil((filteredPatients?.length || 0) / itemsPerPage);
  const paginatedPatients = filteredPatients?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">All Patients</h1>
        <p className="mt-1 text-slate-500">
          Manage and view all your patient records
        </p>
      </div>

      {/* Actions Row */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 pl-10 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Patients</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <Link href="/dashboard/patients/create">
            <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50">
              <Plus className="h-4 w-4" /> Add Patient
            </button>
          </Link>
        </div>
      </div>

      {/* Patients Table */}
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
                className="mt-2 inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : paginatedPatients?.length === 0 ? (
          // Empty state
          <div className="p-4 text-center text-slate-500">
            No patients found
          </div>
        ) : (
          // Success state with data
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Age/Gender
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Medical History
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients?.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {patient.image ? (
                        <Image
                          src={patient.image}
                          alt={patient.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <span className="text-sm text-slate-500">
                            {patient.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <Link
                        href={`/dashboard/patients/${patient.id}/appointments`}
                      >
                        <div className="ml-4">
                          <div className="font-medium text-slate-900">
                            {patient.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {patient.address}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {patient.email}
                    </div>
                    <div className="text-sm text-slate-500">
                      {patient.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {patient.age} years
                    </div>
                    <div className="text-sm text-slate-500">
                      {patient.gender}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {patient.medicalHistory}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600">
                        <Trash2 className="h-5 w-5" />
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
      {filteredPatients && filteredPatients.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Patients;
