/**
 * Represents item for Shake Picker.
 */
class ShakePickerItem {
  /**
   * Determines item key.
   * @type {string} string value
   */
  key: string = '';

  /**
   * Represents item label.
   * @type {string | null} string value
   */
  text: string | null = null;

  /**
   * Determines native resource name to load as a label.
   * @type {string | null} native resource name
   */
  textRes: string | null = null;

  /**
   * Represents item icon.
   * @type {string | null} base64 image string
   */
  icon: string | null = null;

  /**
   * Determines native resource name to load as an icon.
   * @type {string | null} native resource name
   */
  iconRes: string | null = null;

  /**
   * Represents tag which will be added to the ticket on submit if item is selected.
   * @type {string | null} string value
   */
  tag: string | null = null;

  constructor(
    key: string = '',
    text: string | null = '',
    icon: string | null = null,
    tag: string | null = null
  ) {
    this.key = key;
    this.text = text;
    this.icon = icon;
    this.tag = tag;
  }
}

export default ShakePickerItem;
