import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Shake, {NetworkTracker, ShakeFile, ShakeReportConfiguration} from 'react-native-shake';
import RNFS from 'react-native-fs';
import Button from '../core/Button';
import Title from '../core/Title';
import Option from '../core/Option';
import Link from '../core/Link';
import Version from '../core/Version';
import axios from 'axios';

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
    };

    const initialize = async () => {
        setBlackBoxEnabled(await Shake.isEnableBlackBox());
        setActivityHistoryEnabled(await Shake.isEnableActivityHistory());
        setInspectScreenEnabled(await Shake.isEnableInspectScreen());
        setButtonInvokingEnabled(await Shake.isShowFloatingReportButton());
        setShakeInvokingEnabled(await Shake.isInvokeShakeOnShakeDeviceEvent());
        setScreenshotInvokingEnabled(await Shake.isInvokeShakeOnScreenshot());
        setShakeEnabled(true); // Not provided by native SDK

        setNetworkTrackerEnabled(NetworkTracker.isEnabled());
    };

    const show = () => {
        Shake.show();
    };

    const setReportData = () => {
        Shake.setShakeReportData([ShakeFile.create(path), ShakeFile.create(path, 'customName')], 'Test quick facts');
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
            'Test quick facts',
            reportConfig,
        );
    };

    const sendGetNetworkRequest = () => {
        axios
            .get('https://dummy.restapiexample.com/api/v1/employees')
            .then(function (response) {
                alert('Request sent.');
            })
            .catch(function (error) {
                alert('Request error.');
            });
        /*        fetch('https://dummy.restapiexample.com/api/v1/employees', {
            method: 'GET',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });*/
    };

    const sendPostNetworkRequest = () => {
        axios
            .post('https://postman-echo.com/post', {
                firstParam: 'firstParam',
                secondParam: 'secondParam',
            })
            .then(function (response) {
                alert('Request sent.');
            })
            .catch(function (error) {
                alert('Request error.');
            });
        /*        fetch('https://postman-echo.com/post', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'firstParam',
                secondParam: 'secondParam',
            }),
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });*/
    };

    const sendErrorNetworkRequest = () => {
        axios
            .get('https://run.mocky.io/v3/267ed439-8ea6-4495-bda7-90969e039a9e')
            .then(function (response) {
                alert('Request sent.');
            })
            .catch(function (error) {
                alert('Request error.');
            });
        /*        fetch('https://run.mocky.io/v3/267ed439-8ea6-4495-bda7-90969e039a9e', {
            method: 'GET',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });*/
    };

    const sendTimeoutNetworkRequest = () => {
        axios
            .post(
                'https://postman-echo.com/post',
                {
                    firstParam: 'firstParam',
                    secondParam: 'secondParam',
                },
                {
                    timeout: 1,
                },
            )
            .then(function (response) {
                alert('Request sent.');
            })
            .catch(function (error) {
                alert('Request error.');
            });
    };

    const sendPostFileNetworkRequest = () => {
        const formData = new FormData();
        formData.append('file', {uri: path, name: 'file.txt', type: 'text/plain'});

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios
            .post('https://httpbin.org/response-headers', formData, config)
            .then(function (response) {
                alert('Request sent.');
            })
            .catch(function (error) {
                alert('Request error.');
            });
        /*        fetch('https://httpbin.org/response-headers', {
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
            method: 'POST',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });*/
    };

    const sendGetImageNetworkRequest = () => {
        axios
            .get('https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg', {
                responseType: 'blob',
            })
            .then(function (response) {
                alert('Request sent.');
            })
            .catch(function (error) {
                alert('Request error.');
            });
        /*        fetch('https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg', {
            method: 'GET',
        })
            .then((res) => {
                alert('Request sent.');
            })
            .catch((error) => {
                alert('Request error.');
            });*/
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title style={styles.title} text="Actions"/>
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
                <Title style={styles.title} text="Options"/>
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
                <Title style={styles.title} text="Network"/>
                <Button text="Send GET request" onPress={sendGetNetworkRequest}/>
                <Button text="Send POST request" onPress={sendPostNetworkRequest}/>
                <Button text="Send GET image request" onPress={sendGetImageNetworkRequest}/>
                <Button text="Send POST file request" onPress={sendPostFileNetworkRequest}/>
                <Button text="Send 404 request" onPress={sendErrorNetworkRequest}/>
                <Button text="Send timeout request" onPress={sendTimeoutNetworkRequest}/>
                <View style={styles.links}>
                    <Link text="Dashboard" link="https://app.staging5h4k3.com/"/>
                    <Link text="Documentation" link="https://www.staging5h4k3.com/docs"/>
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
