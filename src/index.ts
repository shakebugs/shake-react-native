import { findNodeHandle, Platform } from 'react-native';
import ShakeReportConfiguration from './models/ShakeReportConfiguration';
import ShakeFile from './models/ShakeFile';
import LogLevel from './models/LogLevel';
import ShakeScreen from './models/ShakeScreen';
import NetworkTracker from './modules/NetworkTracker';
import NotificationTracker from './modules/NotificationTracker';
import MessagesTracker from './modules/MessagesTracker';
import NotificationEvent from './models/NotificationEvent';
import NetworkRequest from './models/NetworkRequest';
import NetworkRequestBuilder from './builders/NetworkRequestBuilder';
import NotificationEventBuilder from './builders/NotificationEventBuilder';
import ShakeForm from './models/ShakeForm';
import ShakeFormComponent from './models/ShakeFormComponent';
import ShakeTitle from './models/ShakeTitle';
import ShakeTextInput from './models/ShakeTextInput';
import ShakeEmail from './models/ShakeEmail';
import ShakePicker from './models/ShakePicker';
import ShakePickerItem from './models/ShakePickerItem';
import ShakeAttachments from './models/ShakeAttachments';
import ShakeInspectButton from './models/ShakeInspectButton';
import ShakeTheme from './models/ShakeTheme';
import ShakeBaseAction from './models/ShakeBaseAction';
import ShakeHomeAction from './models/ShakeHomeAction';
import ShakeSubmitAction from './models/ShakeSubmitAction';
import ShakeChatAction from './models/ShakeChatAction';
import ChatNotification from './models/ChatNotification';
import { mapToShakeScreen } from './utils/Mappers';
import HomeActionsTracker from './modules/HomeActionsTracker';
import ShakeCallbacks from './modules/ShakeCallbacks';

const shake = require('./NativeShake').default;

/**
 * Shake SDK interface.
 */
class Shake {
  static networkTracker = new NetworkTracker(shake);
  static notificationTracker = new NotificationTracker(shake);
  static messagesTracker = new MessagesTracker(shake);
  static homeActionsTracker = new HomeActionsTracker();
  static shakeCallbacks = new ShakeCallbacks();

  /**
   * Starts Shake SDK.
   *
   * @param {string} apiKey api key
   */
  static async start(apiKey: string) {
    await shake.start(apiKey);
    this.notificationTracker.setEnabled(true);
    this.homeActionsTracker.setEnabled(true);
    this.shakeCallbacks.startListening();
  }

  /**
   * Shows shake screen.
   *
   * @param {ShakeScreen} shakeScreen ShakeScreen.HOME or ShakeScreen.NEW.
   */
  static show(shakeScreen: ShakeScreen = ShakeScreen.NEW) {
    shake.show(shakeScreen);
  }

  /**
   * Checks if user feedback is enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isUserFeedbackEnabled(): boolean {
    return shake.isUserFeedbackEnabled();
  }

  /**
   * Enables or disables user feedback.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setUserFeedbackEnabled(enabled: boolean) {
    shake.setUserFeedbackEnabled(enabled);
  }

  /**
   * Enables or disables activity history.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setEnableActivityHistory(enabled: boolean) {
    shake.setEnableActivityHistory(enabled);
  }

  /**
   * Checks if activity history is enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isEnableActivityHistory(): boolean {
    return shake.isEnableActivityHistory();
  }

  /**
   * Enables or disables black box.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setEnableBlackBox(enabled: boolean) {
    shake.setEnableBlackBox(enabled);
  }

  /**
   * Checks if black box is enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isEnableBlackBox(): boolean {
    return shake.isEnableBlackBox();
  }

  /**
   * Enables or disables invoke by floating button.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setShowFloatingReportButton(enabled: boolean) {
    shake.setShowFloatingReportButton(enabled);
  }

  /**
   * Checks if floating button invoke is enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isShowFloatingReportButton(): boolean {
    return shake.isShowFloatingReportButton();
  }

  /**
   * Enables or disables invoke by shake.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setInvokeShakeOnShakeDeviceEvent(enabled: boolean) {
    shake.setInvokeShakeOnShakeDeviceEvent(enabled);
  }

  /**
   * Checks if shake event invoke is enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isInvokeShakeOnShakeDeviceEvent(): boolean {
    return shake.isInvokeShakeOnShakeDeviceEvent();
  }

  /**
   * Enables or disables invoke by screenshot.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setInvokeShakeOnScreenshot(enabled: boolean) {
    shake.setInvokeShakeOnScreenshot(enabled);
  }

  /**
   * Checks if screenshot invoke is enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isInvokeShakeOnScreenshot(): boolean {
    return shake.isInvokeShakeOnScreenshot();
  }

  /**
   * Gets screen opened on Shake manual invocation.
   *
   * @return {ShakeScreen} shake screen
   */
  static getDefaultScreen(): ShakeScreen {
    const value = shake.getDefaultScreen();
    return mapToShakeScreen(value);
  }

