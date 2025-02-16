"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  doctorType: z.string().min(2, "Please select your doctor type"),
  specialization: z.string().min(2, "Please select your specialization"),
  experience: z.string().min(1, "Please enter your years of experience"),
  license: z.string().min(5, "Please enter a valid license number"),
  hospital: z.string().min(2, "Please enter your hospital/clinic name"),
  address: z.string().min(10, "Please enter your complete address"),
});

export default function DoctorRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Handle form submission here
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Doctor Registration
              </h1>
              <p className="mt-2 text-slate-600">
                Join our growing network of healthcare professionals
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  placeholder="Enter your first name"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{`${errors.firstName.message}`}</p>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email address"
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{`${errors.email.message}`}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{`${errors.phone.message}`}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Specialization
                  </label>
                  <select
                    {...register("specialization")}
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Specialization</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                  {errors.specialization && (
                    <p className="mt-1 text-sm text-red-600">{`${errors.specialization.message}`}</p>
                  )}
                </div>

                {/* Doctor Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Doctor Type
                  </label>
                  <select
                    {...register("doctorType")}
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Doctor Type</option>
                    <option value="doctor">Doctor</option>
                    <option value="dentist">Dentist</option>
                    <option value="vetenary">Veterinary</option>
                    <option value="nurse">Nurse</option>
                    <option value="therapist">Therapist</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.doctorType && (
                    <p className="mt-1 text-sm text-red-600">{`${errors.doctorType.message}`}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    BMDC Number
                  </label>
                  <input
                    {...register("license")}
                    placeholder="A-12345"
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.license && (
                    <p className="mt-1 text-sm text-red-600">{`${errors.license.message}`}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Years of Experience
                  </label>
                  <input
                    {...register("experience")}
                    type="number"
                    placeholder="Enter years of experience"
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">{`${errors.experience.message}`}</p>
                  )}
                </div>
             </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
