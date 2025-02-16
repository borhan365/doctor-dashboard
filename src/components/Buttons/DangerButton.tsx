import React from 'react';

interface DangerButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

function DangerButton({ text, className = '', onClick }: DangerButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-danger py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-3 xl:px-4 focus:ring-2 ring-orange-300 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default DangerButton;
