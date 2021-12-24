import { findNodeHandle, NativeModules } from "react-native";

import ShakeReportConfiguration from "./src/models/ShakeReportConfiguration";
import ShakeFile from "./src/models/ShakeFile";
import LogLevel from "./src/models/LogLevel";
import FeedbackType from "./src/models/FeedbackType";
import ShakeScreen from "./src/models/ShakeScreen";
import NetworkTracker from "./src/modules/NetworkTracker";
import NotificationTracker from "./src/modules/NotificationTracker";
import NotificationEvent from "./src/models/NotificationEvent";
import NetworkRequest from "./src/models/NetworkRequest";
import NetworkRequestBuilder from "./src/builders/NetworkRequestBuilder";
import NotificationEventBuilder from "./src/builders/NotificationEventBuilder";
import {mapToShakeScreen} from "./src/utils/Mappers";

// Export models
export { ShakeReportConfiguration };
export { ShakeFile };
export { LogLevel };
export { FeedbackType };
export { ShakeScreen };
export { NetworkTracker };
export { NotificationEvent };
export { NetworkRequest };
export { NetworkRequestBuilder };
export { NotificationEventBuilder };

/**
 * Interface for native methods.
 */
class Shake {
    static shake = NativeModules.RNShake;

    // Helpers
    static networkTracker = new NetworkTracker(this.shake);
    static notificationTracker = new NotificationTracker(this.shake);

    /**
     * Starts Shake SDK.
     *
     * @param clientId client id
     * @param clientSecret client secret
     */
    static start(clientId, clientSecret) {
        this.shake.start(clientId, clientSecret);
        this.notificationTracker.setEnabled(true);
    }

    /**
     * Shows shake screen.
     *
     * @param shakeScreen ShakeScreen.HOME or ShakeScreen.NEW
     */
    static show(shakeScreen = ShakeScreen.NEW) {
        this.shake.show(shakeScreen);
    }

    /**
     * Enables or disables Shake.
     *
     * @param enabled true if enabled, otherwise false
     */
    static setEnabled(enabled) {
        this.shake.setEnabled(enabled);
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
     * Enables or disables inspect screen.
     *
     * @param enabled true if enabled, otherwise false
     */
    static setEnableInspectScreen(enabled) {
        this.shake.setEnableInspectScreen(enabled);
    }

    /**
     * Checks if inspect screen is enabled.
     *
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isEnableInspectScreen() {
        return await this.shake.isEnableInspectScreen();
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
     * Enables or disables email field on Shake screen.
     *
     * @param enabled true if enabled, otherwise false
     */
    static setEnableEmailField(enabled) {
        this.shake.setEnableEmailField(enabled);
    }

    /**
     * Checks if email field on Shake screen is enabled.
     *
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isEnableEmailField() {
        return await this.shake.isEnableEmailField();
    }

    /**
     * Sets email field value on the Shake screen.
     *
     * @param value email field value
     */
    static setEmailField(value) {
        this.shake.setEmailField(value);
    }

    /**
     * Gets value of the email field on the Shake screen.
     *
     * @returns {Promise<*|string>} email field value
     */
    static async getEmailField() {
        return await this.shake.getEmailField();
    }

    /**
     * Checks if feedback type picker on the Shake screen is visible.
     *
     * @returns {Promise<*|boolean>} true if visible, otherwise false
     */
    static async isFeedbackTypeEnabled() {
        return await this.shake.isFeedbackTypeEnabled();
    }

    /**
     * Sets if feedback type picker is visible on the Shake screen.
     *
     * @param enabled true if visible, otherwise false
     */
    static setFeedbackTypeEnabled(enabled) {
        this.shake.setFeedbackTypeEnabled(enabled);
    }

    /**
     * Gets ticket feedback types.
     *
     * @returns {Promise<*|boolean>} list of {@link FeedbackType}
     */
    static async getFeedbackTypes() {
        return await this.shake.getFeedbackTypes();
    }

    /**
     * Sets ticket feedback types.
     *
     * @param feedbackTypes list of {@link FeedbackType}
     */
    static setFeedbackTypes(feedbackTypes) {
        this.shake.setFeedbackTypes(feedbackTypes);
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
     * Shows notifications settings screen.
     * This is used just for Android os.
     */
    static showNotificationsSettings() {
        this.shake.showNotificationsSettings();
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
}

export default Shake;


