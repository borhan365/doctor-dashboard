import React from 'react'

interface ExcerptBoxProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

function ExcerptBox({ label = "Excerpt", value, onChange }: ExcerptBoxProps) {
  return (
    <>
      <label
        htmlFor="excerpt"
        className="block text-sm font-medium text-slate-300 dark:text-gray-300"
      >
        {label}
      </label>
      <textarea
        id="excerpt"
        name="excerpt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-8 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white mt-2"
        placeholder={`Enter a short ${label.toLowerCase()} for your category`}
      ></textarea>
    </>
  )
}

export default ExcerptBox