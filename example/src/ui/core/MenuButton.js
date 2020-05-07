import {Button, StyleSheet, View} from "react-native";
import React from "react";

const menuButton = (text, onPress) => {
    return (<View style={styles.button}>
        <Button title={text} onPress={() => {
            onPress();
        }}/>
    </View>);
};

const styles = StyleSheet.create({
    button: {
        marginBottom: 4
    }
});


export default menuButton;
