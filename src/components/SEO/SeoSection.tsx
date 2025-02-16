import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";

interface SeoSectionProps {
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onSlugChange: (value: string) => void;
}

export default function SeoSection({
  title,
  excerpt,
  metaTitle,
  metaDescription,
  slug,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onSlugChange,
}: SeoSectionProps) {
  const [localMetaTitle, setLocalMetaTitle] = useState(
    metaTitle || title || "",
  );
  const [localMetaDescription, setLocalMetaDescription] = useState(
    metaDescription || excerpt || "",
  );

  useEffect(() => {
    setLocalMetaTitle(metaTitle || title || "");
    setLocalMetaDescription(metaDescription || excerpt || "");
  }, [title, excerpt, metaTitle, metaDescription]);

  // Function to handle the border color based on the length of the input
  const getTitleBorderColor = () => {
    if (localMetaTitle?.length > 60) {
      return "border-red-500";
    } else if (localMetaTitle?.length > 50 && localMetaTitle?.length <= 60) {
      return "border-green-500";
    } else {
      return "border-slate-200";
    }
  };

  const getDescriptionBorderColor = () => {
    if (localMetaDescription?.length > 160) {
      return "border-red-500";
    } else if (
      localMetaDescription?.length > 140 &&
      localMetaDescription?.length <= 160
    ) {
      return "border-green-500";
    } else {
      return "border-slate-200";
    }
  };

  const getPermalinkBorderColor = () => {
    if (slug && slug?.length > 75) {
      return "border-red-500";
    } else if (slug && slug?.length > 60 && slug?.length <= 75) {
      return "border-green-500";
    } else {
      return "border-slate-200";
    }
  };

  // Function to handle title truncation with "..."
  const renderPreviewTitle =
    localMetaTitle?.length > 60
      ? `${localMetaTitle?.slice(0, 60)}...`
      : localMetaTitle;

  // Function to handle description truncation with "..."
  const renderPreviewDescription =
    localMetaDescription?.length > 160
      ? `${localMetaDescription?.slice(0, 160)}...`
      : localMetaDescription;

  const handleMetaTitleChange = (value: string) => {
    setLocalMetaTitle(value);
    onMetaTitleChange(value);
  };

  const handleMetaDescriptionChange = (value: string) => {
    setLocalMetaDescription(value);
    onMetaDescriptionChange(value);
  };

  return (
    <>
      {/* Search Engine Preview */}
      <div className="">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">
          Search Engine Preview
        </h2>
        <div className="relative mb-3 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search engine"
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
              {localMetaTitle?.length} / 60
            </span>
          </div>
          <input
            id="metaTitle"
            value={localMetaTitle}
            onChange={(e) => handleMetaTitleChange(e.target.value)}
            className={`w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getTitleBorderColor()} rounded-md focus:outline-none`}
          />
          <p className="text-xs text-gray-500">
            This is what will appear in the first line when this page shows up
            in the search results.
          </p>
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="metaDescription" className="text-sm font-medium">
              Meta Description
            </label>
            <span className="text-sm text-gray-500">
              {localMetaDescription?.length} / 160
            </span>
          </div>
          <textarea
            id="metaDescription"
            value={localMetaDescription}
            onChange={(e) => handleMetaDescriptionChange(e.target.value)}
            className={`h-24 w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getDescriptionBorderColor()} rounded-md focus:outline-none`}
          />
          <p className="text-xs text-gray-500">
            This is what will appear as the description when this page shows up
            in the search results.
          </p>
        </div>

        {/* Slug Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <span className="text-sm text-gray-500">{slug?.length} / 75</span>
          </div>
          <input
            id="slug"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            className={`w-full border-2 px-3 py-2 dark:border-form-strokedark dark:bg-form-input ${getPermalinkBorderColor()} rounded-md focus:outline-none`}
          />
          <p className="text-xs text-gray-500">
            This is the unique URL of this page, displayed below the page title
            in the search results.
          </p>
        </div>
      </div>
    </>
  );
}
