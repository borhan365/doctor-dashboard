"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { ArrowUpIcon, ArrowDownIcon, Calendar, DollarSign, Download, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  status: "completed" | "pending" | "cancelled";
}

function Accounts() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-01-15",
      description: "Patient Consultation",
      type: "income",
      amount: 150,
      category: "Consultation",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-01-14",
      description: "Medical Supplies",
      type: "expense",
      amount: 500,
      category: "Supplies",
      status: "completed",
    },
  ]);

  const [dateRange, setDateRange] = useState("week");
  const [filterType, setFilterType] = useState("all");

  const stats = {
    totalIncome: transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0),
    totalPatients: 45,
    pendingPayments: transactions
      .filter((t) => t.status === "pending" && t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0),
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filterType === "all") return true;
    return transaction.type === filterType;
  });

  return (
    <div className="space-y-4 p-6">

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-800">Accounts</h1>
        <p className="text-slate-500">View and manage your financial transactions.</p>
      </div>

      {/* Filters */}
      <div className="w-full">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4">
              <select
              className="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <select
              className="rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>
          {/* button */}
          <div className="flex gap-2">
            <div className="rounded-lg bg-blue-100 px-4 py-2 text-blue-600 hover:bg-blue-300 flex items-center gap-2 cursor-pointer">
              <Download className="h-5 w-5 text-blue-600" />
              <span className="text-base font-medium">Export</span>
            </div>
            <PrimaryButton text="Add Transaction" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-start gap-4">
            <div className="rounded-md bg-green-50 p-4 text-green-600 hover:bg-green-300 flex items-center gap-2 cursor-pointer">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500">Total Income</p>
              <h3 className="text-2xl font-bold text-slate-800">
                ${stats.totalIncome}
              </h3>
            </div>
          </div>
          <div className={`mt-3 text-sm flex items-center justify-start gap-1 text-green-500`}>
            <ArrowUpIcon className="h-4 w-4" />
            <span className="ml-1">10% Higher Than Last Month</span>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-start gap-4">
            <div className="rounded-md bg-red-50 p-4 text-red-600 hover:bg-red-300 flex items-center gap-2 cursor-pointer">
              <TrendingUp className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-slate-500">Total Expenses</p>
              <h3 className="text-2xl font-bold text-slate-800">
                ${stats.totalExpenses}
              </h3>
            </div>
          </div>
          <div className={`mt-3 text-sm flex items-center justify-start gap-1 text-red-500`}>
            <ArrowDownIcon className="h-4 w-4" />
            <span className="ml-1">10% Lower Than Last Month</span>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-start gap-4">
            <div className="rounded-md bg-blue-50 p-4 text-blue-600 hover:bg-blue-300 flex items-center gap-2 cursor-pointer">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500">Total Patients</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {stats.totalPatients}
              </h3>
            </div>
          </div>
          <div className={`mt-3 text-sm flex items-center justify-start gap-1 text-blue-500`}>
            <ArrowUpIcon className="h-4 w-4" />
            <span className="ml-1">90% Higher Than Last Month</span>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-start gap-4">
            <div className="rounded-md bg-blue-50 p-4 text-blue-600 hover:bg-blue-300 flex items-center gap-2 cursor-pointer">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500">Pending Payments</p>
              <h3 className="text-2xl font-bold text-slate-800">
                ${stats.pendingPayments}
              </h3>
            </div>
          </div>
          <div className={`mt-3 text-sm flex items-center justify-start gap-1 text-blue-500`}>
            <ArrowUpIcon className="h-4 w-4" />
            <span className="ml-1">32% Higher Than Last Month</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border border-slate-100 bg-white shadow-xs p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-gray-800 border border-slate-100 rounded-lg">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-base font-medium text-slate-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 text-base text-slate-600">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-base text-slate-600">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 text-base text-slate-600">
                    {transaction.category}
                  </td>
                  <td
                    className={`px-6 py-4 text-base font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 capitalize py-1 text-sm font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
