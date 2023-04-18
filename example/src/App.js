import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TestScreen from './ui/test/TestScreen';
import MainScreen from './ui/shake/MainScreen';
import TouchScreen from './ui/test/TouchScreen';
import ScrollScreen from './ui/test/ScrollScreen';
import RefreshScreen from './ui/test/RefreshScreen';
import ListScreen from './ui/test/ListScreen';
import ModalScreen from './ui/test/ModalScreen';
import DrawerScreen from './ui/test/DrawerScreen';
import TabScreen from './ui/test/TabScreen';
import Header from './ui/core/Header';

const Stack = createStackNavigator();

const options = {
  headerTitle: props => <Header {...props} />,
  headerTitleAlign: 'center',
};

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={options}
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            options={options}
            name="TestScreen"
            component={TestScreen}
          />
          <Stack.Screen
            options={options}
            name="TouchScreen"
            component={TouchScreen}
          />
          <Stack.Screen
            options={options}
            name="ScrollScreen"
            component={ScrollScreen}
          />
          <Stack.Screen
            options={options}
            name="RefreshScreen"
            component={RefreshScreen}
          />
          <Stack.Screen
            options={{title: 'List'}}
            name="ListScreen"
            component={ListScreen}
          />
          <Stack.Screen
            options={options}
            name="ModalScreen"
            component={ModalScreen}
          />
          <Stack.Screen
            options={options}
            name="DrawerScreen"
            component={DrawerScreen}
          />
          <Stack.Screen
            options={options}
            name="TabScreen"
            component={TabScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
