import { useEffect } from "react";
import AsyncBoundary from "@/components/AsyncBoundary";
import { useRunChecks } from "@/context/RunChecksContext";
import { useBgmStore } from "@/store/bgm";
import HomeContent from "./components/HomeContent";
import useBgm from "./hooks/useBgm";

const HomePage = () => {
  const bgmEnabled = useBgmStore((s) => s.enabled);
  const setBgmEnabled = useBgmStore((s) => s.setEnabled);
  useBgm("/audio/bgm.mp3", 0.3, bgmEnabled);

  const runChecks = useRunChecks();

  // 홈 마운트 시 출석 체크 실행 (로그인/온보딩 완료 후 진입 시 커버)
  useEffect(() => {
    runChecks();
  }, [runChecks]);

  return (
    <AsyncBoundary>
      <HomeContent bgmEnabled={bgmEnabled} onBgmToggle={setBgmEnabled} />
    </AsyncBoundary>
  );
};

export default HomePage;
