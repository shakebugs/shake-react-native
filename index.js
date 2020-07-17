import {NativeModules, findNodeHandle} from 'react-native';
import ShakeReportConfiguration from "./src/models/ShakeReportConfiguration";
import NetworkTracker from "./src/modules/NetworkTracker";
import ShakeFile from "./src/models/ShakeFile";

const {RNShake} = NativeModules;

NetworkTracker.setEnabled(true);
NetworkTracker.setNetworkRequestHandler(networkRequest => {
    if (networkRequest.statusCode) {
        RNShake.insertNetworkRequest(networkRequest)
    }
});

const addPrivateView = (viewRef) => {
    const nativeTag = findNodeHandle(viewRef);
    RNShake.addPrivateView(nativeTag);
};

export {RNShake as Shake}
export {ShakeReportConfiguration}
export {ShakeFile}
export {NetworkTracker}
export {addPrivateView}
