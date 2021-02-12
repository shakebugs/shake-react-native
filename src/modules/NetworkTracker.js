import Interceptor from "../utils/Interceptor";

/**
 * Responsible for handling Shake network requests.
 */
class NetworkTracker {
    shake;
    enabled;
    filter;

    constructor(shake) {
        this.shake = shake;
        this.enabled = false;
        this.filter = null;
    }

    /**
     * Checks if network tracker is enabled.
     * @returns {*} true if enabled, otherwise false
     */
    isEnabled = () => {
        return this.enabled;
    };

    /**
     * Enables or disables network tracker.
     * @param enabled true to enable, otherwise false
     */
    setEnabled = (enabled) => {
        this.enabled = enabled;
        this._onConfigChanged();
    };

    /**
     * Gets network requests filter.
     * @returns {*} filter function
     */
    getFilter = () => {
        return this.filter;
    };

    /**
     * Sets network requests filter.
     * @param filter filter function
     */
    setFilter = (filter) => {
        this.filter = filter;
    };

    /**
     * Handles network tracker configuration.
     * @private
     */
    _onConfigChanged = () => {
        if (this.enabled) {
            Interceptor.enableInterception();
            Interceptor.setOnDoneCallback(this._onRequestHandled);
        } else {
            Interceptor.disableInterception();
            Interceptor.setOnDoneCallback(null);
        }
    };

    /**
     * Inserts request in Shake database.
     * @param networkRequest request model
     * @private
     */
    _onRequestHandled = (networkRequest) => {
        if (this.shake) {
            this.shake.insertNetworkRequest(networkRequest);
        }
    };
}

export default NetworkTracker;
