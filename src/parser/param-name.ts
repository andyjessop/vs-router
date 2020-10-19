import { isList } from './is-list';
import { isOptional } from './is-optional';

export function paramName(n: string) {
  if (isOptional(n) || isList(n)) {
    return n.slice(0, -1);
  }
  return n;
}
