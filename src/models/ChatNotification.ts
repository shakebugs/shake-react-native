/**
 * Represents chat notification.
 */
class ChatNotification {
  id: string;
  userId: string;
  title: string;
  message: string;

  constructor(id: string, userId: string, title: string, message: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.message = message;
  }
}

export default ChatNotification;
