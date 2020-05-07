import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import menuButton from "../core/MenuButton";

const HomeScreen = ({navigation}) => {
    const showShakeTestScreen = () => navigation.navigate('ShakeScreen');
    const showCoreTestScreen = () => navigation.navigate('TouchScreen');
    const showScrollScreen = () => navigation.navigate('ScrollScreen');
    const showRefreshScreen = () => navigation.navigate('RefreshScreen');
    const showListScreen = () => navigation.navigate('ListScreen');
    const showModalScreen = () => navigation.navigate('ModalScreen');
    const showWebViewScreen = () => navigation.navigate('WebViewScreen');
    const showDrawerScreen = () => navigation.navigate('DrawerScreen');


    const sectionTitle = (text) => {
        return <Text style={styles.title}>{text}</Text>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                {sectionTitle("Shake")}
                {menuButton("Shake test", showShakeTestScreen)}
                {sectionTitle("Touching")}
                {menuButton("Core test", showCoreTestScreen)}
                {menuButton("Scroll test", showScrollScreen)}
                {menuButton("Refresh test", showRefreshScreen)}
                {menuButton("List test", showListScreen)}
                {menuButton("Modal test", showModalScreen)}
                {menuButton("WebView test", showWebViewScreen)}
                {menuButton("Drawer test (Android)", showDrawerScreen)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5FCFF',
    },
    title: {
        marginBottom: 8
    }
});

export default HomeScreen;
