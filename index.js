import {findNodeHandle, NativeModules, Platform} from "react-native";

import ShakeReportConfiguration from "./src/models/ShakeReportConfiguration";
import ShakeFile from "./src/models/ShakeFile";
import LogLevel from "./src/models/LogLevel";
import ShakeScreen from "./src/models/ShakeScreen";
import NetworkTracker from "./src/modules/NetworkTracker";
import NotificationTracker from "./src/modules/NotificationTracker";
import MessagesTracker from "./src/modules/MessagesTracker";
import NotificationEvent from "./src/models/NotificationEvent";
import NetworkRequest from "./src/models/NetworkRequest";
import NetworkRequestBuilder from "./src/builders/NetworkRequestBuilder";
import NotificationEventBuilder from "./src/builders/NotificationEventBuilder";
import ShakeForm from "./src/models/ShakeForm";
import ShakeFormComponent from "./src/models/ShakeFormComponent";
import ShakeTitle from "./src/models/ShakeTitle";
import ShakeTextInput from "./src/models/ShakeTextInput";
import ShakeEmail from "./src/models/ShakeEmail";
import ShakePicker from "./src/models/ShakePicker";
import ShakePickerItem from "./src/models/ShakePickerItem";
import ShakeAttachments from "./src/models/ShakeAttachments";
import ShakeInspectButton from "./src/models/ShakeInspectButton";
import ShakeTheme from "./src/models/ShakeTheme";
import ShakeBaseAction from "./src/models/ShakeBaseAction";
import ShakeHomeAction from "./src/models/ShakeHomeAction";
import ShakeSubmitAction from "./src/models/ShakeSubmitAction";
import ShakeChatAction from "./src/models/ShakeChatAction";
import ChatNotification from "./src/models/ChatNotification";

import {mapToShakeScreen} from "./src/utils/Mappers";
import HomeActionsTracker from "./src/modules/HomeActionsTracker";

// Export models
export { ShakeReportConfiguration };
export { ShakeFile };
export { LogLevel };
export { ShakeScreen };
export { NetworkTracker };
export { NotificationEvent };
export { NetworkRequest };
export { NetworkRequestBuilder };
export { NotificationEventBuilder };
export { ShakeForm };
export { ShakeFormComponent };
export { ShakeTitle };
export { ShakeTextInput };
export { ShakeEmail };
export { ShakePicker };
export { ShakePickerItem };
export { ShakeAttachments };
export { ShakeInspectButton };
export { ShakeTheme };
export { ShakeBaseAction};
export { ShakeHomeAction };
export { ShakeChatAction };
export { ShakeSubmitAction };
export { ChatNotification };

/**
 * Interface for native methods.
 */
class Shake {
  static shake = NativeModules.RNShake;

  // Helpers
  static networkTracker = new NetworkTracker(this.shake);
  static notificationTracker = new NotificationTracker(this.shake);
  static messagesTracker = new MessagesTracker(this.shake);
  static homeActionsTracker = new HomeActionsTracker();

  /**
   * Starts Shake SDK.
   *
   * @param clientId client id
   * @param clientSecret client secret
   */
  static start(clientId, clientSecret) {
    this.shake.start(clientId, clientSecret);
    this.notificationTracker.setEnabled(true);
    this.homeActionsTracker.setEnabled(true);
  }

  /**
   * Shows shake screen.
   *
   * @param shakeScreen ShakeScreen.HOME or ShakeScreen.NEW.
   */
  static show(shakeScreen = ShakeScreen.NEW) {
    this.shake.show(shakeScreen);
  }

  /**
   * Checks if user feedback is enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isUserFeedbackEnabled() {
    return await this.shake.isUserFeedbackEnabled();
  }

  /**
   * Enables or disables user feedback.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setUserFeedbackEnabled(enabled) {
    this.shake.setUserFeedbackEnabled(enabled);
  }

  /**
   * Enables or disables activity history.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setEnableActivityHistory(enabled) {
    this.shake.setEnableActivityHistory(enabled);
  }

  /**
   * Checks if activity history is enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isEnableActivityHistory() {
    return await this.shake.isEnableActivityHistory();
  }

  /**
   * Enables or disables black box.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setEnableBlackBox(enabled) {
    this.shake.setEnableBlackBox(enabled);
  }

  /**
   * Checks if black box is enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isEnableBlackBox() {
    return await this.shake.isEnableBlackBox();
  }

  /**
   * Enables or disables invoke by floating button.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setShowFloatingReportButton(enabled) {
    this.shake.setShowFloatingReportButton(enabled);
  }

  /**
   * Checks if floating button invoke is enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isShowFloatingReportButton() {
    return await this.shake.isShowFloatingReportButton();
  }

  /**
   * Enables or disables invoke by shake.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setInvokeShakeOnShakeDeviceEvent(enabled) {
    this.shake.setInvokeShakeOnShakeDeviceEvent(enabled);
  }

  /**
   * Checks if shake event invoke is enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isInvokeShakeOnShakeDeviceEvent() {
    return await this.shake.isInvokeShakeOnShakeDeviceEvent();
  }

  /**
   * Enables or disables invoke by screenshot.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setInvokeShakeOnScreenshot(enabled) {
    this.shake.setInvokeShakeOnScreenshot(enabled);
  }

  /**
   * Checks if screenshot invoke is enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isInvokeShakeOnScreenshot() {
    return await this.shake.isInvokeShakeOnScreenshot();
  }

  /**
   * Gets screen opened on Shake manual invocation.
   *
   * @return shake screen
   */
  static async getDefaultScreen() {
    const value = await this.shake.getDefaultScreen();
    return mapToShakeScreen(value);
  }

