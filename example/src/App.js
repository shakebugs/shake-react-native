import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TestScreen from './ui/test/TestScreen';
import ShakeScreen from './ui/shake/ShakeScreen';
import TouchScreen from './ui/test/TouchScreen';
import ScrollScreen from './ui/test/ScrollScreen';
import RefreshScreen from './ui/test/RefreshScreen';
import ListScreen from './ui/test/ListScreen';
import ModalScreen from './ui/test/ModalScreen';
import DrawerScreen from './ui/test/DrawerScreen';
import WebViewScreen from './ui/test/WebViewScreen';
import MapScreen from './ui/test/MapScreen';
import TabScreen from './ui/test/TabScreen';
import Header from './ui/core/Header';

const Stack = createStackNavigator();

export const primaryColor = '#643ecb';
export const secondaryColor = '#c9c1e7';
export const disabledPrimaryColor = '#acacac';
export const disabledSecondaryColor = '#d2d2d2';

const options = {
    headerTitle: (props) => <Header {...props} />,
    headerTitleAlign: 'center',
};

export default class App extends Component<{}> {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={options} name="ShakeScreen" component={ShakeScreen} />
                    <Stack.Screen options={options} name="TestScreen" component={TestScreen} />
                    <Stack.Screen options={options} name="TouchScreen" component={TouchScreen} />
                    <Stack.Screen options={options} name="ScrollScreen" component={ScrollScreen} />
                    <Stack.Screen options={options} name="RefreshScreen" component={RefreshScreen} />
                    <Stack.Screen options={{title: 'List'}} name="ListScreen" component={ListScreen} />
                    <Stack.Screen options={options} name="ModalScreen" component={ModalScreen} />
                    <Stack.Screen options={options} name="DrawerScreen" component={DrawerScreen} />
                    <Stack.Screen options={options} name="TabScreen" component={TabScreen} />
                    <Stack.Screen options={options} name="WebViewScreen" component={WebViewScreen} />
                    <Stack.Screen options={options} name="MapScreen" component={MapScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
