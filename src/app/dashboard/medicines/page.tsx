"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useQuery } from "@tanstack/react-query";
import { Eye, Loader2, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Medicine {
  id: string;
  basicInfo: {
    name: string;
    excerpt?: string;
    specification?: string;
    description?: string;
  };
  common: {
    basicInfo: {
      price?: string;
      discountPrice?: string;
      stock?: string;
      postStatus?: string;
      strength?: string;
      packSize?: string;
      isFeatured?: boolean;
      isVerified?: boolean;
      isSponsored?: boolean;
      thumb?: string;
      dosageForm?: string;
      publisher?: {
        name: string;
      };
      generic?: {
        name: string;
      };
      medicineType?: {
        name: string;
      };
      medicineCompany?: {
        name: string;
      };
    };
  };
}

// Mock data
const mockMedicines: Medicine[] = [
  {
    id: "1",
    basicInfo: { name: "Paracetamol" },
    common: {
      basicInfo: {
        price: "5.99",
        stock: "500",
        postStatus: "active",
        strength: "500mg",
        thumb: "https://5.imimg.com/data5/SELLER/Default/2022/11/GU/NH/GM/8255379/paracetamol-tablet-500x500.jpeg",
        medicineCompany: { name: "Johnson & Johnson" },
        generic: { name: "Acetaminophen" },
        dosageForm: "Tablet"
      }
    }
  },
  {
    id: "2",
    basicInfo: { name: "Amoxicillin" },
    common: {
      basicInfo: {
        price: "12.99",
        stock: "200",
        postStatus: "active",
        strength: "250mg",
        medicineCompany: { name: "Pfizer" },
        generic: { name: "Amoxicillin" },
        dosageForm: "Capsule"
      }
    }
  },
  {
    id: "3",
    basicInfo: { name: "Ibuprofen" },
    common: {
      basicInfo: {
        price: "7.99",
        stock: "350",
        postStatus: "active",
        strength: "400mg",
        thumb: "https://ellanjey.com/wp-content/uploads/2018/12/GESIC_ELL_P.jpg",
        medicineCompany: { name: "GSK" },
        generic: { name: "Ibuprofen" },
        dosageForm: "Capsule"
      }
    }
  },
  {
    id: "4",
    basicInfo: { name: "Omeprazole" },
    common: {
      basicInfo: {
        price: "15.99",
        stock: "150",
        postStatus: "inactive",
        strength: "20mg",
        medicineCompany: { name: "AstraZeneca" },
        generic: { name: "Omeprazole" },
        dosageForm: "Capsule"
      }
    }
  },
  {
    id: "5",
    basicInfo: { name: "Metformin" },
    common: {
      basicInfo: {
        price: "8.99",
        stock: "250",
        postStatus: "active",
        strength: "500mg",
        thumb: "https://www.krishlarpharma.com/wp-content/uploads/2019/12/KRITFEN-P-2-tablet.jpg",
        medicineCompany: { name: "Merck" },
        generic: { name: "Metformin HCl" },
        dosageForm: "Tablet"
      }
    }
  },
  {
    id: "6",
    basicInfo: { name: "Lisinopril" },
    common: {
      basicInfo: {
        price: "11.99",
        stock: "180",
        postStatus: "active",
        strength: "10mg",
        medicineCompany: { name: "Novartis" },
        generic: { name: "Lisinopril" },
        dosageForm: "Tablet"
      }
    }
  },
  {
    id: "7",
    basicInfo: { name: "Simvastatin" },
    common: {
      basicInfo: {
        price: "13.99",
        stock: "200",
        postStatus: "active",
        strength: "20mg",
        thumb: "https://example.com/simvastatin.jpg",
        medicineCompany: { name: "Roche" },
        generic: { name: "Simvastatin" },
        dosageForm: "Capsule"
      }
    }
  },
  {
    id: "8",
    basicInfo: { name: "Aspirin" },
    common: {
      basicInfo: {
        price: "4.99",
        stock: "600",
        postStatus: "active",
        strength: "81mg",
        medicineCompany: { name: "Bayer" },
        generic: { name: "Acetylsalicylic Acid" },
        dosageForm: "Tablet"
      }
    }
  },
  {
    id: "9",
    basicInfo: { name: "Losartan" },
    common: {
      basicInfo: {
        price: "9.99",
        stock: "0",
        postStatus: "inactive",
        strength: "50mg",
        thumb: "https://example.com/losartan.jpg",
        medicineCompany: { name: "Sandoz" },
        generic: { name: "Losartan Potassium" },
        dosageForm: "Tablet"
      }
    }
  },
  {
    id: "10",
    basicInfo: { name: "Metoprolol" },
    common: {
      basicInfo: {
        price: "10.99",
        stock: "300",
        postStatus: "active",
        strength: "25mg",
        medicineCompany: { name: "Teva" },
        generic: { name: "Metoprolol Tartrate" },
        dosageForm: "Tablet"
      }
    }
  }
];

function Medicines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Using mock data instead of API call
  const { data: medicines, isLoading } = useQuery<Medicine[]>({
    queryKey: ["medicines"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockMedicines;
    },
  });

  const filteredMedicines = medicines?.filter((medicine) =>
    medicine.basicInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredMedicines?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicines = filteredMedicines?.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Medicines</h1>
        <div className="flex items-center gap-2 justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Search medicines..."
              className="rounded-lg border border-slate-300 pl-10 pr-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
        </div>
          <PrimaryButton text="Add Medicine" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-100 rounded-lg">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                      Medicine
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                      Generic
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentMedicines?.map((medicine) => (
                    <tr key={medicine.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {medicine.common.basicInfo.thumb ? (
                            <Image
                              src={medicine.common.basicInfo.thumb}
                              alt={medicine.basicInfo.name}
                              width={40}
                              height={40}
                              className="mr-3 rounded-md object-cover"
                            />
                          ) : (
                            <div className="mr-3 h-10 w-10 rounded-md bg-slate-200 flex items-center justify-center">
                              <span className="text-slate-500 text-xs">No img</span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-slate-700">
                              {medicine.basicInfo.name}
                            </div>
                            <div className="text-sm text-slate-500">
                              {medicine.common.basicInfo.strength} - {medicine.common.basicInfo.dosageForm}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base text-slate-600">
                        {medicine.common.basicInfo.medicineCompany?.name}
                      </td>
                      <td className="px-6 py-4 text-base text-slate-600">
                        {medicine.common.basicInfo.generic?.name}
                      </td>
                      <td className="px-6 py-4 text-base text-slate-600">
                        ${medicine.common.basicInfo.price}
                      </td>
                      <td className="px-6 py-4 text-base text-slate-600">
                        {medicine.common.basicInfo.stock}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 capitalize text-sm font-medium ${
                            medicine.common.basicInfo.postStatus === "active"
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {medicine.common.basicInfo.postStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredMedicines?.length || 0)} of{" "}
              {filteredMedicines?.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Medicines;