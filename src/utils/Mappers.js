import ShakeScreen from "../models/ShakeScreen";

/**
 * Maps string to ShakeScreen enum.
 *
 * @param value string value
 * @return shake screen
 */
const mapToShakeScreen = (value) => {
    let shakeScreen;

    if (value === "NEW") shakeScreen = ShakeScreen.NEW;
    if (value === "HOME") shakeScreen = ShakeScreen.HOME;

    return shakeScreen;
}

export {mapToShakeScreen};
