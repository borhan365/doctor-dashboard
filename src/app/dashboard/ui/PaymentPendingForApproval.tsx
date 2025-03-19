import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Payment {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  transactionId: string;
  bkashNumber?: string;
  notes?: string;
  createdAt: string;
}

interface PaymentPendingForApprovalProps {
  doctorName: string;
  payment: Payment;
}

function PaymentPendingForApproval({
  doctorName,
  payment,
}: PaymentPendingForApprovalProps) {
  // Format the date
  const submittedDate = new Date(payment.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900/30 dark:bg-yellow-900/10">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Clock className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
          <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300">
            Payment Pending for Admin Approval
          </h2>
        </div>

        {/* Status Message */}
        <div className="rounded-md bg-white p-4 shadow-sm dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">
            Thank you for your payment. We are currently reviewing your payment
            and doctor information. Once approved by our administrators, your
            doctor will be visible to the public.
          </p>
        </div>

        {/* Payment Details */}
        <div className="rounded-md bg-white p-4 shadow-sm dark:bg-gray-800">
          <h3 className="mb-3 font-medium text-gray-900 dark:text-white">
            Payment Details
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Doctor Name
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {doctorName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted Date
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {submittedDate}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
              <p className="font-medium text-gray-900 dark:text-white">
                ৳{payment.amount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Payment Method
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {payment.method}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Transaction ID
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {payment.transactionId}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Payment ID
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {payment.paymentId}
              </p>
            </div>
            {payment.notes && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Notes
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {payment.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Status Timeline
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Payment Submitted
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {submittedDate}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Under Review
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your submission is being reviewed by our team
                </p>
              </div>
            </div>

            <div className="flex items-start opacity-50">
              <div className="mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <CheckCircle className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  Approval Pending
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Waiting for administrator approval
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/10">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                What&apos;s Next?
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-inside list-disc space-y-1">
                  <li>
                    You&apos;ll receive an email notification once your doctor
                    is approved
                  </li>
                  <li>Approval typically takes up to 24 hours</li>
                  <li>
                    You can continue setting up your doctor profile in the
                    meantime
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have questions? Contact our support team at{" "}
            <a
              href="mailto:support@healtha.io"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              support@healtha.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPendingForApproval;
