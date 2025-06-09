// components/ui/textarea.tsx
import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`
          resize-none
          rounded-md
          border
          border-gray-300
          bg-white
          px-3
          py-2
          text-sm
          placeholder:text-gray-400
          focus:border-blue-500
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${className ?? ""}
        `}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
