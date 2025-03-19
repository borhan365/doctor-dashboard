"use client";

import {
  BadgeCheck,
  BanknoteIcon,
  Globe,
  ShieldCheck,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import CreatePayment from "./PaymentModel";

import bkashLogo from "/public/images/logo/bkash.webp";

// Default registration fee amount
const REGISTRATION_FEE = 1000;
const REGISTRATION_CURRENCY = "BDT";

function PaymentReqestSection() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const benefits = useMemo(
    () => [
      {
        icon: Star,
        title: "Premium Visibility",
        description: "Get featured in search results",
      },
      {
        icon: BadgeCheck,
        title: "Verified Status",
        description: "Build trust with verified badge",
      },
      {
        icon: Globe,
        title: "Wider Reach",
        description: "Connect with more patients",
      },
      {
        icon: BanknoteIcon,
        title: "Lifetime Access",
        description: "One-time payment only",
      },
    ],
    [],
  );

  return (
    <>
      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
        {/* Main Content */}
        <div className="grid gap-6 p-10 lg:grid-cols-1 mx-auto max-w-4xl">
          {/* Payment Section */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Activate Your Profile
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                One-time payment for lifetime access
              </p>
            </div>

            {/* Payment Card */}
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50/30 p-6 dark:border-blue-900/50 dark:from-blue-900/20 dark:to-blue-900/10">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white p-1 dark:bg-blue-900/50">
                    {/* <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" /> */}
                    <Image
                      src={bkashLogo}
                      alt="Logo"
                      width={30}
                      height={30}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200">
                      Registration Fee
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Lifetime access
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                   ৳1,000
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    One-time
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-600"
              >
                Pay Now
              </button>
            </div>

            {/* Verification Status */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 fill-blue-600 text-white dark:text-slate-400" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    Verification Status
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your profile will be verified after payment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Unlock Your Premium Benefits
            </h3>
            <div className="grid gap-4 sm:grid-cols-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50"
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/50">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="mb-1 font-medium text-slate-800 dark:text-slate-200">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Join our network of verified hospitals and expand your reach across
            Bangladesh
          </p>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showPaymentModal && (
        <CreatePayment
          amount={REGISTRATION_FEE}
          currency={REGISTRATION_CURRENCY}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </>
  );
}

export default PaymentReqestSection;
