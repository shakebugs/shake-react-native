/**
 * Represents Shake Home action.
 */
class ShakeBaseAction {
  /**
   * Determines component title text.
   * @type {string | null} string value
   */
  title: string | null = null;

  /**
   * Determines native resource name to load as a title.
   * @type {string | null} native resource name
   */
  titleRes: string | null = null;

  /**
   * Determines component subtitle text.
   * @type {string | null} string value
   */
  subtitle: string | null = null;

  /**
   * Determines native resource name to load as a subtitle.
   * @type {string | null} native resource name
   */
  subtitleRes: string | null = null;

  /**
   * Determines component icon.
   * @type {string | null} native resource name
   */
  icon: string | null = null;

  /**
   * Determines native resource name to load as an icon.
   * @type {string | null} native resource name
   */
  iconRes: string | null = null;

  /**
   * Function executed on the item press.
   * @type {function | null} function
   */
  handler: (() => void) | null = null;

  /**
   * Determines component type.
   * @type {string} string value
   */
  type: string;

  constructor(
    title: string | null,
    subtitle: string | null,
    icon: string | null,
    handler: (() => void) | null,
    type: string
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.icon = icon;
    this.handler = handler;
    this.type = type;
  }
}

export default ShakeBaseAction;
