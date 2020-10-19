export namespace EventEmitter {
  export interface API {
    emit: (type: string, data?: any) => void;
    off: (type: string, handler: Handler) => void;
    offAll: (handler: Handler) => void;
    offMany: (listeners: Listener[]) => void;
    on: (type: string, handler: Handler) => void;
    onAll: (handler: Handler) => void;
    onMany: (types: string[], handler: Handler) => void;
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

  export interface Subscriptions {
    all: Listener[];
    [key: string]: Listener[];
  }
}
