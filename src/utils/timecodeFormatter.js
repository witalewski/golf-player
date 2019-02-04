const leftPad = number => `${number < 10 ? "0" : ""}${number}`;

export const formatTimecode = time => {
  const frames = leftPad(Math.floor((time % 1) / 0.04));
  const seconds = leftPad(Math.floor(time % 60));
  const minutes = leftPad(Math.floor(time / 60));
  const hours = Math.floor(time / (60 * 60));
  return `${hours}:${minutes}:${seconds}:${frames}`;
};
