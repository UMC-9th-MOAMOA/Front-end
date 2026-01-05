import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex min-h-svh justify-center bg-gray-100">
      <main className="relative flex min-h-svh w-full max-w-(--width-app) flex-col overflow-x-hidden bg-white pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left shadow-xl">
        <div className="mx-auto w-full max-w-(--width-design-base) flex-1 px-layout-side">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
