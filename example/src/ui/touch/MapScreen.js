import React from 'react';
import {StyleSheet} from 'react-native';
import MapView from "react-native-maps";

const MapScreen = () => {
    return (
        <MapView style={styles.map}
                 region={{
                     latitude: 37.78825,
                     longitude: -122.4324,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                 }} initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}/>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
