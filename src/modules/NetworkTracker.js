import XHRInterceptor from "../utils/XhrInterceptor";

class NetworkTracker {
    static setEnabled = (enabled) => {
        if (enabled) {
            XHRInterceptor.enableInterception();
        } else {
            XHRInterceptor.disableInterception();
        }

    };

    static setNetworkRequestHandler = (networkRequestHandler) => {
        XHRInterceptor.setOnDoneCallback(networkRequestHandler);
    };
}

export default NetworkTracker;
