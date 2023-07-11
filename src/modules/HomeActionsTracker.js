import {registerHomeActionTapListener, unregisterHomeActionTapListener,} from "../utils/Events";

/**
 * Responsible for handling home actions.
 */
class HomeActionsTracker {
  enabled;
  homeActions;

  /**
   * Enables or disables tracker.
   * @param enabled true to enable, otherwise false
   */
  setEnabled = (enabled) => {
    this.enabled = enabled;
    this._onConfigChanged();
  };

  /**
   * Triggered when home action tap event is received.
   *
   * @param actionTitle tapped action title
   * @private
   */
  _onEventReceived = (actionTitle) => {
    this.homeActions?.forEach(action => {
      if (action.title === actionTitle) {
        action.handler?.call(null);
      }
    })
  };

  /**
   * Handles tracker configuration.
   * @private
   */
  _onConfigChanged = () => {
    if (this.enabled) {
      registerHomeActionTapListener(this._onEventReceived);
    } else {
      unregisterHomeActionTapListener();
    }
  };
}

export default HomeActionsTracker;
