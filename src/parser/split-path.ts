import { trimSlashes } from './trim-slashes';

export function splitPath(path: string) {
  return trimSlashes(path).split('/').map(decodeURIComponent);
}
