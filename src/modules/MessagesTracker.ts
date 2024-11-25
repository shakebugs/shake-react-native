import {
  registerUnreadMessagesListener,
  unregisterUnreadMessagesListener,
} from '../utils/Events';

/**
 * Responsible for handling unread chat messages.
 */
class MessagesTracker {
  shake: any;
  unreadMessagesListener: ((count: number) => void) | null;

  constructor(shake: any) {
    this.shake = shake;
    this.unreadMessagesListener = null;
  }

  /**
   * Sets unread messages listener.
   *
   * @param unreadMessagesListener listener
   */
  setUnreadMessagesListener = (
    unreadMessagesListener: ((count: number) => void) | null
  ) => {
    if (this.unreadMessagesListener) {
      this.unreadMessagesListener = null;
      unregisterUnreadMessagesListener();
      this.shake.stopUnreadChatMessagesEmitter();
    }

    if (unreadMessagesListener) {
      this.unreadMessagesListener = unreadMessagesListener;
      registerUnreadMessagesListener(this._onEventReceived);
      this.shake.startUnreadChatMessagesEmitter();
    }
  };

  /**
   * Triggered when new unread messages event is received.
   *
   * @param count number of unread messages
   * @private
   */
  _onEventReceived = (count: number) => {
    if (this.unreadMessagesListener) {
      this.unreadMessagesListener(count);
    }
  };
}

export default MessagesTracker;
