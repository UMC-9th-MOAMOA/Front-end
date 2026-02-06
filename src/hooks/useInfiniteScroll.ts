import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollParams {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  rootMargin?: string;
  throttleDelay?: number;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  rootMargin = "300px",
  throttleDelay = 300,
}: UseInfiniteScrollParams) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin,
  });

  const lastCall = useRef(0);

  const throttledFetchNextPage = () => {
    const now = Date.now();
    if (now - lastCall.current >= throttleDelay) {
      lastCall.current = now;
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      throttledFetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return { ref, isFetchingNextPage };
};
