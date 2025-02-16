import React from "react";

interface TitleBoxWithAutoSlugProps {
  label?: string;
  title: string;
  slug: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
}

function TitleBoxWithAutoSlug({
  label = "Title",
  title,
  slug,
  onTitleChange,
  onSlugChange,
}: TitleBoxWithAutoSlugProps) {
  // Implement slugify function
  const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-')   // Replace multiple - with single -
      .replace(/^-+/, '')       // Trim - from start of text
      .replace(/-+$/, '');      // Trim - from end of text
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    onTitleChange(newTitle);
    onSlugChange(slugify(newTitle));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSlugChange(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="title"
        className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
      >
        {label}
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleTitleChange}
        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-8 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      <div className="flex items-start justify-start gap-2">
        <label
          htmlFor="slug"
          className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
        >
          <p className="flex items-center justify-start gap-1">
            <span>Slug </span>
            <span>/ </span>
          </p>
        </label>
        <textarea
          id="slug"
          name="slug"
          value={slug}
          onChange={handleSlugChange}
          className="w-full bg-transparent text-sm font-medium outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="enter-slug"
        />
      </div>
    </>
  );
}

export default TitleBoxWithAutoSlug;