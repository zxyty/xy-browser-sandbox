import { addListener, rmListener, rmAllListeners } from './event';

class Window {
  constructor(sandbox) {
    const { frame } = sandbox;
    const SANDBOX_GLOBAL_VARS = {};
    frame.contentWindow.EVENT_BASE = window;
    return new Proxy(frame.contentWindow, {
      set(target, name, value) {
        if (!(name in target)) {
          SANDBOX_GLOBAL_VARS[name] = value;
        } else {
          target[name] = value;
        }
        return true;
      },

      get(target, name) {
        switch (name) {
          case 'SANDBOX_GLOBAL_VARS':
            return SANDBOX_GLOBAL_VARS;
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
    });
  }
}

export default Window;
