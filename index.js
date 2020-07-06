import {NativeModules} from 'react-native';
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


export {RNShake as Shake}
export {ShakeReportConfiguration}
export {ShakeFile}
export {NetworkTracker}