  /**
   * Sets screen opened on Shake manual invocation.
   *
   * @param {ShakeScreen} shakeScreen ShakeScreen.HOME or ShakeScreen.NEW
   */
  static setDefaultScreen(shakeScreen: ShakeScreen) {
    shake.setDefaultScreen(shakeScreen);
  }

  /**
   * Sets if screenshot is captured with report by default.
   *
   * @param {boolean} screenshotIncluded true if included, otherwise false
   */
  static setScreenshotIncluded(screenshotIncluded: boolean) {
    shake.setScreenshotIncluded(screenshotIncluded);
  }

  /**
   * Checks if screenshot is captured with report by default.
   *
   * @returns {boolean} true if included, otherwise false
   */
  static isScreenshotIncluded(): boolean {
    return shake.isScreenshotIncluded();
  }

  /**
   * Sets how sensitive is shaking gesture invocation.
   *
   * @param {number} shakingThreshold number between 1-1000 (1 weak, 1000 strong)
   */
  static setShakingThreshold(shakingThreshold: number) {
    shake.setShakingThreshold(shakingThreshold);
  }

  /**
   * Sets how sensitive is shaking gesture invocation.
   *
   * @returns {number} shaking gesture sensitivity
   */
  static getShakingThreshold(): number {
    return shake.getShakingThreshold();
  }

  /**
   * Sets files to upload with report.
   *
   * @param {ShakeFile[]} files shake files to upload
   */
  static setShakeReportData(files: ShakeFile[]) {
    shake.setShakeReportData(files);
  }

  /**
   * Sends report silently from code.
   *
   * @param {string} description silent report description
   * @param {ShakeFile[]} files silent report files
   * @param {ShakeReportConfiguration} configuration silent report configuration
   */
  static silentReport(
    description: string = '',
    files: ShakeFile[] = [],
    configuration: ShakeReportConfiguration = new ShakeReportConfiguration()
  ) {
    shake.silentReport(description, files, configuration);
  }

  /**
   * Gets form for New ticket screen.
   *
   * @returns {ShakeForm} instance of form
   */
  static getShakeForm(): ShakeForm {
    return shake.getShakeForm();
  }

  /**
   * Sets form for New ticket screen.
   *
   * Set null for default value.
   *
   * @param {ShakeForm | null} shakeForm form
   */
  static setShakeForm(shakeForm: ShakeForm | null) {
    if (shakeForm === null) shakeForm = new ShakeForm([]);
    shake.setShakeForm(shakeForm);
  }

  /**
   * Sets theme for Shake UI.
   *
   * Set null for default value.
   *
   * @param {ShakeTheme | null} shakeTheme theme
   */
  static setShakeTheme(shakeTheme: ShakeTheme | null) {
    if (shakeTheme === null) shakeTheme = new ShakeTheme();
    shake.setShakeTheme(shakeTheme);
  }

  /**
   * Sets subtitle for Home screen.
   *
   * @param {string} subtitle string
   */
  static setHomeSubtitle(subtitle: string) {
    shake.setHomeSubtitle(subtitle);
  }

  /**
   * Sets action buttons for Home screen.
   *
   * @param {ShakeBaseAction[]} actions list of actions
   */
  static setHomeActions(actions: ShakeBaseAction[]) {
    this.homeActionsTracker.homeActions = actions;
    shake.setHomeActions(actions);
  }

