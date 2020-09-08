import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NetworkTracker, Shake, ShakeFile, ShakeReportConfiguration} from "react-native-shake";
import RNFS from "react-native-fs";
import Button from "../core/Button";
import Title from "../core/Title";
import Option from "../core/Option";
import Link from "../core/Link";
import Version from "../core/Version";

const ShakeScreen = (props) => {
    let path = RNFS.DocumentDirectoryPath + '/file.txt';

    const [shakeInvokingEnabled, setShakeInvokingEnabled] = useState();
    const [buttonInvokingEnabled, setButtonInvokingEnabled] = useState();
    const [screenshotInvokingEnabled, setScreenshotInvokingEnabled] = useState();
    const [blackBoxEnabled, setBlackBoxEnabled] = useState();
    const [activityHistoryEnabled, setActivityHistoryEnabled] = useState();
    const [inspectScreenEnabled, setInspectScreenEnabled] = useState();
    const [shakeEnabled, setShakeEnabled] = useState();

    const [networkTrackerEnabled, setNetworkTrackerEnabled] = useState();

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
    }

    const initialize = async () => {
        setBlackBoxEnabled(await Shake.isEnableBlackBox());
        setActivityHistoryEnabled(await Shake.isEnableActivityHistory());
        setInspectScreenEnabled(await Shake.isEnableInspectScreen());
        setButtonInvokingEnabled(await Shake.isShowFloatingReportButton());
        setShakeInvokingEnabled(await Shake.isInvokeShakeOnShakeDeviceEvent());
        setScreenshotInvokingEnabled(await Shake.isInvokeShakeOnScreenshot());
        setShakeEnabled(true); // Not provided by native SDK

        setNetworkTrackerEnabled(NetworkTracker.isEnabled())
    }

    const start = () => {
        Shake.start();
    };

    const show = () => {
        Shake.show();
    };

    const setReportData = () => {
        Shake.setShakeReportData(
            [
                ShakeFile.create(path),
                ShakeFile.create(path, "customName")
            ],
            "Test quick facts");
    };

    const silentReport = () => {
        const reportConfig = new ShakeReportConfiguration();
        reportConfig.blackBoxData = true;
        reportConfig.activityHistoryData = true;
        reportConfig.screenshot = true;
        reportConfig.showReportSentMessage = true;

        Shake.silentReport(
            "Silent reports are working!",
            [
                ShakeFile.create(path),
                ShakeFile.create(path, "customName")
            ],
            "Test quick facts",
            reportConfig);
    };

    const sendNetworkRequest = () => {
        fetch('https://postman-echo.com/post', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'firstParam',
                secondParam: 'secondParam',
            }),
        }).then(res => {
            alert('Request sent.');
        });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title style={styles.title} text="Actions"/>
                <Button text="Start" onPress={start}/>
                <Button text="Show" onPress={show}/>
                <Button text="Attach data" onPress={setReportData}/>
                <Button text="Silent report" onPress={silentReport}/>
                <Title style={styles.title} text="Invoking"/>
                <Option
                    enabled={shakeInvokingEnabled}
                    title="Shaking"
                    onValueChanged={() => {
                        Shake.setInvokeShakeOnShakeDeviceEvent(!shakeInvokingEnabled);
                        setShakeInvokingEnabled(!shakeInvokingEnabled);
                    }}/>
                <Option
                    enabled={buttonInvokingEnabled}
                    title="Button"
                    onValueChanged={() => {
                        Shake.setShowFloatingReportButton(!buttonInvokingEnabled);
                        setButtonInvokingEnabled(!buttonInvokingEnabled);

                    }}/>
                <Option
                    enabled={screenshotInvokingEnabled}
                    title="Screenhot"
                    onValueChanged={() => {
                        Shake.setInvokeShakeOnScreenshot(!screenshotInvokingEnabled);
                        setScreenshotInvokingEnabled(!screenshotInvokingEnabled);
                    }}/>
                <Title style={styles.title} text="Options"/>
                <Option
                    enabled={shakeEnabled}
                    title="Enabled"
                    onValueChanged={() => {
                        Shake.setEnabled(!shakeEnabled);
                        setShakeEnabled(!shakeEnabled);
                    }}/>

                <Option
                    enabled={blackBoxEnabled}
                    title="Blackbox"
                    onValueChanged={() => {
                        Shake.setEnableBlackBox(!blackBoxEnabled);
                        setBlackBoxEnabled(!blackBoxEnabled);
                    }}/>
                <Option
                    enabled={networkTrackerEnabled}
                    title="Network tracker"
                    onValueChanged={() => {
                        NetworkTracker.setEnabled(!networkTrackerEnabled);
                        setNetworkTrackerEnabled(!networkTrackerEnabled);
                    }}/>
                <Option
                    enabled={activityHistoryEnabled}
                    title="Activity history"
                    onValueChanged={() => {
                        Shake.setEnableActivityHistory(!activityHistoryEnabled);
                        setActivityHistoryEnabled(!activityHistoryEnabled);

                    }}/>
                <Option
                    enabled={inspectScreenEnabled}
                    title="Inspect screen"
                    onValueChanged={() => {
                        Shake.setEnableInspectScreen(!inspectScreenEnabled);
                        setInspectScreenEnabled(!inspectScreenEnabled);
                    }}/>
                <Title style={styles.title} text="Tools"/>
                <Button text="Send network request" onPress={sendNetworkRequest}/>
                <View style={styles.links}>
                    <Link text="Dashboard" link="https://app.staging5h4k3.com/"/>
                    <Link text="Documentation" link="https://www.staging5h4k3.com/docs"/>
                </View>
                <Version onLongPress={() => {
                    props.navigation.navigate('TestScreen');
                }}/>
            </View>
        </ScrollView>
    );
};

export default ShakeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom: 16
    },

    title: {
        marginVertical: 16
    },

    links: {
        marginBottom: 8,
        marginTop: 16,
    },
});
