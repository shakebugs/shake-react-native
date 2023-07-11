import {registerShakeDismissListener, registerShakeOpenListener, registerShakeSubmitListener,} from "../utils/Events";

/**
 * Responsible for handling Shake callbacks.
 */
class ShakeCallbacks {
  shakeOpenListener = null;
  shakeDismissListener = null;
  shakeSubmitListener = null;

  /**
   * Starts all listeners.
   */
  startListening = () => {
    this._startShakeOpenListener();
    this._startShakeDismissListener();
    this._startShakeSubmitListener();
  }

  /**
   * Sets Shake open listener.
   *
   * @param shakeOpenListener listener
   */
  setShakeOpenListener = (shakeOpenListener) => {
    this.shakeOpenListener = shakeOpenListener;
  };

  /**
   * Sets Shake dismiss listener.
   *
   * @param shakeDismissListener listener
   */
  setShakeDismissListener = (shakeDismissListener) => {
    this.shakeDismissListener = shakeDismissListener;
  };

  /**
   * Sets Shake submit listener.
   *
   * @param shakeSubmitListener listener
   */
  setShakeSubmitListener = (shakeSubmitListener) => {
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
    registerShakeSubmitListener((data) => {
      if (this.shakeSubmitListener) this.shakeSubmitListener(data['type'], data['fields']);
    });
  };
}

export default ShakeCallbacks;
