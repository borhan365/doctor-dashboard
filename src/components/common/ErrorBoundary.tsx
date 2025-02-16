"use client";

import { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ErrorBoundary = ({ children, fallback }: Props) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Error caught by boundary:", error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      fallback || (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-black dark:text-white">
              Something went wrong
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Please try again later or contact support if the problem persists.
            </p>
            <button
              onClick={() => setHasError(false)}
              className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary; 