import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SceneMap, TabView} from "react-native-tab-view";

const FirstRoute = () => (
    <View style={[styles.container]}/>
);

const SecondRoute = () => (
    <View style={[styles.container]}/>
);

const TabScreen = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
        />
    );
};

export default TabScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
