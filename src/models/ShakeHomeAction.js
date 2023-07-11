import ShakeBaseAction from "./ShakeBaseAction";

/**
 * Represents custom action for Home screen.
 */
class ShakeHomeAction extends ShakeBaseAction {
    constructor(title, subtitle = null, icon = null, handler = null) {
        super(title, subtitle, icon, handler, 'default');
    }
}

export default ShakeHomeAction;
