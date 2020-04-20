/**
* Sample React Native App
*
* adapted from App.js generated by the following command:
*
* react-native init example
*
* https://github.com/facebook/react-native
*/

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Shake, {ShakeInvocationEvent} from 'react-native-shake';
import RNFS from 'react-native-fs';

export default class App extends Component<{}> {
  componentDidMount() {
    let path = RNFS.DocumentDirectoryPath + '/file.txt';	
    console.log(path);
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log('file written');
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>☆Shake example☆</Text>
      <View style={styles.buttons}>
      <Button title="Start" onPress={() => Shake.start()} />
      <Button title="Stop" onPress={() => Shake.stop()} />
      <Button title="attach" onPress={() => Shake.attachFiles([RNFS.DocumentDirectoryPath + '/file.txt'])} />
      <Button title="facts" onPress={() => Shake.setQuickFacts('kdasjdhkasjd')} />
      <Button title="enableBlackBox" onPress={() => Shake.setBlackBoxEnabled(true)} />
      <Button title="disableBlackBox" onPress={() => Shake.setBlackBoxEnabled(false)} />
      <Button title="manualTrigger" onPress={() => Shake.manualTrigger()} />
      <Button 
      title="setEvents" 
      onPress={() => {
        Shake.setInvocationEvents([ShakeInvocationEvent.BUTTON, 
          ShakeInvocationEvent.SHAKE,
          ShakeInvocationEvent.SCREENSHOT])}
        } 
        />
        </View>
        </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      buttons: {
        width: '50%',
        height: '50%',
        justifyContent: 'space-between',
      },
      welcome: {
        fontSize: 32,
        textAlign: 'center',
        margin: 20,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
    });
    