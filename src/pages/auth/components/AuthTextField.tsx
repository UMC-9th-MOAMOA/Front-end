import { type ReactNode, useId } from "react";
import { textFieldVariants } from "./authTextField.variants";

export type AuthTextFieldProps = {
  label?: string;
  placeholder?: string;

  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  width?: "full" | "lg" | "md";
  variant?: "outlined" | "ghost";

  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  name?: string;
  endAdornment?: ReactNode;
};

export function AuthTextField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  width,
  variant,
  helperText,
  errorMessage,
  disabled = false,
  name,
  endAdornment,
}: AuthTextFieldProps) {
  const reactId = useId();

  const hasError = Boolean(errorMessage);
  const inputId = name ?? reactId;

  const baseClassName = textFieldVariants({
    width,
    variant,
    error: hasError,
  });

  const inputClassName = `${baseClassName} ${endAdornment ? "pr-44" : ""}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="detail text-gray-700">
          {label}
        </label>
      )}

      {/* Input */}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          className={inputClassName}
        />

        {endAdornment && (
          <div className="absolute top-1/2 right-8 -translate-y-1/2">
            {endAdornment}
          </div>
        )}
      </div>

      {/* Helper / Error message */}
      {hasError ? (
        <p className="detail-sm text-warning-500">{errorMessage}</p>
      ) : (
        helperText && <p className="detail-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
