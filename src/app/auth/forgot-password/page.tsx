"use client";

import { ApiUrl } from "@/app/Variables";
import HealthaIcon from "@/components/HealthaIcon";
import { Loader, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${ApiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Password reset instructions have been sent to your email");
      // Optionally redirect after a delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 md:py-12">
      <div className="w-full max-w-md">
        <div className="mx-auto rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
          <div className="flex flex-col items-center justify-center">
            <HealthaIcon />
            <h2 className="mb-2 mt-4 text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
              Reset Your Password
            </h2>
            <p className="mb-6 text-center text-sm text-gray-600">
              Please enter your email address to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:px-4 sm:py-3 sm:text-base"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </div>
            </div>

            {error && (
              <p className="text-center text-xs text-red-600 sm:text-sm">
                {error}
              </p>
            )}
            {success && (
              <p className="text-center text-xs text-green-600 sm:text-sm">
                {success}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-3 py-2 text-xs font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-base"
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-3 w-3 animate-spin sm:h-4 sm:w-4" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Instructions"
                )}
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600 sm:text-sm">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
