export const formatRuntime = runtime => {
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;
  return `${hours && hours + "h "}${mins ? mins + "mins" : ""}`;
};
