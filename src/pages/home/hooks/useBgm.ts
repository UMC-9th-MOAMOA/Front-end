import { useEffect } from "react";

let bgmAudio: HTMLAudioElement | null = null;

const useBgm = (src: string, volume = 0.3) => {
  useEffect(() => {
    if (!bgmAudio) {
      bgmAudio = new Audio(src);
      bgmAudio.loop = true;
    }
    bgmAudio.volume = volume;

    const tryPlay = () => bgmAudio?.play().catch(() => {});

    bgmAudio.play().catch(() => {
      document.addEventListener("pointerdown", tryPlay, { once: true });
    });

    return () => {
      document.removeEventListener("pointerdown", tryPlay);
      bgmAudio?.pause();
    };
  }, [src, volume]);
};

export default useBgm;
