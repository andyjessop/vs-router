import type { EventEmitter } from './types';
type API = EventEmitter.API;
type Handler = EventEmitter.Handler;
type Listener = EventEmitter.Listener

/**
 * Create an event emitter.
 */
export function createEventEmitter(): API {
  const listeners: Listener[] = [];

  return {
    emit,
    off,
    on,
  };

  /**
   * Emit an event.
   */
  function emit(type: string, data: any): void {
    let listener: Listener;

    for (listener of listeners) {
      if (listener.type !== type) {
        continue;
      }

      listener.handler(data);
    }
  }

  /**
   * Unsubscribe a listener
   */
  function off(type: string, handler: Handler): void {
    const ndx = listeners.findIndex(
      (l: Listener) => type === l.type && handler === l.handler,
    );

    if (ndx !== -1) {
      listeners.splice(ndx, 1);
    }
  }

  /**
   * Subscribe to an event.
   */
  function on(type: string, handler: Handler): void {
    const listener = { handler, type };

    listeners.push(listener);
  }
}
