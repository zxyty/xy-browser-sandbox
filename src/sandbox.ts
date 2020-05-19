export default class Sandbox {
  window: Window;

  frame: HTMLIFrameElement;

  listenerMap = new Map();

  execScript(_: string, __?: any) {}
}
