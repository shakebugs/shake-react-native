import ShakeFormComponent from './ShakeFormComponent';

/**
 * Represents Shake form Email input.
 */
class ShakeEmail extends ShakeFormComponent {
  /**
   * Determines component key.
   * @type {string} string value
   */
  key: string = '';

  /**
   * Determines component label.
   * @type {string | null} string value
   */
  label: string | null = null;

  /**
   * Determines native resource name to load as a label.
   * @type {string | null} native resource name
   */
  labelRes: string | null = null;

  /**
   * Determines initial input value.
   * @type {string} string value
   */
  initialValue: string = '';

  /**
   * Determines if this field is required to submit form.
   * @type {boolean} true if required, otherwise false
   */
  required: boolean = false;

  constructor(key = '', label = '', initialValue = '', required = false) {
    super('email');
    this.key = key;
    this.label = label;
    this.initialValue = initialValue;
    this.required = required;
  }
}

export default ShakeEmail;
