#!/bin/bash
# Install npe
npm install npe --global

# Change package.json name
npe name $MODULE_NAME
npm i --package-lock-only

# Update dependencies
sed "s|$System.env.ANDROID_DEPENDENCY|$ANDROID_DEPENDENCY|g" android/build.gradle > changed.txt && mv changed.txt android/build.gradle
sed "s|#{ENV['IOS_DEPENDENCY']}|$IOS_DEPENDENCY|g" react-native-shake.podspec > changed.txt && mv changed.txt react-native-shake.podspec
