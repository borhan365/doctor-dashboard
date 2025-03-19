"use client";

import { ApiUrl } from "@/app/Variables";
import HealthaIcon from "@/components/HealthaIcon";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const ResetPasswordContent: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Reset token is missing");
    }
  }, [token]);

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 6)
      errors.push("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      errors.push("Include at least one uppercase letter");
    if (!/[a-z]/.test(password))
      errors.push("Include at least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("Include at least one number");
    if (!/[!@#$%^&*]/.test(password))
      errors.push("Include at least one special character");
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(". "));
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${ApiUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Password has been reset successfully");
      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err);
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
              Set New Password
            </h2>
            <p className="mb-6 text-center text-sm text-gray-600">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:px-4 sm:py-3 sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:px-4 sm:py-3 sm:text-base"
                />
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
                disabled={isLoading || !token}
                className="flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-3 py-2 text-xs font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-base"
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-3 w-3 animate-spin sm:h-4 sm:w-4" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
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

// Wrap the main component with Suspense
const ResetPassword: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-primary sm:h-8 sm:w-8" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
