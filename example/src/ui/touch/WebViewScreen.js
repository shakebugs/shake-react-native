import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from "react-native-webview";

const WebViewScreen = () => {
    return (
        <WebView
            source={{uri: 'https://www.google.com'}}/>
    );
};

export default WebViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
