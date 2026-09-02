export const parseFileSize = (bytes: number) => {
  if (bytes < 1000) return `${bytes} B`;
  return `${(bytes / 1000).toPrecision(3)} kB`;
};