import type { EventEmitter } from './types';
type API = EventEmitter.API;
type Handler = EventEmitter.Handler;
type Listener = EventEmitter.Listener

export function createEventEmitter(): API {
  const listeners: Listener[] = [];

  return {
    emit,
    off,
    offAll,
    offMany,
    on,
    onAll,
    onMany,
  };

  /**
   * Emit an event handler for a subscription type.
   */
  function emit(type: string, data: any): void {
    let listener: Listener;

    for (listener of listeners) {
      if (listener.type !== type && listener.type !== 'all') {
        continue;
      }

      listener.handler(data);
    }
  }

  /**
   * Remove a listener from the subscriptions.
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
   * Remove a handler from all subscriptions.
   */
  function offAll(handler: Handler): void {
    return off('all', handler);
  }

  /**
   * Remove a handler from all subscriptions.
   */
  function offMany(listenersToRemove: Listener[] = []): void {
    listenersToRemove.forEach(listener => off(listener.type, listener.handler));
  }

  /**
   * Subscribe to an event with a handler.
   */
  function on(type: string, handler: Handler): void {
    const listener = { handler, type };

    listeners.push(listener);
  }

  /**
   * Subscribe to all events.
   */
  function onAll(handler: Handler): void {
    on('all', handler);
  }

  /**
   * Subscribe to an event with a handler.
   */
  function onMany(types: string[] = [], handler: Handler): void {
    types.forEach(type => on(type, handler));
  }
}
