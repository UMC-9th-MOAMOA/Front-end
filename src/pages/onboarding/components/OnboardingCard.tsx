import IcCheckOnboarding from "@/assets/icons/ic_check_onboarding.svg?react";
import { cn } from "@/utils/cn/cn";

type OnboardingCardVariant = "chip" | "panel";

interface OnboardingCardProps {
  variant: OnboardingCardVariant;
  title: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  selected?: boolean;
  className?: string;
}

export default function OnboardingCard({
  variant,
  title,
  titleClassName,
  description,
  descriptionClassName,
  selected = false,
  className,
}: OnboardingCardProps) {
  const isChip = variant === "chip";

  return (
    <article
      className={cn(
        "bg-white shadow-[0_0_16.9px_0_rgba(0,0,0,0.10)]",
        isChip ? "h-50 rounded-lg" : "h-154 w-148 rounded-lg px-15 py-36",
        isChip
          ? selected
            ? "bg-moamoa-50 outline-2 outline-blue-600 -outline-offset-2"
            : ""
          : selected
            ? "bg-moamoa-50 outline-2 outline-blue-600 -outline-offset-2"
            : "",
        className
      )}
    >
      {isChip ? (
        <div className="flex h-full items-center justify-center">
          <h3 className="body-2 text-center text-base text-black">{title}</h3>
          {selected && (
            <span className="flex h-22 w-22 items-center justify-center">
              <IcCheckOnboarding className="h-21 w-21" aria-hidden="true" />
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          {title && (
            <p className={cn("heading-2 text-moamoa-400", titleClassName)}>
              {title}
            </p>
          )}
          <h3
            className={cn(
              "body-4 whitespace-pre-line text-black",
              descriptionClassName,
              title ? "mt-12" : ""
            )}
          >
            {description}
          </h3>
        </div>
      )}
    </article>
  );
}
