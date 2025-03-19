"use client";

import { ApiUrl } from "@/app/Variables";
import HealthaIcon from "@/components/HealthaIcon";
import { useAuth } from "@/store/useAuth";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmailContent = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const redirectUrl = searchParams.get("redirect");
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!email) {
      router.push("/auth/login");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${ApiUrl}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          redirectUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to resend verification code");
      }

      toast.success("New verification code sent to your email");
      setResendTimer(60); // 60 seconds cooldown
    } catch (err) {
      console.error("Resend error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to resend verification code",
      );
      toast.error("Failed to resend verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter complete verification code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${ApiUrl}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setSuccess("Email verified successfully");
      toast.success("Email verified successfully");

      // Update user verification status in auth store
      if (user) {
        user.isVerified = true;
        // Force a refresh of the auth store
        localStorage.setItem(
          "doctorSession",
          JSON.stringify({
            user: { ...user, isVerified: true },
            doctor: localStorage.getItem("doctorSession")
              ? JSON.parse(localStorage.getItem("doctorSession") || "{}")
                  .doctor
              : null,
            isAuthenticated,
            isVerified: true,
          }),
        );
      }

      // Redirect after success
      setTimeout(() => {
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (isAuthenticated) {
          router.push("/dashboard");
        } else {
          router.push("/auth/login");
        }
      }, 2000);
    } catch (err) {
      console.error("Verification error:", err);
      const message =
        err instanceof Error ? err.message : "Verification failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 md:py-12">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
        <div className="flex flex-col items-center justify-center">
          <HealthaIcon />
          <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
            Enter Verification Code
          </h2>
          <p className="mt-2 text-center text-xs text-gray-600 sm:text-sm">
            We sent a verification code to{" "}
            <span className="font-medium text-blue-600">{email}</span>
          </p>
        </div>

        <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-10 w-10 rounded-lg border border-gray-300 text-center text-base font-semibold text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:h-12 sm:w-12 sm:text-lg"
              />
            ))}
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
              className="flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 sm:px-4 sm:py-3 sm:text-base"
            >
              {isLoading ? (
                <Loader className="h-3 w-3 animate-spin sm:h-4 sm:w-4" />
              ) : (
                "Verify Email"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 sm:text-sm">
              Didn&apos;t receive the code?{" "}
            </p>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || isLoading}
              className="mt-1 text-xs font-medium text-primary hover:text-primary/90 disabled:opacity-50 sm:text-sm"
            >
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : "Resend code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Wrap the main component with Suspense
const VerifyEmail = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-primary sm:h-8 sm:w-8" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;
