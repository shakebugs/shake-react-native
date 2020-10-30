/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Shake from 'react-native-shake';

AppRegistry.registerComponent(appName, () => App);

Shake.setInvokeShakeOnScreenshot(false);
Shake.setInvokeShakeOnShakeDeviceEvent(true);
Shake.setShowFloatingReportButton(false);
Shake.start();
