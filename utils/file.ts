const BYTES_PER_KILOBYTE = 1024;
const BYTES_PER_MEGABYTE = 1024 * 1024;
const BYTES_PER_GIGABYTE = 1024 * 1024 * 1024;

export function bytesToSizeString(bytes: number): string {
  if (bytes < BYTES_PER_KILOBYTE) {
    return `${bytes} B`;
  } else if (bytes < BYTES_PER_MEGABYTE) {
    return `${(bytes / BYTES_PER_KILOBYTE).toFixed(2)} KB`;
  } else if (bytes < Math.pow(BYTES_PER_KILOBYTE, 3)) {
    return `${(bytes / BYTES_PER_MEGABYTE).toFixed(2)} MB`;
  }
  return `${(bytes / BYTES_PER_GIGABYTE).toFixed(2)} GB`;
}
