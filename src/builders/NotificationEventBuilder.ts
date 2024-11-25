import NotificationEvent from '../models/NotificationEvent';

/**
 * Builds notification event object.
 */
class NotificationEventBuilder {
  _id: string;
  _title: string;
  _description: string;

  /**
   * Creates builder from {@link NotificationEvent}
   * @param notificationEvent object
   */
  constructor(notificationEvent?: NotificationEvent) {
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

  getId(): string {
    return this._id;
  }

  setId(value: string): NotificationEventBuilder {
    this._id = value;
    if (!this._id) {
      this._id = '';
    }
    return this;
  }

  getTitle(): string {
    return this._title;
  }

  setTitle(value: string): NotificationEventBuilder {
    this._title = value;
    if (!this._title) {
      this._title = '';
    }
    return this;
  }

  getDescription(): string {
    return this._description;
  }

  setDescription(value: string): NotificationEventBuilder {
    this._description = value;
    if (!this._description) {
      this._description = '';
    }
    return this;
  }

  /**
   * Builds and validates notification event data.
   * @return {NotificationEvent} object
   */
  build(): NotificationEvent {
    const notificationEvent = new NotificationEvent();
    notificationEvent.id = this._id;
    notificationEvent.title = this._title;
    notificationEvent.description = this._description;

    return notificationEvent;
  }
}

export default NotificationEventBuilder;
