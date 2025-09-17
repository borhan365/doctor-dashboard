"use client";

import { FetchChambersResponse } from "@/types/chambers";
import debounce from "lodash/debounce";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

function ChamberTable() {
  // Static data for demo purposes
  const user = { doctorId: "demo-doctor-id" };
  const doctorId = user?.doctorId;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<string>("");

  // Static dummy data for chambers
  const mockChambers = [
    {
      id: "1",
      name: "Apollo Hospitals Dhaka",
      bnName: "অ্যাপোলো হাসপাতাল ঢাকা",
      address: "Plot 81, Block E, Bashundhara R/A, Dhaka 1229",
      bnAddress: "প্লট ৮১, ব্লক ই, বসুন্ধরা আবাসিক এলাকা, ঢাকা ১২২৯",
      phone: "+8801712345678",
      email: "dhaka@apollohospitals.com",
      consultationFee: 1500,
      followUpFee: 1000,
      slotDuration: 30,
      status: "published",
      doctorId: "demo-doctor-id",
      hospitalId: "1",
      customHospitalName: "Apollo Hospitals Dhaka",
      customAddress: "Plot 81, Block E, Bashundhara R/A, Dhaka 1229",
      floorNumber: "5th Floor",
      roomNumber: "Room 501",
      availableDays: [
        {
          day: "Monday",
          isAvailable: true,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          day: "Tuesday",
          isAvailable: true,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          day: "Wednesday",
          isAvailable: true,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          day: "Thursday",
          isAvailable: true,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          day: "Friday",
          isAvailable: true,
          startTime: "09:00",
          endTime: "17:00",
        },
        { day: "Saturday", isAvailable: false, startTime: "", endTime: "" },
        { day: "Sunday", isAvailable: false, startTime: "", endTime: "" },
      ],
      hospital: {
        id: "1",
        name: "Apollo Hospitals Dhaka",
        slug: "apollo-hospitals-dhaka",
        address: "Plot 81, Block E, Bashundhara R/A, Dhaka 1229",
      },
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "Square Hospitals Ltd",
      bnName: "স্কয়ার হাসপাতাল লিমিটেড",
      address: "18/F, Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka 1205",
      bnAddress: "১৮/এফ, বীর উত্তম কাজী নুরুজ্জামান সড়ক, পন্থপথ, ঢাকা ১২০৫",
      phone: "+8801712345679",
      email: "info@squarehospital.com",
      consultationFee: 2000,
      followUpFee: 1200,
      slotDuration: 45,
      status: "published",
      doctorId: "demo-doctor-id",
      hospitalId: "2",
      customHospitalName: "Square Hospitals Ltd",
      customAddress:
        "18/F, Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka 1205",
      floorNumber: "3rd Floor",
      roomNumber: "Room 301",
      availableDays: [
        {
          day: "Monday",
          isAvailable: true,
          startTime: "10:00",
          endTime: "18:00",
        },
        {
          day: "Tuesday",
          isAvailable: true,
          startTime: "10:00",
          endTime: "18:00",
        },
        {
          day: "Wednesday",
          isAvailable: true,
          startTime: "10:00",
          endTime: "18:00",
        },
        {
          day: "Thursday",
          isAvailable: true,
          startTime: "10:00",
          endTime: "18:00",
        },
        {
          day: "Friday",
          isAvailable: true,
          startTime: "10:00",
          endTime: "18:00",
        },
        {
          day: "Saturday",
          isAvailable: true,
          startTime: "09:00",
          endTime: "13:00",
        },
        { day: "Sunday", isAvailable: false, startTime: "", endTime: "" },
      ],
      hospital: {
        id: "2",
        name: "Square Hospitals Ltd",
        slug: "square-hospitals-ltd",
        address:
          "18/F, Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka 1205",
      },
      createdAt: new Date("2024-01-02"),
      updatedAt: new Date("2024-01-02"),
    },
    {
      id: "3",
      name: "United Hospital Limited",
      bnName: "ইউনাইটেড হাসপাতাল লিমিটেড",
      address: "Plot 15, Road 71, Gulshan, Dhaka 1212",
      bnAddress: "প্লট ১৫, রোড ৭১, গুলশান, ঢাকা ১২১২",
      phone: "+8801712345680",
      email: "info@unitedhospital.com",
      consultationFee: 1800,
      followUpFee: 1100,
      slotDuration: 30,
      status: "published",
      doctorId: "demo-doctor-id",
      hospitalId: "3",
      customHospitalName: "United Hospital Limited",
      customAddress: "Plot 15, Road 71, Gulshan, Dhaka 1212",
      floorNumber: "2nd Floor",
      roomNumber: "Room 201",
      availableDays: [
        {
          day: "Monday",
          isAvailable: true,
          startTime: "08:00",
          endTime: "16:00",
        },
        {
          day: "Tuesday",
          isAvailable: true,
          startTime: "08:00",
          endTime: "16:00",
        },
        {
          day: "Wednesday",
          isAvailable: true,
          startTime: "08:00",
          endTime: "16:00",
        },
        {
          day: "Thursday",
          isAvailable: true,
          startTime: "08:00",
          endTime: "16:00",
        },
        {
          day: "Friday",
          isAvailable: true,
          startTime: "08:00",
          endTime: "16:00",
        },
        { day: "Saturday", isAvailable: false, startTime: "", endTime: "" },
        { day: "Sunday", isAvailable: false, startTime: "", endTime: "" },
      ],
      hospital: {
        id: "3",
        name: "United Hospital Limited",
        slug: "united-hospital-limited",
        address: "Plot 15, Road 71, Gulshan, Dhaka 1212",
      },
      createdAt: new Date("2024-01-03"),
      updatedAt: new Date("2024-01-03"),
    },
  ];

  // Filter chambers based on search and status
  const filteredChambers = mockChambers.filter((chamber) => {
    const matchesSearch =
      !searchText ||
      chamber.name.toLowerCase().includes(searchText.toLowerCase()) ||
      chamber.address.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = !status || chamber.status === status;

    return matchesSearch && matchesStatus;
  });

  // Paginate results
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedChambers = filteredChambers.slice(startIndex, endIndex);

  const data: FetchChambersResponse = {
    chambers: paginatedChambers,
    meta: {
      total: filteredChambers.length,
      page: page,
      limit: pageSize,
      totalPages: Math.ceil(filteredChambers.length / pageSize),
    },
  };

  const isLoading = false;
  const error = null;

  // Create debounced function
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchText(value);
      setPage(1);
    }, 500),
    [],
  );

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Update input value immediately
    debouncedSetSearch(value); // Debounce the API call
  };

  // Reset filters
  const handleReset = () => {
    setInputValue("");
    setSearchText("");
    setStatus("");
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-slate-500">Loading chambers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading chambers</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.meta.total || 0) / pageSize);
  const displayStartIndex = (page - 1) * pageSize + 1;
  const displayEndIndex = Math.min(
    displayStartIndex + pageSize - 1,
    data?.meta.total || 0,
  );

  // No results message
  if (data?.chambers.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Search and Filter Section */}
        <div className="border-b border-slate-200 p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by doctor or hospital name..."
                value={inputValue}
                onChange={handleSearchChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <button
                onClick={handleReset}
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        <div className="flex h-96 flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-slate-900">
              No chambers found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {searchText || status
                ? "Try adjusting your search or filter criteria"
                : "No chambers have been created yet"}
            </p>
            {(searchText || status) && (
              <button
                onClick={handleReset}
                className="mt-4 inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Search and Filter Section */}
      <div className="border-b border-slate-200 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by doctor or hospital name..."
              value={inputValue}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleReset}
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
                Chamber
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Schedule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Fees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {data?.chambers.map((chamber) => (
              <tr key={chamber.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="space-y-1">
                    <h3 className="font-medium text-slate-900">
                      {chamber.customHospitalName || chamber.hospital.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Floor: {chamber.floorNumber}, Room: {chamber.roomNumber}
                    </p>
                    <p className="text-sm text-slate-500">
                      {chamber.customAddress || chamber.hospital.address}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {chamber.availableDays &&
                    chamber.availableDays.some((day) => day.isAvailable) ? (
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {
                            chamber.availableDays.filter(
                              (day) => day.isAvailable,
                            ).length
                          }{" "}
                          Days Available
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">
                        No schedule available
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="rounded-md bg-green-50 px-3 py-1">
                      <p className="text-sm text-green-700">
                        New Patient: ৳{chamber.consultationFee}
                      </p>
                    </div>
                    <div className="rounded-md bg-blue-50 px-3 py-1">
                      <p className="text-sm text-blue-700">
                        Follow Up: ৳{chamber.followUpFee}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      chamber.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {chamber.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/doctors/chambers/${chamber.id}`}
                      className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/dashboard/doctors/chambers/manage?id=${chamber.id}`}
                      className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => {
                        console.log("Delete chamber:", chamber.id);
                      }}
                      className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
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
            Showing <span className="font-medium">{displayStartIndex}</span> to{" "}
            <span className="font-medium">{displayEndIndex}</span> of{" "}
            <span className="font-medium">{data?.meta.total}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between gap-2 sm:justify-end">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChamberTable;
