import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

const ModalScreen = ({navigation}) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={true}
                onRequestClose={() => {
                    navigation.pop();
                }}>
                <View style={styles.container}>
                    <Text>Outside part is modal. Inside is View.</Text>
                </View>
            </Modal>
        </View>
    );
};

export default ModalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 42,
        borderColor: 'black',
        borderWidth: 1
    },
});
