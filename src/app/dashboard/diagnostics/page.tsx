"use client";

import ErrorMessage from "@/components/common/Messages/errorMessage";
import Pagination from "@/components/common/Pagination";
import IconLoading from "@/components/Loader/IconLoading";
import { HospitalDiagnostic } from "@/types/hospitalDiagnostics";
// Removed lodash import - using custom debounce
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { PiSmileySadLight } from "react-icons/pi";

export default function DiagnosticsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priceSort, setPriceSort] = useState<"asc" | "desc">();

  // Static dummy data for diagnostics
  const mockDiagnostics: HospitalDiagnostic[] = [
    {
      id: "1",
      name: "Complete Blood Count (CBC)",
      excerpt: "Comprehensive blood test to evaluate overall health",
      slug: "complete-blood-count-cbc",
      price: 500,
      sampleCollectionFee: 50,
      status: "published",
      isFeatured: false,
      isPublic: true,
      version: 1,
      faqs: [],
      featuredImage: {
        fileUrl: "/images/diagnostics/cbc-test.jpg",
      },
      categories: [
        { id: "1", name: "Blood Tests" },
        { id: "2", name: "Routine Tests" },
      ],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "ECG (Electrocardiogram)",
      excerpt: "Heart rhythm and electrical activity test",
      slug: "ecg-electrocardiogram",
      price: 800,
      sampleCollectionFee: 0,
      status: "published",
      isFeatured: false,
      isPublic: true,
      version: 1,
      faqs: [],
      featuredImage: {
        fileUrl: "/images/diagnostics/ecg-test.jpg",
      },
      categories: [
        { id: "3", name: "Cardiology" },
        { id: "4", name: "Heart Tests" },
      ],
      createdAt: new Date("2024-01-02"),
      updatedAt: new Date("2024-01-02"),
    },
    {
      id: "3",
      name: "MRI Brain",
      excerpt: "Magnetic resonance imaging of the brain",
      slug: "mri-brain",
      price: 8000,
      sampleCollectionFee: 200,
      status: "published",
      isFeatured: false,
      isPublic: true,
      version: 1,
      faqs: [],
      featuredImage: {
        fileUrl: "/images/diagnostics/mri-brain.jpg",
      },
      categories: [
        { id: "5", name: "Radiology" },
        { id: "6", name: "Neurology" },
      ],
      createdAt: new Date("2024-01-03"),
      updatedAt: new Date("2024-01-03"),
    },
    {
      id: "4",
      name: "Thyroid Function Test",
      excerpt: "Comprehensive thyroid hormone levels test",
      slug: "thyroid-function-test",
      price: 1200,
      sampleCollectionFee: 100,
      status: "published",
      isFeatured: false,
      isPublic: true,
      version: 1,
      faqs: [],
      featuredImage: {
        fileUrl: "/images/diagnostics/thyroid-test.jpg",
      },
      categories: [
        { id: "1", name: "Blood Tests" },
        { id: "7", name: "Endocrinology" },
      ],
      createdAt: new Date("2024-01-04"),
      updatedAt: new Date("2024-01-04"),
    },
    {
      id: "5",
      name: "X-Ray Chest",
      excerpt: "Chest X-ray for lung and heart evaluation",
      slug: "x-ray-chest",
      price: 600,
      sampleCollectionFee: 0,
      status: "published",
      isFeatured: false,
      isPublic: true,
      version: 1,
      faqs: [],
      featuredImage: {
        fileUrl: "/images/diagnostics/xray-chest.jpg",
      },
      categories: [
        { id: "5", name: "Radiology" },
        { id: "8", name: "Pulmonology" },
      ],
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
    },
  ];

  // Filter diagnostics based on search and filter criteria
  const filteredDiagnostics = mockDiagnostics.filter((diagnostic) => {
    const matchesSearch =
      !search ||
      diagnostic.name.toLowerCase().includes(search.toLowerCase()) ||
      (diagnostic.excerpt &&
        diagnostic.excerpt.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = !status || diagnostic.status === status;

    return matchesSearch && matchesStatus;
  });

  // Sort by price if specified
  const sortedDiagnostics = priceSort
    ? [...filteredDiagnostics].sort((a, b) =>
        priceSort === "asc"
          ? (a.price || 0) - (b.price || 0)
          : (b.price || 0) - (a.price || 0),
      )
    : filteredDiagnostics;

  // Paginate results
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const diagnostics = sortedDiagnostics.slice(startIndex, endIndex);

  const meta = {
    total: filteredDiagnostics.length,
    page: currentPage,
    limit: 10,
    totalPages: Math.ceil(filteredDiagnostics.length / 10),
  };

  const isLoading = false;
  const error = null;

  // Custom debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 500);

  const handleReset = () => {
    setSearch("");
    setCategoryId("");
    setStatus("");
    setPriceSort(undefined);
    setCurrentPage(1);
  };

  const renderDiagnosticRow = (diagnostic: HospitalDiagnostic) => (
    <tr
      key={diagnostic.id}
      className="border-b border-slate-200 hover:bg-slate-50 dark:border-strokedark dark:hover:bg-meta-4"
    >
      <td className="px-4 py-4">
        <div className="flex items-center justify-start gap-4">
          <div>
            {diagnostic.featuredImage ? (
              <div className="relative h-10 w-10">
                <Image
                  src={diagnostic.featuredImage.fileUrl}
                  alt={diagnostic.name}
                  width={50}
                  height={50}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 dark:bg-boxdark">
                <Package className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </div>
            )}
          </div>
          <div>
            <h5 className="text-sm font-medium text-black dark:text-white">
              {diagnostic.name}
            </h5>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {diagnostic.excerpt || "No description available"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-1">
          {diagnostic.categories?.map((category) => (
            <span
              key={category.id}
              className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-meta-4 dark:text-slate-300"
            >
              {category.name}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          ৳{diagnostic.price}
        </p>
        {diagnostic.sampleCollectionFee && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Collection Fee: ৳{diagnostic.sampleCollectionFee}
          </p>
        )}
      </td>
      <td className="px-4 py-4">
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            diagnostic.status === "published"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {diagnostic.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/diagnostics/${diagnostic.slug}`}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-meta-4"
          >
            <FiEye className="h-5 w-5" />
          </Link>
          <Link
            href={`/dashboard/diagnostics/manage?slug=${diagnostic.slug}`}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-meta-4"
          >
            <FiEdit className="h-5 w-5" />
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            All Diagnostics
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Manage and view all diagnostic tests
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search diagnostics..."
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 pl-4 pr-6 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={priceSort || ""}
            onChange={(e) => setPriceSort(e.target.value as "asc" | "desc")}
            className="rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-slate-50 dark:border-strokedark dark:bg-boxdark dark:hover:bg-meta-4"
          >
            <GrPowerReset />
            <span>Reset</span>
          </button>

          <Link
            href="/dashboard/diagnostics/manage"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
          >
            Create Diagnostic
          </Link>
        </div>
      </div>

      {isLoading ? (
        <IconLoading />
      ) : error ? (
        <ErrorMessage message={(error as Error).message} />
      ) : !diagnostics?.length ? (
        <div className="mt-4 flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
          <PiSmileySadLight className="size-16 text-slate-400" />
          <h3 className="mt-4 text-xl font-medium text-black dark:text-white">
            No diagnostics found
          </h3>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Get started by creating a new diagnostic test or reset filters.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/dashboard/diagnostics/manage"
              className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-opacity-90"
            >
              Add New Diagnostic
            </Link>
            <button
              onClick={handleReset}
              className="rounded-md border border-stroke bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:border-strokedark dark:bg-boxdark dark:text-slate-300 dark:hover:bg-meta-4"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-strokedark">
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Details
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Categories
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Price
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diagnostics.map((diagnostic) =>
                    renderDiagnosticRow(diagnostic as HospitalDiagnostic),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {meta && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={meta.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
