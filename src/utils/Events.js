import { NativeEventEmitter, NativeModules } from "react-native";

const eventEmitter = new NativeEventEmitter(NativeModules.RNShake);

const EVENT_NOTIFICATION = "EventNotification";
let notificationListenerSub = null;

export const registerNotificationListener = (listener) => {
  notificationListenerSub = eventEmitter.addListener(
    EVENT_NOTIFICATION,
    listener
  );
};

export const unregisterNotificationListener = () => {
  notificationListenerSub.remove();
  notificationListenerSub = null;
};

const EVENT_UNREAD_MESSAGES = "UnreadMessages";
let unreadMessagesListenerSub = null;

export const registerUnreadMessagesListener = (listener) => {
  unreadMessagesListenerSub = eventEmitter.addListener(
    EVENT_UNREAD_MESSAGES,
    listener
  );
};

export const unregisterUnreadMessagesListener = () => {
  unreadMessagesListenerSub.remove();
  unreadMessagesListenerSub = null;
};
