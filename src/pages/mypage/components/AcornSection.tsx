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
      <Suspense fallback={<LoadingSpinner className="mx-auto mt-20 size-28" />}>
        <AcornHistory />
      </Suspense>
    </>
  );
}
