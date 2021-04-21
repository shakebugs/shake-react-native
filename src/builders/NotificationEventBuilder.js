import NotificationEvent from "../models/NotificationEvent";

/**
 * Builds notification event object.
 */
class NotificationEventBuilder {
    _id;
    _title;
    _description;

    /**
     * Creates builder from {@link NotificationEvent}
     * @param notificationEvent object
     */
    constructor(notificationEvent) {
        if (notificationEvent) {
            this._id = notificationEvent.id;
            this._title = notificationEvent.title;
            this._description = notificationEvent.description;
        } else {
            this._id = '';
            this._title = '';
            this._description = '';
        }
    }

    getId() {
        return this._id;
    }

    setId(value) {
        this._id = value;
        return this;
    }

    getTitle() {
        return this._title;
    }

    setTitle(value) {
        this._title = value;
        return this;
    }

    getDescription() {
        return this._description;
    }

    setDescription(value) {
        this._description = value;
        return this;
    }

    /**
     * Builds and validates notification event data.
     * @return {NotificationEvent} object
     */
    build() {
        const notificationEvent = new NotificationEvent();
        notificationEvent.id = this._id;
        notificationEvent.title = this._title;
        notificationEvent.description = this._description;

        return notificationEvent;
    }
}

export default NotificationEventBuilder;
