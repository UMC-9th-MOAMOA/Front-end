import { createContext, useContext } from "react";

export const RunChecksContext = createContext<(() => Promise<void>) | null>(
  null
);

export const useRunChecks = () => {
  const runChecks = useContext(RunChecksContext);
  if (!runChecks) throw new Error("RunChecksContext not found");
  return runChecks;
};
