import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/common/button/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
}

function DefaultLoadingFallback() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <LoadingSpinner className="size-100" />
    </div>
  );
}

export default function AsyncBoundary({
  children,
  loadingFallback,
  errorFallback,
}: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={() =>
            errorFallback ?? (
              <div className="flex h-[50vh] flex-col items-center justify-center gap-16">
                <p className="body-1 text-gray-500">
                  데이터를 불러오는데 실패했어요
                </p>
              </div>
            )
          }
        >
          <Suspense fallback={loadingFallback ?? <DefaultLoadingFallback />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
