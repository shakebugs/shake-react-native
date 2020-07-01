import {NativeModules} from 'react-native';
import ShakeInvocationEvent from "./src/enums/ShakeInvocationEvent";
import NetworkTracker from "./src/modules/NetworkTracker";

const {RNShake} = NativeModules;

NetworkTracker.setNetworkRequestHandler(networkRequest => {
    if (networkRequest.statusCode) {
        RNShake.insertNetworkRequest(networkRequest)
    }
});


export {RNShake as Shake}
export {ShakeInvocationEvent}
export {NetworkTracker}
