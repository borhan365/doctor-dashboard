import { Upload } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";

const { Dragger } = Upload;

interface PaymentProofProps {
  value: any;
  currentImageUrl?: string;
  handleInputChange: (field: string, value: any) => void;
}

function PaymentProof({
  value,
  handleInputChange,
  currentImageUrl,
}: PaymentProofProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const validateFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      setError("Please upload an image file");
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      setError("Image must be smaller than 5MB!");
      return false;
    }

    setError(null);
    return true;
  };

  const uploadProps = {
    name: "proofImage",
    multiple: false,
    accept: "image/*",
    beforeUpload: (file: File) => {
      if (!validateFile(file)) {
        return false;
      }
      handleInputChange("proofImage", file);
      return false; // Prevent automatic upload
    },
    onDrop(e: React.DragEvent) {
      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        handleInputChange("proofImage", file);
      }
    },
  };

  const handleRemoveImage = () => {
    handleInputChange("proofImage", null);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-red-500">{error}</p>}

      {previewUrl ? (
        <div className="relative rounded-lg border border-slate-200">
          <Image
            src={previewUrl}
            alt="Payment Proof"
            width={400}
            height={300}
            className="h-auto w-full rounded-lg object-contain"
          />
          <button
            type="button"
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

export default PaymentProof;
