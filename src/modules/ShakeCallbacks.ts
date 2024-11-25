import {
  registerShakeDismissListener,
  registerShakeOpenListener,
  registerShakeSubmitListener,
} from '../utils/Events';

/**
 * Responsible for handling Shake callbacks.
 */
class ShakeCallbacks {
  shakeOpenListener: (() => void) | null = null;
  shakeDismissListener: (() => void) | null = null;
  shakeSubmitListener:
    | ((type: string, fields: { [key: string]: string }) => void)
    | null = null;

  /**
   * Starts all listeners.
   */
  startListening = () => {
    this._startShakeOpenListener();
    this._startShakeDismissListener();
    this._startShakeSubmitListener();
  };

  /**
   * Sets Shake open listener.
   *
   * @param shakeOpenListener listener
   */
  setShakeOpenListener = (shakeOpenListener: (() => void) | null) => {
    this.shakeOpenListener = shakeOpenListener;
  };

  /**
   * Sets Shake dismiss listener.
   *
   * @param shakeDismissListener listener
   */
  setShakeDismissListener = (shakeDismissListener: (() => void) | null) => {
    this.shakeDismissListener = shakeDismissListener;
  };

  /**
   * Sets Shake submit listener.
   *
   * @param shakeSubmitListener listener
   */
  setShakeSubmitListener = (
    shakeSubmitListener:
      | ((type: string, fields: { [key: string]: string }) => void)
      | null
  ) => {
    this.shakeSubmitListener = shakeSubmitListener;
  };

  /**
   * Starts shake open listener.
   */
  _startShakeOpenListener = () => {
    registerShakeOpenListener(() => {
      if (this.shakeOpenListener) this.shakeOpenListener();
    });
  };

  /**
   * Starts shake dismiss listener.
   */
  _startShakeDismissListener = () => {
    registerShakeDismissListener(() => {
      if (this.shakeDismissListener) this.shakeDismissListener();
    });
  };

  /**
   * Starts shake submit listener.
   */
  _startShakeSubmitListener = () => {
    registerShakeSubmitListener((data: any) => {
      if (this.shakeSubmitListener)
        this.shakeSubmitListener(data.type, data.fields);
    });
  };
}

export default ShakeCallbacks;
