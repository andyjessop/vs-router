import type { EventEmitter } from '../event-emitter/types';
import { Router } from './types';
import { createEventEmitter } from '../event-emitter/create-event-emitter';
import { parse, reverse } from '../parser';
import { trimSlashes } from '../parser/trim-slashes';


/**
 * Create a router.
 */
export function createRouter(
  base: string,
  initialRoutes: Record<string, string>,
  emitter: EventEmitter.API = createEventEmitter()
): Router.API {
  const trimmedBase = trimSlashes(base);
  const routes: Router.Routes = {};

  // Register the initial routes, including the "root" route.
  [
    ['root', '/'],
    ['notFound', '/404'],
    ...Object.entries(initialRoutes),
  ].forEach(([name, path]) => register(name, path));

  let currentRoute: Router.CurrentRoute | null = getMatchingRoute(window.location.href);

  const { params, route: { name } } = currentRoute;

  push(name, params);

  window.addEventListener('popstate', handleURLChange);

  return {
    back,
    destroy,
    ...emitter,
    forward,
    getCurrentRoute,
    go,
    push,
    register,
    replace,
  };

  /**
   * Destroy the router.
   */
  function destroy() {
    window.removeEventListener('popstate', handleURLChange);
  }

  /**
   * Create a new route object on a given path.
   */
  function createRoute(name: string, path: string): Router.Route {
    return {
      decodeURL: parse(path),
      encodeURL: reverse(path),
      name,
    };
  }

  function getCurrentRoute(): Router.RouteData | null {
    return getRouteData(currentRoute);
  }

  function getMatchingRoute(url: string): Router.CurrentRoute {
    let params: any | null = null;

    const route =  Object
      .values(routes)
      .find(route => {
        params = route.decodeURL(url);

        return params !== null;
      });

    if (!route) {
      return {
        params: null,
        route: routes.notFound
      };
    }

    return {
      params,
      route,
    };
  }

  function handleURLChange() {
    const lastRoute = currentRoute;
    currentRoute = getMatchingRoute(window.location.href);

    emitter.emit(Router.Events.Transition, buildEvent({
      last: lastRoute,
      next: currentRoute,
      type: Router.Events.Transition
    }));
  }

  /**
   * Go forwards or backwards by a given number of steps.
   */
  function go(num: number) {
    window.history.go(num);
  }

  /**
   * Go backwards.
   */
  function back() {
    window.history.go(-1);
  }

  /**
   * Go forwards.
   */
  function forward() {
    window.history.go(1);
  }

  /**
   * Push a new route into the history.
   */
  function push(name: string, params: Router.RouteParams = {}): void {
    const route = routes[name];

    if (!route) {
      return;
    }

    transition(route, params);
  }

  /**
   * Register a route.
   */
  function register(name: string, path: string): true | null {
    if (typeof path === 'undefined' || typeof name === 'undefined') {
      return null;
    }

    routes[name] = createRoute(name, `${trimmedBase}${path}`);

    return true;
  }

  /**
   * Replace the current location history.
   */
  function replace(name: string, params: Router.RouteParams = {}): void {
    const route = routes[name];

    if (!route) {
      return;
    }

    transition(route, params, true);
  }

  function transition(route: Router.Route, params: Router.RouteParams, replace = false) {
    const url = route.encodeURL(params);

    if (!url) {
      return;
    }

    const fullURL = `${window.location.origin}${url}`;

    if (fullURL === window.location.href) {
      return;
    }

    const lastRoute = currentRoute;
    currentRoute = { params, route };

    if (replace) {
      window.history.replaceState({ name: route.name, params }, '', fullURL);
    } else {
      window.history.pushState({ name: route.name, params }, '', fullURL);
    }

    emitter.emit(Router.Events.Transition, buildEvent({
      last: lastRoute,
      next: currentRoute,
      type: Router.Events.Transition
    }));
  }
}

function buildEvent({
  last,
  next,
  type,
}: {
  last: Router.CurrentRoute | null | undefined,
  next: Router.CurrentRoute | null | undefined,
  type: Router.Events,
}) {
  return {
    last: getRouteData(last),
    next: getRouteData(next),
    type,
  }
}

function getRouteData(route: Router.CurrentRoute | null | undefined): Router.RouteData | null {
  if (!route) {
    return null;
  }

  return { name: route.route.name, params: route.params }
}
