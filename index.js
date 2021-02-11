import { findNodeHandle, NativeModules } from "react-native";
import ShakeReportConfiguration from "./src/models/ShakeReportConfiguration";
import ShakeFile from "./src/models/ShakeFile";
import LogLevel from "./src/models/LogLevel";
import NetworkTracker from "./src/modules/NetworkTracker";

const { RNShake } = NativeModules;

const addPrivateView = (viewRef) => {
    const nativeTag = findNodeHandle(viewRef);
    RNShake.addPrivateView(nativeTag);
};

const removePrivateView = (viewRef) => {
    const nativeTag = findNodeHandle(viewRef);
    RNShake.removePrivateView(nativeTag);
};

export { ShakeReportConfiguration };
export { ShakeFile };
export { LogLevel };
export { NetworkTracker };
export { addPrivateView };
export { removePrivateView };
export default RNShake;


