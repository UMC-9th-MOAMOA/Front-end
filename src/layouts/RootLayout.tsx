import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/common/navbar/BottomNavbar";

const RootLayout = () => {
  const location = useLocation();

  const showNavigation = ["/", "/search", "/my", "/settings"].includes(
    location.pathname
  );

  return (
    <div className="flex min-h-svh justify-center bg-gray-100">
      <main className="relative flex min-h-svh w-full max-w-(--width-app) flex-col overflow-x-hidden bg-white pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left shadow-xl">
        <div className="mx-auto w-full max-w-(--width-design-base) flex-1 px-layout-side">
          <Outlet />
        </div>
        {showNavigation && <BottomNavigation />}
      </main>
    </div>
  );
};

export default RootLayout;
