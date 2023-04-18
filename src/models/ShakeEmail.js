import ShakeFormComponent from "./ShakeFormComponent";

/**
 * Represents Shake form Email input.
 */
class ShakeEmail extends ShakeFormComponent {
    /**
     * Determines component label.
     * @type {string} string value
     */
    label = "";

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

    constructor(label = "", labelRes = null, initialValue = "", required= false) {
        super("email");
        this.label = label;
        this.labelRes = labelRes;
        this.initialValue = initialValue;
        this.required = required;
    }
}

export default ShakeEmail;
