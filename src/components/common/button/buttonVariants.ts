import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "group flex items-center justify-center rounded-xl transition-colors active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none heading-4",
  {
    variants: {
      variant: {
        primary: "bg-moamoa-300 text-white active:bg-moamoa-500",
        secondary:
          "bg-moamoa-50 text-moamoa-600 active:bg-moamoa-300 active:text-white",
        tertiary:
          "bg-moamoa-50 text-moamoa-400 active:bg-moamoa-300 active:text-white",
      },
      size: {
        full: "w-full py-3",
        lg: "w-[17.75rem] py-3",
        md: "w-[9.75rem] py-3",
        sm: "w-[7.875rem] py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "full",
    },
  }
);
