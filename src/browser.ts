import Sandbox from './sandbox';
import Frame from './frame';
import SandboxWindow from './window';

export default class Browser extends Sandbox {
  bootstarp = async () => {
    this.frame = await new Promise(resolve => {
      resolve(Frame.create('about:blank'));
    });
    this.window = new SandboxWindow(this) as Window;

    return Promise.resolve;
  };

  execScript = (code: string, conf?: any) => {
    // eslint-disable-next-line no-new-func
    const resolver = new Function(`
            return function({window, document}){
              with(window.SANDBOX_GLOBAL_VARS) {
                ${code}
              }
            };//@sourceURL=${conf?.name || ''}`)();
    return resolver({ window: this.window, document: {} });
  };
}
