import { useEffect, useRef } from "react";

let bgmAudio: HTMLAudioElement | null = null;

const useBgm = (src: string, volume = 0.3, enabled = true) => {
  const prevEnabledRef = useRef(enabled);

  useEffect(() => {
    if (!bgmAudio) {
      bgmAudio = new Audio(src);
      bgmAudio.loop = true;
    }
    bgmAudio.volume = volume;

    if (enabled) {
      if (!prevEnabledRef.current) {
        bgmAudio.currentTime = 0;
      }

      const tryPlay = () => bgmAudio?.play().catch(() => {});

      bgmAudio.play().catch(() => {
        document.addEventListener("pointerdown", tryPlay, { once: true });
      });

      return () => {
        document.removeEventListener("pointerdown", tryPlay);
        bgmAudio?.pause();
      };
    } else {
      bgmAudio.pause();
    }

    prevEnabledRef.current = enabled;
  }, [src, volume, enabled]);
};

export default useBgm;
