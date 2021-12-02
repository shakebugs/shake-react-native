/**
 * Used to configure silent report.
 */
class ShakeReportConfiguration {
    /**
     * Includes or excludes blackbox data in report.
     * @type {boolean} true to include, otherwise false
     */
    blackBoxData = true;

    /**
     * Includes or excludes activity history in report.
     * @type {boolean} true to include, otherwise false
     */
    activityHistoryData = true;

    /**
     * Includes or excludes screenshot in report.
     * @type {boolean} true to include, otherwise false
     */
    screenshot = true;

    /**
     * Includes or excludes video in report.
     * @type {boolean} true to include, otherwise false
     */
    video = true;

    /**
     * Defines if report success message will be visible.
     * @type {boolean} true if visible, otherwise false
     */
    showReportSentMessage = true;
}

export default ShakeReportConfiguration;
