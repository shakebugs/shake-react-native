import XHRInterceptor from "../utils/XhrInterceptor";

class NetworkTracker {
    static enable = () => {
        XHRInterceptor.enableInterception();
    };

    static disable = () => {
        XHRInterceptor.disableInterception();
    };

    static setNetworkRequestHandler = (networkRequestHandler) => {
        XHRInterceptor.setOnDoneCallback(networkRequestHandler);
    };
}

export default NetworkTracker;
