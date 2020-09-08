import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const Version = (props) => {
    return <View style={styles.info}>
        <TouchableWithoutFeedback onLongPress={props.onLongPress}>
            <Text style={styles.version}>{'v' + DeviceInfo.getVersion()}</Text>
        </TouchableWithoutFeedback>
    </View>;
};

const styles = StyleSheet.create({
    info: {
        marginBottom: 16,
        marginTop: 8,
    },

    version: {
        textAlign: 'center',
    }
});

export default Version;
