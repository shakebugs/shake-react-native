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

### Set compileSdkVersion version in the build.gradle file

Since Shake requires `compileSdkVersion` 29 or greater, verify that `compileSdkVersion` is correctly set in the *build.gradle* file:

```groovy title="android/build.gradle"
buildscript {
    ext {
        buildToolsVersion = "30.0.2"
        minSdkVersion = 21
        compileSdkVersion = 30
        targetSdkVersion = 30
        ndkVersion = "20.1.5948944"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.2.1")
    }
}
```

### Set multidexEnabled flag in the build.gradle file

If you do not have *multiDexEnabled* flag set, update app-level *build.gradle* like below:

```groovy title="app/build.gradle"
defaultConfig {
    applicationId "com.shakebugs.react.example"
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 1
    versionName "1.0.0"
    multiDexEnabled true
}
```

### Start Shake

Call `Shake.start()` method in the *index.js* file.

```javascript title="index.js"
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Shake from '@shakebugs/react-native-shake';

AppRegistry.registerComponent(appName, () => App);

Shake.start('client-id', 'client-secret');
```

Replace `client-id` and `client-secret` with the actual values you have in [your workspace settings](https://app.shakebugs.com/settings/workspace#general).

## Resources

- [Official docs](https://www.shakebugs.com/docs/)
