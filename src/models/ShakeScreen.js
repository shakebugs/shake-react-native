/**
 * Represents Shake screen.
 */
class ShakeScreen {
    static get HOME() { return HOME; }
    static get NEW() { return NEW; }

    value = "";

    constructor(value) {
        this.value = value;
    }
}

const HOME = new ShakeScreen("HOME");
const NEW = new ShakeScreen("NEW");

export default ShakeScreen;
