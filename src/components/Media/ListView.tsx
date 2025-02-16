import axios from "axios";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

type ImageType = {
  id: string;
  src: string;
  name: string;
  type: string;
  uploadedOn: string;
  uploadedBy: string;
  uploadedTo: string;
  size: string;
  dimensions: string;
};

function ListView({
  displayedImages,
  openModal,
  refreshImages,
  handleDeleteImage,
}: {
  displayedImages: ImageType[];
  openModal: (image: ImageType) => void;
  refreshImages: () => Promise<void>;
  handleDeleteImage: (imageId: string) => Promise<void>;
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<ImageType | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showDeleteModal = (image: ImageType, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageToDelete(image);
    setShowDeleteConfirmation(true);
  };

  const hideDeleteModal = () => {
    setShowDeleteConfirmation(false);
    setImageToDelete(null);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `/api/uploads/${encodeURIComponent(imageToDelete.id)}`,
      );
      toast.success("File deleted successfully");
      await refreshImages();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file. Please try again.");
    } finally {
      hideDeleteModal();
      setLoading(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = displayedImages.map((image) => image.id);
      setSelectedImages(new Set(allIds));
    } else {
      setSelectedImages(new Set());
    }
  };

  const handleSelectImage = (id: string) => {
    const newSelectedImages = new Set(selectedImages);
    if (newSelectedImages.has(id)) {
      newSelectedImages.delete(id);
    } else {
      newSelectedImages.add(id);
    }
    setSelectedImages(newSelectedImages);
  };

  const handleBulkDelete = async () => {
    if (selectedImages.size === 0) {
      toast.error("No files selected for deletion.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "delete");
      Array.from(selectedImages).forEach((fileId) => {
        formData.append("fileIds", fileId);
      });

      const response = await axios.post("/api/uploads/bulk-delete", formData);
      const { message, successfulDeletes, failedDeletes } = response.data;

      if (successfulDeletes.length > 0) {
        setSuccess(`Successfully deleted ${successfulDeletes.length} files.`);
      }

      if (failedDeletes.length > 0) {
        setError(
          `Failed to delete ${failedDeletes.length} files. Please try again for these files.`,
        );
      }

      await refreshImages();
      setSelectedImages(new Set()); // Clear selection after deletion attempt
    } catch (error) {
      console.error("Error deleting files:", error);
      setError("Failed to delete files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {selectedImages.size > 0 && (
        <div className="mb-4">
          <button
            onClick={handleBulkDelete}
            className="mr-2 rounded bg-danger px-4 py-2 text-white"
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : `Delete Selected (${selectedImages.size})`}
          </button>
          <button
            onClick={() => setSelectedImages(new Set())}
            className="bg-gray-300 text-gray-700 rounded px-4 py-2"
            disabled={loading}
          >
            Cancel
          </button>
          {error && <p className="mt-2 text-danger">{error}</p>}
          {success && <p className="mt-2 text-green-500">{success}</p>}
        </div>
      )}
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedImages.size === displayedImages.length}
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              File
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Author
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Uploaded to
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {displayedImages.map((image: ImageType) => (
            <tr key={image.id} className="cursor-pointer hover:bg-slate-50">
              <td className="whitespace-nowrap px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedImages.has(image.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelectImage(image.id);
                  }}
                />
              </td>
              <td
                onClick={() => openModal(image)}
                className="whitespace-nowrap px-6 py-4"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={image.src}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-slate-900">
                      {image.name}
                    </div>
                    <div className="text-sm text-slate-500">{image.type}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-slate-900">{image.uploadedBy}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-slate-900">{image.uploadedTo}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                {image.uploadedOn}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <Eye
                    className="h-5 w-5 cursor-pointer hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(image);
                    }}
                  />
                  <Trash2
                    className="h-5 w-5 cursor-pointer text-danger hover:text-danger"
                    onClick={(e) => showDeleteModal(image, e)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && imageToDelete && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-60 outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h3 className="text-2xl font-semibold">Confirm Deletion</h3>
                <button
                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                  onClick={hideDeleteModal}
                >
                  <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6 py-4">
                <p className="my-4 text-lg leading-relaxed text-slate-500">
                  Are you sure you want to delete the file?{" "}
                  <span className="font-bold text-danger">
                    {imageToDelete.name}
                  </span>{" "}
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6 py-4">
                <button
                  className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-danger outline-none transition-all duration-150 ease-linear focus:outline-none"
                  type="button"
                  onClick={hideDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="mb-1 mr-1 rounded bg-danger px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-danger"
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
    </>
  );
}

export default ListView;
