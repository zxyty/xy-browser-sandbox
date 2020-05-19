export const addListener = (sandbox, scope) => (type, listener, options) => {
  const scopeMap = sandbox.listenerMap.get(scope) || new Map();
  sandbox.listenerMap.set(scope, scopeMap);

  const listeners = scopeMap.get(type) || [];
  scopeMap.set(type, [...listeners, listener]);

  return scope.EVENT_BASE.addEventListener(type, listener, options);
};

export const rmListener = (sandbox, scope) => (type, listener, options) => {
  const scopeMap = sandbox.listenerMap.get(scope) || new Map();

  const listeners = scopeMap.get(type);
  if (listeners && listeners.length && listeners.indexOf(listener) !== -1) {
    listeners.splice(listeners.indexOf(listener), 1);
  }

  return scope.EVENT_BASE.removeEventListener(type, listener, options);
};

export const rmAllListeners = (sandbox, scope) => () => {
  const scopeMap = sandbox.listenerMap.get(scope) || new Map();

  // eslint-disable-next-line no-restricted-syntax
  for (const listen of scopeMap.entries()) {
    // eslint-disable-next-line no-loop-func
    const [type, listeners] = listen;
    listeners.forEach(l => {
      scope.EVENT_BASE.removeEventListener(type, l);
    });
  }

  scopeMap.set(scope, null);
};
