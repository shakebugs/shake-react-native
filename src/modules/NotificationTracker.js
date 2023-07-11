import NotificationEvent from "../models/NotificationEvent";
import {registerNotificationListener, unregisterNotificationListener} from "../utils/Events";
import NotificationEventBuilder from "../builders/NotificationEventBuilder";

/**
 * Responsible for handling Shake notification events.
 */
class NotificationTracker {
    shake;
    enabled;
    filter;

    constructor(shake) {
        this.shake = shake;
        this.enabled = false;
        this.filter = null;
    }

    /**
     * Enables or disables notification tracker.
     * @param enabled true to enable, otherwise false
     */
    setEnabled = (enabled) => {
        this.enabled = enabled;
        this._onConfigChanged();
    };

    /**
     * Sets notification events filter.
     * @param filter filter function
     */
    setFilter = (filter) => {
        this.filter = filter;
    };

    /**
     * Inserts notification event to the database.
     * @param notificationEventBuilder builder
     */
    insertNotificationEvent = (notificationEventBuilder) => {
        if (this.filter) {
            notificationEventBuilder = this.filter(notificationEventBuilder);
            if (notificationEventBuilder) {
                this.shake.insertNotificationEvent(notificationEventBuilder.build());
            }
        } else {
            this.shake.insertNotificationEvent(notificationEventBuilder.build());
        }
    };

    /**
     * Handles network tracker configuration.
     * @private
     */
    _onConfigChanged = () => {
        if (this.enabled) {
            this.shake.startNotificationsEmitter();
            registerNotificationListener(this._onNotificationEventReceived);
        } else {
            this.shake.stopNotificationsEmitter();
            unregisterNotificationListener();
        }
    };

    /**
     * Triggered when new notification is detected.
     * @param data notification event data
     * @private
     */
    _onNotificationEventReceived = (data) => {
        const notificationEvent = this._mapToNotificationEvent(data);
        const notificationEventBuilder = new NotificationEventBuilder(notificationEvent);
        this.insertNotificationEvent(notificationEventBuilder);
    };

    /**
     * Maps notification event data to {@link NotificationEvent} model
     * @param data notification event data
     * @return {NotificationEvent} notification event object
     * @private
     */
    _mapToNotificationEvent = (data) => {
        const notificationEvent = new NotificationEvent();
        notificationEvent.id = data.id;
        notificationEvent.description = data.description;
        notificationEvent.title = data.title;

        return notificationEvent;
    };
}

export default NotificationTracker;
