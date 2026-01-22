import { cva } from "class-variance-authority";

export const textFieldVariants = cva(
  [
    "px-15 rounded-lg",
    "body-4 text-gray-900 placeholder:text-gray-500",
    "transition-colors",
    "focus:outline focus:outline-1 focus:outline-moamoa-300 focus:outline-offset-[-1px]",
  ],
  {
    variants: {
      height: {
        sm: "h-42 py-6",
        md: "h-46 py-8",
      },
      width: {
        full: "w-full",
        lg: "w-210",
        md: "w-153",
      },
      variant: {
        outlined: "border border-gray-500 bg-gray-100",
        ghost: "border border-transparent bg-gray-100",
      },
      error: {
        true: ["!border-red-500 focus:outline-red-500"].join(" "),
      },
    },
    defaultVariants: {
      height: "md",
      width: "full",
      variant: "outlined",
    },
  }
);
