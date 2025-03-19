"use client";

import { useState } from "react";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("subscriptions");

  // Mock data for demonstration
  const subscriptions = [
    {
      id: 1,
      plan: "Professional",
      price: "$49.99",
      status: "Active",
      renewalDate: "2024-04-15",
      features: [
        "Unlimited Prescriptions",
        "Premium Analytics",
        "24/7 Support",
      ],
    },
    {
      id: 2,
      plan: "Enterprise",
      price: "$99.99",
      status: "Cancelled",
      renewalDate: "2024-03-01",
      features: [
        "Custom Templates",
        "API Access",
        "Priority Support",
        "Advanced Analytics",
      ],
    },
  ];

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-03-01",
      amount: "$49.99",
      status: "Paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-2024-002",
      date: "2024-02-01",
      amount: "$49.99",
      status: "Paid",
      description: "Professional Plan - Monthly",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold dark:text-white">
        Billing & Subscriptions
      </h1>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b dark:border-slate-700">
          <button
            className={`px-4 py-2 ${
              activeTab === "subscriptions"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => setActiveTab("subscriptions")}
          >
            Subscriptions
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "invoices"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => setActiveTab("invoices")}
          >
            Invoice History
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "payment"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Methods
          </button>
        </div>
      </div>

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <div className="space-y-6">
          {/* Current Plan Summary */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  Current Plan
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Professional Plan - Monthly
                </p>
              </div>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Upgrade Plan
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4 dark:border-slate-600">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Next Payment
                </p>
                <p className="text-lg font-semibold dark:text-white">$49.99</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  April 15, 2024
                </p>
              </div>
              <div className="rounded-lg border p-4 dark:border-slate-600">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Billing Cycle
                </p>
                <p className="text-lg font-semibold dark:text-white">Monthly</p>
              </div>
              <div className="rounded-lg border p-4 dark:border-slate-600">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Plan Status
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div className="grid gap-6 md:grid-cols-3">
            {["Basic", "Professional", "Enterprise"].map((plan) => (
              <div
                key={plan}
                className="rounded-lg border bg-white p-6 shadow dark:border-slate-600 dark:bg-slate-800"
              >
                <h3 className="mb-2 text-lg font-semibold dark:text-white">
                  {plan}
                </h3>
                <p className="mb-4 text-3xl font-bold dark:text-white">
                  {plan === "Basic"
                    ? "$29.99"
                    : plan === "Professional"
                      ? "$49.99"
                      : "$99.99"}
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    /month
                  </span>
                </p>
                <ul className="mb-6 space-y-2">
                  {[
                    "Basic Features",
                    "Patient Management",
                    plan !== "Basic" && "Premium Analytics",
                    plan === "Enterprise" && "API Access",
                  ]
                    .filter(Boolean)
                    .map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-slate-600 dark:text-slate-300"
                      >
                        <svg
                          className="mr-2 h-5 w-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                </ul>
                <button
                  className={`w-full rounded-lg px-4 py-2 ${
                    plan === "Professional"
                      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-700"
                  }`}
                >
                  {plan === "Professional" ? "Current Plan" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === "invoices" && (
        <div className="rounded-lg bg-white shadow dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-slate-700">
                  <th className="px-6 py-3 text-left text-sm font-semibold dark:text-white">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold dark:text-white">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold dark:text-white">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold dark:text-white">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b dark:border-slate-700"
                  >
                    <td className="px-6 py-4 text-sm dark:text-white">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm dark:text-white">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 text-sm dark:text-white">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm dark:text-white">
                      {invoice.description}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === "payment" && (
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold dark:text-white">
              Payment Methods
            </h2>
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4 dark:border-slate-600">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-700">
                    <svg
                      className="h-6 w-6 text-slate-600 dark:text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">
                      •••• •••• •••• 4242
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Expires 12/24
                    </p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  Remove
                </button>
              </div>
            </div>
            <button className="flex items-center rounded-lg border border-dashed border-slate-300 px-4 py-2 text-slate-600 hover:border-blue-500 hover:text-blue-500 dark:border-slate-600 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Payment Method
            </button>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold dark:text-white">
              Billing Address
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Street Address"
                className="rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
              <input
                type="text"
                placeholder="City"
                className="rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
              <input
                type="text"
                placeholder="State/Province"
                className="rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
