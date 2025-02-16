"use client";

import { Input } from "@/app/user/health-metrics/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Validation schema
const updateHealthMetricsSchema = z.object({
  // Basic Information
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),

  // Health Metrics
  bloodPressure: z.string().min(1, "Blood pressure is required"),
  heartRate: z.string().regex(/^\d+$/, "Must be a valid number"),
  glucoseLevel: z.string().min(1, "Glucose level is required"),
  bloodCount: z.string().min(1, "Blood count is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),

  // Physical Details
  height: z.string().regex(/^\d+$/, "Must be a valid number"),
  weight: z.string().regex(/^\d+$/, "Must be a valid number"),

  // Medical History
  allergies: z.string(),
  currentMedications: z.string(),
  pastSurgeries: z.string(),

  // Identification
  nidNumber: z.string().min(1, "NID number is required"),
  passportNumber: z.string().min(1, "Passport number is required"),

  // Additional Information
  nationality: z.string().min(1, "Nationality is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  occupation: z.string().min(1, "Occupation is required"),

  // Emergency Contact
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactRelation: z.string().min(1, "Relationship is required"),
  emergencyContactNumber: z.string().min(1, "Contact number is required"),
});

type UpdateHealthMetricsForm = z.infer<typeof updateHealthMetricsSchema>;

export default function UpdateHealthMetrics() {
  const form = useForm<UpdateHealthMetricsForm>({
    resolver: zodResolver(updateHealthMetricsSchema),
    defaultValues: {
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 234 567 8900",
      dateOfBirth: "1990-01-15",
      gender: "Male",
      bloodPressure: "110/70",
      heartRate: "75",
      glucoseLevel: "88-75",
      bloodCount: "9456",
      bloodGroup: "O+",
      height: "175",
      weight: "70",
      allergies: "None",
      currentMedications: "None",
      pastSurgeries: "None",
      nidNumber: "123456789",
      passportNumber: "AB1234567",
      nationality: "American",
      maritalStatus: "Married",
      occupation: "Engineer",
      emergencyContactName: "Jane Smith",
      emergencyContactRelation: "Spouse",
      emergencyContactNumber: "+1 234 567 8901",
    },
  });

  const onSubmit = async (data: UpdateHealthMetricsForm) => {
    try {
      // TODO: Implement API call to update health metrics
      console.log("Form data:", data);
      toast.success("Health metrics updated successfully!");
      // Redirect back to health metrics page
      window.history.back();
    } catch (error) {
      toast.error("Failed to update health metrics");
    }
  };

  return (
    <div className="m-6 p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Update Health Metrics
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Update your health information and personal details below.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Information */}
        <div className="rounded-lg border border-slate-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Basic Information
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Full Name
              </label>
              <Input
                {...form.register("fullName")}
                error={form.formState.errors.fullName?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Email
              </label>
              <Input
                type="email"
                {...form.register("email")}
                error={form.formState.errors.email?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Phone
              </label>
              <Input
                {...form.register("phone")}
                error={form.formState.errors.phone?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Date of Birth
              </label>
              <Input
                type="date"
                {...form.register("dateOfBirth")}
                error={form.formState.errors.dateOfBirth?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Gender
              </label>
              <select
                {...form.register("gender")}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="rounded-lg border border-slate-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Health Metrics
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Blood Pressure
              </label>
              <Input
                {...form.register("bloodPressure")}
                placeholder="e.g., 110/70"
                error={form.formState.errors.bloodPressure?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Heart Rate
              </label>
              <Input
                {...form.register("heartRate")}
                type="number"
                placeholder="e.g., 75"
                error={form.formState.errors.heartRate?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Glucose Level
              </label>
              <Input
                {...form.register("glucoseLevel")}
                placeholder="e.g., 88-75"
                error={form.formState.errors.glucoseLevel?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Blood Count
              </label>
              <Input
                {...form.register("bloodCount")}
                placeholder="e.g., 9456"
                error={form.formState.errors.bloodCount?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Blood Group
              </label>
              <select
                {...form.register("bloodGroup")}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
        </div>

        {/* Physical Details */}
        <div className="rounded-lg border border-slate-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Physical Details
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Height (cm)
              </label>
              <Input
                {...form.register("height")}
                type="number"
                error={form.formState.errors.height?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Weight (kg)
              </label>
              <Input
                {...form.register("weight")}
                type="number"
                error={form.formState.errors.weight?.message}
              />
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="rounded-lg border border-slate-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Medical History
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Allergies
              </label>
              <Input
                {...form.register("allergies")}
                error={form.formState.errors.allergies?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Current Medications
              </label>
              <Input
                {...form.register("currentMedications")}
                error={form.formState.errors.currentMedications?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Past Surgeries
              </label>
              <Input
                {...form.register("pastSurgeries")}
                error={form.formState.errors.pastSurgeries?.message}
              />
            </div>
          </div>
        </div>

        {/* Identification */}
        <div className="rounded-lg border border-slate-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Identification
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                NID Number
              </label>
              <Input
                {...form.register("nidNumber")}
                error={form.formState.errors.nidNumber?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Passport Number
              </label>
              <Input
                {...form.register("passportNumber")}
                error={form.formState.errors.passportNumber?.message}
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="rounded-lg border border-slate-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Additional Information
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Nationality
              </label>
              <Input
                {...form.register("nationality")}
                error={form.formState.errors.nationality?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Marital Status
              </label>
              <select
                {...form.register("maritalStatus")}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Occupation
              </label>
              <Input
                {...form.register("occupation")}
                error={form.formState.errors.occupation?.message}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="rounded-lg border border-slate-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Emergency Contact
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Contact Name
              </label>
              <Input
                {...form.register("emergencyContactName")}
                error={form.formState.errors.emergencyContactName?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Relationship
              </label>
              <Input
                {...form.register("emergencyContactRelation")}
                error={form.formState.errors.emergencyContactRelation?.message}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Contact Number
              </label>
              <Input
                {...form.register("emergencyContactNumber")}
                error={form.formState.errors.emergencyContactNumber?.message}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
