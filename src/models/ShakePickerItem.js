/**
 * Represents item for Shake Picker.
 */
class ShakePickerItem {
    /**
     * Determines item key.
     * @type {string} string value
     */
    key = "";

    /**
     * Represents item label.
     * @type {string | null} string value
     */
    text = null;

    /**
     * Determines native resource name to load as a label.
     * @type {string | null} native resource name
     */
    textRes = null;

    /**
     * Represents item icon.
     * @type {string | null} base64 image string
     */
    icon = null;

    /**
     * Determines native resource name to load as an icon.
     * @type {string | null} native resource name
     */
    iconRes = null;

    /**
     * Represents tag which will be added to the ticket on submit if item is selected.
     * @type {string | null} string value
     */
    tag = null;

    constructor(key = "", text = "", icon = null, tag = null) {
        this.key = key;
        this.text = text;
        this.icon = icon;
        this.tag = tag;
    }
}

export default ShakePickerItem;
