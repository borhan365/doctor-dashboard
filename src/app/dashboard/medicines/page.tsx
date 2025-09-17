"use client";

import ErrorMessage from "@/components/common/Messages/errorMessage";
import Pagination from "@/components/common/Pagination";
import IconLoading from "@/components/Loader/IconLoading";
import { Medicine } from "@/types/medicines";
// Removed lodash import - using custom debounce
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

  // Static dummy data for medicines
  const mockMedicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol 500mg",
      slug: "paracetamol-500mg",
      medicineId: "MED001",
      featuredImage: "/images/medicines/paracetamol.jpg",
      medicineType: {
        id: "1",
        name: "OTC",
      },
      categories: [
        { id: "1", name: "Pain Relief" },
        { id: "2", name: "Fever Reducer" },
      ],
      diseases: [
        { id: "1", name: "Fever" },
        { id: "2", name: "Headache" },
        { id: "3", name: "Body Pain" },
      ],
      totalImpressions: 5000,
      totalClicks: 250,
      generic: {
        id: "1",
        name: "Paracetamol",
      },
      manufacturer: {
        id: "1",
        name: "Square Pharmaceuticals",
      },
      dosageForms: [
        { id: "1", name: "Tablet" },
        { id: "2", name: "Syrup" },
      ],
      details: [
        {
          id: "1",
          unitPrice: 2.5,
          stockQuantity: 1000,
          isActive: true,
          isFeatured: false,
          isVerified: true,
          isSponsored: false,
          requiresPrescription: false,
          isGeneric: true,
          isOtc: true,
          isBranded: false,
          sku: "PAR500",
          barCode: "1234567890123",
          expiryDate: new Date("2025-12-31"),
          discount: 0,
          safetyAdvices: {},
        },
      ],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "Amoxicillin 250mg",
      slug: "amoxicillin-250mg",
      medicineId: "MED002",
      featuredImage: "/images/medicines/amoxicillin.jpg",
      medicineType: {
        id: "2",
        name: "Prescription",
      },
      categories: [
        { id: "3", name: "Antibiotic" },
        { id: "4", name: "Infection Treatment" },
      ],
      diseases: [
        { id: "4", name: "Bacterial Infection" },
        { id: "5", name: "Respiratory Infection" },
        { id: "6", name: "Urinary Tract Infection" },
      ],
      totalImpressions: 3200,
      totalClicks: 180,
      generic: {
        id: "2",
        name: "Amoxicillin",
      },
      manufacturer: {
        id: "2",
        name: "Beximco Pharmaceuticals",
      },
      dosageForms: [
        { id: "1", name: "Capsule" },
        { id: "3", name: "Suspension" },
      ],
      details: [
        {
          id: "2",
          unitPrice: 5.0,
          stockQuantity: 500,
          isActive: true,
          isFeatured: false,
          isVerified: true,
          isSponsored: false,
          requiresPrescription: true,
          isGeneric: true,
          isOtc: false,
          isBranded: false,
          sku: "AMO250",
          barCode: "1234567890124",
          expiryDate: new Date("2025-12-31"),
          discount: 0,
          safetyAdvices: {},
        },
      ],
      createdAt: new Date("2024-01-02"),
      updatedAt: new Date("2024-01-02"),
    },
    {
      id: "3",
      name: "Metformin 500mg",
      slug: "metformin-500mg",
      medicineId: "MED003",
      featuredImage: "/images/medicines/metformin.jpg",
      medicineType: {
        id: "2",
        name: "Prescription",
      },
      categories: [
        { id: "5", name: "Diabetes" },
        { id: "6", name: "Blood Sugar Control" },
      ],
      diseases: [
        { id: "7", name: "Type 2 Diabetes" },
        { id: "8", name: "Insulin Resistance" },
      ],
      totalImpressions: 2800,
      totalClicks: 140,
      generic: {
        id: "3",
        name: "Metformin",
      },
      manufacturer: {
        id: "1",
        name: "Square Pharmaceuticals",
      },
      dosageForms: [{ id: "1", name: "Tablet" }],
      details: [
        {
          id: "3",
          unitPrice: 3.5,
          stockQuantity: 800,
          isActive: true,
          isFeatured: false,
          isVerified: true,
          isSponsored: false,
          requiresPrescription: true,
          isGeneric: true,
          isOtc: false,
          isBranded: false,
          sku: "MET500",
          barCode: "1234567890125",
          expiryDate: new Date("2025-12-31"),
          discount: 0,
          safetyAdvices: {},
        },
      ],
      createdAt: new Date("2024-01-03"),
      updatedAt: new Date("2024-01-03"),
    },
    {
      id: "4",
      name: "Omeprazole 20mg",
      slug: "omeprazole-20mg",
      medicineId: "MED004",
      featuredImage: "/images/medicines/omeprazole.jpg",
      medicineType: {
        id: "2",
        name: "Prescription",
      },
      categories: [
        { id: "7", name: "Gastrointestinal" },
        { id: "8", name: "Acid Reducer" },
      ],
      diseases: [
        { id: "9", name: "GERD" },
        { id: "10", name: "Peptic Ulcer" },
        { id: "11", name: "Acid Reflux" },
      ],
      totalImpressions: 1900,
      totalClicks: 95,
      generic: {
        id: "4",
        name: "Omeprazole",
      },
      manufacturer: {
        id: "3",
        name: "Incepta Pharmaceuticals",
      },
      dosageForms: [{ id: "1", name: "Capsule" }],
      details: [
        {
          id: "4",
          unitPrice: 8.0,
          stockQuantity: 300,
          isActive: true,
          isFeatured: false,
          isVerified: true,
          isSponsored: false,
          requiresPrescription: true,
          isGeneric: true,
          isOtc: false,
          isBranded: false,
          sku: "OME20",
          barCode: "1234567890126",
          expiryDate: new Date("2025-12-31"),
          discount: 0,
          safetyAdvices: {},
        },
      ],
      createdAt: new Date("2024-01-04"),
      updatedAt: new Date("2024-01-04"),
    },
    {
      id: "5",
      name: "Atorvastatin 20mg",
      slug: "atorvastatin-20mg",
      medicineId: "MED005",
      featuredImage: "/images/medicines/atorvastatin.jpg",
      medicineType: {
        id: "2",
        name: "Prescription",
      },
      categories: [
        { id: "1", name: "Cardiovascular" },
        { id: "9", name: "Cholesterol Control" },
      ],
      diseases: [
        { id: "12", name: "High Cholesterol" },
        { id: "13", name: "Atherosclerosis" },
        { id: "14", name: "Heart Disease" },
      ],
      totalImpressions: 2400,
      totalClicks: 120,
      generic: {
        id: "5",
        name: "Atorvastatin",
      },
      manufacturer: {
        id: "2",
        name: "Beximco Pharmaceuticals",
      },
      dosageForms: [{ id: "1", name: "Tablet" }],
      details: [
        {
          id: "5",
          unitPrice: 12.0,
          stockQuantity: 200,
          isActive: true,
          isFeatured: false,
          isVerified: true,
          isSponsored: false,
          requiresPrescription: true,
          isGeneric: true,
          isOtc: false,
          isBranded: false,
          sku: "ATO20",
          barCode: "1234567890127",
          expiryDate: new Date("2025-12-31"),
          discount: 0,
          safetyAdvices: {},
        },
      ],
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
    },
  ];

  // Filter medicines based on search and filter criteria
  const filteredMedicines = mockMedicines.filter((medicine) => {
    const matchesSearch =
      !search ||
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      medicine.medicineId.toLowerCase().includes(search.toLowerCase());

    const matchesGeneric = !genericId || medicine.generic?.id === genericId;
    const matchesManufacturer =
      !manufacturerId || medicine.manufacturer?.id === manufacturerId;

    return matchesSearch && matchesGeneric && matchesManufacturer;
  });

  // Paginate results
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedMedicines = filteredMedicines.slice(startIndex, endIndex);

  const data = {
    medicines: paginatedMedicines,
    meta: {
      total: filteredMedicines.length,
      page: currentPage,
      limit: 10,
      totalPages: Math.ceil(filteredMedicines.length / 10),
    },
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
