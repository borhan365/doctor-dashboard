"use client";

import { User } from "@/types/users";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

interface GeneralInfoSectionProps {
  user: User | undefined;
  isLoading: boolean;
  onUpdate: (
    userData: Partial<User>,
    files?: { featuredImage?: File; banner?: File },
  ) => void;
}

export default function GeneralInfoSection({
  user,
  isLoading,
  onUpdate,
}: GeneralInfoSectionProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    phone: "",
    bio: "",
    username: "",
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<
    string | null
  >(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        username: user.username || "",
      });

      // Set image previews if available
      if (user.featuredImage?.url) {
        setFeaturedImagePreview(user.featuredImage.url);
      }

      if (user.banner?.url) {
        setBannerPreview(user.banner.url);
      }
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "featuredImage" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    if (type === "featuredImage") {
      setFeaturedImage(file);
      setFeaturedImagePreview(previewUrl);
    } else {
      setBanner(file);
      setBannerPreview(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const files: { featuredImage?: File; banner?: File } = {};
    if (featuredImage) files.featuredImage = featuredImage;
    if (banner) files.banner = banner;

    onUpdate(formData, Object.keys(files).length > 0 ? files : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Username */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            placeholder="username"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="+1234567890"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows={4}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>

      {/* Profile Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Profile Image
        </label>
        <div className="flex items-center space-x-4">
          {featuredImagePreview && (
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <img
                src={featuredImagePreview}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <label className="flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "featuredImage")}
            />
          </label>
        </div>
      </div>

      {/* Banner Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Banner Image
        </label>
        <div className="space-y-2">
          {bannerPreview && (
            <div className="relative h-32 w-full overflow-hidden rounded-md">
              <img
                src={bannerPreview}
                alt="Banner"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <label className="flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Banner
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "banner")}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-md px-4 py-2 font-medium transition-colors ${
            isLoading
              ? "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
