import {StyleSheet, Switch, View} from 'react-native';
import React from 'react';
import {disabledPrimaryColor, disabledSecondaryColor, primaryColor, secondaryColor} from '../../App';
import Title from './Title';

const Option = (props) => {
    return (
        <View style={styles.row}>
            <Title style={styles.stretch} text={props.title} />
            <Switch
                trackColor={{true: secondaryColor, false: disabledSecondaryColor}}
                thumbColor={props.enabled ? primaryColor : disabledPrimaryColor}
                value={props.enabled}
                onValueChange={(value) => {
                    props.onValueChanged(value);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 28,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 6,
        shadowColor: '#000',
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
        marginBottom: 8,
    },
});

export default Option;
