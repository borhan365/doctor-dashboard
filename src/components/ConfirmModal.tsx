import { XIcon } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 absolute right-4 top-4"
            aria-label="Close"
          >
            <XIcon className="h-6 w-6" />
          </button>
          <h2 className="mb-4 text-2xl font-bold text-slate-700">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-4">
            <button

              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
