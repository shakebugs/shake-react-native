import { findNodeHandle, NativeModules } from "react-native";

import ShakeReportConfiguration from "./src/models/ShakeReportConfiguration";
import ShakeFile from "./src/models/ShakeFile";
import LogLevel from "./src/models/LogLevel";
import NetworkTracker from "./src/modules/NetworkTracker";

export { ShakeReportConfiguration };
export { ShakeFile };
export { LogLevel };
export { NetworkTracker };

/**
 * Interface for native methods.
 */
class Shake {
    static shake = NativeModules.RNShake;

    // Helpers
    static networkTracker = new NetworkTracker(this.shake);

    /**
     * Starts Shake SDK.
     * @param clientId client id
     * @param clientSecret client secret
     */
    static start(clientId, clientSecret) {
        this.shake.start(clientId, clientSecret);
        this.networkTracker.setEnabled(true);
    }

    /**
     * Shows shake screen.
     */
    static show() {
        this.shake.show();
    }

    /**
     * Enables or disables Shake.
     * @param enabled true if enabled, otherwise false
     */
    static setEnabled(enabled) {
        this.shake.setEnabled(enabled);
    }

    /**
     * Enables or disables activity history.
     * @param enabled true if enabled, otherwise false
     */
    static setEnableActivityHistory(enabled) {
        this.shake.setEnableActivityHistory(enabled);
    }

    /**
     * Checks if activity history is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isEnableActivityHistory() {
        return await this.shake.isEnableActivityHistory();
    }

    /**
     * Enables or disables black box.
     * @param enabled true if enabled, otherwise false
     */
    static setEnableBlackBox(enabled) {
        this.shake.setEnableBlackBox(enabled);
    }

    /**
     * Checks if black box is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isEnableBlackBox() {
        return await this.shake.isEnableBlackBox();
    }

    /**
     * Enables or disables inspect screen.
     * @param enabled true if enabled, otherwise false
     */
    static setEnableInspectScreen(enabled) {
        this.shake.setEnableInspectScreen(enabled);
    }

    /**
     * Checks if inspect screen is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isEnableInspectScreen() {
        return await this.shake.isEnableInspectScreen();
    }

    /**
     * Enables or disables invoke by floating button.
     * @param enabled true if enabled, otherwise false
     */
    static setShowFloatingReportButton(enabled) {
        this.shake.setShowFloatingReportButton(enabled);
    }

    /**
     * Checks if floating button invoke is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isShowFloatingReportButton() {
        return await this.shake.isShowFloatingReportButton();
    }

    /**
     * Enables or disables invoke by shake.
     * @param enabled true if enabled, otherwise false
     */
    static setInvokeShakeOnShakeDeviceEvent(enabled) {
        this.shake.setInvokeShakeOnShakeDeviceEvent(enabled);
    }

    /**
     * Checks if shake event invoke is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isInvokeShakeOnShakeDeviceEvent() {
        return await this.shake.isInvokeShakeOnShakeDeviceEvent();
    }

    /**
     * Enables or disables invoke by screenshot.
     * @param enabled true if enabled, otherwise false
     */
    static setInvokeShakeOnScreenshot(enabled) {
        this.shake.setInvokeShakeOnScreenshot(enabled);
    }

    /**
     * Checks if screenshot invoke is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isInvokeShakeOnScreenshot() {
        return await this.shake.isInvokeShakeOnScreenshot();
    }

    /**
     * Enables or disables invoke by right edge pan.
     * @param enabled true if enabled, otherwise false
     */
    static setInvokeShakeOnRightEdgePan(enabled) {
        this.shake.setInvokeShakeOnRightEdgePan(enabled);
    }

    /**
     * Checks if invoke on right edge pan is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isInvokeShakeOnRightEdgePan() {
        return await this.shake.isInvokeShakeOnRightEdgePan();
    }

    /**
     * Sets files to upload with report.
     * @param files shake files to upload
     */
    static setShakeReportData(files) {
        this.shake.setShakeReportData(files);
    }

    /**
     * Sends report silently from code.
     * @param description silent report description
     * @param files silent report files
     * @param configuration silent report configuration
     */
    static silentReport(description, files, configuration) {
        this.shake.silentReport(description, files, configuration);
    }

    /**
     * Enables or disables email field on Shake screen.
     * @param enabled true if enabled, otherwise false
     */
    static setEnableEmailField(enabled) {
        this.shake.setEnableEmailField(enabled);
    }

