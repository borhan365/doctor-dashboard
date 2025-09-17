"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Mail,
  Phone,
  Plus,
  Search,
  Shield,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Mock data for assistants
const mockAssistants = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+8801712345678",
    role: "Senior Assistant",
    status: "active",
    permissions: ["patients", "appointments", "prescriptions", "chambers"],
    joinDate: "2023-01-15",
    lastActive: "2024-01-15T10:30:00Z",
    profileImage: "/images/assistants/sarah-johnson.jpg",
    department: "Cardiology",
    experience: "3 years",
    qualifications: "Medical Assistant Certificate",
    workingHours: "9:00 AM - 6:00 PM",
    tasksCompleted: 1247,
    rating: 4.8,
    notes: "Excellent patient management skills, very reliable",
  },
  {
    id: "2",
    name: "Ahmed Rahman",
    email: "ahmed.rahman@example.com",
    phone: "+8801712345679",
    role: "Assistant",
    status: "active",
    permissions: ["patients", "appointments"],
    joinDate: "2023-06-20",
    lastActive: "2024-01-15T09:15:00Z",
    profileImage: "/images/assistants/ahmed-rahman.jpg",
    department: "General Medicine",
    experience: "2 years",
    qualifications: "Diploma in Medical Technology",
    workingHours: "8:00 AM - 5:00 PM",
    tasksCompleted: 892,
    rating: 4.6,
    notes: "Good with patient scheduling and follow-ups",
  },
  {
    id: "3",
    name: "Fatima Begum",
    email: "fatima.begum@example.com",
    phone: "+8801712345680",
    role: "Junior Assistant",
    status: "inactive",
    permissions: ["patients"],
    joinDate: "2023-09-10",
    lastActive: "2024-01-10T16:45:00Z",
    profileImage: "/images/assistants/fatima-begum.jpg",
    department: "Pediatrics",
    experience: "1 year",
    qualifications: "Certificate in Healthcare Administration",
    workingHours: "10:00 AM - 4:00 PM",
    tasksCompleted: 456,
    rating: 4.3,
    notes: "Currently on leave, will return next month",
  },
  {
    id: "4",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+8801712345681",
    role: "Senior Assistant",
    status: "active",
    permissions: [
      "patients",
      "appointments",
      "prescriptions",
      "chambers",
      "diagnostics",
    ],
    joinDate: "2022-11-05",
    lastActive: "2024-01-15T11:20:00Z",
    profileImage: "/images/assistants/michael-chen.jpg",
    department: "Surgery",
    experience: "4 years",
    qualifications: "Bachelor in Health Sciences",
    workingHours: "7:00 AM - 7:00 PM",
    tasksCompleted: 2156,
    rating: 4.9,
    notes: "Highly skilled in surgical procedures assistance",
  },
  {
    id: "5",
    name: "Ayesha Khan",
    email: "ayesha.khan@example.com",
    phone: "+8801712345682",
    role: "Assistant",
    status: "active",
    permissions: ["patients", "appointments", "medicines"],
    joinDate: "2023-03-12",
    lastActive: "2024-01-15T08:30:00Z",
    profileImage: "/images/assistants/ayesha-khan.jpg",
    department: "Dermatology",
    experience: "2.5 years",
    qualifications: "Diploma in Medical Laboratory Technology",
    workingHours: "9:30 AM - 6:30 PM",
    tasksCompleted: 1134,
    rating: 4.7,
    notes: "Specialized in dermatological procedures",
  },
];

function AssistantTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Filter assistants based on search and filter criteria
  const filteredAssistants = mockAssistants.filter((assistant) => {
    const matchesSearch =
      !searchTerm ||
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || assistant.status === statusFilter;
    const matchesRole = !roleFilter || assistant.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Paginate results
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedAssistants = filteredAssistants.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredAssistants.length / pageSize);

  const handleDeleteAssistant = (assistantId: string) => {
    toast.success(`Assistant ${assistantId} deleted successfully (demo mode)`);
  };

  const handleToggleStatus = (assistantId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast.success(`Assistant status changed to ${newStatus} (demo mode)`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            <CheckCircle className="h-3 w-3" />
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            <XCircle className="h-3 w-3" />
            Inactive
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            Unknown
          </span>
        );
    }
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      "Senior Assistant": "bg-purple-100 text-purple-800",
      Assistant: "bg-blue-100 text-blue-800",
      "Junior Assistant": "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[role as keyof typeof roleColors] || "bg-gray-100 text-gray-800"}`}
      >
        {role}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Doctor Assistants
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage your medical assistants and their permissions
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/dashboard/assistants/add"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Add Assistant
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          {/* Search and Filter Section */}
          <div className="border-b border-slate-200 p-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search assistants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Roles</option>
                  <option value="Senior Assistant">Senior Assistant</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Junior Assistant">Junior Assistant</option>
                </select>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("");
                    setRoleFilter("");
                  }}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Assistant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Role & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {paginatedAssistants.map((assistant) => (
                  <tr key={assistant.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={assistant.profileImage}
                            alt={assistant.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/images/user/default-user.webp";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">
                            {assistant.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {assistant.qualifications}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getRoleBadge(assistant.role)}
                        {getStatusBadge(assistant.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-900">
                          <Mail className="h-4 w-4 text-slate-400" />
                          {assistant.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Phone className="h-4 w-4 text-slate-400" />
                          {assistant.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-slate-900">
                          {assistant.department}
                        </div>
                        <div className="text-sm text-slate-500">
                          {assistant.experience} experience
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-slate-900">
                            {assistant.rating}
                          </span>
                          <span className="text-sm text-slate-500">/5.0</span>
                        </div>
                        <div className="text-sm text-slate-500">
                          {assistant.tasksCompleted} tasks completed
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {new Date(assistant.lastActive).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            toast.success(
                              `Viewing ${assistant.name} details (demo mode)`,
                            )
                          }
                          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            toast.success(
                              `Editing ${assistant.name} (demo mode)`,
                            )
                          }
                          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleToggleStatus(assistant.id, assistant.status)
                          }
                          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAssistant(assistant.id)}
                          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredAssistants.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredAssistants.length}</span>{" "}
                results
              </p>
            </div>
            <div className="flex flex-1 justify-between gap-2 sm:justify-end">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-slate-500">
                      Total Assistants
                    </dt>
                    <dd className="text-lg font-medium text-slate-900">
                      {mockAssistants.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-slate-500">
                      Active Assistants
                    </dt>
                    <dd className="text-lg font-medium text-slate-900">
                      {
                        mockAssistants.filter((a) => a.status === "active")
                          .length
                      }
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-slate-500">
                      Avg. Rating
                    </dt>
                    <dd className="text-lg font-medium text-slate-900">
                      {(
                        mockAssistants.reduce((sum, a) => sum + a.rating, 0) /
                        mockAssistants.length
                      ).toFixed(1)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-slate-500">
                      Total Tasks Completed
                    </dt>
                    <dd className="text-lg font-medium text-slate-900">
                      {mockAssistants
                        .reduce((sum, a) => sum + a.tasksCompleted, 0)
                        .toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DoctorAssistantPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <AssistantTable />
    </QueryClientProvider>
  );
}
