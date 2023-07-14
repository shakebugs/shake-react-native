/**
 * Represents chat notification.
 */
class ChatNotification {
    id;
    userId;
    title;
    message;

    constructor(id, userId, title, message) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
    }
}

export default ChatNotification;
