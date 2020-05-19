export default class Sandbox {
  window: Window;

  document: Document;

  frame: HTMLIFrameElement;

  listenerMap = new Map();

  execScript(_: string, __?: any) {}

  install() {}

  uninstall() {}
}
