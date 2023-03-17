import ShakeFormComponent from "./ShakeFormComponent";

/**
 * Represents Shake form Picker.
 */
class ShakePicker extends ShakeFormComponent {
    /**
     * Determines component label
     * @type {string} string value
     */
    label = "";

    /**
     * Determines native resource name to load as a label.
     * @type {string | null} native resource name
     */
    labelRes = null;

    /**
     * Determines list of items to load in the picker.
     * @type {array} list of ShakePickerItem
     */
    items = [];

    constructor(label = "", labelRes= null, items = []) {
        super("picker");
        this.label = label;
        this.labelRes = labelRes;
        this.items = items;
    }
}

export default ShakePicker;
