/**
 * Represents Shake Home action.
 */
class ShakeBaseAction {
    /**
     * Determines component title text.
     * @type {string | null} string value
     */
    title = null;

    /**
     * Determines native resource name to load as a title.
     * @type {string | null} native resource name
     */
    titleRes = null;

    /**
     * Determines component subtitle text.
     * @type {string | null} string value
     */
    subtitle = null;

    /**
     * Determines native resource name to load as a subtitle.
     * @type {string | null} native resource name
     */
    subtitleRes = null;

    /**
     * Determines component icon.
     * @type {string | null} native resource name
     */
    icon = null;

    /**
     * Determines native resource name to load as an icon.
     * @type {string | null} native resource name
     */
    iconRes = null;

    /**
     * Function executed on the item press.
     * @type {function | null} function
     */
    handler = null;

    /**
     * Determines component type.
     * @type {string} string value
     */
    type;

    constructor(title, subtitle, icon, handler, type) {
        this.title = title;
        this.subtitle = subtitle;
        this.icon = icon;
        this.handler = handler;
        this.type = type;
    }
}

export default ShakeBaseAction;
