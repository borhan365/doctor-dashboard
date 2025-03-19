"use client";

import HealthaLoader from "@/components/Loader/HealthaLoader";
import { useDoctorDetails } from "@/store/useDoctorDetails";
import { DoctorWithPayments, Payment } from "@/types/payments";
import Link from "next/link";
import { AppointmentList } from "./ui/AppointmentList";
import { DashboardDoctorStats } from "./ui/DashboardDoctorStats";
import { MockDataForDoctorDashboard } from "./ui/MockDataForDoctorDashboard";
import { Notifications } from "./ui/Notifications";
import PaymentPendingForApproval from "./ui/PaymentPendingForApproval";
import PaymentReqestSection from "./ui/PaymentReqestSection";
import { RecentInvoices } from "./ui/RecentInvoices";
import IconLoading from "@/components/Loader/IconLoading";

export default function DoctorDashboard() {
  const { data: doctor, isLoading, isError } = useDoctorDetails();

  // Find registration payment with PENDING status
  const pendingRegistrationPayment = (
    doctor as DoctorWithPayments
  )?.payments?.find(
    (payment: Payment) =>
      payment.paymentType === "REGISTRATION" && payment.status === "PENDING",
  );

  // Check if there's any PAID or VERIFIED registration payment
  const hasCompletedRegistrationPayment = (
    doctor as DoctorWithPayments
  )?.payments?.some(
    (payment: Payment) =>
      payment.paymentType === "REGISTRATION" && payment.status === "VERIFIED",
  );

  // Show error message if there was an error fetching data
  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center dark:bg-slate-900">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm dark:border-red-800/30 dark:bg-red-900/10">
          <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-400">
            Unable to Load Dashboard
          </h2>
          <p className="text-red-600 dark:text-red-300">
            There was a problem loading your doctor information. Please try
            refreshing the page or{" "}
            <Link
              href="/contact-us"
              className="text-blue-500 hover:text-blue-600 font-medium underline"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && <IconLoading />}
      <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 lg:p-8">
        {/* Show pending payment approval section if there's a PENDING payment */}
        {pendingRegistrationPayment && (
          <PaymentPendingForApproval
            doctorName={doctor?.name || "Your Doctor"}
            payment={pendingRegistrationPayment}
          />
        )}

        {/* Show PaymentRequestSection only if there's no completed or pending registration payment */}
        {!pendingRegistrationPayment && !hasCompletedRegistrationPayment && (
          <PaymentReqestSection />
        )}

        {/* Show the dashboard components if payment is verified */}
        {hasCompletedRegistrationPayment && (
          <>
            {/* Stats Grid */}
            <DashboardDoctorStats title="Total Appointments" value="28" />

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Notifications />
              <AppointmentList
                appointments={MockDataForDoctorDashboard.appointments}
              />
              <RecentInvoices invoices={MockDataForDoctorDashboard.invoices} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
