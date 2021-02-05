/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Shake from 'react-native-shake';

AppRegistry.registerComponent(appName, () => App);

const CLIENT_ID_ = 'HtTFUmUziF5Qjk1XLraAJXtVB1cL62yHWWqsDnrG';
const CLIENT_SECRET = 'IPRqEI2iSQhmUP6NGQcPNKCs7JQCJrpFUG0qDmLx4Yx2spd3caXnC3o';

Shake.setInvokeShakeOnScreenshot(true);
Shake.setInvokeShakeOnShakeDeviceEvent(true);
Shake.setShowFloatingReportButton(true);
Shake.setInvokeShakeOnRightEdgePan(true);
Shake.setConsoleLogsEnabled(true);
Shake.setAutoVideoRecording(true);
Shake.setEmailField('test@shakebugs.com');
Shake.setShowIntroMessage(true);

Shake.start(CLIENT_ID_, CLIENT_SECRET);
