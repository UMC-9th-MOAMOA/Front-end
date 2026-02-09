import AcornHistory from "./AcornHistory";
import AcornSummary from "./AcornSummary";
import { mockAcornCount, mockAcornHistory } from "../mocks/mypage.mock";

export default function AcornSection() {
  return (
    <>
      <AcornSummary count={mockAcornCount} />
      <AcornHistory items={mockAcornHistory} />
    </>
  );
}
