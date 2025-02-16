"use client";

import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Search,
  Plus,
  Printer,
} from "lucide-react";
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

interface Invoice {
  id: string;
  invoiceNumber: string;
  patientName: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

// Mock Data
const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    patientName: "John Doe",
    date: "2024-03-15",
    amount: 150.00,
    status: "paid"
  },
  {
    id: "2", 
    invoiceNumber: "INV-2024-002",
    patientName: "Jane Doe",
    date: "2024-03-14",
    amount: 200.00,
    status: "pending"
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003", 
    patientName: "Alice Doe",
    date: "2024-03-13",
    amount: 175.50,
    status: "overdue"
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    patientName: "Bob Doe",
    date: "2024-03-12", 
    amount: 125.00,
    status: "paid"
  },
  {
    id: "5",
    invoiceNumber: "INV-2024-005",
    patientName: "Eve Doe",
    date: "2024-03-11",
    amount: 300.00,
    status: "pending"
  }
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

function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: invoices,
    isLoading,
    isError,
    error,
  } = useQuery<Invoice[], Error>({
    queryKey: ["invoices"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return MOCK_INVOICES;
    },
  });

  const filteredInvoices = invoices?.filter((invoice) => {
    const matchesSearch = invoice.invoiceNumber
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterBy === "all" || invoice.status === filterBy;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil((filteredInvoices?.length || 0) / itemsPerPage);
  const paginatedInvoices = filteredInvoices?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-700">Invoices</h2>
        {/* count of records */}
        <p className="text-sm text-slate-500">
          We found{" "}
          <span className="font-semibold text-violet-500">
            {filteredInvoices?.length}
          </span>{" "}
          invoices
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-3 pl-10 text-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        {isLoading ? (
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
          <div className="p-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-600">
              <p>Error: {error.message}</p>
              <button
                className="mt-2 inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : paginatedInvoices?.length === 0 ? (
          <div className="p-4 text-center text-slate-500">
            No invoices found
          </div>
        ) : (
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Invoice Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm">
                    <span className="font-medium text-slate-900">
                      {invoice.invoiceNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-slate-900">
                      {new Date(invoice.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-medium text-slate-900">
                      ${invoice.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Printer className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredInvoices && filteredInvoices.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Invoices;
