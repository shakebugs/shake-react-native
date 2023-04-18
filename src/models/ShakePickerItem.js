/**
 * Represents item for Shake Picker.
 */
class ShakePickerItem {
    /**
     * Represents item label.
     * @type {string} string value
     */
    text = "";

    /**
     * Determines native resource name to load as a label.
     * @type {string | null} native resource name
     */
    textRes = null;

    /**
     * Represents item icon.
     * @type {string | null} native resource name
     */
    icon = null;

    /**
     * Represents tag which will be added to the ticket on submit if item is selected.
     * @type {string | null} string value
     */
    tag = null;

    constructor(text = "", textRes = null, icon = null, tag = null) {
        this.text = text;
        this.textRes = textRes;
        this.icon = icon;
        this.tag = tag;
    }
}

export default ShakePickerItem;
