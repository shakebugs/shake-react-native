import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Shake, NetworkTracker, ShakeInvocationEvent} from "react-native-shake";
import RNFS from "react-native-fs";
import menuButton from "../core/MenuButton";

const ShakeScreen = () => {
    const start = () => {
        Shake.start();
    };

    const stop = () => {
        Shake.stop();
    };

    const setInvocationEvents = () => {
        Shake.setInvocationEvents([ShakeInvocationEvent.BUTTON,
            ShakeInvocationEvent.SHAKE,
            ShakeInvocationEvent.SCREENSHOT])
    };

    const setBlackBoxDisabled = () => {
        Shake.setBlackBoxEnabled(false);
    };

    const setBlackBoxEnabled = () => {
        Shake.setBlackBoxEnabled(true);
    };

    const setQuickFacts = () => {
        Shake.setQuickFacts('Sample quick facts');
    };

    const attachFiles = () => {
        let path = RNFS.DocumentDirectoryPath + '/file.txt';
        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
                console.log('File written');
                Shake.attachFiles([path]);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const enableNetworkTracker = () => {
        NetworkTracker.enable();
    };

    const disableNetworkTracker = () => {
        NetworkTracker.disable();
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
        <View style={styles.container}>
            <View style={styles.buttons}>
                {menuButton("Start", start)}
                {menuButton("Stop", stop)}
                {menuButton("Attach files", attachFiles)}
                {menuButton("Set quick facts", setQuickFacts)}
                {menuButton("Enable blackbox", setBlackBoxEnabled)}
                {menuButton("Disable blackbox", setBlackBoxDisabled)}
                {menuButton("Set invocation events", setInvocationEvents)}
                {menuButton("Enable network tracker", enableNetworkTracker)}
                {menuButton("Disable network tracker", disableNetworkTracker)}
                {menuButton("Send network request", sendNetworkRequest)}
            </View>
        </View>
    );
};

export default ShakeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5FCFF',
    },
});
