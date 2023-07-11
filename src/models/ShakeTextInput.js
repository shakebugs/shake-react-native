import ShakeFormComponent from "./ShakeFormComponent";

/**
 * Represents Shake form Text input.
 */
class ShakeTextInput extends ShakeFormComponent{
    /**
     * Determines component key.
     * @type {string} string value
     */
    key = "";

    /**
     * Determines component label.
     * @type {string | null} string value
     */
    label = null;

    /**
     * Determines native resource name to load as a label.
     * @type {string | null} native resource name
     */
    labelRes = null;

    /**
     * Determines initial input value.
     * @type {string} string value
     */
    initialValue = "";

    /**
     * Determines if this field is required to submit form.
     * @type {boolean} true if required, otherwise false
     */
    required = false;

    constructor(key = "", label = "", initialValue = "", required= false) {
        super("text_input");
        this.key = key;
        this.label = label;
        this.initialValue = initialValue;
        this.required = required;
    }
}

export default ShakeTextInput;
