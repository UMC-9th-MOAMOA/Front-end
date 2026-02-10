import { useState } from "react";
import AsyncBoundary from "@/components/AsyncBoundary";
import HomeContent from "./components/HomeContent";
import useBgm from "./hooks/useBgm";

const HomePage = () => {
  const [bgmEnabled, setBgmEnabled] = useState(true);
  useBgm("/audio/bgm.mp3", 0.3, bgmEnabled);

  return (
    <AsyncBoundary>
      <HomeContent bgmEnabled={bgmEnabled} onBgmToggle={setBgmEnabled} />
    </AsyncBoundary>
  );
};

export default HomePage;
