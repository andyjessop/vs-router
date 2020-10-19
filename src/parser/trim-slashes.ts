export function trimSlashes(p: string) {
  return p.replace(/(\/$)|(^\/)/g, '');
}
