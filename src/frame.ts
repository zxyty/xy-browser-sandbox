export default class Frame {
  static create(url: string): Promise<HTMLIFrameElement> {
    return new Promise(resolve => {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', url);
      iframe.style.cssText =
        'position: absolute; top: -20000px; width: 0px; height: 0px;';

      document.body.append(iframe);

      // the onload will no trigger when src is about:blank
      if (url === 'about:blank') {
        resolve(iframe);
      }

      iframe.onload = () => {
        resolve(iframe);
      };
    });
  }
}
