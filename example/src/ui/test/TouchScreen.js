import React from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import sampleImage from "../../assets/sampleImage";
import Slider from "@react-native-community/slider";
import {Picker} from "@react-native-community/picker";
import CheckBox from '@react-native-community/checkbox';

const TouchScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Sample text</Text>
            <TextInput placeholder={"Enter text"} style={styles.textInput}/>
            <Button title="Button" onPress={() => alert("Button pressed.")}/>
            <ActivityIndicator style={styles.indicator}/>
            <Image style={{height: 100}} source={{
                uri: sampleImage
            }}/>
            <ImageBackground style={{height: 100}} source={{
                uri: sampleImage
            }}/>
            <Switch/>
            <TouchableOpacity style={styles.touchable}>
                <Text style={styles.touchableText}>TouchableOpacity</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback style={styles.touchable}>
                <Text style={styles.touchableText}>TouchableWithoutFeedback</Text>
            </TouchableWithoutFeedback>
            <TouchableHighlight style={styles.touchable}>
                <Text style={styles.touchableText}>TouchableHighlight</Text>
            </TouchableHighlight>
            <View style={styles.view}/>
            <SafeAreaView style={styles.safeArea}/>
            <KeyboardAvoidingView style={styles.keyboardAvoiding}/>
            <Slider/>
            <Picker>
                <Picker.Item label="Item1" value="item1"/>
                <Picker.Item label="Item2" value="item2"/>
            </Picker>
            <CheckBox/>
            <StatusBar/>
        </ScrollView>
    );
};

export default TouchScreen;

const styles = StyleSheet.create({
    container: {
        padding: 32,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 24,
    },
    textInput: {
        backgroundColor: 'white'
    },
    view: {
        height: 80,
        width: 200,
        backgroundColor: 'blue'
    },
    safeArea: {
        height: 80,
        width: 200,
        backgroundColor: 'yellow'
    },
    keyboardAvoiding: {
        height: 80,
        width: 200,
        backgroundColor: 'purple'
    },
    touchable: {
        height: 40
    },
    touchableText: {
        margin: 8
    },
    indicator: {
        height: 70
    },
});
