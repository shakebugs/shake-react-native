sed "s|MODULE_NAME|$MODULE_NAME|g" package.json > changed.txt && mv changed.txt package.json
sed "s|ANDROID_DEPENDENCY|$ANDROID_DEPENDENCY|g" android/build.gradle > changed.txt && mv changed.txt android/build.gradle
sed "s|IOS_DEPENDENCY|$IOS_DEPENDENCY|g" react-native-shake.podspec > changed.txt && mv changed.txt react-native-shake.podspec