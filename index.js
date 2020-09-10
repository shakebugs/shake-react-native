import {NativeModules} from 'react-native';
import ShakeReportConfiguration from "./src/models/ShakeReportConfiguration";
import NetworkTracker from "./src/modules/NetworkTracker";
import ShakeFile from "./src/models/ShakeFile";

const Shake = NativeModules.RNShake;

NetworkTracker.setEnabled(true);
NetworkTracker.setNetworkRequestHandler(networkRequest => {
    if (networkRequest.statusCode) {
        Shake.insertNetworkRequest(networkRequest)
    }
});

export {ShakeReportConfiguration}
export {ShakeFile}
export {NetworkTracker}

export default Shake;
