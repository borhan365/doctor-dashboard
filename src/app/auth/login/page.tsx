"use client";

import { ApiUrl } from "@/app/Variables";
import HealthaIcon from "@/components/HealthaIcon";
import { useAuth } from "@/store/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setFormError("");

    try {
      const res = await fetch(`${ApiUrl}/doctors/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        // Check if the error is about email verification
        if (result.error && result.error.includes("verify your email")) {
          toast.error("Please verify your email before logging in");
          router.push(
            `/auth/verify-email?email=${encodeURIComponent(data.email)}`,
          );
          return;
        }

        throw new Error(result.error || "Login failed");
      }

      if (result.status === "success" && result.data) {
        // Update auth store
        await login(data);

        toast.success("Login successful!");

        // Check if user is verified
        if (result.data.user && !result.data.user.isVerified) {
          // Redirect to verification page
          router.push(
            `/auth/verify-email?email=${encodeURIComponent(data.email)}`,
          );
          return;
        }

        // Use a short timeout to ensure state is updated before navigation
        setTimeout(() => {
          router.push("/dashboard");
          // Force a refresh after navigation to ensure everything is updated
          router.refresh();
        }, 100);
      } else {
        throw new Error(result.error || "Login failed");
      }
    } catch (err) {
      const error = err as Error;
      setFormError(error.message || "An error occurred during login");
      toast.error(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-6 md:py-12">
      <div className="w-full max-w-md">
        <div className="mx-auto rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
          {/* Logo placeholder */}
          <div className="mb-4 flex items-center justify-center">
            <HealthaIcon />
          </div>

          <div className="w-full text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Login to your account
            </h2>
            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
              Sign in to your hospital dashboard
            </p>
          </div>

          <form
            className="mt-6 w-full space-y-4 sm:mt-8 sm:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {formError && (
              <div className="rounded-lg bg-red-50 p-3 sm:p-4">
                <div className="text-xs font-medium text-red-800 sm:text-sm">
                  {formError}
                </div>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700 sm:text-sm"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    type="email"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring-indigo-500 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 sm:text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-700 sm:text-sm"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring-indigo-500 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-0"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600 sm:text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm"
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 h-3 w-3 animate-spin sm:h-4 sm:w-4" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Sign in
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 text-center sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
              <p className="text-xs text-gray-600 sm:text-sm">
                Don&apos;t have an account?
              </p>
              <Link
                href="/auth/register"
                className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 sm:text-sm"
              >
                Register your hospital
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
