/**
 * Represents ShakeTheme for coloring Shake screen.
 */
class ShakeTheme {
  /**
   * Determines medium font family for Shake UI.
   * @type {string | null} string value
   */
  fontFamilyMedium: string | null = null;

  /**
   * Determines bold font family for Shake UI.
   * @type {string | null} string value
   */
  fontFamilyBold: string | null = null;

  /**
   * Determines background color of Shake UI.
   * @type {string | null} native resource name
   */
  backgroundColor: string | null = null;

  /**
   * Determines secondary background color of Shake UI.
   * @type {string | null} string value
   */
  secondaryBackgroundColor: string | null = null;

  /**
   * Determines text color of Shake UI.
   * @type {string | null} native resource name
   */
  textColor: string | null = null;

  /**
   * Determines secondary text color of Shake UI.
   * @type {string | null} string value
   */
  secondaryTextColor: string | null = null;

  /**
   * Determines accent color of Shake UI.
   * @type {string | null} native resource name
   */
  accentColor: string | null = null;

  /**
   * Determines accent text color of Shake UI.
   * @type {string | null} string value
   */
  accentTextColor: string | null = null;

  /**
   * Determines outline color of Shake UI.
   * @type {string | null} string value
   */
  outlineColor: string | null = null;

  /**
   * Determines border radius of Shake UI.
   * @type {number | null} string value
   */
  borderRadius: number | null = null;

  /**
   * Determines shadow elevation for Shake UI. (Android)
   * @type {number | null} string value
   */
  elevation: number | null = null;

  /**
   * Determines shadow radius for Shake UI. (iOS)
   * @type {number | null} string value
   */
  shadowRadius: number | null = null;

  /**
   * Determines shadow opacity for Shake UI. (iOS)
   * @type {number | null} string value
   */
  shadowOpacity: number | null = null;

  /**
   * Determines shadow offset for Shake UI. (iOS)
   * @type {object | null} string value
   */
  shadowOffset: object | null = null;
}

export default ShakeTheme;