  /**
   * Sets screen opened on Shake manual invocation.
   *
   * @param shakeScreen ShakeScreen.HOME or ShakeScreen.NEW
   */
  static setDefaultScreen(shakeScreen) {
    this.shake.setDefaultScreen(shakeScreen);
  }

  /**
   * Sets if screenshot is captured with report by default.
   *
   * @param screenshotIncluded true if included, otherwise false
   */
  static setScreenshotIncluded(screenshotIncluded) {
    this.shake.setScreenshotIncluded(screenshotIncluded);
  }

  /**
   * Checks if screenshot is captured with report by default.
   *
   * @returns {Promise<*|boolean>} true if included, otherwise false
   */
  static async isScreenshotIncluded() {
    return await this.shake.isScreenshotIncluded();
  }

  /**
   * Sets how sensitive is shaking gesture invocation.
   *
   * @param shakingThreshold number between 1-1000 (1 weak, 1000 strong)
   */
  static setShakingThreshold(shakingThreshold) {
    this.shake.setShakingThreshold(shakingThreshold);
  }

  /**
   * Sets how sensitive is shaking gesture invocation.
   *
   * @returns {Promise<*|boolean>} shaking gesture sensitivity
   */
  static async getShakingThreshold() {
    return await this.shake.getShakingThreshold();
  }

  /**
   * Sets files to upload with report.
   *
   * @param files shake files to upload
   */
  static setShakeReportData(files) {
    this.shake.setShakeReportData(files);
  }

  /**
   * Sends report silently from code.
   *
   * @param description silent report description
   * @param files silent report files
   * @param configuration silent report configuration
   */
  static silentReport(description, files, configuration) {
    this.shake.silentReport(description, files, configuration);
  }

  /**
   * Gets form for New ticket screen.
   *
   * @returns {ShakeForm} instance of {@link ShakeForm}
   */
  static async getShakeForm() {
    return await this.shake.getShakeForm();
  }

  /**
   * Sets form for New ticket screen.
   *
   * @param shakeForm instance of {@link ShakeForm}
   */
  static setShakeForm(shakeForm) {
    this.shake.setShakeForm(shakeForm);
  }

  /**
   * Sets theme for Shake UI.
   *
   * @param shakeTheme instance of {@link ShakeTheme}
   */
  static setShakeTheme(shakeTheme) {
    this.shake.setShakeTheme(shakeTheme);
  }

  /**
   * Sets subtitle for Home screen.
   *
   * @param subtitle string
   */
  static setHomeSubtitle(subtitle) {
    this.shake.setHomeSubtitle(subtitle);
  }

  /**
   * Sets action buttons for Home screen.
   *
   * @param actions list of actions
   */
  static setHomeActions(actions) {
    this.homeActionsTracker.homeActions = actions;
    this.shake.setHomeActions(actions);
  }

  /**
   * Checks if intro message will be shown on the first app run.
   *
   * @returns {Promise<*|boolean>} true if yes, otherwise false
   */
  static async getShowIntroMessage() {
    return await this.shake.getShowIntroMessage();
  }

  /**
   * Sets if intro message will be shown on the first app run.
   *
   * @param enabled true if yes, otherwise false
   */
  static setShowIntroMessage(enabled) {
    this.shake.setShowIntroMessage(enabled);
  }

  /**
   * Checks if auto video recording will be enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isAutoVideoRecording() {
    return await this.shake.isAutoVideoRecording();
  }

  /**
   * Enables or disables auto video recording.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setAutoVideoRecording(enabled) {
    this.shake.setAutoVideoRecording(enabled);
  }

  /**
   * Checks if console logs are attached to the report.
   *
   * @returns {Promise<*|boolean>} true if attached, otherwise false
   */
  static async isConsoleLogsEnabled() {
    return await this.shake.isConsoleLogsEnabled();
  }

