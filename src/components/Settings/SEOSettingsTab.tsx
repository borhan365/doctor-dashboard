import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";

export default function SEOSettingsTab() {
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

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

  return (
    <div className="p-10 bg-white rounded">
      <div className="space-y-4 max-w-3xl mx-auto">
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

          <div className="text-gray-600 mb-4 text-sm">
            About 43,700,000 results (0.32 seconds)
          </div>

          <div className="mb-4">
            <h2 className="cursor-pointer text-xl font-medium text-blue-700 hover:underline">
              {renderPreviewTitle}
            </h2>
            <p className="text-gray-800 text-sm">{renderPreviewDescription}</p>
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
              <span className="text-gray-500 text-sm">
                {metaTitle.length} / 60
              </span>
            </div>
            <input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className={`w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getTitleBorderColor()} rounded-md focus:outline-none`}
            />
            <p className="text-gray-500 text-xs">
              This is what will appear in the first line when this category shows
              up in the search results.
            </p>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="metaDescription" className="text-sm font-medium">
                Meta Description
              </label>
              <span className="text-gray-500 text-sm">
                {metaDescription.length} / 160
              </span>
            </div>
            <textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className={`h-24 w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getDescriptionBorderColor()} rounded-md focus:outline-none`}
            />
            <p className="text-gray-500 text-xs">
              This is what will appear as the description when this category shows
              up in the search results.
            </p>
          </div>

          {/* Slug Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <span className="text-gray-500 text-sm">{slug.length} / 75</span>
            </div>
            <input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={`w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getPermalinkBorderColor()} rounded-md focus:outline-none`}
            />
            <p className="text-gray-500 text-xs">
              This is the unique URL of this category, displayed below the
              category title in the search results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
