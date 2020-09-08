import {StyleSheet, Text} from "react-native";
import React from "react";

const Title = (props) => {
    return <Text style={[props.style, styles.text]}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: 'HKGrotesk-Regular'
    }
});


export default Title;
