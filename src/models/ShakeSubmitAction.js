import ShakeBaseAction from './ShakeBaseAction';

/**
 * Represents submit action for Home screen.
 */
class ShakeSubmitAction extends ShakeBaseAction {
    constructor(title = null, subtitle = null, icon = null) {
        super(title, subtitle, icon, null, 'submit');
    }
}

export default ShakeSubmitAction;
