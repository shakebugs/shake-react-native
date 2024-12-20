# Shake React Native SDK

[![npm version](https://badge.fury.io/js/@shakebugs%2Freact-native-shake.svg)](https://badge.fury.io/js/@shakebugs%2Freact-native-shake)

React Native plugin for [bug reporting](https://www.shakebugs.com).

## Features

| Feature         | Available |
|:-----------------:|:-----------:|
| Bug reporting   |     ✅     |
| Crash reporting |     ❌     |
| Users           |     ✅     |

## Requirements

| Platform     | Version |
|:--------------:|:---------:|
| React Native |   0.56  |
| Android      |   5.0   |
| iOS          |   12.0  |

*Since 17.1.0 version, Shake RN SDK is using RN new architecture.
If your app is running on old architecture you should use Shake RN SDK 17.0.x.

## How to use

### Install Shake

Execute the npm install command in your terminal:
```bash
npm install @shakebugs/react-native-shake
```

Install pods from the project root directory:
```bash
cd ios && pod install && cd ..
```

### Start Shake

Call `Shake.start()` method in the *index.js* file.

```javascript title="index.js"
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Shake from '@shakebugs/react-native-shake';

AppRegistry.registerComponent(appName, () => App);

const apiKey = Platform.OS === 'ios' ? 'ios-app-api-key' : 'android-app-api-key';
Shake.start(apiKey);
```

Replace `ios-app-api-key` and `android-app-api-key` with the actual values you have in your app settings.

## Resources

- [Official docs](https://www.shakebugs.com/docs/)
