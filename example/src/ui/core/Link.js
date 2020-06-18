import {Linking, StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

const Link = (props) => {
    return <TouchableOpacity onPress={() => {
        Linking.openURL(props.link)
    }}>
        <Text style={styles.link}>{props.text}</Text>
    </TouchableOpacity>;
};

const styles = StyleSheet.create({
    link: {
        fontWeight: "bold",
        color: "#643ecb",
        flex: 1,
        textAlign: 'center',
        marginBottom: 4
    }
});


export default Link;
