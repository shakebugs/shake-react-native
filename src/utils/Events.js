import {NativeEventEmitter, NativeModules} from "react-native";

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

const EVENT_HOME_ACTION_TAP = "HomeActionTap";
let homeActionTapListenerSub = null;

export const registerHomeActionTapListener = (listener) => {
  homeActionTapListenerSub = eventEmitter.addListener(
      EVENT_HOME_ACTION_TAP,
      listener
  );
};

export const unregisterHomeActionTapListener = () => {
  homeActionTapListenerSub.remove();
  homeActionTapListenerSub = null;
};

