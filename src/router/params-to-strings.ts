import type { Router } from './types';

export function paramsToStrings(dict: Router.RouteParams) {
  for (let key in dict) {
    dict[key] = key.toString();
  }

  return dict;
}
