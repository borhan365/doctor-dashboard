import Link from "next/link";
import { FC } from "react";

interface PrimaryButtonProps {
  text: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  className,
  href,
  onClick,
  type,
  disabled,
}) => {
  return (
    <div className="flex gap-2">
      <Link href={href ?? "#"}>
        <button
          onClick={onClick}
          type={type}
          disabled={disabled}
          className={`inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-center font-medium text-white ring-blue-300 hover:bg-opacity-90 focus:ring-2 lg:px-3 xl:px-4 ${className}`}
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default PrimaryButton;
