import { TurboModuleRegistry, NativeEventEmitter } from 'react-native';

const shake = TurboModuleRegistry.get('Shake');
const eventEmitter = new NativeEventEmitter(shake);

// Events constants
const EVENT_UNREAD_MESSAGES: string = 'UnreadMessages';
const EVENT_NOTIFICATION: string = 'EventNotification';
const EVENT_HOME_ACTION_TAP: string = 'HomeActionTap';
const EVENT_SHAKE_OPEN: string = 'OnShakeOpen';
const EVENT_SHAKE_SUBMIT: string = 'OnShakeSubmit';

/**
 * Notifications
 */
let notificationListenerSub = null;

export const registerNotificationListener = (
  listener: (event: any) => void
) => {
  notificationListenerSub = eventEmitter.addListener(
    EVENT_NOTIFICATION,
    listener
  );
};

export const unregisterNotificationListener = () => {
  notificationListenerSub?.remove();
  notificationListenerSub = null;
};

/**
 * Unread messages
 */
let unreadMessagesListenerSub = null;

export const registerUnreadMessagesListener = (
  listener: (event: any) => void
) => {
  unreadMessagesListenerSub = eventEmitter.addListener(
    EVENT_UNREAD_MESSAGES,
    listener
  );
};

export const unregisterUnreadMessagesListener = () => {
  unreadMessagesListenerSub?.remove();
  unreadMessagesListenerSub = null;
};

/**
 * Home action tap
 */
let homeActionTapListenerSub = null;

export const registerHomeActionTapListener = (
  listener: (event: any) => void
) => {
  homeActionTapListenerSub = eventEmitter.addListener(
    EVENT_HOME_ACTION_TAP,
    listener
  );
};

export const unregisterHomeActionTapListener = () => {
  homeActionTapListenerSub?.remove();
  homeActionTapListenerSub = null;
};

/**
 * Shake callbacks
 */
let shakeOpenListenerSub = null;

export const registerShakeOpenListener = (listener: (event: any) => void) => {
  shakeOpenListenerSub = eventEmitter.addListener(EVENT_SHAKE_OPEN, listener);
};

export const unregisterShakeOpenListener = () => {
  shakeOpenListenerSub?.remove();
  shakeOpenListenerSub = null;
};

const EVENT_SHAKE_DISMISS: string = 'OnShakeDismiss';
let shakeDismissListenerSub = null;

export const registerShakeDismissListener = (
  listener: (event: any) => void
) => {
  shakeDismissListenerSub = eventEmitter.addListener(
    EVENT_SHAKE_DISMISS,
    listener
  );
};

export const unregisterShakeDismissListener = () => {
  shakeDismissListenerSub?.remove();
  shakeDismissListenerSub = null;
};

let shakeSubmitListenerSub = null;

export const registerShakeSubmitListener = (listener: (event: any) => void) => {
  shakeSubmitListenerSub = eventEmitter.addListener(
    EVENT_SHAKE_SUBMIT,
    listener
  );
};

export const unregisterShakeSubmitListener = () => {
  shakeSubmitListenerSub.remove();
  shakeSubmitListenerSub = null;
};
