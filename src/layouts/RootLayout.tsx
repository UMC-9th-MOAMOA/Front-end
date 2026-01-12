import { Outlet, useMatches } from "react-router-dom";
import type { RouteHandle } from "@/routes/router";
import { cn } from "@/utils/cn/cn";

const RootLayout = () => {
  const matches = useMatches();

  const currentMatch = matches[matches.length - 1];
  const handle = currentMatch?.handle as RouteHandle | undefined;

  const bgColor = handle?.bgColor || "bg-white";

  return (
    <div className="flex h-dvh justify-center bg-gray-100">
      <main
        className={cn(
          "relative flex h-dvh w-full max-w-(--width-app) flex-col overflow-y-auto overflow-x-hidden",
          "pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left",
          bgColor
        )}
      >
        <div className="mx-auto flex w-full max-w-(--width-design-base) flex-1 flex-col px-layout-side pb-96">
          <Outlet />
        </div>

        {/* BottomNavigation 컴포넌트로 교체 예정 */}
        <nav className="fixed right-0 bottom-0 left-0 z-20 mx-auto h-96 w-full max-w-(--width-app) bg-white pb-safe-bottom">
          <div className="flex h-full items-center justify-center">
            하단 네비게이션
          </div>
        </nav>
      </main>
    </div>
  );
};

export default RootLayout;
