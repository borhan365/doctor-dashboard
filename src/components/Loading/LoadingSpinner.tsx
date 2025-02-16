interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingSpinner = ({
  size = "medium",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-3",
    large: "h-12 w-12 border-4",
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div
        className={`
          animate-spin rounded-full 
          border-solid border-primary 
          border-t-transparent
          ${sizeClasses[size]}
          ${className}
        `}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
