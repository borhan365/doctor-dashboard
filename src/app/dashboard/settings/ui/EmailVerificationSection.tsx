"use client";

import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  emailVerified: Date | null;
  isVerified: boolean;
}

interface EmailVerificationSectionProps {
  user: User | null;
}

export const EmailVerificationSection = ({
  user,
}: EmailVerificationSectionProps) => {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  if (!user || user.emailVerified || user.isVerified) return null;

  const handleSendVerification = async () => {
    if (isSending || !user.email) return;

    try {
      setIsSending(true);
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          redirectUrl: window.location.origin + "/doctor",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send verification email");
      }

      toast.success("Verification email sent! Please check your inbox.");
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(
          user.email,
        )}&redirect=${encodeURIComponent(window.location.href)}`,
      );
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      toast.error(error.message || "Failed to send verification email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:bg-yellow-900/20">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle
            className="h-6 w-6 text-yellow-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-base font-medium text-yellow-800 dark:text-yellow-200">
            Email Verification Required
          </h3>
          <div className="mt-2 text-base text-yellow-700 dark:text-yellow-300">
            <p>
              Please verify your email address to access all features.{" "}
              {!isSending ? (
                <button
                  onClick={handleSendVerification}
                  className="ml-1 font-medium text-yellow-800 underline hover:text-yellow-900 disabled:opacity-50 dark:text-yellow-200 dark:hover:text-yellow-100"
                  disabled={isSending}
                >
                  Resend verification email
                </button>
              ) : (
                <span className="ml-1 inline-flex items-center text-yellow-800 dark:text-yellow-200">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
