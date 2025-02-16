"use client";

import {
  ChevronDown,
  Clipboard,
  Download,
  Eye,
  FileText,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface Record {
  id: string;
  type: string;
  date: string;
  description: string;
  color: string;
}

const records: Record[] = [
  {
    id: "1",
    type: "Lab Report",
    date: "24 Mar 2024",
    description: "Glucose Test V12",
    color: "#FFFF00",
  },
  {
    id: "2",
    type: "Lab Report",
    date: "27 Mar 2024",
    description: "Complete Blood Count(CBC)",
    color: "#008080",
  },
  {
    id: "3",
    type: "Lab Report",
    date: "10 Apr 2024",
    description: "Echocardiogram",
    color: "#007ACC",
  },
  {
    id: "4",
    type: "Lab Report",
    date: "19 Apr 2024",
    description: "COVID-19 Test",
    color: "#FF69B4",
  },
  {
    id: "5",
    type: "Lab Report",
    date: "27 Apr 2024",
    description: "Allergy Tests",
    color: "#00BFFF",
  },
  {
    id: "6",
    type: "Lab Report",
    date: "02 May 2024",
    description: "Lipid Panel",
    color: "#FFFF00",
  },
];

export default function MedicalRecords() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const recordsPerPage = 6;

  // Filter and sort records
  const filteredRecords = records
    .filter(
      (record) =>
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.date.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(a.date.split(" ").slice(1).join(" ")).getTime();
      const dateB = new Date(b.date.split(" ").slice(1).join(" ")).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const currentRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage,
  );

  return (
    <div className="mx-auto w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-700">
          Medical Records
        </h2>
        {/* count of records */}
        <p className="text-sm text-slate-500">
          We found{" "}
          <span className="font-semibold text-violet-500">
            {filteredRecords.length}
          </span>{" "}
          records
        </p>
      </div>

      <div className="rounded-lg bg-white shadow-sm p-4">
        <div className="mb-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div className="flex items-center gap-4 self-end">
              <button
                onClick={() =>
                  setSortOrder((order) => (order === "asc" ? "desc" : "asc"))
                }
                className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
              >
                Date {sortOrder === "asc" ? "Newest" : "Oldest"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    sortOrder === "asc" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentRecords.map((record) => (
                <tr
                  key={record.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <FileText
                          className={`h-5 w-5`}
                          style={{ color: record.color }}
                        />
                      </div>
                      <span className="text-sm text-slate-600">
                        {record.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-600">
                      {record.date}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-600">
                      {record.description}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="rounded-md p-1.5 transition-colors hover:bg-slate-100"
                        aria-label="Copy"
                      >
                        <Eye className="h-4 w-4 text-slate-600" />
                      </button>
                      <button
                        className="rounded-md p-1.5 transition-colors hover:bg-slate-100"
                        aria-label="Download"
                      >
                        <Download className="h-4 w-4 text-slate-600" />
                      </button>
                      <button
                        className="rounded-md p-1.5 transition-colors hover:bg-slate-100"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-slate-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-1 border-t border-slate-100 px-4 py-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-md p-2 text-sm hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="Previous page"
          >
            ‹
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-8 w-8 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              aria-label={`Page ${i + 1}`}
              aria-current={currentPage === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded-md p-2 text-sm hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