    /**
     * Checks if email field on Shake screen is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isEnableEmailField() {
        return await this.shake.isEnableEmailField();
    }

    /**
     * Sets email field value on the Shake screen.
     * @param value email field value
     */
    static setEmailField(value) {
        this.shake.setEmailField(value);
    }

    /**
     * Gets value of the email field on the Shake screen.
     * @returns {Promise<*|string>} email field value
     */
    static async getEmailField() {
        return await this.shake.getEmailField();
    }

    /**
     * Checks if feedback type picker on the Shake screen is visible.
     * @returns {Promise<*|boolean>} true if visible, otherwise false
     */
    static async isEnableMultipleFeedbackTypes() {
        return await this.shake.isEnableMultipleFeedbackTypes();
    }

    /**
     * Sets if feedback type picker is visible on the Shake screen.
     * @param enabled true if visible, otherwise false
     */
    static setEnableMultipleFeedbackTypes(enabled) {
        this.shake.setEnableMultipleFeedbackTypes(enabled);
    }

    /**
     * Checks if intro message will be shown on the first app run.
     * @returns {Promise<*|boolean>} true if yes, otherwise false
     */
    static async getShowIntroMessage() {
        return await this.shake.getShowIntroMessage();
    }

    /**
     * Sets if intro message will be shown on the first app run.
     * @param enabled true if yes, otherwise false
     */
    static setShowIntroMessage(enabled) {
        this.shake.setShowIntroMessage(enabled);
    }

    /**
     * Checks if auto video recording will be enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isAutoVideoRecording() {
        return await this.shake.isAutoVideoRecording();
    }

    /**
     * Enables or disables auto video recording.
     * @param enabled true if enabled, otherwise false
     */
    static setAutoVideoRecording(enabled) {
        this.shake.setAutoVideoRecording(enabled);
    }

    /**
     * Checks if console logs are attached to the report.
     * @returns {Promise<*|boolean>} true if attached, otherwise false
     */
    static async isConsoleLogsEnabled() {
        return await this.shake.isConsoleLogsEnabled();
    }

    /**
     * Sets if console logs are attached to the report.
     * @param enabled true if attached, otherwise false
     */
    static setConsoleLogsEnabled(enabled) {
        this.shake.setConsoleLogsEnabled(enabled);
    }

    /**
     * Checks if network requests are attached to the report.
     * @returns {Promise<*|boolean>} true if attached, otherwise false
     */
    static async isNetworkRequestsEnabled() {
        return this.networkTracker.isEnabled();
    }

    /**
     * Sets if network requests are attached to the report.
     * @param enabled true if attached, otherwise false
     */
    static setNetworkRequestsEnabled(enabled) {
        this.networkTracker.setEnabled(enabled);
    }

    /**
     * Logs a custom message to the report.
     * @param logLevel LogLevel value
     * @param message log message
     */
    static log(logLevel, message) {
        this.shake.log(logLevel, message);
    }

    /**
     * Adds metadata to the report.
     * @param key metadata key
     * @param value metadata value
     */
    static setMetadata(key, value) {
        this.shake.setMetadata(key, value);
    }

    /**
     * Masks view on the screenshot.
     * @param viewRef view reference
     */
    static addPrivateView(viewRef) {
        const nativeTag = findNodeHandle(viewRef);
        this.shake.addPrivateView(nativeTag);
    }

    /**
     * Removes view from private views.
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
     * @param enabled true if enabled, otherwise false
     */
    static setSensitiveDataRedactionEnabled(enabled) {
        this.shake.setSensitiveDataRedactionEnabled(enabled);
    }

    /**
     * Checks if automatic sensitive data redaction is enabled.
     * @returns {Promise<*|boolean>} true if enabled, otherwise false
     */
    static async isSensitiveDataRedactionEnabled() {
        return await this.shake.isSensitiveDataRedactionEnabled();
    }

    /**
     * Enables notification tracking.
     * This is important just for Android.
     * On iOS this feature works out of the box.
     */
    static trackNotifications() {
        this.shake.trackNotifications();
    }

    /**
     * Adds custom notification to the Shake report.
     * @param title notification title
     * @param description notification description
     */
    static handleNotification(title, description) {
        this.shake.handleNotification(title, description);
    }
}

export default Shake;


