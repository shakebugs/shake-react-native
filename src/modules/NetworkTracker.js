import Interceptor from "../utils/Interceptor";
import Shake from '../../index'

class NetworkTracker {
    static _isEnabled = false;

    static isEnabled = () => {
        return this._isEnabled;
    }

    static setEnabled = (enabled) => {
        this._isEnabled = enabled;
        this._handleInterceptor();
    };

    static _handleInterceptor = () => {
        if (this._isEnabled) {
            Interceptor.enableInterception();
        } else {
            Interceptor.disableInterception();
        }
    }

    static initialize = () => {
        Interceptor.setOnDoneCallback(networkRequest => {
            if (networkRequest.statusCode) {
                Shake.insertNetworkRequest(networkRequest)
            }
        });
    };
}

NetworkTracker.initialize();
NetworkTracker.setEnabled(true);

export default NetworkTracker;
