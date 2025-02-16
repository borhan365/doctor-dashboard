import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => {
  return (
    <div className="flex h-[400px] shrink-0 items-center justify-center border border-stroke bg-white px-5 py-10 dark:border-strokedark dark:bg-boxdark !rounded-lg">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        {icon ? (
          icon
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <svg
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
        )}

        {/* Title */}
        <h3 className="mt-4 text-2xl font-semibold text-black dark:text-white">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}

        {/* Action Button */}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyState;
