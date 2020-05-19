import { addListener, rmListener } from './event';

class Window {
  constructor(sandbox) {
    const { frame } = sandbox;
    const SANDBOX_GLOBAL_VARS = {};
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
          case 'addEventListener':
            return addListener(sandbox);
          case 'removeEventListener':
            return rmListener(sandbox);
          default: {
            return target[name];
          }
        }
      },
    });
  }
}

export default Window;
