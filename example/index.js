/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Shake from 'react-native-shake';

AppRegistry.registerComponent(appName, () => App);

const CLIENT_ID = 'HtTFUmUziF5Qjk1XLraAJXtVB1cL62yHWWqsDnrG';
const CLIENT_SECRET = 'IPRqEI2iSQhmUP6NGQcPNKCs7JQCJrpFUG0qDmLx4Yx2spd3caXnC3o';

Shake.setInvokeShakeOnScreenshot(true);
Shake.setInvokeShakeOnShakeDeviceEvent(true);
Shake.setShowFloatingReportButton(true);
Shake.setNetworkRequestsEnabled(true);
Shake.setConsoleLogsEnabled(true);
Shake.setAutoVideoRecording(true);
Shake.setShowIntroMessage(true);
Shake.setSensitiveDataRedactionEnabled(true);

Shake.start(CLIENT_ID, CLIENT_SECRET);
