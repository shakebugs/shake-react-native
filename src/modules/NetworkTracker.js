import XHRInterceptor from "../utils/XhrInterceptor";

class NetworkTracker {
    static enabled = false;

    static isEnabled = () => {
        return this.enabled;
    };

    static setEnabled = (enabled) => {
        this.enabled = enabled;
        this._handleInterceptor();
    };

    static _handleInterceptor = () => {
        if (this.enabled) {
            XHRInterceptor.enableInterception();
        } else {
            XHRInterceptor.disableInterception();
        }
    }

    static setNetworkRequestHandler = (networkRequestHandler) => {
        XHRInterceptor.setOnDoneCallback(networkRequestHandler);
    };
}

export default NetworkTracker;
