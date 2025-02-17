"use client";

import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Gender, User, UserRole, UserStatus } from "@/types/user";
import axios from "axios";
import {
  BadgeAlert,
  BadgeCheck,
  Edit2,
  HomeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Settings,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AccountSettingsForm } from "./AccountSettingsForm";

interface ProfileSectionProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  user?: User;
}

interface FormValues {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  profile: {
    bloodGroup: string;
    gender: Gender | null;
    designation: string;
    address: string;
    location: string;
    bio: string;
  };
  isAdmin?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export const ProfileSection = ({
  isEditing,
  setIsEditing,
  user,
}: ProfileSectionProps) => {
  const isLoading = false;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || UserRole.USER,
      status: user?.status || UserStatus.PENDING,
      profile: {
        bloodGroup: user?.profile?.bloodGroup || "",
        gender: user?.profile?.gender || null,
        designation: user?.profile?.designation || "",
        address: user?.profile?.address || "",
        location: user?.profile?.location || "",
        bio: user?.profile?.bio || "",
      },
    },
  });

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        role: user.role || UserRole.USER,
        status: user.status || UserStatus.PENDING,
        profile: {
          bloodGroup: user.profile?.bloodGroup || "",
          gender: user.profile?.gender || null,
          designation: user.profile?.designation || "",
          address: user.profile?.address || "",
          location: user.profile?.location || "",
          bio: user.profile?.bio || "",
        },
      });
    }
  }, [user, reset]);

  const updateCurrentUser = async (data: Partial<FormValues>) => {
    if (!user?.id) return;

    try {
      const response = await axios.patch(`/api/users/${user.id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await updateCurrentUser(data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdatingBanner, setIsUpdatingBanner] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [newBannerImage, setNewBannerImage] = useState<File | null>(null);
  const [isAccountSettings, setIsAccountSettings] = useState(false);

  const isValidFileType = (type: string): boolean => {
    return ACCEPTED_IMAGE_TYPES.includes(
      type as (typeof ACCEPTED_IMAGE_TYPES)[number],
    );
  };

  const handleProfileImageUpdate = async (file: File) => {
    if (!user?.id) {
      toast.error("User ID not found");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    if (!isValidFileType(file.type)) {
      toast.error("Invalid file type. Please upload an image file");
      return;
    }

    setIsUpdatingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.patch(
        `/api/users/${user.id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // if (response.data.image) {
      //   await updateCurrentUser({ image: response.data.image });
      //   toast.success("Profile image updated successfully!");
      // }
    } catch (error: any) {
      console.error("Error updating profile image:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile image",
      );
    } finally {
      setIsUpdatingImage(false);
      setNewProfileImage(null);
    }
  };

  const handleBannerUpdate = async (file: File) => {
    if (!user?.id) {
      toast.error("User ID not found");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    if (!isValidFileType(file.type)) {
      toast.error("Invalid file type. Please upload an image file");
      return;
    }

    setIsUpdatingBanner(true);
    const formData = new FormData();
    formData.append("banner", file);

    try {
      const response = await axios.patch(
        `/api/users/${user.id}/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // if (response.data.banner) {
      //   await updateCurrentUser({ banner: response.data.banner });
      //   toast.success("Banner updated successfully!");
      // }
    } catch (error: any) {
      console.error("Error updating banner:", error);
      toast.error(error.response?.data?.message || "Failed to update banner");
    } finally {
      setIsUpdatingBanner(false);
      setNewBannerImage(null);
    }
  };

  const {
    getRootProps: getProfileRootProps,
    getInputProps: getProfileInputProps,
  } = useDropzone({
    accept: {
      "image/*": ACCEPTED_IMAGE_TYPES,
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && user?.id) {
        setNewProfileImage(file);
        await handleProfileImageUpdate(file);
      }
    },
    onDropRejected: (fileRejections: FileRejection[]) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        toast.error("File is too large. Maximum size is 5MB");
      } else if (error?.code === "file-invalid-type") {
        toast.error("Invalid file type. Please upload an image");
      } else {
        toast.error("Error uploading file");
      }
    },
  });

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    accept: {
      "image/*": ACCEPTED_IMAGE_TYPES,
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && user?.id) {
        setNewBannerImage(file);
        await handleBannerUpdate(file);
      }
    },
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        toast.error("File is too large. Maximum size is 5MB");
      } else if (error?.code === "file-invalid-type") {
        toast.error("Invalid file type. Please upload an image");
      } else {
        toast.error("Error uploading file");
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-6 rounded-lg bg-white shadow-sm">
      <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg">
        <div {...getBannerRootProps()} className="h-full w-full cursor-pointer">
          <input {...getBannerInputProps()} />
          <Image
            src={user?.banner?.fileUrl || "/images/cover/cover-01.png"}
            alt="Banner"
            fill
            className="object-cover"
          />
          {isUpdatingBanner && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Upload className="h-8 w-8 animate-pulse text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="relative rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          {/* Profile Image Section */}
          <div
            {...getProfileRootProps()}
            className="group relative cursor-pointer"
          >
            <input {...getProfileInputProps()} />
            <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-lg ring-4 ring-white dark:ring-slate-700">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/user/default-user.webp"
                  alt="Default Profile"
                  fill
                  className="object-cover"
                />
              )}
              {isUpdatingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Upload className="h-6 w-6 animate-pulse text-white" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Upload className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="flex-1 space-y-4">
            {/* Name and Designation AND Edit Button */}
            <div className="flex items-start justify-between">
              {/* Name and Designation */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user?.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {user?.profile?.designation || "No designation"}
                </p>
              </div>

              {/* action buttons */}
              <div className="flex items-center gap-2">
                {/* Edit Profile Button */}
                <button
                  className="flex items-center gap-2 rounded-full bg-slate-100 p-2 px-4 py-2 transition-colors hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-700"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </button>
                {/* Account Settings Button */}
                <button
                  className="flex items-center gap-2 rounded-full bg-slate-100 p-2 px-4 py-2 transition-colors hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-700"
                  onClick={() => setIsAccountSettings(!isAccountSettings)}
                >
                  <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium">Account Settings</span>
                </button>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="flex flex-wrap gap-4">
              {user?.email && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <MailIcon className="h-5 w-5" />
                  <span>{user.email}</span>
                  {user?.emailVerified ? (
                    <span title="Email Verified">
                      <BadgeCheck className="h-5 w-5 text-green-600" />
                    </span>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            "/api/auth/verify-email",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                email: user.email,
                                redirectUrl: window.location.href, // Current URL for redirect back
                              }),
                            },
                          );

                          if (!response.ok) {
                            throw new Error(
                              "Failed to send verification email",
                            );
                          }

                          toast.success(
                            "Verification email sent! Please check your inbox.",
                          );
                          router.push(
                            `/auth/verify-email?email=${encodeURIComponent(
                              user.email,
                            )}&redirect=${encodeURIComponent(window.location.href)}`,
                          );
                        } catch (error) {
                          console.error(
                            "Error sending verification email:",
                            error,
                          );
                          toast.error("Failed to send verification email");
                        }
                      }}
                      className="flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-200"
                    >
                      <span title="Email Not Verified">
                        <BadgeAlert className="h-4 w-4" />
                      </span>
                      Verify Email
                    </button>
                  )}
                </div>
              )}
              {user?.phone && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <PhoneIcon className="h-5 w-5" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>

            {/* Location and address */}
            <div>
              {/* Location Info */}
              {(user?.profile?.location || user?.profile?.address) && (
                <div className="flex gap-2">
                  {user?.profile?.location && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{user.profile.location}</span>
                    </div>
                  )}
                  {user?.profile?.address && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <HomeIcon className="h-5 w-5" />
                      <span>{user.profile.address}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-4">
              {/* Bio */}
              {user?.profile?.bio && (
                <div className="prose dark:prose-invert max-w-none">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    About
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    {user.profile.bio}
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {user?.profile?.bloodGroup && (
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                    Blood: {user.profile.bloodGroup}
                  </span>
                )}
                {user?.profile?.gender && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {user.profile.gender}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-xl font-semibold">Edit Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
                {errors.name && (
                  <ErrorMessage
                    message={errors.name.message?.toString() || ""}
                  />
                )}
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
                {errors.email && (
                  <ErrorMessage
                    message={errors.email.message?.toString() || ""}
                  />
                )}
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
                {errors.phone && (
                  <ErrorMessage
                    message={errors.phone.message?.toString() || ""}
                  />
                )}
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Designation
                </label>
                <input
                  type="text"
                  {...register("profile.designation")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Blood Group
                </label>
                <select
                  {...register("profile.bloodGroup")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Gender
                </label>
                <select
                  {...register("profile.gender")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                >
                  <option value="">Select Gender</option>
                  {["Male", "Female", "Other"].map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Role
                </label>
                <select
                  {...register("role")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                >
                  {Object.values(UserRole).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                >
                  {Object.values(UserStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Address
              </label>
              <input
                type="text"
                {...register("profile.address")}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Location
              </label>
              <input
                type="text"
                {...register("profile.location")}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Bio
              </label>
              <textarea
                {...register("profile.bio")}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                rows={5}
              />
              {errors.profile?.bio && (
                <ErrorMessage
                  message={errors.profile.bio.message?.toString() || ""}
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("isAdmin")}
                className="rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label className="font-medium text-black dark:text-white">
                Is Admin
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-2 font-medium text-white"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Account Settings Form */}
      {isAccountSettings && (
        <AccountSettingsForm onClose={() => setIsAccountSettings(false)} />
      )}
    </div>
  );
};
