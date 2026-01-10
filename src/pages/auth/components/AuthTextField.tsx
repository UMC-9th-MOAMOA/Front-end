import { useId } from "react";
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
}: AuthTextFieldProps) {
  const reactId = useId();

  const hasError = Boolean(errorMessage);
  const inputId = name ?? reactId;

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="detail text-gray-700">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={hasError}
        className={textFieldVariants({
          width,
          variant,
          error: hasError,
        })}
      />

      {/* Helper / Error message */}
      {hasError ? (
        <p className="detail-sm text-warning-500">{errorMessage}</p>
      ) : (
        helperText && <p className="detail-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
