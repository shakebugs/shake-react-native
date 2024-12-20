import XHRInterceptor from '../utils/XHRInterceptor';
import NetworkRequest from '../models/NetworkRequest';
import NetworkRequestBuilder from '../builders/NetworkRequestBuilder';

/**
 * Responsible for handling Shake network requests.
 */
class NetworkTracker {
  shake: any;
  enabled: boolean = false;
  filter:
    | ((requestBuilder: NetworkRequestBuilder) => NetworkRequestBuilder)
    | null = null;

  constructor(shake: any) {
    this.shake = shake;
    this.enabled = false;
    this.filter = null;
  }

  /**
   * Checks if network tracker is enabled.
   * @returns {*} true if enabled, otherwise false
   */
  isEnabled = (): boolean => {
    return this.enabled;
  };

  /**
   * Enables or disables network tracker.
   * @param enabled true to enable, otherwise false
   */
  setEnabled = (enabled: boolean) => {
    this.enabled = enabled;
    this._onConfigChanged();
  };

  /**
   * Sets network requests filter.
   * @param filter filter function
   */
  setFilter = (
    filter:
      | ((requestBuilder: NetworkRequestBuilder) => NetworkRequestBuilder)
      | null
  ) => {
    this.filter = filter;
  };

  /**
   * Inserts {@link NetworkRequest} to the database.
   * @param networkRequestBuilder builder
   */
  insertNetworkRequest = (networkRequestBuilder: NetworkRequestBuilder) => {
    if (this.filter) {
      networkRequestBuilder = this.filter(networkRequestBuilder);
      if (networkRequestBuilder) {
        this.shake.insertNetworkRequest(networkRequestBuilder.build());
      }
    } else {
      this.shake.insertNetworkRequest(networkRequestBuilder.build());
    }
  };

  /**
   * Handles network tracker configuration.
   * @private
   */
  _onConfigChanged = () => {
    if (this.enabled) {
      XHRInterceptor.enableInterception();
      XHRInterceptor.setOnRequestDone(this._onNetworkRequestReceived);
    } else {
      XHRInterceptor.disableInterception();
      XHRInterceptor.setOnRequestDone(null);
    }
  };

  /**
   * Triggered when new request is detected.
   * @param networkRequest network request data
   * @private
   */
  _onNetworkRequestReceived = (networkRequest: NetworkRequest) => {
    const networkRequestBuilder = new NetworkRequestBuilder(networkRequest);
    this.insertNetworkRequest(networkRequestBuilder);
  };
}

export default NetworkTracker;
