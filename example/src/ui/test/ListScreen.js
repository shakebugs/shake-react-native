import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

const ListScreen = () => {
    return (
        <FlatList
            style={styles.list}
            data={["item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3", "item1", "item2", "item3"]}
            renderItem={({item, index, separators}) => (
                <Text style={styles.text}>item</Text>
    )}/>
    );
};

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    list: {
        padding: 32,
    },
    text: {
        padding: 8,
        borderWidth: 1,
        borderColor: "black",
        fontSize: 18
    }
});
