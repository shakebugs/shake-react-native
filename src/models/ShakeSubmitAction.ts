import ShakeBaseAction from './ShakeBaseAction';

/**
 * Represents submit action for Home screen.
 */
class ShakeSubmitAction extends ShakeBaseAction {
  constructor(
    title: string | null = null,
    subtitle: string | null = null,
    icon: string | null = null
  ) {
    super(title, subtitle, icon, null, 'submit');
  }
}

export default ShakeSubmitAction;
