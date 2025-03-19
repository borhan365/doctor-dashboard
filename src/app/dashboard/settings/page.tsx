"use client";

import { ApiUrl } from "@/app/Variables";
import { useUpdateUser, useUser } from "@/hooks/useUsers";
import { useAuth } from "@/store/useAuth";
import { User } from "@/types/users";
import { CheckCircle, SettingsIcon, ShieldIcon, X } from "lucide-react";
import { useState } from "react";
import ChangePasswordSection from "./ui/ChangePasswordSection";
import GeneralInfoSection from "./ui/GeneralInfoSection";

function SettingsPage() {
  const { user } = useAuth();
  const userId = user?.id as string;

  const { data: userData, isLoading: isUserLoading } = useUser(userId);
  const updateUserMutation = useUpdateUser();

  const [activeTab, setActiveTab] = useState("general");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle user update
  const handleUpdateUser = async (
    updatedData: Partial<User>,
    files?: { featuredImage?: File; banner?: File },
  ) => {
    try {
      if (!userId) return;

      // If we have files, we need to use FormData
      if (files) {
        const formData = new FormData();

        // Add JSON data
        formData.append("data", JSON.stringify(updatedData));

        // Add files if they exist
        if (files.featuredImage) {
          formData.append("featuredImage", files.featuredImage);
        }

        if (files.banner) {
          formData.append("banner", files.banner);
        }

        // Use fetch directly for FormData
        const response = await fetch(`${ApiUrl}/users/update/${userId}`, {
          method: "PATCH",
          body: formData,
          credentials: "include",
          mode: "cors",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        });

        const result = await response.json();

        if (result.status === "success") {
          setSuccessMessage("Profile updated successfully!");
          setShowSuccess(true);
          // Auto-hide success message after 5 seconds
          setTimeout(() => setShowSuccess(false), 5000);
        }
      } else {
        // Use the mutation for JSON data
        await updateUserMutation.mutateAsync({
          id: userId,
          userData: updatedData,
        });

        setSuccessMessage("Profile updated successfully!");
        setShowSuccess(true);
        // Auto-hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-muted-foreground text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-5 w-5 text-green-500 dark:text-green-400" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {successMessage}
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-4 inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 md:w-[400px]">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "general"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "security"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <ShieldIcon className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </button>
          </div>
        </div>

        {/* General Tab Content */}
        <div className={`space-y-6 ${activeTab !== "general" ? "hidden" : ""}`}>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                General Information
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your profile information.
              </p>
            </div>
            <div className="p-6">
              <GeneralInfoSection
                user={userData?.user}
                isLoading={isUserLoading || updateUserMutation.isPending}
                onUpdate={handleUpdateUser}
              />
            </div>
          </div>
        </div>

        {/* Security Tab Content */}
        <div
          className={`space-y-6 ${activeTab !== "security" ? "hidden" : ""}`}
        >
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Security Settings
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your account security and password.
              </p>
            </div>
            <div className="p-6">
              <ChangePasswordSection
                userId={userId}
                onSuccess={() => {
                  setSuccessMessage(
                    "Your password has been changed successfully!",
                  );
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 5000);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
