import {NativeModules} from 'react-native';

const {Shake} = NativeModules;

export const ShakeInvocationEvent = {
    BUTTON: 'BUTTON',
    SHAKE: 'SHAKE',
    SCREENSHOT: 'SCREENSHOT',
};

export default Shake;
