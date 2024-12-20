import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import Shake from 'react-native-shake';

import messaging from '@react-native-firebase/messaging';

const startShake = async () => {
  Shake.setInvokeShakeOnScreenshot(true);
  Shake.setInvokeShakeOnShakeDeviceEvent(true);
  Shake.setShowFloatingReportButton(true);
  Shake.setNetworkRequestsEnabled(true);
  Shake.setConsoleLogsEnabled(true);
  Shake.setAutoVideoRecording(true);
  Shake.setShowIntroMessage(true);
  Shake.setSensitiveDataRedactionEnabled(true);
  Shake.setHomeSubtitle('React Native Shake Example');

  Shake.setShakeOpenListener(() => {
    console.log('Shake opened!');
  });
  Shake.setShakeDismissListener(() => {
    console.log('Shake dismissed!');
  });
  Shake.setShakeSubmitListener((type, fields) => {
    console.log('Shake submitted!');
  });

  const apiKey =
    Platform.OS === 'ios'
      ? 'T8iGZK4gJGRiYcqtx7oAwKiJOVol9c70bD18yo76N7ojlkPsc5eUuGu'
      : 'K9CeeyYp8aWIIWrKnT63c9StRXQa05pWzP1rYruYsIvmg1q0brwuvGM';
  await Shake.start(apiKey);

  Shake.registerUser('test_user');
};

const setupFirebaseNotifications = async () => {
  if (Platform.OS === 'android') {
    // Firebase push notifications background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      await startShake();
      Shake.showChatNotification(remoteMessage.data);
    });
    // Firebase push notifications foreground handler
    messaging().onMessage(async (remoteMessage) => {
      console.log('Message handled in the foreground!', remoteMessage);
      Shake.showChatNotification(remoteMessage.data);
    });

    // Get FCM token for current session
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
    Shake.setPushNotificationsToken(fcmToken);
  }
};

setupFirebaseNotifications();
startShake();

AppRegistry.registerComponent(appName, () => App);
