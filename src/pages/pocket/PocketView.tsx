import { Suspense } from "react";
import Header from "@/components/common/header/Header";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import PocketContent from "./components/PocketContent";

export default function PocketView() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 -mx-layout-side bg-white px-layout-side">
        <Header
          title="주머니"
          property="common"
          leftIcon="quit"
          className="mt-0! pt-28"
        />
        <div className="-mx-layout-side mt-14 h-2 bg-gray-200" />
      </div>

      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-200px)] items-center justify-center">
            <LoadingSpinner className="size-48" />
          </div>
        }
      >
        <PocketContent />
      </Suspense>
    </div>
  );
}
