"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Eye,
  Filter,
  MessageSquare,
  X,
  Calendar,
  List,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

interface Appointment {
  id: string;
  patient: {
    name: string;
    image: string;
    email: string;
    phone: string;
  };
  date: string;
  time: string;
  type: {
    primary: string;
    secondary: string;
  };
  isNew?: boolean;
  status: "accepted" | "rejected" | "pending";
}

const appointments: Appointment[] = [
  {
    id: "Apt0001",
    patient: {
      name: "Adrian",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-01.jpg",
      email: "adrian@example.com",
      phone: "+1 504 368 6874",
    },
    date: "11 Nov 2024",
    time: "10.45 AM",
    type: {
      primary: "General Visit",
      secondary: "Video Call",
    },
    status: "accepted",
  },
  {
    id: "Apt0002",
    patient: {
      name: "Emily",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg",
      email: "emily@example.com",
      phone: "+1 504 368 6875",
    },
    date: "12 Nov 2024",
    time: "11.15 AM",
    type: {
      primary: "Follow-up",
      secondary: "In-person",
    },
    status: "pending",
  },
  {
    id: "Apt0003",
    patient: {
      name: "Michael",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-03.jpg",
      email: "michael@example.com",
      phone: "+1 504 368 6876",
    },
    date: "13 Nov 2024",
    time: "2.00 PM",
    type: {
      primary: "Consultation",
      secondary: "Phone Call",
    },
    status: "accepted",
  },
  {
    id: "Apt0004",
    patient: {
      name: "Sarah",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-04.jpg",
      email: "sarah@example.com",
      phone: "+1 504 368 6877",
    },
    date: "14 Nov 2024",
    time: "3.30 PM",
    type: {
      primary: "Check-up",
      secondary: "Video Call",
    },
    status: "rejected",
  },
  {
    id: "Apt0005",
    patient: {
      name: "John",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-05.jpg",
      email: "john@example.com",
      phone: "+1 504 368 6878",
    },
    date: "15 Nov 2024",
    time: "9.00 AM",
    type: {
      primary: "New Patient",
      secondary: "In-person",
    },
    status: "pending",
  },
  {
    id: "Apt0006",
    patient: {
      name: "Jessica",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-06.jpg",
      email: "jessica@example.com",
      phone: "+1 504 368 6879",
    },
    date: "16 Nov 2024",
    time: "10.00 AM",
    type: {
      primary: "General Visit",
      secondary: "Phone Call",
    },
    status: "accepted",
  },
  {
    id: "Apt0007",
    patient: {
      name: "David",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-07.jpg",
      email: "david@example.com",
      phone: "+1 504 368 6880",
    },
    date: "17 Nov 2024",
    time: "11.30 AM",
    type: {
      primary: "Follow-up",
      secondary: "Video Call",
    },
    status: "pending",
  },
  {
    id: "Apt0008",
    patient: {
      name: "Olivia",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-08.jpg",
      email: "olivia@example.com",
      phone: "+1 504 368 6881",
    },
    date: "18 Nov 2024",
    time: "2.30 PM",
    type: {
      primary: "Consultation",
      secondary: "In-person",
    },
    status: "accepted",
  },
  {
    id: "Apt0009",
    patient: {
      name: "Alexander",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-09.jpg",
      email: "alexander@example.com",
      phone: "+1 504 368 6882",
    },
    date: "19 Nov 2024",
    time: "3.45 PM",
    type: {
      primary: "Check-up",
      secondary: "Phone Call",
    },
    status: "rejected",
  },
  {
    id: "Apt0010",
    patient: {
      name: "Isabella",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-10.jpg",
      email: "isabella@example.com",
      phone: "+1 504 368 6883",
    },
    date: "20 Nov 2024",
    time: "9.15 AM",
    type: {
      primary: "New Patient",
      secondary: "Video Call",
    },
    status: "pending",
  },
];

export function AppointmentsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("01/09/2025 - 01/15/2025");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const itemsPerPage = 5;

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = 
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {/* Filter Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-start gap-2">
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center items-center">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2 px-4 pl-10 pr-4 focus:border-blue-500 focus:outline-0 focus:ring-0 focus:ring-blue-500 sm:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <span>{dateRange}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            <select 
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12">
                      <Image
                        src={appointment.patient.image}
                        alt=""
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/appointments/${appointment.id}`}>
                          <span className="font-medium text-slate-900">
                            {appointment.patient.name}
                          </span>
                        </Link>
                        {appointment.isNew && (
                          <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500">#{appointment.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">
                    {appointment.date} {appointment.time}
                  </div>
                  <div className="text-sm text-slate-500">
                    {appointment.type.primary} • {appointment.type.secondary}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">
                    {appointment.patient.email}
                  </div>
                  <div className="text-sm text-slate-500">
                    {appointment.patient.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex rounded-full px-2 text-sm font-medium leading-5 ${
                    appointment.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <div className="flex space-x-2">
                      <button className="rounded bg-green-100 p-1 text-green-800 hover:bg-green-600 hover:text-white">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="rounded bg-red-100 p-1 text-red-800 hover:bg-red-600 hover:text-white">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                      Start Now
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
