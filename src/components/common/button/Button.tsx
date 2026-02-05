import { cn } from "@/utils/cn/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-lg transition-colors active:scale-[0.98]",
        "disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-400",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="mr-4">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-12">{rightIcon}</span>}
    </button>
  );
}
