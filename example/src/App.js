import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "./ui/home/HomeScreen";
import ShakeScreen from "./ui/shake/ShakeScreen";
import TouchScreen from "./ui/touch/TouchScreen";
import ScrollScreen from "./ui/touch/ScrollScreen";
import RefreshScreen from "./ui/touch/RefreshScreen";
import ListScreen from "./ui/touch/ListScreen";
import ModalScreen from "./ui/touch/ModalScreen";
import DrawerScreen from "./ui/touch/DrawerScreen";
import WebViewScreen from "./ui/touch/WebViewScreen";

const Stack = createStackNavigator();

export default class App extends Component<{}> {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                    <Stack.Screen name="ShakeScreen" component={ShakeScreen}/>
                    <Stack.Screen name="TouchScreen" component={TouchScreen}/>
                    <Stack.Screen name="ScrollScreen" component={ScrollScreen}/>
                    <Stack.Screen name="RefreshScreen" component={RefreshScreen}/>
                    <Stack.Screen name="ListScreen" component={ListScreen}/>
                    <Stack.Screen name="ModalScreen" component={ModalScreen}/>
                    <Stack.Screen name="DrawerScreen" component={DrawerScreen}/>
                    <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
