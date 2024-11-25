/**
 * Used to configure silent report.
 */
class ShakeReportConfiguration {
  /**
   * Includes or excludes blackbox data in report.
   * @type {boolean} true to include, otherwise false
   */
  blackBoxData: boolean = true;

  /**
   * Includes or excludes activity history in report.
   * @type {boolean} true to include, otherwise false
   */
  activityHistoryData: boolean = true;

  /**
   * Includes or excludes screenshot in report.
   * @type {boolean} true to include, otherwise false
   */
  screenshot: boolean = true;

  /**
   * Includes or excludes video in report.
   * @type {boolean} true to include, otherwise false
   */
  video: boolean = true;

  /**
   * Defines if report success message will be visible.
   * @type {boolean} true if visible, otherwise false
   */
  showReportSentMessage: boolean = false;
}

export default ShakeReportConfiguration;
