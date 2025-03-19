"use client";
import { ApiUrl } from "@/app/Variables";
import HealthaIcon from "@/components/HealthaIcon";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    doctor: {
      name: "",
      bmdcNumber: "",
    },
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    doctor: {
      name: "",
      bmdcNumber: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section?: string,
  ) => {
    const { name, value } = e.target;

    // Clear error when user types
    if (section === "doctor") {
      setErrors({
        ...errors,
        doctor: {
          ...errors.doctor,
          [name]: "",
        },
      });
      setFormData({
        ...formData,
        doctor: {
          ...formData.doctor,
          [name]: value,
        },
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      doctor: {
        name: "",
        bmdcNumber: "",
      },
    };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (formData.phone.length !== 11) {
      newErrors.phone = "Phone number must be 11 digits (Ex. 01751598841)";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate doctor name
    if (!formData.doctor.name.trim()) {
      newErrors.doctor.name = "Doctor name is required";
      isValid = false;
    }

    // Validate BMDC number
    if (formData.doctor.bmdcNumber && formData.doctor.bmdcNumber.length < 5) {
      newErrors.doctor.bmdcNumber = "BMDC number must be at least 5 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${ApiUrl}/doctors/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          doctor: {
            name: formData.doctor.name,
            bmdcNumber: formData.doctor.bmdcNumber,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Registration successful! Please verify your email.");

      // Send OTP to the user's email before redirecting
      try {
        await fetch(`${ApiUrl}/auth/send-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        });
      } catch (otpError) {
        console.error("Failed to send OTP:", otpError);
        // Continue with redirect even if OTP sending fails
      }

      // Redirect to email verification page
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(formData.email)}`,
      );
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 md:py-12">
      <div className="w-full max-w-xl">
        <div className="mx-auto rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <HealthaIcon />
            </div>
            <h2 className="mb-2 mt-3 text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
              Register as a Doctor
            </h2>
            <p className="mb-6 text-center text-sm text-gray-600 sm:text-base">
              Please enter your details to create an account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div>
              <div className="mb-4 space-y-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Your full name"
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg border ${
                      errors.name ? "border-red-500" : "border-stroke"
                    } bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-base`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 sm:text-sm">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="contact@example.com"
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg border ${
                      errors.email ? "border-red-500" : "border-stroke"
                    } bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-base`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 sm:text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    Contactable Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter your phone number (11 digits)"
                    onChange={handleChange}
                    maxLength={11}
                    className={`w-full rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-stroke"
                    } bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-base`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 sm:text-sm">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
              {/* Password */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg border ${
                      errors.password ? "border-red-500" : "border-stroke"
                    } bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-base`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500 sm:text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-stroke"
                    } bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-base`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500 sm:text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-600 sm:text-lg">
                Doctor Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.doctor.name}
                    placeholder="Enter your doctor name"
                    onChange={(e) => handleChange(e, "doctor")}
                    required
                    className={`w-full rounded-lg border ${
                      errors.doctor.name ? "border-red-500" : "border-stroke"
                    } bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-base`}
                  />
                  {errors.doctor.name && (
                    <p className="mt-1 text-xs text-red-500 sm:text-sm">
                      {errors.doctor.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 sm:text-sm">
                    BMDC Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="bmdcNumber"
                    value={formData.doctor.bmdcNumber}
                    placeholder="Enter your BMDC number"
                    onChange={(e) => handleChange(e, "doctor")}
                    className={`w-full rounded-lg border ${
                      errors.doctor.bmdcNumber
                        ? "border-red-500"
                        : "border-stroke"
                    } bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary sm:px-4 sm:py-3 sm:text-base`}
                  />
                  {errors.doctor.bmdcNumber && (
                    <p className="mt-1 text-xs text-red-500 sm:text-sm">
                      {errors.doctor.bmdcNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 inline h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                  Registering...
                </>
              ) : (
                "Register as Doctor"
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
