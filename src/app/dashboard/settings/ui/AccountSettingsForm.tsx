"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AccountSettingsFormProps {
  onClose: () => void;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const AccountSettingsForm = ({ onClose }: AccountSettingsFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormValues>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        onClose();
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update password";
      toast.error(message);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(`${err.path.join(".")}: ${err.message}`);
        });
      }
    }
  };

  return (
    <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 font-medium text-white"
          >
            Update Password
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 dark:bg-slate-600 dark:text-slate-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
