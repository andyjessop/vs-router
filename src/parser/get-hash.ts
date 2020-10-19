export function getHash(path: string) {
  return decodeURIComponent(path.replace(/^#/, ''));
}
