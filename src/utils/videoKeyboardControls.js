export const handleKeyDown = (keyCode, videoEl) => {
  switch (keyCode) {
    case "Space":
      if (videoEl.paused) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
      break;
    case "ArrowRight":
      if (event.shiftKey) {
        if (event.altKey) {
          videoEl.currentTime += 0.04;
        } else {
          videoEl.currentTime += 0.5;
        }
      } else if (event.ctrlKey || event.metaKey) {
        videoEl.currentTime += 30;
      } else if (event.altKey) {
        videoEl.currentTime += 180;
      } else {
        videoEl.currentTime += 5;
      }
      break;
    case "ArrowLeft":
      if (event.shiftKey) {
        if (event.altKey) {
          videoEl.currentTime -= 0.04;
        } else {
          videoEl.currentTime -= 0.5;
        }
      } else if (event.ctrlKey || event.metaKey) {
        videoEl.currentTime -= 30;
      } else if (event.altKey) {
        videoEl.currentTime -= 180;
      } else {
        videoEl.currentTime -= 5;
      }
      break;
    case "ArrowUp":
      videoEl.volume = Math.min(videoEl.volume + 0.1, 1);
      break;
    case "ArrowDown":
      videoEl.volume = Math.max(videoEl.volume - 0.1, 0);
      break;
    case "KeyF":
      if (videoEl.webkitDisplayingFullscreen) {
        videoEl.webkitExitFullScreen();
      } else {
        videoEl.webkitEnterFullScreen();
      }
  }
};
