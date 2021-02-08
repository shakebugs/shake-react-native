import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Shake, {LogLevel, NetworkTracker, ShakeFile, ShakeReportConfiguration} from 'react-native-shake';
import RNFS from 'react-native-fs';
import Button from '../core/Button';
import Title from '../core/Title';
import Option from '../core/Option';
import Link from '../core/Link';
import Version from '../core/Version';
//import FetchNetworkTester from "../network/FetchNetworkTester";
import AxiosNetworkTester from '../network/AxiosNetworkTester';

const ShakeScreen = (props) => {
    let path = RNFS.DocumentDirectoryPath + '/file.txt';

    const [shakeInvokingEnabled, setShakeInvokingEnabled] = useState();
    const [buttonInvokingEnabled, setButtonInvokingEnabled] = useState();
    const [screenshotInvokingEnabled, setScreenshotInvokingEnabled] = useState();
    const [rightEdgeInvokingEnabled, setRightEdgeInvokingEnabled] = useState();
    const [blackBoxEnabled, setBlackBoxEnabled] = useState();
    const [activityHistoryEnabled, setActivityHistoryEnabled] = useState();
    const [inspectScreenEnabled, setInspectScreenEnabled] = useState();
    const [shakeEnabled, setShakeEnabled] = useState();
    const [networkTrackerEnabled, setNetworkTrackerEnabled] = useState();
    const [emailFieldEnabled, setEmailFieldEnabled] = useState();
    const [feedbackTypesEnabled, setFeedbackTypesEnabled] = useState();
    const [autoVideoRecordingEnabled, setAutoVideoRecordingEnabled] = useState();
    const [consoleLogsEnabled, setConsoleLogsEnabled] = useState();
    //const networkTester = new FetchNetworkTester();
    const networkTester = new AxiosNetworkTester();

    useEffect(() => {
        createFile();
        initialize();
    }, []);

    const createFile = () => {
        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
                console.log('File written');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const initialize = async () => {
        setBlackBoxEnabled(await Shake.isEnableBlackBox());
        setActivityHistoryEnabled(await Shake.isEnableActivityHistory());
        setInspectScreenEnabled(await Shake.isEnableInspectScreen());
        setButtonInvokingEnabled(await Shake.isShowFloatingReportButton());
        setShakeInvokingEnabled(await Shake.isInvokeShakeOnShakeDeviceEvent());
        setScreenshotInvokingEnabled(await Shake.isInvokeShakeOnScreenshot());
        setRightEdgeInvokingEnabled(await Shake.isInvokeShakeOnRightEdgePan());
        setEmailFieldEnabled(await Shake.isEnableEmailField());
        setFeedbackTypesEnabled(await Shake.isEnableMultipleFeedbackTypes());
        setAutoVideoRecordingEnabled(await Shake.isAutoVideoRecording());
        setConsoleLogsEnabled(await Shake.isConsoleLogsEnabled());
        setShakeEnabled(true); // Not provided by native SDK

        setNetworkTrackerEnabled(NetworkTracker.isEnabled());
    };

    const show = () => {
        Shake.show();
    };

    const setReportData = () => {
        Shake.setShakeReportData([ShakeFile.create(path), ShakeFile.create(path, 'customName')]);
    };

    const silentReport = () => {
        const reportConfig = new ShakeReportConfiguration();
        reportConfig.blackBoxData = true;
        reportConfig.activityHistoryData = true;
        reportConfig.screenshot = true;
        reportConfig.showReportSentMessage = false;

        Shake.silentReport(
            'Silent reports are working!',
            [ShakeFile.create(path), ShakeFile.create(path, 'customName')],
            reportConfig,
        );
    };

    const customLog = () => {
        Shake.log(LogLevel.INFO, 'This is a Shake custom log.');
    };

    const addMetadata = () => {
        Shake.setMetadata('Shake', 'This is a Shake metadata.');
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
                <Button text="Show" onPress={show} />
                <Button text="Attach data" onPress={setReportData} />
                <Button text="Silent report" onPress={silentReport} />
                <Button text="Custom log" onPress={customLog} />
                <Button text="Add metadata" onPress={addMetadata} />
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
                <Option
                    enabled={rightEdgeInvokingEnabled}
                    title="Right Edge Pan"
                    onValueChanged={() => {
                        Shake.setInvokeShakeOnRightEdgePan(!rightEdgeInvokingEnabled);
                        setRightEdgeInvokingEnabled(!rightEdgeInvokingEnabled);
                    }}
                />
                <Title style={styles.title} text="Options" />
                <Option
                    enabled={shakeEnabled}
                    title="Enabled"
                    onValueChanged={() => {
                        Shake.setEnabled(!shakeEnabled);
                        setShakeEnabled(!shakeEnabled);
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
                    enabled={networkTrackerEnabled}
                    title="Network tracker"
                    onValueChanged={() => {
                        NetworkTracker.setEnabled(!networkTrackerEnabled);
                        setNetworkTrackerEnabled(!networkTrackerEnabled);
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
                    enabled={inspectScreenEnabled}
                    title="Inspect screen"
                    onValueChanged={() => {
                        Shake.setEnableInspectScreen(!inspectScreenEnabled);
                        setInspectScreenEnabled(!inspectScreenEnabled);
                    }}
                />
                <Option
                    enabled={emailFieldEnabled}
                    title="Email field"
                    onValueChanged={() => {
                        Shake.setEnableEmailField(!emailFieldEnabled);
                        setEmailFieldEnabled(!emailFieldEnabled);
                    }}
                />
                <Option
                    enabled={feedbackTypesEnabled}
                    title="Feedback types"
                    onValueChanged={() => {
                        Shake.setEnableMultipleFeedbackTypes(!feedbackTypesEnabled);
                        setFeedbackTypesEnabled(!feedbackTypesEnabled);
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
                    enabled={consoleLogsEnabled}
                    title="Console logs"
                    onValueChanged={() => {
                        Shake.setConsoleLogsEnabled(!consoleLogsEnabled);
                        setConsoleLogsEnabled(!consoleLogsEnabled);
                    }}
                />
                <Title style={styles.title} text="Network" />
                <Button text="Send GET request" onPress={sendGetNetworkRequest} />
                <Button text="Send POST request" onPress={sendPostNetworkRequest} />
                <Button text="Send GET image request" onPress={sendGetImageNetworkRequest} />
                <Button text="Send POST file request" onPress={sendPostFileNetworkRequest} />
                <Button text="Send 404 request" onPress={sendErrorNetworkRequest} />
                <Button text="Send timeout request" onPress={sendTimeoutNetworkRequest} />
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

export default ShakeScreen;

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
