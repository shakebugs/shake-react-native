import ShakeFormComponent from './ShakeFormComponent';

/**
 * Represents Shake form.
 */
class ShakeForm {
  /**
   * List of components displayed on the form.
   */
  components: Array<ShakeFormComponent>;

  constructor(components: Array<ShakeFormComponent>) {
    this.components = components;
  }
}

export default ShakeForm;
