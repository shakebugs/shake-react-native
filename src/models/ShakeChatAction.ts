import ShakeBaseAction from './ShakeBaseAction';

/**
 * Represents chat action for Home screen.
 */
class ShakeChatAction extends ShakeBaseAction {
  constructor(
    title: string | null = null,
    subtitle: string | null = null,
    icon: string | null = null
  ) {
    super(title, subtitle, icon, null, 'chat');
  }
}

export default ShakeChatAction;
