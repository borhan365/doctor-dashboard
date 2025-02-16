import { message, Upload } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";

const { Dragger } = Upload;

interface ThumbnailBoxProps {
  label: string;
  value: File | null;
  currentImageUrl?: string;
  onChange: (value: File | null) => void;
}

function ThumbnailBox({
  value,
  onChange,
  label = "Image",
  currentImageUrl,
}: ThumbnailBoxProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [value, currentImageUrl]);

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    beforeUpload: (file: File) => {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }
      onChange(file);
      return false; // Prevent automatic upload
    },
    onDrop(e: React.DragEvent) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleRemoveImage = () => {
    onChange(null);
    setPreviewUrl(null); // Clear the preview
  };

  return (
    <div className="mb-5 space-y-2">
      <h3 className="mb-1 font-medium text-black dark:text-white">{label}</h3>

      {previewUrl ? (
        <div className="relative rounded-lg border border-slate-200">
          <Image
            src={previewUrl}
            alt="Preview"
            width={400}
            height={300}
            className="h-auto w-full rounded-lg object-cover"
          />
          <button
            type="button" // Add this to prevent form submission
            onClick={handleRemoveImage}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
          >
            <IoTrash className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <Dragger {...uploadProps} className="bg-white py-8">
          <p className="ant-upload-drag-icon">
            <LuUpload className="mx-auto h-8 w-8 text-slate-400" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint text-sm text-slate-500">
            Support for a single image upload. Max size: 5MB
          </p>
        </Dragger>
      )}
    </div>
  );
}

export default ThumbnailBox;
