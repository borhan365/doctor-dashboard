import { useState } from 'react';

interface FeaturedCheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const FeaturedCheckBox: React.FC<FeaturedCheckBoxProps> = ({ checked, onChange }) => {
  return (
    <div>
      <label
        htmlFor="featuredCheckBox"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="featuredCheckBox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              checked ? 'border-primary bg-gray dark:bg-transparent' : ''
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${checked ? 'bg-primary' : ''}`}
            ></span>
          </div>
        </div>
        Is Featured?
      </label>
    </div>
  );
};

export default FeaturedCheckBox;
