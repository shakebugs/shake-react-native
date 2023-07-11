import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Shake, {
  LogLevel,
  NetworkRequestBuilder,
  NotificationEventBuilder,
  ShakeAttachments,
  ShakeChatAction,
  ShakeEmail,
  ShakeFile,
  ShakeForm,
  ShakeHomeAction,
  ShakeInspectButton,
  ShakePicker,
  ShakePickerItem,
  ShakeReportConfiguration,
  ShakeScreen,
  ShakeSubmitAction,
  ShakeTextInput,
  ShakeTheme,
  ShakeTitle,
} from 'react-native-shake';
import RNFS from 'react-native-fs';
import Button from '../core/Button';
import Title from '../core/Title';
import Option from '../core/Option';
import Link from '../core/Link';
import Version from '../core/Version';
//import FetchNetworkTester from "../network/FetchNetworkTester";
import AxiosNetworkTester from '../network/AxiosNetworkTester';
import Private from '../core/Private';
import PushNotification from 'react-native-push-notification';
import {createTempFile} from '../../utils/Files';

const MainScreen = props => {
  let path = RNFS.DocumentDirectoryPath + '/file.txt';

  const [shakeInvokingEnabled, setShakeInvokingEnabled] = useState(false);
  const [buttonInvokingEnabled, setButtonInvokingEnabled] = useState(false);
  const [screenshotInvokingEnabled, setScreenshotInvokingEnabled] =
    useState(false);
  const [blackBoxEnabled, setBlackBoxEnabled] = useState(false);
  const [activityHistoryEnabled, setActivityHistoryEnabled] = useState(false);
  const [userFeedbackEnabled, setUserFeedbackEnabled] = useState(false);
  const [autoVideoRecordingEnabled, setAutoVideoRecordingEnabled] =
    useState(false);
  const [consoleLogsEnabled, setConsoleLogsEnabled] = useState(false);
  const [networkRequestsEnabled, setNetworkRequestsEnabled] = useState(false);
  const [sensitiveDataRedactionEnabled, setSensitiveDataRedactionEnabled] =
    useState(false);
  const [screenshotIncluded, setScreenshotIncluded] = useState(false);

  let privateView = useRef(null);

  //const networkTester = new FetchNetworkTester();
  const networkTester = new AxiosNetworkTester();

  useEffect(() => {
    createTempFile(path);
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialize = async () => {
    setBlackBoxEnabled(await Shake.isEnableBlackBox());
    setActivityHistoryEnabled(await Shake.isEnableActivityHistory());
    setButtonInvokingEnabled(await Shake.isShowFloatingReportButton());
    setShakeInvokingEnabled(await Shake.isInvokeShakeOnShakeDeviceEvent());
    setScreenshotInvokingEnabled(await Shake.isInvokeShakeOnScreenshot());
    setAutoVideoRecordingEnabled(await Shake.isAutoVideoRecording());
    setConsoleLogsEnabled(await Shake.isConsoleLogsEnabled());
    setNetworkRequestsEnabled(await Shake.isNetworkRequestsEnabled());
    setSensitiveDataRedactionEnabled(
      await Shake.isSensitiveDataRedactionEnabled(),
    );
    setScreenshotIncluded(await Shake.isScreenshotIncluded());
    setUserFeedbackEnabled(await Shake.isUserFeedbackEnabled());
  };

  const showHome = () => {
    Shake.show(ShakeScreen.HOME);
  };

  const showNew = () => {
    Shake.show();
  };

  const setReportData = () => {
    Shake.setShakeReportData([
      ShakeFile.create(path),
      ShakeFile.create(path, 'customName'),
    ]);
  };

  const silentReport = () => {
    const configuration = new ShakeReportConfiguration();
    configuration.blackBoxData = true;
    configuration.activityHistoryData = true;
    configuration.video = true;
    configuration.screenshot = true;
    configuration.showReportSentMessage = false;

    Shake.silentReport(
      'Silent reports are working!',
      [ShakeFile.create(path), ShakeFile.create(path, 'customName')],
      configuration,
    );
  };

  const addPrivateViewFun = () => {
    Shake.addPrivateView(privateView);
  };

  const removePrivateViewFun = () => {
    Shake.removePrivateView(privateView);
  };

  const clearPrivateViews = () => {
    Shake.clearPrivateViews();
  };

  const customLog = () => {
    Shake.log(LogLevel.INFO, 'This is Shake custom log.');
  };

  const addMetadata = () => {
    Shake.setMetadata('Test', 'Test metadata');
    Shake.clearMetadata();
    Shake.setMetadata('Shake', 'This is Shake metadata.');
  };

  const setCustomForm = async () => {
    const oldForm = await Shake.getShakeForm();
    oldForm.components = oldForm.components.filter(c => c.type !== 'inspect');

    const pickerItems = [
      new ShakePickerItem('Mouse', 'Mouse', null, 'mouse'),
      new ShakePickerItem('Keyboard', 'Keyboard', null, 'keyboard'),
      new ShakePickerItem('Display', 'Display', null, 'display'),
    ];

    const shakeForm = new ShakeForm([
      new ShakePicker('Category', 'Category', pickerItems),
      new ShakeTitle('Short title', 'Short title', '', true),
      new ShakeTextInput('Repro steps', 'Repro steps', ''),
      new ShakeEmail('Your email', 'Your email'),
      new ShakeInspectButton(),
      new ShakeAttachments(),
    ]);

    Shake.setShakeForm(oldForm);
  };

  const setCustomTheme = () => {
    const shakeTheme = new ShakeTheme();
    shakeTheme.fontFamilyBold = 'Lexend-Bold';
    shakeTheme.fontFamilyMedium = 'Lexend-Regular';
    shakeTheme.backgroundColor = '#FFFFFF';
    shakeTheme.secondaryBackgroundColor = '#FFFFFF';
    shakeTheme.textColor = '#0e0e0e';
    shakeTheme.secondaryTextColor = '#3f3f3f';
    shakeTheme.accentColor = '#ff0000';
    shakeTheme.accentTextColor = '#ffffff';
    shakeTheme.outlineColor = '#464646';
    shakeTheme.borderRadius = 0;
    shakeTheme.elevation = 10;
    shakeTheme.shadowOffset = {width: 0.1, height: 0.1};
    shakeTheme.shadowRadius = 3;
    shakeTheme.shadowOpacity = 0.5;

    Shake.setShakeTheme(shakeTheme);
  };

  const setCustomActions = () => {
    const actions = [
      new ShakeHomeAction(
        'A custom home action',
        'This is a test subtitle',
        null,
        () => {
          console.log('Whoopppyy!');
        },
      ),
      new ShakeSubmitAction(),
      new ShakeChatAction(),
    ];

    Shake.setHomeActions(actions);
  };

  const postNotification = () => {
    PushNotification.createChannel({
      channelId: 'shake-rn',
      channelName: 'Shake RN',
    });
    PushNotification.localNotification({
      channelId: 'shake-rn',
      title: 'This notification was generated by the app!',
      message: 'Notification message.',
    });
  };

  const setNotificationEventsFilter = () => {
    Shake.setNotificationEventsFilter(notificationEvent => {
      notificationEvent.setDescription('data_redacted');
      notificationEvent.setTitle('data_redacted');

      return notificationEvent;
    });
  };

  const setNetworkRequestsFilter = () => {
    Shake.setNetworkRequestsFilter(networkRequest => {
      networkRequest.setResponseBody('data_redacted');
      networkRequest.setRequestBody('data_redacted');
      networkRequest.setDate(new Date());

      return networkRequest;
    });
  };

  const showNotificationsSettings = () => {
    Shake.showNotificationsSettings();
  };

  const insertNotificationEvent = () => {
    const notificationEventBuilder = new NotificationEventBuilder()
      .setId('0')
      .setDescription('Description')
      .setTitle('Title');
    Shake.insertNotificationEvent(notificationEventBuilder);
  };

  const insertNetworkRequest = () => {
    const networkRequestBuilder = new NetworkRequestBuilder()
      .setMethod('POST')
      .setStatusCode('200')
      .setUrl('https://www.shakebugs.com')
      .setRequestBody('Request body')
      .setResponseBody('Response body')
      .setRequestHeaders({testHeader1: 'value'})
      .setResponseHeaders({testHeader2: 'value'})
      .setDuration(100)
      .setDate(new Date());
    Shake.insertNetworkRequest(networkRequestBuilder);
  };

  const sendGetNetworkRequest = () => {
    networkTester.sendGetRequest();
  };

  const sendPostNetworkRequest = () => {
    networkTester.sendPostRequest();
  };

  const sendErrorNetworkRequest = () => {
    networkTester.sendErrorRequest();
  };

  const sendTimeoutNetworkRequest = () => {
    networkTester.sendTimeoutRequest();
  };

  const sendPostFileNetworkRequest = () => {
    networkTester.postFileRequest();
  };

  const sendGetImageNetworkRequest = () => {
    networkTester.getImageRequest();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title} text="Actions" />
        <Button text="Show Home" onPress={showHome} />
        <Button text="Show New" onPress={showNew} />
        <Button text="Attach data" onPress={setReportData} />
        <Button text="Silent report" onPress={silentReport} />
        <Button text="Custom log" onPress={customLog} />
        <Button text="Add metadata" onPress={addMetadata} />
        <Button text="Set custom form" onPress={setCustomForm} />
        <Button text="Set custom theme" onPress={setCustomTheme} />
        <Button text="Set custom actions" onPress={setCustomActions} />
        <Title style={styles.title} text="Invoking" />
        <Option
          enabled={shakeInvokingEnabled}
          title="Shaking"
          onValueChanged={() => {
            Shake.setInvokeShakeOnShakeDeviceEvent(!shakeInvokingEnabled);
            setShakeInvokingEnabled(!shakeInvokingEnabled);
          }}
        />
        <Option
          enabled={buttonInvokingEnabled}
          title="Button"
          onValueChanged={() => {
            Shake.setShowFloatingReportButton(!buttonInvokingEnabled);
            setButtonInvokingEnabled(!buttonInvokingEnabled);
          }}
        />
        <Option
          enabled={screenshotInvokingEnabled}
          title="Screenshot"
          onValueChanged={() => {
            Shake.setInvokeShakeOnScreenshot(!screenshotInvokingEnabled);
            setScreenshotInvokingEnabled(!screenshotInvokingEnabled);
          }}
        />
        <Title style={styles.title} text="Shaking threshold" />
        <Button
          text="100"
          onPress={() => {
            Shake.setShakingThreshold(100);
          }}
        />
        <Button
          text="600"
          onPress={() => {
            Shake.setShakingThreshold(600);
          }}
        />
        <Button
          text="900"
          onPress={() => {
            Shake.setShakingThreshold(900);
          }}
        />
        <Title style={styles.title} text="User" />
        <Button
          text="Register user"
          onPress={() => {
            Shake.registerUser('john.smith@example.com');
          }}
        />
        <Button
          text="Update user id"
          onPress={() => {
            Shake.updateUserId('will.smith@example.com');
          }}
        />
        <Button
          text="Update user metadata"
          onPress={() => {
            Shake.updateUserMetadata({fist_name: 'John', last_name: 'Smith'});
          }}
        />
        <Button
          text="Unregister user"
          onPress={() => {
            Shake.unregisterUser();
          }}
        />
        <Title style={styles.title} text="Options" />
        <Option
          enabled={userFeedbackEnabled}
          title="User feedback enabled"
          onValueChanged={() => {
            Shake.setUserFeedbackEnabled(!userFeedbackEnabled);
            setUserFeedbackEnabled(!userFeedbackEnabled);
          }}
        />
        <Option
          enabled={blackBoxEnabled}
          title="Blackbox"
          onValueChanged={() => {
            Shake.setEnableBlackBox(!blackBoxEnabled);
            setBlackBoxEnabled(!blackBoxEnabled);
          }}
        />
        <Option
          enabled={activityHistoryEnabled}
          title="Activity history"
          onValueChanged={() => {
            Shake.setEnableActivityHistory(!activityHistoryEnabled);
            setActivityHistoryEnabled(!activityHistoryEnabled);
          }}
        />
        <Option
          enabled={networkRequestsEnabled}
          title="Network requests"
          onValueChanged={() => {
            Shake.setNetworkRequestsEnabled(!networkRequestsEnabled);
            setNetworkRequestsEnabled(!networkRequestsEnabled);
          }}
        />
        <Option
          enabled={consoleLogsEnabled}
          title="Console logs"
          onValueChanged={() => {
            Shake.setConsoleLogsEnabled(!consoleLogsEnabled);
            setConsoleLogsEnabled(!consoleLogsEnabled);
          }}
        />
        <Option
          enabled={autoVideoRecordingEnabled}
          title="Screen recording"
          onValueChanged={() => {
            Shake.setAutoVideoRecording(!autoVideoRecordingEnabled);
            setAutoVideoRecordingEnabled(!autoVideoRecordingEnabled);
          }}
        />
        <Option
          enabled={sensitiveDataRedactionEnabled}
          title="Sensitive data redaction"
          onValueChanged={() => {
            Shake.setSensitiveDataRedactionEnabled(
              !sensitiveDataRedactionEnabled,
            );
            setSensitiveDataRedactionEnabled(!sensitiveDataRedactionEnabled);
          }}
        />
        <Option
          enabled={screenshotIncluded}
          title="Screenshot included"
          onValueChanged={() => {
            Shake.setScreenshotIncluded(!screenshotIncluded);
            setScreenshotIncluded(!screenshotIncluded);
          }}
        />
        <Title style={styles.title} text="Notifications" />
        <Button
          text="Show notification settings"
          onPress={showNotificationsSettings}
        />
        <Button text="Post notification event" onPress={postNotification} />
        <Button
          text="Insert notification event"
          onPress={insertNotificationEvent}
        />
        <Button
          text="Set notification events filter"
          onPress={setNotificationEventsFilter}
        />
        <Title style={styles.title} text="Private view" />
        <Button text="Add private view" onPress={addPrivateViewFun} />
        <Button text="Remove private view" onPress={removePrivateViewFun} />
        <Button text="Clear private views" onPress={clearPrivateViews} />
        <Private
          customRef={ref => {
            privateView = ref;
          }}
        />
        <Title style={styles.title} text="Network" />
        <Button text="Send GET request" onPress={sendGetNetworkRequest} />
        <Button text="Send POST request" onPress={sendPostNetworkRequest} />
        <Button
          text="Send GET image request"
          onPress={sendGetImageNetworkRequest}
        />
        <Button
          text="Send POST file request"
          onPress={sendPostFileNetworkRequest}
        />
        <Button text="Send 404 request" onPress={sendErrorNetworkRequest} />
        <Button
          text="Send timeout request"
          onPress={sendTimeoutNetworkRequest}
        />
        <Button text="Insert network request" onPress={insertNetworkRequest} />
        <Button
          text="Set network requests filter"
          onPress={setNetworkRequestsFilter}
        />
        <View style={styles.links}>
          <Link text="Dashboard" link="https://app.staging5h4k3.com/" />
          <Link text="Documentation" link="https://www.staging5h4k3.com/docs" />
        </View>
        <Version
          onLongPress={() => {
            props.navigation.navigate('TestScreen');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },

  title: {
    marginVertical: 16,
  },

  links: {
    marginBottom: 8,
    marginTop: 16,
  },
});
