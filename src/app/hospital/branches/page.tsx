"use client";

import { AlertCircle, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { FC, useState } from "react";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  location: string;
}

const DUMMY_BRANCHES: Branch[] = [
  {
    id: "1",
    name: "Main Branch",
    address: "123 Healthcare St, Medical City",
    phone: "+1 234 567 890",
    email: "main@hospital.com",
    status: "active",
    location: "New York",
  },
  {
    id: "2",
    name: "North Wing",
    address: "456 Wellness Ave, Care District",
    phone: "+1 234 567 891",
    email: "north@hospital.com",
    status: "active",
    location: "Los Angeles",
  },
  {
    id: "3",
    name: "South Medical Center",
    address: "789 Health Blvd, Cure Town",
    phone: "+1 234 567 892",
    email: "south@hospital.com",
    status: "inactive",
    location: "Chicago",
  },
  {
    id: "4",
    name: "East Hospital Wing",
    address: "321 Care Lane, Wellness City",
    phone: "+1 234 567 893",
    email: "east@hospital.com",
    status: "active",
    location: "Miami",
  },
  {
    id: "5",
    name: "West Medical Facility",
    address: "654 Doctor St, Health Valley",
    phone: "+1 234 567 894",
    email: "west@hospital.com",
    status: "inactive",
    location: "Seattle",
  },
];

const HospitalBranches: FC = () => {
  const [branches, setBranches] = useState<Branch[]>(DUMMY_BRANCHES);
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    location: "",
  });

  // Get unique locations for filter dropdown
  const locations = Array.from(
    new Set(branches.map((branch) => branch.location)),
  );

  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter
      ? branch.location === locationFilter
      : true;
    const matchesStatus = statusFilter ? branch.status === statusFilter : true;

    return matchesSearch && matchesLocation && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBranch) {
        setBranches(
          branches.map((branch) =>
            branch.id === editingBranch.id
              ? { ...branch, ...formData, status: branch.status }
              : branch,
          ),
        );
      } else {
        const newBranch = {
          id: Math.random().toString(36).substr(2, 9),
          ...formData,
          status: "active" as const,
        };
        setBranches([...branches, newBranch]);
      }
      setShowModal(false);
      setEditingBranch(null);
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        location: "",
      });
    } catch (err) {
      setError("Failed to save branch. Please try again.");
    }
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      location: branch.location,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    try {
      if (confirm("Are you sure you want to delete this branch?")) {
        setBranches(branches.filter((branch) => branch.id !== id));
      }
    } catch (err) {
      setError("Failed to delete branch. Please try again.");
    }
  };

  // Add this function to handle reset
  const handleResetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setStatusFilter("");
  };

  // Add this to check if any filter is active
  const isFiltersActive = searchTerm || locationFilter || statusFilter;

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-500" />
          <h3 className="mb-2 text-lg font-semibold">Error</h3>
          <p className="text-slate-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Hospital Branches</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Add Branch
        </button>
      </div>

      {/* Updated Filters section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[200px] flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search branches..."
                className="w-full rounded-md border py-2 pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="rounded-md border px-4 py-2"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {isFiltersActive && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {editingBranch ? "Edit Branch" : "Add New Branch"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full rounded-md border px-4 py-2"
                placeholder="Branch Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                className="w-full rounded-md border px-4 py-2"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
              <input
                className="w-full rounded-md border px-4 py-2"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <input
                className="w-full rounded-md border px-4 py-2"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                className="w-full rounded-md border px-4 py-2"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-md px-4 py-2 text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {editingBranch ? "Update Branch" : "Add Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        {filteredBranches.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-slate-500">
              No branches found matching your criteria.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left font-medium">Branch Name</th>
                <th className="p-4 text-left font-medium">Location</th>
                <th className="p-4 text-left font-medium">Address</th>
                <th className="p-4 text-left font-medium">Phone</th>
                <th className="p-4 text-left font-medium">Email</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className="border-t hover:bg-slate-50">
                  <td className="p-4 font-medium">{branch.name}</td>
                  <td className="p-4">{branch.location}</td>
                  <td className="p-4">{branch.address}</td>
                  <td className="p-4">{branch.phone}</td>
                  <td className="p-4">{branch.email}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        branch.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {branch.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="rounded-md p-2 hover:bg-slate-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(branch.id)}
                        className="rounded-md p-2 hover:bg-slate-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HospitalBranches;
