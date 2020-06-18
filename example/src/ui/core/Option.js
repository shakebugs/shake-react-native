import {StyleSheet, Switch, View} from "react-native";
import React, {useState} from "react";
import {primaryColor, secondaryColor} from "../../App";
import Title from "./Title";

const Option = (props) => {
    const [enabled, setEnabled] = useState(true);

    return <View style={styles.row}>
        <Title style={styles.stretch} text={props.title}/>
        <Switch
            trackColor={{true: secondaryColor}}
            thumbColor={enabled ? primaryColor : null}
            value={enabled}
            onValueChange={(value) => {
                setEnabled(value);
                props.onValueChanged(value);
            }}/>
    </View>;
};

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: "row",
        marginBottom: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    stretch: {
        flex: 1,
        marginBottom: 8
    }
});


export default Option;
