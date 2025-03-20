"use client";

import ErrorMessage from "@/components/common/Messages/errorMessage";
import Pagination from "@/components/common/Pagination";
import IconLoading from "@/components/Loader/IconLoading";
import { useGetMedicines } from "@/hooks/useMedicines";
import { Medicine } from "@/types/medicines";
import { debounce } from "lodash";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { PiSmileySadLight } from "react-icons/pi";

export default function AllMedicinesPage() {
  const [search, setSearch] = useState("");
  const [genericId, setGenericId] = useState<string>("");
  const [manufacturerId, setManufacturerId] = useState<string>("");
  const [medicineTypeId, setMedicineTypeId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetMedicines({
    page: currentPage,
    limit: 10,
    search,
    genericId,
    manufacturerId,
    medicineTypeId,
  });

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 500);

  const handleReset = () => {
    setSearch("");
    setGenericId("");
    setManufacturerId("");
    setMedicineTypeId("");
    setCurrentPage(1);
  };

  const renderMedicineRow = (medicine: Medicine) => (
    <tr
      key={medicine.id}
      className="border-b border-slate-200 hover:bg-slate-50 dark:border-strokedark dark:hover:bg-meta-4"
    >
      <td className="px-4 py-4">
        <div className="flex items-center justify-start gap-4">
          <div>
            {medicine.featuredImage ? (
              <div className="relative h-10 w-10">
                <Image
                  src={medicine.featuredImage}
                  alt={medicine.name}
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
              {medicine.name}
            </h5>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {medicine.medicineId}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {medicine?.generic?.name}
        </p>
      </td>
      <td className="px-4 py-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {medicine?.manufacturer?.name}
        </p>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-1">
          {medicine?.dosageForms?.map((form) => (
            <span
              key={form.id}
              className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-meta-4 dark:text-slate-300"
            >
              {form.name}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-4">
        {medicine?.details?.[0] && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              ৳{medicine?.details?.[0]?.unitPrice}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Stock: {medicine.details[0].stockQuantity}
            </p>
          </div>
        )}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/medicines/${medicine.slug}`}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-meta-4"
          >
            <FiEye className="h-5 w-5" />
          </Link>
          <Link
            href={`/dashboard/medicines/manage?slug=${medicine.slug}`}
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
            All Medicines
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Manage and view all medicines in the system
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 pl-4 pr-6 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-slate-50 dark:border-strokedark dark:bg-boxdark dark:hover:bg-meta-4"
          >
            <GrPowerReset />
            <span>Reset</span>
          </button>

          <Link
            href="/dashboard/medicines/manage"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
          >
            Create Medicine
          </Link>
        </div>
      </div>

      {isLoading ? (
        <IconLoading />
      ) : error ? (
        <ErrorMessage message={(error as Error).message} />
      ) : !data?.medicines.length ? (
        <div className="mt-4 flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
          <PiSmileySadLight className="size-16 text-slate-400" />
          <h3 className="mt-4 text-xl font-medium text-black dark:text-white">
            No medicines found
          </h3>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Get started by creating a new medicine or reset filters.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/dashboard/medicines/manage"
              className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-opacity-90"
            >
              Add New Medicine
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
                      Generic
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Manufacturer
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Dosage Forms
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Price & Stock
                    </th>
                    <th className="px-4 py-5 text-left text-sm font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.medicines.map((medicine) =>
                    renderMedicineRow(medicine as Medicine),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {data.meta && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={data.meta.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
