import Interceptor from "../utils/Interceptor";
import NetworkRequest from "../models/NetworkRequest";
import NetworkRequestBuilder from "../builders/NetworkRequestBuilder";

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
     * Sets network requests filter.
     * @param filter filter function
     */
    setFilter = (filter) => {
        this.filter = filter;
    };

    /**
     * Inserts {@link NetworkRequest} to the database.
     * @param networkRequestBuilder builder
     */
    insertNetworkRequest = (networkRequestBuilder) => {
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
            Interceptor.enableInterception();
            Interceptor.setOnDoneCallback(this._onNetworkRequestReceived);
        } else {
            Interceptor.disableInterception();
            Interceptor.setOnDoneCallback(null);
        }
    };

    /**
     * Triggered when new request is detected.
     * @param data network request data
     * @private
     */
    _onNetworkRequestReceived = (data) => {
        const networkRequest = this._mapToNetworkRequest(data);
        const networkRequestBuilder = new NetworkRequestBuilder(networkRequest);
        this.insertNetworkRequest(networkRequestBuilder);
    };

    /**
     * Maps network request data to {@link NetworkRequest} model
     * @param data network request data
     * @return {NetworkRequest} network request object
     * @private
     */
    _mapToNetworkRequest = (data) => {
        const networkRequest = new NetworkRequest();
        networkRequest.url = data.url;
        networkRequest.method = data.method;
        networkRequest.statusCode = data.statusCode;
        networkRequest.duration = data.duration;
        networkRequest.responseHeaders = data.responseHeaders;
        networkRequest.requestHeaders = data.requestHeaders;
        networkRequest.responseBody = data.responseBody;
        networkRequest.requestBody = data.requestBody;
        networkRequest.timestamp = data.timestamp;

        return networkRequest;
    };
}

export default NetworkTracker;
