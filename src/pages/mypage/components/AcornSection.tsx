import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useMyWalletBalance } from "../hooks/useMyWalletBalance";
import AcornHistory from "./AcornHistory";
import AcornSummary from "./AcornSummary";

export default function AcornSection() {
  const { data } = useMyWalletBalance();

  return (
    <>
      <AcornSummary count={data.point} />
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center py-40">
            <LoadingSpinner className="size-60" />
          </div>
        }
      >
        <AcornHistory />
      </Suspense>
    </>
  );
}
