import { useMyWalletBalance } from "../hooks/useMyWalletBalance";
import AcornHistory from "./AcornHistory";
import AcornSummary from "./AcornSummary";
import { mockAcornHistory } from "../mocks/mypage.mock";

export default function AcornSection() {
  const { data } = useMyWalletBalance();

  return (
    <>
      <AcornSummary count={data.point} />
      <AcornHistory items={mockAcornHistory} />
    </>
  );
}
