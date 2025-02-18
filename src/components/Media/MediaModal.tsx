"use client";

import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface ImageType {
  id: string;
  src: string;
  name: string;
  type: string;
  uploadedOn: string;
  uploadedBy: string;
  uploadedTo: string;
  size: string;
  folder?: string;
  altText?: string;
  description?: string;
}

function MediaModal({
  modalImage,
  setModalImage,
  filteredImages,
  closeModal,
  copyToClipboard,
  refreshImages,
}: {
  modalImage: ImageType;
  setModalImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
  filteredImages: ImageType[];
  closeModal: () => void;
  copyToClipboard: (text: string) => void;
  refreshImages: () => Promise<void>;
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [folderPath, setFolderPath] = useState("");

  useEffect(() => {
    // Extract the folder path from the image URL
    const url = new URL(modalImage.src);
    const pathParts = url.pathname.split("/");
    const uploadsIndex = pathParts.indexOf("uploads");
    if (uploadsIndex !== -1 && uploadsIndex + 1 < pathParts.length) {
      const subfolders = pathParts.slice(uploadsIndex + 1, -1); // Exclude the filename
      if (subfolders.length > 0) {
        setFolderPath(`uploads/${subfolders.join("/")}`);
      } else {
        setFolderPath(""); // No subfolders, so we don't show any path
      }
    } else {
      setFolderPath(""); // Fallback if the expected structure is not found
    }
  }, [modalImage]);

  // Function to open image in new tab
  const downloadFile = () => {
    window.open(modalImage.src, "_blank");
  };

  // Function to show delete confirmation modal
  const showDeleteModal = () => {
    setShowDeleteConfirmation(true);
  };

  // Function to hide delete confirmation modal
  const hideDeleteModal = () => {
    setShowDeleteConfirmation(false);
  };

  // Function to delete the file
  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/uploads/${encodeURIComponent(modalImage.id)}`);
      toast.success("File deleted successfully");
      closeModal();
      refreshImages(); // Refresh the image list after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file. Please try again.");
    } finally {
      hideDeleteModal();
    }
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-full max-h-[80vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 2xl:p-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Attachment Details</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const currentIndex = filteredImages.findIndex(
                  (img) => img.id === modalImage.id,
                );
                const prevImage =
                  filteredImages[currentIndex - 1] ||
                  filteredImages[filteredImages.length - 1];
                setModalImage(prevImage);
              }}
              className="rounded-full p-2 hover:bg-slate-200"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => {
                const currentIndex = filteredImages.findIndex(
                  (img) => img.id === modalImage.id,
                );
                const nextImage =
                  filteredImages[currentIndex + 1] || filteredImages[0];
                setModalImage(nextImage);
              }}
              className="rounded-full p-2 hover:bg-slate-200"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              onClick={closeModal}
              className="rounded-full p-2 hover:bg-slate-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[1fr] gap-6 md:grid-cols-[6fr_4fr]">
          <div>
            <Image
              src={modalImage.src}
              alt={modalImage.name}
              width={600}
              height={400}
              className="m-auto h-auto w-auto rounded"
            />
            <div className="mt-8">
              <h3 className="pb-2 text-xl font-medium text-black">
                File information
              </h3>
              <p>
                <strong>Uploaded on:</strong> {modalImage.uploadedOn}
              </p>
              {folderPath && (
                <p>
                  <strong>Uploaded path:</strong> {folderPath}
                </p>
              )}
              <p>
                <strong>Uploaded by:</strong> {modalImage.uploadedBy}
              </p>
              <p>
                <strong>Uploaded to:</strong> {modalImage.uploadedTo}
              </p>
              {modalImage.folder && (
                <p>
                  <strong>File folder:</strong> {modalImage.folder}
                </p>
              )}
              <p>
                <strong>File name:</strong> {modalImage.name}
              </p>
              <p>
                <strong>File type:</strong> {modalImage.type}
              </p>
              <p>
                <strong>File size:</strong> {modalImage.size}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="mb-2 block">
                <span className="text-slate-700">Title</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-stroke p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-semibold"
                  placeholder="Enter image title"
                  value={modalImage.name.split(".")[0]}
                  readOnly
                />
              </label>
            </div>
            {/* Alternative Text */}
            <div>
              <label className="mb-2 block">
                <span className="text-slate-700">Alternative Text</span>
                <textarea
                  className="mt-1 block w-full rounded-md border border-stroke p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                  placeholder="Describe the purpose of the image"
                  value={modalImage.altText || ""}
                  readOnly
                ></textarea>
              </label>
            </div>
            {/* Description */}
            <div>
              <label className="mb-2 block">
                <span className="text-slate-700">Description</span>
                <textarea
                  className="mt-1 block w-full rounded-md border border-stroke p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                  placeholder="Enter image description"
                  value={modalImage.description || ""}
                  readOnly
                ></textarea>
              </label>
            </div>
            {/* File URL */}
            <div>
              <label className="mb-2 block">
                <span className="text-slate-700">File URL:</span>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    className="block w-full rounded-l-md border border-stroke p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={modalImage.src}
                    readOnly
                  />
                  <button
                    onClick={() => copyToClipboard(modalImage.src)}
                    className="rounded-r-md border border-stroke bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
                  >
                    <Copy className="size-5" />
                  </button>
                </div>
              </label>
            </div>
            {/* Actions */}
            <div className="!mt-8">
              <div className="flex justify-end space-x-2 text-sm">
                <button
                  onClick={downloadFile}
                  className="flex items-center text-primary hover:underline"
                >
                  <Download className="mr-1 size-5" />
                  Download file
                </button>
                <span>|</span>
                <button
                  onClick={showDeleteModal}
                  className="text-red-600 flex items-center hover:underline"
                >
                  <Trash2 className="mr-1 size-5" />
                  Delete permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-60 outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h3 className="text-2xl font-semibold">Confirm Deletion</h3>
                <button
                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold l eading-none text-black opacity-5 outline-none focus:outline-none"
                  onClick={hideDeleteModal}
                >
                  <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6 py-4">
              <p className="my-4 text-lg leading-relaxed text-slate-500">
                {`Are you sure you want to delete the file "/${modalImage.name}"?
                This action cannot be undone.`}
              </p>
              </div>
              <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6 py-4">
                <button
                  className="background-transparent text-red-500 mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear focus:outline-none"
                  type="button"
                  onClick={hideDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="active:bg-red-600 mb-1 mr-1 rounded bg-danger px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaModal;
