import { addListener, rmListener, rmAllListeners } from './event';

export default class Document {
  constructor(sandbox) {
    (document as any).EVENT_BASE = document;
    return new Proxy(document, {
      get(target, name) {
        switch (name) {
          case 'defaultView': {
            return sandbox.window;
          }
          case 'addEventListener': {
            return addListener(sandbox, target);
          }
          case 'removeEventListener': {
            return rmListener(sandbox, target);
          }
          case 'removeAllListeners': {
            return rmAllListeners(sandbox, target);
          }
          default: {
            return target[name];
          }
        }
      },
      set(target, name, value) {
        target[name] = value;
        return true;
      },
    });
  }
}
