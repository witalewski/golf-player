import { formatTimecode } from "./timecodeFormatter";

const skip = (
  event: KeyboardEvent,
  videoEl: HTMLVideoElement,
  direction: "Backward" | "Forward",
  notificationFn: (s: string) => void
): void => {
  const multiplier: number = direction === "Backward" ? -1 : 1;
  if (event.shiftKey) {
    if (event.altKey) {
      videoEl.currentTime += multiplier * 0.04;
    } else {
      videoEl.currentTime += multiplier * 0.5;
    }
  } else if (event.ctrlKey || event.metaKey) {
    videoEl.currentTime += multiplier * 30;
  } else if (event.altKey) {
    videoEl.currentTime += multiplier * 180;
  } else {
    videoEl.currentTime += multiplier * 5;
  }
  notificationFn(formatTimecode(videoEl.currentTime));
};

const setVolume = (
  volume: number,
  videoEl: HTMLVideoElement,
  notificationFn: (s: string) => void
): void => {
  videoEl.volume = Math.min(Math.max(volume, 0), 1);
  notificationFn(`Volume: ${Math.round(videoEl.volume * 100)}%`);
};

export const handleKey = (
  event: KeyboardEvent,
  videoEl: HTMLVideoElement,
  notificationFn: (s: string) => void
): void => {
  switch (event.code) {
    case "Space":
      if (videoEl.paused) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
      break;
    case "ArrowRight":
      skip(event, videoEl, "Forward", notificationFn);
      break;
    case "ArrowLeft":
      skip(event, videoEl, "Backward", notificationFn);
      break;
    case "ArrowUp":
      setVolume(videoEl.volume + 0.1, videoEl, notificationFn);
      break;
    case "ArrowDown":
      setVolume(videoEl.volume - 0.1, videoEl, notificationFn);
      break;
  }
};
