import { type RefObject, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = (ref: RefObject<HTMLElement | null>) => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    ref.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, search, ref]);
};
