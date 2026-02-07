import AsyncBoundary from "@/components/AsyncBoundary";
import HomeContent from "./components/HomeContent";
import useBgm from "./hooks/useBgm";

const HomePage = () => {
  useBgm("/audio/bgm.mp3");

  return (
    <AsyncBoundary>
      <HomeContent />
    </AsyncBoundary>
  );
};

export default HomePage;
