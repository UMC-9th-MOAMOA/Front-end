import AsyncBoundary from "@/components/AsyncBoundary";
import { useBgmStore } from "@/store/bgm";
import HomeContent from "./components/HomeContent";
import useBgm from "./hooks/useBgm";

const HomePage = () => {
  const bgmEnabled = useBgmStore((s) => s.enabled);
  const setBgmEnabled = useBgmStore((s) => s.setEnabled);
  useBgm("/audio/bgm.mp3", 0.3, bgmEnabled);

  return (
    <AsyncBoundary>
      <HomeContent bgmEnabled={bgmEnabled} onBgmToggle={setBgmEnabled} />
    </AsyncBoundary>
  );
};

export default HomePage;
