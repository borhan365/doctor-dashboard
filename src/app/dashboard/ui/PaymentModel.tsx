import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import PaymentProof from "./PaymentProof";
interface CreatePaymentProps {
  onClose: () => void;
}

import { ApiUrl } from "@/app/Variables";
import bkashLogo from "/public/images/logo/bkash.webp";

export default function CreatePayment({ onClose }: CreatePaymentProps) {
  // Static data for demo purposes
  const user = { doctorId: "demo-doctor-id" };

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: "",
    advertisementId: "",
    method: "BKASH",
    transactionId: "",
    bkashNumber: "",
    paymentSource: "DOCTOR",
    paymentType: "REGISTRATION",
    status: "PENDING",
    doctorId: user?.doctorId || "",
    hospitalId: "",
    notes: "",
    proofImage: null as File | null,
  });

  const [copySuccess, setCopySuccess] = useState(false);

  console.log("formData", formData);

  const createPaymentMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${ApiUrl}/accounts/payments/create`, {
        method: "POST",
        body: data,
        credentials: "include",
        mode: "cors",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || error.error || "Failed to create payment",
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Payment created successfully");
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.amount || !formData.method) {
      toast.error("Please fill in all required fields");
      return;
    }

    const form = new FormData();
    form.append("amount", formData.amount.toString());
    form.append("method", formData.method);
    form.append("status", formData.status);
    form.append("transactionId", formData.transactionId || "");
    form.append("bkashNumber", formData.bkashNumber || "");
    form.append("paymentSource", formData.paymentSource || "");
    form.append("paymentType", formData.paymentType || "");
    form.append("notes", formData.notes || "");

    // Add user ID if available
    if (user?.id) {
      form.append("userId", user.id);
    }

    // Add advertisement ID if payment type is ADVERTISEMENT
    if (formData.paymentType === "ADVERTISEMENT" && formData.advertisementId) {
      form.append("advertisementId", formData.advertisementId);
    }

    if (formData.doctorId) {
      form.append("doctorId", formData.doctorId);
    }
    if (formData.hospitalId) {
      form.append("hospitalId", formData.hospitalId);
    }
    if (formData.proofImage) {
      form.append("proofImage", formData.proofImage);
    }

    createPaymentMutation.mutate(form);
  };

  // Modify the copy handler
  const handleCopyNumber = () => {
    navigator.clipboard.writeText("01851590081").then(() => {
      setCopySuccess(true);
      // Hide the success message after 3 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="h-auto w-full max-w-3xl overflow-y-scroll rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Add New Payment
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4 flex items-center justify-between rounded-md border border-slate-200 bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white p-1 dark:bg-blue-900/50">
                <Image
                  src={bkashLogo}
                  alt="Logo"
                  width={30}
                  height={30}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="group flex cursor-pointer items-center justify-start gap-2 font-medium text-slate-800 dark:text-slate-200"
                    onClick={handleCopyNumber}
                  >
                    <span>01851590081</span>
                    <Copy className="h-4 w-4 text-slate-600 transition-colors group-hover:text-blue-600 dark:text-slate-400" />
                  </h3>
                  {copySuccess && (
                    <span className="animate-fade-in-out text-sm text-green-600">
                      Copied!
                    </span>
                  )}
                </div>
                <p className="text-sm font-normal text-slate-600 dark:text-slate-400">
                  Bkash personal number
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ৳1,020
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                One-time
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                Amount{" "}
                <span className="font-normal text-slate-400">(Required)</span>
              </label>
              <input
                type="number"
                placeholder="1000"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                Payment Method{" "}
                <span className="font-normal text-slate-400">(Required)</span>
              </label>
              <select
                value={formData.method}
                onChange={(e) => handleInputChange("method", e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800"
                required
              >
                <option value="BKASH">BKASH</option>
                <option value="NAGAD">NAGAD</option>
                <option value="ROCKET">ROCKET</option>
              </select>
            </div>

            {/* Mobile Payment Fields */}
            {(formData.method === "BKASH" ||
              formData.method === "NAGAD" ||
              formData.method === "ROCKET") && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                    Transaction ID{" "}
                    <span className="font-normal text-slate-400">
                      (Required)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="LSJDL23232J"
                    value={formData.transactionId}
                    onChange={(e) =>
                      handleInputChange("transactionId", e.target.value)
                    }
                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                    Mobile Number{" "}
                    <span className="font-normal text-slate-400">
                      (Required)
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="01712345678"
                    value={formData.bkashNumber}
                    onChange={(e) =>
                      handleInputChange("bkashNumber", e.target.value)
                    }
                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </>
            )}

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                Notes{" "}
                <span className="font-normal text-slate-400">(Optional)</span>
              </label>
              <textarea
                value={formData.notes}
                placeholder="Enter notes"
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            {/* Payment Proof */}
            {formData.paymentType !== "ADVERTISEMENT" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-400">
                  Payment Proof{" "}
                  <span className="font-normal text-slate-400">(Optional)</span>
                </label>
                <PaymentProof
                  value={formData.proofImage}
                  handleInputChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              disabled={createPaymentMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={createPaymentMutation.isPending}
            >
              {createPaymentMutation.isPending
                ? "Creating..."
                : "Create Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
