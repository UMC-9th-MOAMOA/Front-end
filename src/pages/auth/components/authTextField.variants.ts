import { cva } from "class-variance-authority";

export const textFieldVariants = cva(
  "h-[46px] px-[15px] py-2 rounded-xl body-4 text-gray-900 placeholder:text-gray-500 transition-colors",
  {
    variants: {
      width: {
        full: "w-full",
        lg: "w-[17.75rem]",
        md: "w-[9.75rem]",
      },
      variant: {
        outlined: "border border-1.7 border-gray-500 bg-gray-100",
        ghost: "border-none bg-gray-100",
      },
      error: {
        true: "border-warning-500 focus:border-warning-500",
      },
    },
    defaultVariants: {
      width: "full",
      variant: "outlined",
    },
  }
);
