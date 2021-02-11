import Interceptor from "../utils/Interceptor";
import Shake from "../../index";

class NetworkTracker {
    static _enabled = false;
    static _filter = null;

    static isEnabled = () => {
        return this._enabled;
    };

    static setEnabled = (enabled) => {
        this._enabled = enabled;
    };

    static getFilter = () => {
        return this._filter;
    };

    static setFilter = (filter) => {
        this._filter = filter;
    };

    static initialize = () => {
        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((networkRequest) => {
            if (this._enabled && networkRequest.statusCode) {
                Shake.insertNetworkRequest(networkRequest);
            }
        });
    };
}

NetworkTracker.initialize();
NetworkTracker.setEnabled(true);

export default NetworkTracker;
