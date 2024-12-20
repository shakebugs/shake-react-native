import { useEffect } from 'react';
import MainScreen from './ui/shake/MainScreen';
import DarkModeObserver from './DarkModeObserver';
import { PermissionsAndroid, Platform, type Permission } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <DarkModeObserver>
      <MainScreen />
    </DarkModeObserver>
  );
};

const requestNotificationPermission = () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS as Permission
    );
  } else {
    PushNotificationIOS.requestPermissions();
  }
};

export default App;
