import ShakeBaseAction from './ShakeBaseAction';

/**
 * Represents chat action for Home screen.
 */
class ShakeChatAction extends ShakeBaseAction {

    constructor(title = null, subtitle = null,  icon = null) {
        super(title, subtitle, icon, null,'chat');
    }
}

export default ShakeChatAction;


