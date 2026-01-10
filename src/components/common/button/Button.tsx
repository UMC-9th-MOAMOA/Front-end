import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/cn";
import { buttonVariants } from "./buttonVariants";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant,
  size,
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {leftIcon && <span className="mr-1 text-white">{leftIcon}</span>}
      {children}
      {rightIcon && (
        <span className="ml-3 text-moamoa-200 group-active:text-white">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
