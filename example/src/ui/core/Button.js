import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = (props) => {
    const color = props.color ? props.color : '#ffffff';
    return <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}
        onPress={() => {
            props.onPress();
        }}>
        <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>;
};

const styles = StyleSheet.create({
    button: {
        marginBottom: 6,
        borderRadius: 20,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    text: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'HKGrotesk-Regular'
    }
});


export default Button;
