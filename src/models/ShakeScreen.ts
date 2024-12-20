/**
 * Represents Shake screen.
 */
class ShakeScreen {
  static get HOME() {
    return HOME;
  }
  static get NEW() {
    return NEW;
  }
  static get CHAT() {
    return CHAT;
  }

  value: string = '';

  constructor(value: string) {
    this.value = value;
  }
}

const HOME = new ShakeScreen('HOME');
const NEW = new ShakeScreen('NEW');
const CHAT = new ShakeScreen('CHAT');

export default ShakeScreen;
