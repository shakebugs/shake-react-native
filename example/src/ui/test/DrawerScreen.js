import React from 'react';
import {
    DrawerLayoutAndroid,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';

const DrawerScreen = () => {
    const navigationView = (
        <View style={styles.navigationContainer}>
            <TouchableOpacity>
                <Text style={{margin: 10, fontSize: 15}}>TouchableOpacity button</Text>
            </TouchableOpacity>
            <TouchableNativeFeedback>
                <Text style={{margin: 10, fontSize: 15}}>TouchableNativeFeedback button</Text>
            </TouchableNativeFeedback>
        </View>
    );

    return (
        <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={() => navigationView}>
            <View style={styles.container}>
                <ProgressBarAndroid/>
            </View>
        </DrawerLayoutAndroid>
    );
};

export default DrawerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: "#ecf0f1",
        padding: 8
    },
    navigationContainer: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#fff",
        padding: 8
    }
});
