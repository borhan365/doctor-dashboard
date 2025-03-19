import { DoctorFormData } from "@/types/doctors";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";

interface DoctorSEOSectionProps {
  formData: DoctorFormData;
  onFormChange: (key: string, value: any) => void;
  onNext: () => void;
}

export default function DoctorSEOSection({
  onNext,
  formData,
  onFormChange,
}: DoctorSEOSectionProps) {
  // Initialize state from props
  const [metaTitle, setMetaTitle] = useState<string>(formData.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState<string>(
    formData.metaDescription || "",
  );
  const [slug, setSlug] = useState<string>(formData.slug || "");

  // This effect runs only once on mount to generate default values if needed
  useEffect(() => {
    let shouldUpdateTitle = !metaTitle && formData.name;
    let shouldUpdateDescription = !metaDescription && formData.description;

    if (shouldUpdateTitle) {
      const specialistNames = formData.specialists
        ?.map((s) => (typeof s === "object" && s.title ? s.title : ""))
        .filter(Boolean)
        .join(", ");

      const defaultTitle = `${formData.name} - ${specialistNames || "Doctor"}`;
      setMetaTitle(defaultTitle);
      onFormChange("metaTitle", defaultTitle);
    }

    if (shouldUpdateDescription) {
      const plainDescription = formData.description
        .replace(/<[^>]*>/g, "")
        .substring(0, 160);
      setMetaDescription(plainDescription);
      onFormChange("metaDescription", plainDescription);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Handle local state changes
  const handleTitleChange = (value: string) => {
    setMetaTitle(value);
    onFormChange("metaTitle", value);
  };

  const handleDescriptionChange = (value: string) => {
    setMetaDescription(value);
    onFormChange("metaDescription", value);
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    onFormChange("slug", value);
  };

  const getTitleBorderColor = () => {
    if (metaTitle.length > 60) return "border-red-500";
    if (metaTitle.length > 50) return "border-green-500";
    return "border-slate-200";
  };

  const getDescriptionBorderColor = () => {
    if (metaDescription.length > 160) return "border-red-500";
    if (metaDescription.length > 140) return "border-green-500";
    return "border-slate-200";
  };

  const getPermalinkBorderColor = () => {
    if (slug.length > 75) return "border-red-500";
    if (slug.length > 60) return "border-green-500";
    return "border-slate-200";
  };

  const renderPreviewTitle =
    metaTitle.length > 60 ? `${metaTitle.slice(0, 60)}...` : metaTitle;

  const renderPreviewDescription =
    metaDescription.length > 160
      ? `${metaDescription.slice(0, 160)}...`
      : metaDescription;

  const handleSubmit = () => {
    // Add validation if needed
    onNext();
  };

  return (
    <div className="rounded bg-white">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="mb-4 border-b border-slate-100 pb-3">
          <h2 className="text-xl font-medium text-slate-900">SEO Settings</h2>
          <p className="text-sm text-slate-500">
            Optimize your content for search engines to improve visibility and
            drive more traffic.
          </p>
        </div>
        {/* Search Engine Preview */}
        <div className="">
          <h3 className="mb-4 font-medium">Search Engine Preview</h3>
          <div className="relative mb-3 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Healtha.io"
              disabled
              className="flex-grow rounded-full border border-slate-200 px-7 py-3 shadow-sm outline-0 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            />
            <div className="absolute bottom-0 right-5 top-0 flex items-center justify-end gap-2">
              <span className="h-5 w-5 text-blue-500">
                <MdKeyboardVoice className="size-5" />
              </span>
              <span className="h-5 w-5 text-blue-500">
                <IoSearch className="size-5" />
              </span>
            </div>
          </div>

          <div className="mb-4 text-sm text-gray-600">
            About 43,700,000 results (0.32 seconds)
          </div>

          <div className="mb-4">
            <h2 className="cursor-pointer text-xl font-medium text-blue-700 hover:underline">
              {renderPreviewTitle}
            </h2>
            <p className="text-sm text-gray-800">{renderPreviewDescription}</p>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="space-y-4 border-t border-slate-100 pt-4 dark:border-form-strokedark">
          {/* Title Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="metaTitle" className="text-sm font-medium">
                Meta Title
              </label>
              <span className="text-sm text-gray-500">
                {metaTitle.length} / 60
              </span>
            </div>
            <input
              id="metaTitle"
              value={metaTitle}
              placeholder="Healtha.io - Doctor Name - Doctor Speciality - Doctor Location"
              onChange={(e) => handleTitleChange(e.target.value)}
              className={`w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getTitleBorderColor()} rounded-md focus:outline-none`}
            />
            <p className="text-xs text-gray-500">
              This is what will appear in the first line when this category
              shows up in the search results.
            </p>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="metaDescription" className="text-sm font-medium">
                Meta Description
              </label>
              <span className="text-sm text-gray-500">
                {metaDescription.length} / 160
              </span>
            </div>
            <textarea
              id="metaDescription"
              value={metaDescription}
              placeholder="Healtha.io - Doctor Name - Doctor Speciality - Doctor Location"
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className={`h-24 w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getDescriptionBorderColor()} rounded-md focus:outline-none`}
            />
            <p className="text-xs text-gray-500">
              This is what will appear as the description when this category
              shows up in the search results.
            </p>
          </div>

          {/* Slug Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <span className="text-sm text-gray-500">{slug.length} / 75</span>
            </div>
            <input
              id="slug"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="/doctor-name-doctor-speciality-doctor-location"
              className={`w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getPermalinkBorderColor()} rounded-md focus:outline-none`}
            />
            <p className="text-xs text-gray-500">
              This is the unique URL of this category, displayed below the
              category title in the search results.
            </p>
          </div>

          {/* Meta Keywords Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Meta Keywords</label>
              <span className="text-sm text-gray-500">
                Comma separated keywords
              </span>
            </div>
            <input
              value={formData.metaKeywords || ""}
              onChange={(e) => onFormChange("metaKeywords", e.target.value)}
              className="w-full rounded-md border-2 border-slate-200 px-3 py-2 focus:outline-none"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          {/* Advanced SEO Settings */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium">Advanced SEO Settings</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Canonical URL</label>
                <input
                  type="text"
                  value={formData.canonicalUrl || ""}
                  onChange={(e) => onFormChange("canonicalUrl", e.target.value)}
                  placeholder="https://example.com/canonical-path"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Redirect URL</label>
                <input
                  type="text"
                  value={formData.redirectUrl || ""}
                  onChange={(e) => onFormChange("redirectUrl", e.target.value)}
                  placeholder="https://example.com/redirect-path"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Redirect Type</label>
                <select
                  value={formData.redirectType || ""}
                  onChange={(e) =>
                    onFormChange("redirectType", Number(e.target.value) || null)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">No Redirect</option>
                  <option value="301">301 (Permanent)</option>
                  <option value="302">302 (Temporary)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reading Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.readingTime || ""}
                  onChange={(e) =>
                    onFormChange("readingTime", Number(e.target.value) || null)
                  }
                  min={0}
                  placeholder="Estimated reading time"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