  /**
   * Sets if console logs are attached to the report.
   *
   * @param enabled true if attached, otherwise false
   */
  static setConsoleLogsEnabled(enabled) {
    this.shake.setConsoleLogsEnabled(enabled);
  }

  /**
   * Checks if network requests are attached to the report.
   *
   * @returns {Promise<*|boolean>} true if attached, otherwise false
   */
  static async isNetworkRequestsEnabled() {
    return this.networkTracker.isEnabled();
  }

  /**
   * Sets if network requests are attached to the report.
   *
   * @param enabled true if attached, otherwise false
   */
  static setNetworkRequestsEnabled(enabled) {
    this.networkTracker.setEnabled(enabled);
  }

  /**
   * Adds custom network request to the Shake report.
   *
   * @param requestBuilder request builder
   */
  static insertNetworkRequest(requestBuilder) {
    this.networkTracker.insertNetworkRequest(requestBuilder);
  }

  /**
   * Adds filter for network requests.
   *
   * @param filter filter function
   */
  static setNetworkRequestsFilter(filter) {
    this.networkTracker.setFilter(filter);
  }

  /**
   * Adds custom notification event to the Shake report.
   *
   * @param notificationBuilder notification builder
   */
  static insertNotificationEvent(notificationBuilder) {
    this.notificationTracker.insertNotificationEvent(notificationBuilder);
  }

  /**
   * Adds filter for notification events.
   *
   * @param filter filter function
   */
  static setNotificationEventsFilter(filter) {
    this.notificationTracker.setFilter(filter);
  }

  /**
   * Logs a custom message to the report.
   *
   * @param logLevel LogLevel value
   * @param message log message
   */
  static log(logLevel, message) {
    this.shake.log(logLevel, message);
  }

  /**
   * Adds metadata to the report.
   *
   * @param key metadata key
   * @param value metadata value
   */
  static setMetadata(key, value) {
    this.shake.setMetadata(key, value);
  }

  /**
   * Clear existing metadata.
   */
  static clearMetadata() {
    this.shake.clearMetadata();
  }

  /**
   * Masks view on the screenshot.
   *
   * @param viewRef view reference
   */
  static addPrivateView(viewRef) {
    const nativeTag = findNodeHandle(viewRef);
    this.shake.addPrivateView(nativeTag);
  }

  /**
   * Removes view from private views.
   *
   * @param viewRef view reference
   */
  static removePrivateView(viewRef) {
    const nativeTag = findNodeHandle(viewRef);
    this.shake.removePrivateView(nativeTag);
  }

  /**
   * Clears all private views.
   */
  static clearPrivateViews() {
    this.shake.clearPrivateViews();
  }

  /**
   * Enables or disables automatic sensitive data redaction.
   *
   * @param enabled true if enabled, otherwise false
   */
  static setSensitiveDataRedactionEnabled(enabled) {
    this.shake.setSensitiveDataRedactionEnabled(enabled);
  }

  /**
   * Checks if automatic sensitive data redaction is enabled.
   *
   * @returns {Promise<*|boolean>} true if enabled, otherwise false
   */
  static async isSensitiveDataRedactionEnabled() {
    return await this.shake.isSensitiveDataRedactionEnabled();
  }

  /**
   * Shows notifications settings screen (Only Android).
   */
  static showNotificationsSettings() {
    if (Platform.OS === 'android') {
      this.shake.showNotificationsSettings();
    }
  }

  /**
   * Registers new Shake user.
   *
   * @param id user id
   */
  static registerUser(id) {
    this.shake.registerUser(id);
  }

  /**
   * Updates existing Shake user id.
   *
   * @param id new user id
   */
  static updateUserId(id) {
    this.shake.updateUserId(id);
  }

  /**
   * Updates existing Shake user metadata.
   *
   * @param metadata user metadata to update
   */
  static updateUserMetadata(metadata) {
    this.shake.updateUserMetadata(metadata);
  }

  /**
   * Unregister current Shake user.
   */
  static unregisterUser() {
    this.shake.unregisterUser();
  }

  /**
  * Sets unread chat messages number listener.
  * <br><br>
  * Set null if you want to remove listener.
  */
  static setUnreadMessagesListener(listener) {
    this.messagesTracker.setUnreadMessagesListener(listener);
  }

  /**
   * Sets token used to send push notifications (Only Android).
   * <br><br>
   * Set null if you want to remove token.
   */
  static setPushNotificationsToken(token) {
    if (Platform.OS === 'android') {
      this.shake.setPushNotificationsToken(token);
    }
  }

  /**
   * Shows Firebase chat notification (Only Android).
   */
  static showChatNotification(data) {
    if (Platform.OS === 'android') {
      const chatNotification = new ChatNotification(
          data['ticket_id'], data['user_id'],  data['ticket_title'],  data['message']);
      this.shake.showChatNotification(chatNotification);
    }
  }
}

export default Shake;
