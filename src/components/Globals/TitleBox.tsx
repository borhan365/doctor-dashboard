import React from "react";

interface TitleBoxProps {
  label?: string;
  title: string;
  slug: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
}

function TitleBox({
  label = "Title",
  title,
  slug,
  onTitleChange,
  onSlugChange,
}: TitleBoxProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
    // Removed automatic slug update
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSlugChange(e.target.value);
  };

  return (
    <>
      {/* <label
        htmlFor="title"
        className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
      >
        {label}
      </label> */}
      <textarea
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleTitleChange}
        className="w-full text-3xl font-semibold rounded-lg bg-transparent py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
        <input
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

export default TitleBox;
