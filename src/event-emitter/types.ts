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
