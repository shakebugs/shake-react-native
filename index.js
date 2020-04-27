import {NativeModules} from 'react-native';
import ShakeInvocationEvent from "./src/enums/ShakeInvocationEvent";
import NetworkTracker from "./src/modules/NetworkTracker";

const {Shake} = NativeModules;

NetworkTracker.setNetworkRequestHandler(networkRequest => {
    if (networkRequest.statusCode) {
        Shake.insertNetworkRequest(networkRequest)
    }
});

export default Shake;

export {ShakeInvocationEvent}
export {NetworkTracker}
