export const addListener = sandbox => (type, listener) => {
  const listeners = sandbox.listenerMap.get(type) || [];
  sandbox.listenerMap.set(type, [...listeners, listener]);
};

export const rmListener = sandbox => (type, listener) => {
  const listeners = sandbox.listenerMap.get(type);
  if (listeners && listeners.length && listeners.indexOf(listener) !== -1) {
    listeners.splice(listeners.indexOf(listener), 1);
  }
};
