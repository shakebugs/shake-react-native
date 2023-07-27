import {NativeEventEmitter, NativeModules} from "react-native";

const eventEmitter = new NativeEventEmitter(NativeModules.RNShake);

/**
 * Notifications
 */
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

/**
 * Unread messages
 */
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

/**
 * Home action tap
 */
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

/**
 * Shake callbacks
 */
const EVENT_SHAKE_OPEN = "OnShakeOpen";
let shakeOpenListenerSub = null;

export const registerShakeOpenListener = (listener) => {
  shakeOpenListenerSub = eventEmitter.addListener(
      EVENT_SHAKE_OPEN,
      listener
  );
};

export const unregisterShakeOpenListener = () => {
  shakeOpenListenerSub.remove();
  shakeOpenListenerSub = null;
};

const EVENT_SHAKE_DISMISS = "OnShakeDismiss";
let shakeDismissListenerSub = null;

export const registerShakeDismissListener = (listener) => {
  shakeDismissListenerSub = eventEmitter.addListener(
      EVENT_SHAKE_DISMISS,
      listener
  );
};

export const unregisterShakeDismissListener = () => {
  shakeDismissListenerSub.remove();
  shakeDismissListenerSub = null;
};

const EVENT_SHAKE_SUBMIT = "OnShakeSubmit";
let shakeSubmitListenerSub = null;

export const registerShakeSubmitListener = (listener) => {
  shakeSubmitListenerSub = eventEmitter.addListener(
      EVENT_SHAKE_SUBMIT,
      listener
  );
};

export const unregisterShakeSubmitListener = () => {
  shakeSubmitListenerSub.remove();
  shakeSubmitListenerSub = null;
};
