import ShakeScreen from '../models/ShakeScreen';

/**
 * Maps string to ShakeScreen enum.
 *
 * @param value string value
 * @return shake screen
 */
const mapToShakeScreen = (value: string): ShakeScreen => {
  let shakeScreen: ShakeScreen = ShakeScreen.NEW;

  if (value === 'NEW') shakeScreen = ShakeScreen.NEW;
  if (value === 'HOME') shakeScreen = ShakeScreen.HOME;

  return shakeScreen;
};

export { mapToShakeScreen };
