import XHRInterceptor from "../interceptors/XhrInterceptor";
import Shake from "../../index";

class NetworkTracker {
}

NetworkTracker.enable = () => {
    XHRInterceptor.enableInterception();
    XHRInterceptor.setOnDoneCallback(networkRequest => {
        if (networkRequest.statusCode) {
            Shake.insertNetworkRequest(networkRequest)
        }
    });
};
NetworkTracker.disable = () => {
    XHRInterceptor.disableInterception();
};

export default NetworkTracker;
