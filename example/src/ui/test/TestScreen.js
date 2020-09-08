import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from "../core/Button";

const TestScreen = ({navigation}) => {
    const showTouchScreen = () => navigation.navigate('TouchScreen');
    const showScrollScreen = () => navigation.navigate('ScrollScreen');
    const showRefreshScreen = () => navigation.navigate('RefreshScreen');
    const showListScreen = () => navigation.navigate('ListScreen');
    const showModalScreen = () => navigation.navigate('ModalScreen');
    const showWebViewScreen = () => navigation.navigate('WebViewScreen');
    const showTabScreen = () => navigation.navigate('TabScreen');
    const showDrawerScreen = () => navigation.navigate('DrawerScreen');
    const showMapScreen = () => navigation.navigate('MapScreen');

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <Button text="Core test" onPress={showTouchScreen}/>
                    <Button text="Scroll test" onPress={showScrollScreen}/>
                    <Button text="Refresh test" onPress={showRefreshScreen}/>
                    <Button text="List test" onPress={showListScreen}/>
                    <Button text="Modal test" onPress={showModalScreen}/>
                    <Button text="WebView test" onPress={showWebViewScreen}/>
                    <Button text="Map test" onPress={showMapScreen}/>
                    <Button text="Tab test" onPress={showTabScreen}/>
                    <Button text="Drawer test" onPress={showDrawerScreen}/>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16
    }
});

export default TestScreen;