  /**
   * Checks if intro message will be shown on the first app run.
   *
   * @returns {boolean} true if yes, otherwise false
   */
  static getShowIntroMessage(): boolean {
    return shake.getShowIntroMessage();
  }

  /**
   * Sets if intro message will be shown on the first app run.
   *
   * @param {boolean} enabled true if yes, otherwise false
   */
  static setShowIntroMessage(enabled: boolean) {
    shake.setShowIntroMessage(enabled);
  }

  /**
   * Checks if auto video recording will be enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isAutoVideoRecording(): boolean {
    return shake.isAutoVideoRecording();
  }

  /**
   * Enables or disables auto video recording.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setAutoVideoRecording(enabled: boolean) {
    shake.setAutoVideoRecording(enabled);
  }

  /**
   * Checks if console logs are attached to the report.
   *
   * @returns {boolean} true if attached, otherwise false
   */
  static isConsoleLogsEnabled(): boolean {
    return shake.isConsoleLogsEnabled();
  }

  /**
   * Sets if console logs are attached to the report.
   *
   * @param enabled true if attached, otherwise false
   */
  static setConsoleLogsEnabled(enabled: boolean) {
    shake.setConsoleLogsEnabled(enabled);
  }

  /**
   * Checks if network requests are attached to the report.
   *
   * @returns {boolean} true if attached, otherwise false
   */
  static isNetworkRequestsEnabled(): boolean {
    return this.networkTracker.isEnabled();
  }

  /**
   * Sets if network requests are attached to the report.
   *
   * @param {boolean} enabled true if attached, otherwise false
   */
  static setNetworkRequestsEnabled(enabled: boolean) {
    this.networkTracker.setEnabled(enabled);
  }

  /**
   * Adds custom network request to the Shake report.
   *
   * @param {NetworkRequestBuilder} requestBuilder request builder
   */
  static insertNetworkRequest(requestBuilder: NetworkRequestBuilder) {
    this.networkTracker.insertNetworkRequest(requestBuilder);
  }

  /**
   * Adds filter for network requests.
   *
   * @param {((builder: NetworkRequestBuilder) => NetworkRequestBuilder) | null} filter function
   */
  static setNetworkRequestsFilter(
    filter: ((builder: NetworkRequestBuilder) => NetworkRequestBuilder) | null
  ) {
    this.networkTracker.setFilter(filter);
  }

  /**
   * Adds custom notification event to the Shake report.
   *
   * @param {NotificationEventBuilder} notificationBuilder notification builder
   */
  static insertNotificationEvent(
    notificationBuilder: NotificationEventBuilder
  ) {
    this.notificationTracker.insertNotificationEvent(notificationBuilder);
  }

  /**
   * Adds filter for notification events.
   *
   * @param {((builder: NetworkRequestBuilder) => NetworkRequestBuilder) | null} filter function
   */
  static setNotificationEventsFilter(
    filter:
      | ((builder: NotificationEventBuilder) => NotificationEventBuilder)
      | null
  ) {
    this.notificationTracker.setFilter(filter);
  }

  /**
   * Logs a custom message to the report.
   *
   * @param {LogLevel} logLevel LogLevel value
   * @param {string | null | undefined} message log message
   */
  static log(logLevel: LogLevel, message: string | null | undefined) {
    shake.log(logLevel, String(message));
  }

  /**
   * Adds metadata to the report.
   *
   * @param {string} key metadata key
   * @param {string | null | undefined} value metadata value
   */
  static setMetadata(key: string, value: string | null | undefined) {
    if (!key) return;
    let metadataKey = String(key);
    let metadataValue = String(value);

    shake.setMetadata(metadataKey, metadataValue);
  }

  /**
   * Clear existing metadata.
   */
  static clearMetadata() {
    shake.clearMetadata();
  }

  /**
   * Masks view on the screenshot.
   *
   * @param {React.MutableRefObject} viewRef view reference
   */
  static addPrivateView(viewRef: any) {
    const nativeTag: null | number = findNodeHandle(viewRef);
    if (nativeTag) {
      shake.addPrivateView(nativeTag);
    }
  }

  /**
   * Removes view from private views.
   *
   * @param {React.MutableRefObject} viewRef view reference
   */
  static removePrivateView(viewRef: any) {
    const nativeTag: null | number = findNodeHandle(viewRef);
    if (nativeTag) {
      shake.removePrivateView(nativeTag);
    }
  }

