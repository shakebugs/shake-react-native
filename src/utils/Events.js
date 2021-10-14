import { NativeEventEmitter, NativeModules } from "react-native";

const EVENT_NOTIFICATION = "EventNotification";

let notificationListener = null;

export const registerNotificationListener = (listener) => {
    const eventEmitter = new NativeEventEmitter(NativeModules.RNShake);
    eventEmitter.addListener(EVENT_NOTIFICATION, listener);
    notificationListener = listener;
};

export const unregisterNotificationListener = () => {
    const eventEmitter = new NativeEventEmitter(NativeModules.RNShake);
    eventEmitter.removeListener(notificationListener);
    notificationListener = null;
};
