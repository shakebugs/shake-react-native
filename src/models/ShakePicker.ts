import ShakeFormComponent from './ShakeFormComponent';
import ShakePickerItem from './ShakePickerItem';

/**
 * Represents Shake form Picker.
 */
class ShakePicker extends ShakeFormComponent {
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
   * Determines list of items to load in the picker.
   * @type {array} list of ShakePickerItem
   */
  items: Array<ShakePickerItem> = [];

  constructor(key = '', label = '', items = []) {
    super('picker');
    this.key = key;
    this.label = label;
    this.items = items;
  }
}

export default ShakePicker;
