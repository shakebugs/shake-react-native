import ShakeBaseAction from './ShakeBaseAction';

/**
 * Represents custom action for Home screen.
 */
class ShakeHomeAction extends ShakeBaseAction {
  constructor(
    title: string,
    subtitle: string | null = null,
    icon: string | null = null,
    handler: (() => void) | null = null
  ) {
    super(title, subtitle, icon, handler, 'default');
  }
}

export default ShakeHomeAction;
