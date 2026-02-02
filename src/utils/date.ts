export const getToday = (): string => {
  const now = new Date();
  return now.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
};
