"use client";

import { Camera, User } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface DoctorProfilePhotoProps {
  previewUrl: string | null;
  onChange: (file: File) => void;
}

function DoctorProfilePhoto({ previewUrl, onChange }: DoctorProfilePhotoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="featured-image"
        className="text-sm font-medium text-slate-700"
      >
        Profile Photo
      </label>
      <div className="flex items-center space-x-6">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-100">
          {previewUrl ? (
            <Image
            width={900}
            height={300}
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-12 w-12 text-slate-300" />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Camera className="mr-2 h-5 w-5 text-slate-400" />
          Change Photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          id="featured-image"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}

export default DoctorProfilePhoto;