import { cva } from "class-variance-authority";

export const textFieldVariants = cva(
  [
    "h-46 px-15 py-8 rounded-lg",
    "body-4 text-gray-900 placeholder:text-gray-500",
    "transition-colors",
    "focus:outline focus:outline-1 focus:outline-moamoa-300 focus:outline-offset-[-1px]",
  ],
  {
    variants: {
      width: {
        full: "w-full",
        lg: "w-[17.75rem]",
        md: "w-[9.75rem]",
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
      width: "full",
      variant: "outlined",
    },
  }
);
