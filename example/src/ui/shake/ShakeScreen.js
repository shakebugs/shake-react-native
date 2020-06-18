import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Shake, {NetworkTracker, ShakeFile, ShakeReportConfiguration} from "react-native-shake";
import RNFS from "react-native-fs";
import Button from "../core/Button";
import Title from "../core/Title";
import Option from "../core/Option";
import DeviceInfo from 'react-native-device-info';
import Link from "../core/Link";

const ShakeScreen = (props) => {
    let path = RNFS.DocumentDirectoryPath + '/file.txt';

    useEffect(() => {
        createFile();
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

    /*const enableAll = () => {
        Shake.setInvokeShakeOnShaking(true);
        Shake.setShowFloatingReportButton(true);
        Shake.setInvokeShakeOnScreenshot(true);

        Shake.setEnabled(true);
        Shake.setEnableBlackBox(true);
        Shake.setEnableActivityHistory(true);
        Shake.setEnableInspectScreen(true);

        NetworkTracker.enable();

        Shake.start();
    }*/

    const start = () => {
        Shake.start();
    };

    const show = () => {
        Shake.show();
    };

    const setReportData = () => {
        Shake.setShakeReportData([
            ShakeFile.create(path),
            ShakeFile.create(path, "customName")
        ], "Test quick facts");
    };

    const silentReport = () => {
        const reportConfig = new ShakeReportConfiguration();
        reportConfig.blackBoxData = true;
        reportConfig.activityHistoryData = true;
        reportConfig.screenshot = true;
        reportConfig.showReportSentMessage = true;

        Shake.silentReport(
            "Silent reports are working!",
            [path],
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
                <Option title="Shaking"
                        onValueChanged={(enabled) => {
                            Shake.setInvokeShakeOnShaking(enabled);
                        }}/>
                <Option title="Button"
                        onValueChanged={(enabled) => {
                            Shake.setShowFloatingReportButton(enabled);
                        }}/>
                <Option title="Screenhot"
                        onValueChanged={(enabled) => {
                            Shake.setInvokeShakeOnScreenshot(enabled);
                        }}/>

                <Title style={styles.title} text="Options"/>
                <Option title="Enabled"
                        onValueChanged={(enabled) => {
                            Shake.setEnabled(enabled);
                        }}/>
                <Option title="Blackbox"
                        onValueChanged={(enabled) => {
                            Shake.setEnableBlackBox(enabled);
                        }}/>
                <Option title="Network tracker"
                        onValueChanged={(enabled) => {
                            NetworkTracker.setEnabled(enabled);
                        }}/>
                <Option title="Activity history"
                        onValueChanged={(enabled) => {
                            Shake.setEnableActivityHistory(enabled);
                        }}/>
                <Option title="Inspect screen"
                        onValueChanged={(enabled) => {
                            Shake.setEnableInspectScreen(enabled);
                        }}/>
                <Title style={styles.title} text="Tools"/>
                <Button text="Send network request" onPress={sendNetworkRequest}/>

                <View style={styles.links}>
                    <Link text="Dashboard" link="https://app.staging5h4k3.com/"/>
                    <Link text="Docs" link="https://www.staging5h4k3.com/docs"/>
                </View>

                <TouchableWithoutFeedback onLongPress={() => {
                    props.navigation.navigate('TestScreen');
                }}>
                    <View style={styles.info}>
                        <Text style={styles.version}>{"v" + DeviceInfo.getVersion()}</Text>
                    </View>
                </TouchableWithoutFeedback>

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

    info: {
        marginBottom: 16,
        marginTop: 8,
    },

    version: {
        flex: 1,
        textAlign: 'center',
    }
});
