type Handler = EventEmitter.Handler;

export namespace EventEmitter {
  export interface API {
    emit: (type: string, data?: any) => void;
    off: (type: string, handler: Handler) => void;
    on: (type: string, handler: Handler) => void;
  }

  export interface Event {
    data: any;
    type: string;
  }

  export interface Listener {
    type: string;
    handler: Handler;
  }

  export type Handler = (event: Event) => any;
}

export namespace Router {
  export interface API extends EventEmitter.API {
    back(): void;
    destroy(): void;
    forward(): void;
    getCurrentRoute(): Router.RouteData | null;
    go(num: number): void;
    push(name: string, params?: RouteParams): void;
    register(name: string, path: string): true | null;
    replace(name: string, params?: RouteParams): void;
  }

  export interface CurrentRoute {
    params: any;
    route: Route;
  }

  export enum Events {
    Transition = 'transition',
  }

  export interface Route {
    decodeURL(url: string): null | RouteParams;
    encodeURL(dict: RouteParams): string;
    name: string;
  }

  export interface RouteData {
    name: string;
    params: any;
  }

  export type Routes = Record<string, Route>;

  export type RouteParams = Record<string, string | null | string[]>;
}