  /**
   * Clears all private views.
   */
  static clearPrivateViews() {
    shake.clearPrivateViews();
  }

  /**
   * Enables or disables automatic sensitive data redaction.
   *
   * @param {boolean} enabled true if enabled, otherwise false
   */
  static setSensitiveDataRedactionEnabled(enabled: boolean) {
    shake.setSensitiveDataRedactionEnabled(enabled);
  }

  /**
   * Checks if automatic sensitive data redaction is enabled.
   *
   * @returns {boolean} true if enabled, otherwise false
   */
  static isSensitiveDataRedactionEnabled(): boolean {
    return shake.isSensitiveDataRedactionEnabled();
  }

  /**
   * Shows notifications settings screen (Only Android).
   */
  static showNotificationsSettings() {
    if (Platform.OS === 'android') {
      shake.showNotificationsSettings();
    }
  }

  /**
   * Registers new Shake user.
   *
   * @param {string} id user id
   */
  static registerUser(id: string) {
    shake.registerUser(id);
  }

  /**
   * Updates existing Shake user id.
   *
   * @param {string} id new user id
   */
  static updateUserId(id: string) {
    shake.updateUserId(id);
  }

  /**
   * Updates existing Shake user metadata.
   *
   * @param {{ [key: string]: string }} metadata user metadata to update
   */
  static updateUserMetadata(metadata: { [key: string]: string }) {
    shake.updateUserMetadata(metadata);
  }

  /**
   * Unregister current Shake user.
   */
  static unregisterUser() {
    shake.unregisterUser();
  }

  /**
   * Sets unread chat messages number listener.
   * <br><br>
   * Set null if you want to remove listener.
   *
   * @param {((count: number) => void) | null} listener listener
   */
  static setUnreadMessagesListener(listener: ((count: number) => void) | null) {
    this.messagesTracker.setUnreadMessagesListener(listener);
  }

  /**
   * Sets Shake open event listener.
   * <br><br>
   * Set null if you want to remove listener.
   *
   * @param {(() => void) | null} listener listener
   */
  static setShakeOpenListener(listener: (() => void) | null) {
    this.shakeCallbacks.setShakeOpenListener(listener);
  }

  /**
   * Sets Shake dismiss event listener.
   * <br><br>
   * Set null if you want to remove listener.
   *
   * @param {(() => void) | null} listener listener
   */
  static setShakeDismissListener(listener: (() => void) | null) {
    this.shakeCallbacks.setShakeDismissListener(listener);
  }

  /**
   * Sets Shake submit event listener.
   * <br><br>
   * Set null if you want to remove listener.
   *
   * @param {((type: string, fields: { [key: string]: string }) => void) | null} listener listener
   */
  static setShakeSubmitListener(
    listener: ((type: string, fields: { [key: string]: string }) => void) | null
  ) {
    this.shakeCallbacks.setShakeSubmitListener(listener);
  }

  /**
   * Sets token used to send push notifications (Only Android).
   * <br><br>
   * Set null if you want to remove token.
   *
   * @param {string | null} token push notifications token
   */
  static setPushNotificationsToken(token: string | null) {
    if (Platform.OS === 'android') {
      shake.setPushNotificationsToken(token);
    }
  }

  /**
   * Shows Firebase chat notification (Only Android).
   *
   * @param {{ [key: string]: string | object } | undefined} data user metadata to update
   */
  static showChatNotification(data?: { [key: string]: string | object }) {
    if (!data) return;

    if (Platform.OS === 'android') {
      const chatNotification = new ChatNotification(
        data.ticket_id.toString() ?? '',
        data.user_id.toString() ?? '',
        data.ticket_title.toString() ?? '',
        data.message.toString() ?? ''
      );
      shake.showChatNotification(chatNotification);
    }
  }

  /**
   * Sets ticket tags.
   *
   * @param {Array<String>} tags string array
   */
  static setTags(tags: Array<String>) {
    shake.setTags(tags);
  }
}

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
export { ShakeBaseAction };
export { ShakeHomeAction };
export { ShakeChatAction };
export { ShakeSubmitAction };
export { ChatNotification };

export default Shake;
