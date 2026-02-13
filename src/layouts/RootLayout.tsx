import { useRef } from "react";
import { Outlet, useMatches } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import BottomNavigation from "@/components/common/navbar/BottomNavbar";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import type { RouteHandle } from "@/routes/router";
import { cn } from "@/utils/cn/cn";

const RootLayout = () => {
  const matches = useMatches();
  const mainRef = useRef<HTMLElement>(null);

  useScrollToTop(mainRef);

  const currentMatch = matches[matches.length - 1];
  const handle = currentMatch?.handle as RouteHandle | undefined;

  const bgColor = handle?.bgColor || "bg-white";
  const hideBottomNav = handle?.hideBottomNav || false;

  return (
    <AuthGuard>
      <div className="flex h-dvh justify-center bg-gray-100">
        <main
          ref={mainRef}
          className={cn(
            "relative flex h-dvh w-full flex-col overflow-y-auto overflow-x-hidden",
            "pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left",
            bgColor
          )}
        >
          <div className="flex w-full flex-1 flex-col px-layout-side pb-[calc(96px+env(safe-area-inset-bottom))]">
            <Outlet />
          </div>

          {!hideBottomNav && <BottomNavigation />}
        </main>
      </div>
    </AuthGuard>
  );
};

export default RootLayout;
