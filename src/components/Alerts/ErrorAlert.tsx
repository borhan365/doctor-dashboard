import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface ErrorAlertProps {
  message: string;
  error: Error;
  retryAction?: () => void;
}

const ErrorAlert = ({ message, error, retryAction }: ErrorAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="rounded-sm border border-danger bg-white p-4 dark:border-danger dark:bg-boxdark">
      <div className="flex items-start space-x-3">
        <XCircleIcon className="h-5 w-5 text-danger" />

        <div className="flex-1">
          {/* Main Error Message */}
          <h3 className="text-sm font-medium text-danger">{message}</h3>

          {/* Error Details */}
          {error && (
            <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {error.message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex space-x-3">
            {retryAction && (
              <button
                type="button"
                onClick={retryAction}
                className="inline-flex items-center space-x-2 rounded-md bg-danger/10 px-3 py-2 text-sm font-semibold text-danger hover:bg-danger/20 focus:outline-none focus:ring-2 focus:ring-danger/50 focus:ring-offset-2"
              >
                <ArrowPathIcon className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-boxdark dark:text-slate-400 dark:hover:text-slate-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
