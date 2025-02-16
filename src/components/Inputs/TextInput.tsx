import { cn } from "@/lib/utils";
import React from "react";

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, label, error, multiline, ...props }, ref) => {
    const inputClassName = cn(
      "block w-full rounded-md border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300",
      "placeholder:text-slate-400",
      "focus:ring-2 focus:ring-inset focus:ring-blue-600",
      "sm:text-sm sm:leading-6",
      error && "ring-red-500 focus:ring-red-500",
      className,
    );

    const InputComponent = multiline ? (
      <textarea
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        className={cn(inputClassName, "min-h-[100px] resize-y")}
      />
    ) : (
      <input
        {...props}
        ref={ref as React.Ref<HTMLInputElement>}
        className={inputClassName}
      />
    );

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium leading-6 text-slate-900">
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        {InputComponent}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
