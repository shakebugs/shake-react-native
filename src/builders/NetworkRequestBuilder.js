import NetworkRequest from "../models/NetworkRequest";
import Utils from "../utils/Utils";

const INVALID_URL = "https://not_a_valid_url";

/**
 * Builds network request object.
 */
class NetworkRequestBuilder {
    _url;
    _method;
    _requestBody;
    _responseBody;
    _requestHeaders;
    _responseHeaders;
    _statusCode;
    _duration;
    _date;

    /**
     * Creates builder from {@link NetworkRequest}
     * @param networkRequest object
     */
    constructor(networkRequest) {
        if (networkRequest) {
            this._url = networkRequest.url;
            this._method = networkRequest.method;
            this._statusCode = networkRequest.statusCode;
            this._requestBody = networkRequest.requestBody;
            this._responseBody = networkRequest.responseBody;
            this._requestHeaders = networkRequest.requestHeaders;
            this._responseHeaders = networkRequest.responseHeaders;
            this._duration = networkRequest.duration;
            this._date = networkRequest.timestamp;
        } else {
            this._url = "";
            this._method = "";
            this._statusCode = "";
            this._requestBody = "";
            this._responseBody = "";
            this._requestHeaders = null;
            this._responseHeaders = null;
            this._duration = 0;
            this._date = new Date();
        }
    }

    getUrl() {
        return this._url;
    }

    setUrl(value) {
        this._url = value;
        return this;
    }

    getMethod() {
        return this._method;
    }

    setMethod(value) {
        this._method = value;
        return this;
    }

    getRequestBody() {
        return this._requestBody;
    }

    setRequestBody(value) {
        this._requestBody = value;
        return this;
    }

    getResponseBody() {
        return this._responseBody;
    }

    setResponseBody(value) {
        this._responseBody = value;
        return this;
    }

    getRequestHeaders() {
        return this._requestHeaders;
    }

    setRequestHeaders(value) {
        this._requestHeaders = value;
        return this;
    }

    getResponseHeaders() {
        return this._responseHeaders;
    }

    setResponseHeaders(value) {
        this._responseHeaders = value;
        return this;
    }

    getStatusCode() {
        return this._statusCode;
    }

    setStatusCode(value) {
        this._statusCode = value;
        return this;
    }

    getDuration() {
        return this._duration;
    }

    setDuration(value) {
        this._duration = value;
        return this;
    }

    getDate() {
        return this._date;
    }

    setDate(date) {
        this._date = date;
        return this;
    }

    /**
     * Builds and validates network request data.
     * @return {NetworkRequest} object
     */
    build() {
        let timestamp, method, status, url;

        try {
            timestamp = this._date.toISOString();
        } catch (e) {
            timestamp = new Date().toISOString();
        }

        method = !this._method ? "" : this._method;
        status = !this._statusCode ? "" : this._statusCode;
        url = !this._url ? INVALID_URL : this._url;
        url = !Utils.isHttpUrl(this._url) ? INVALID_URL : this._url;

        const networkRequest = new NetworkRequest();
        networkRequest.url = url;
        networkRequest.method = method;
        networkRequest.statusCode = status;
        networkRequest.requestBody = this._requestBody;
        networkRequest.requestHeaders = this._requestHeaders;
        networkRequest.responseBody = this._responseBody;
        networkRequest.responseHeaders = this._responseHeaders;
        networkRequest.timestamp = timestamp;
        networkRequest.duration = this._duration;

        return networkRequest;
    }
}

export default NetworkRequestBuilder;
